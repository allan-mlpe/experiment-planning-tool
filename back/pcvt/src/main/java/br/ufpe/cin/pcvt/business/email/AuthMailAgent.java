package br.ufpe.cin.pcvt.business.email;

import org.apache.log4j.Logger;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class AuthMailAgent {

	private String mailSMTPServer;
	private String mailSMTPServerPort;
	private String login;
	private String alias;
	private String password;
	private Session mailSession;
	private Transport transport;
	
	final static Logger logger = Logger.getLogger(AuthMailAgent.class);

	public enum EmailContentType {
		PLAIN_TEXT, HTML
	}

	private static AuthMailAgent instanceDev;
	private static AuthMailAgent instanceProduction;

	public static AuthMailAgent getInstanceDev() {
		if (instanceDev == null) {
			instanceDev = new AuthMailAgent(Constants.DEV_EMAIL_SENDER, Constants.DEV_EMAIL_PASSWORD);
			instanceDev.alias = Constants.DEV_EMAIL_ALIAS;
		}
		return instanceDev;
	}

	public static AuthMailAgent getInstanceProduction() {
		if (instanceProduction == null) {
			instanceProduction = new AuthMailAgent(Constants.PRODUCTION_EMAIL_SENDER,
					Constants.PRODUCTION_EMAIL_PASSWORD);
			instanceProduction.alias = Constants.PRODUCTION_EMAIL_ALIAS;
		}
		return instanceProduction;
	}

	private AuthMailAgent(String login, String password) {
		this.mailSMTPServer = Constants.HOST;
		this.mailSMTPServerPort = Constants.PORT;
		this.alias = this.login = login;
		this.password = password;
	}

	private AuthMailAgent(String mailSMTPServer, String mailSMTPServerPort, String login, String password) {
		this.mailSMTPServer = mailSMTPServer;
		this.mailSMTPServerPort = mailSMTPServerPort;
		this.alias = this.login = login;
		this.password = password;
	}

	private String getContentType(EmailContentType emailContentType) {
		String rvalue = null;
		switch (emailContentType) {
		case HTML:
			rvalue = "text/html; charset=utf-8";
			break;
		case PLAIN_TEXT:
		default:
			rvalue = "text/plain";
			break;
		}
		return rvalue;
	}

	private void connect() throws AddressException, MessagingException {
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", this.mailSMTPServer);
		props.put("mail.smtp.port", this.mailSMTPServerPort);
		props.put("mail.smtp.socketFactory.port", this.mailSMTPServerPort);
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.socketFactory.fallback", "false");

		SimpleAuth auth = new SimpleAuth(this.login, this.password);

		mailSession = Session.getInstance(props, auth);
		mailSession.setDebug(true);
		transport = mailSession.getTransport("smtp");

		transport.connect();
	}

	public void sendEmail(EmailData emailData, EmailContentType emailContentType)
			throws AddressException, MessagingException {
		if (transport == null || !transport.isConnected())
			connect();
		Message msg = new MimeMessage(mailSession);
		for (String recipient : emailData.getRecipients()) {
			msg.addRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
		}
		msg.setFrom(new InternetAddress(this.alias));
		msg.setSubject(emailData.getSubject());
		msg.setContent(emailData.getBody(), getContentType(emailContentType));
		msg.saveChanges();

		transport.sendMessage(msg, msg.getAllRecipients());
	}

	public void sendEmail(String to, String subject, String message) throws Exception {
		int attempts = 0;
		do {
			try {
				String from = this.alias;
				sendEmail(from, to, subject, message);

				break;
			} catch (Exception e) {
				logger.info(String.format("Reattempt to send '%s' mail to '%s'", subject, to));

				// force reconnect
				transport = null;

				attempts++;
				if(attempts == 3) {
					throw e;
				}
			}
		} while (attempts < 3);
	}

	public void sendEmailAsync(String to, String subject, String message) throws Exception {
		ExecutorService service = Executors.newFixedThreadPool(1);
		service.submit(new Runnable() {
			public void run() {
				try {
					if (logger.isInfoEnabled()) {
						logger.info(String.format("Sending email [%s] to [%s]", subject, to));
					}
					sendEmail(to, subject, message);
					if (logger.isInfoEnabled()) {
						logger.info(String.format("Email [%s] to [%s] sent", subject, to));
					}
				} catch (Exception e) {
					logger.error(String.format("Error ending email [%s] to [%s]", subject, to), e);
					e.printStackTrace();
				}
			}
		});
	}

	private void sendEmail(String from, String to, String subject, String message)
			throws AddressException, MessagingException {
		this.sendEmail(from, to, null, subject, message);
	}

	private void sendEmail(String from, String to, List<String> recipients, String subject, String message)
			throws AddressException, MessagingException {
		if (transport == null || !transport.isConnected())
			connect();
		Message msg = new MimeMessage(mailSession);
		msg.setFrom(new InternetAddress(from));
		msg.setSubject(subject);
		msg.setContent(message, "text/html; charset=utf-8");
		msg.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
		if (recipients != null) {
			for (String recipient : recipients) {
				msg.addRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
			}
		}
		msg.saveChanges();

		transport.sendMessage(msg, msg.getAllRecipients());
		List<String> allRecipients = new ArrayList<String>();
		allRecipients.add(to);
		if (recipients != null)
			allRecipients.addAll(recipients);
	}

}

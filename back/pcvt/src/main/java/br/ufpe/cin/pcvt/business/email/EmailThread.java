package br.ufpe.cin.pcvt.business.email;

import br.ufpe.cin.pcvt.business.email.AuthMailAgent.EmailContentType;

import java.util.concurrent.ConcurrentLinkedQueue;

public class EmailThread extends Thread {
	private Object lock = new Object();
	private boolean wasSignalled = false;

	static class MyMail {
		public AuthMailAgent authenticatedMail;
		public EmailData emailData;
		public EmailContentType emailContentType;
	}

	private ConcurrentLinkedQueue<MyMail> mailsToSend = new ConcurrentLinkedQueue<MyMail>();

	public EmailThread() {
		this("Email Thread");
	}

	public EmailThread(String threadName) {
		super();
		setName(threadName);
		setPriority(Thread.MIN_PRIORITY);
		start();
	}

	public void sendEmail(EmailData emailData, EmailContentType emailContentType) {
		sendEmail(AuthMailAgent.getInstanceDev(), emailData, emailContentType);
	}

	public void sendEmail(AuthMailAgent authenticatedMail, EmailData emailData, EmailContentType emailContentType) {
		MyMail myMail = new MyMail();
		myMail.authenticatedMail = authenticatedMail;
		myMail.emailData = emailData;
		myMail.emailContentType = emailContentType;
		mailsToSend.add(myMail);
		synchronized (lock) {
			wasSignalled = true;
			lock.notify();
		}
	}

	@Override
	public void run() {
		MyMail myMail = null;
		while (!Thread.currentThread().isInterrupted() || !mailsToSend.isEmpty()) {
			synchronized (lock) {
				myMail = mailsToSend.poll();
				while (myMail == null) {
					while (!wasSignalled) {
						try {
							lock.wait();
						} catch (InterruptedException e) {
							return;
						}
					}
					wasSignalled = false;
					myMail = mailsToSend.poll();
				}
			}
			AuthMailAgent authMailAgent = myMail.authenticatedMail;
			EmailData emailData = myMail.emailData;
			EmailContentType emailContentType = myMail.emailContentType;
			myMail = null;
			try {
				authMailAgent.sendEmail(emailData, emailContentType);
			} catch (Exception ex) {
				return;
			}
		}
	}

}

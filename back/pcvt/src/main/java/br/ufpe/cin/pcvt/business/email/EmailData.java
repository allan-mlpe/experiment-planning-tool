package br.ufpe.cin.pcvt.business.email;

import java.util.ArrayList;
import java.util.List;

public class EmailData {
	private List<String> recipients;
	private String subject;
	private String body;
	
	public EmailData() {
		this.recipients = new ArrayList<String>();
		this.subject = "";
		this.body = "";
	}
	
	public EmailData(List<String> receivers, String subject, String body) {
		this.recipients = receivers;
		this.subject = subject;
		this.body = body;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public List<String> getRecipients() {
		return this.recipients;
	}

	public void setRecipients(List<String> recipients) {
		this.recipients = recipients;
	}

}


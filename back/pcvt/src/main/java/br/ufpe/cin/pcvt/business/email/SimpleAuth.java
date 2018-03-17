package br.ufpe.cin.pcvt.business.email;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class SimpleAuth extends Authenticator {
	public String username = null;
	public String password = null;

	public SimpleAuth(String user, String pwd) {
		username = user;
		password = pwd;
	}

	protected PasswordAuthentication getPasswordAuthentication() {
		return new PasswordAuthentication (username,password);
	}
} 

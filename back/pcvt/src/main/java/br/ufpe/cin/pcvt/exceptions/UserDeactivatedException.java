package br.ufpe.cin.pcvt.exceptions;

public class UserDeactivatedException extends Exception{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7647272314619158825L;
	private String email;
	
	public UserDeactivatedException(String email) {
		super("The user '"+email+"' access was disabled.");
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}

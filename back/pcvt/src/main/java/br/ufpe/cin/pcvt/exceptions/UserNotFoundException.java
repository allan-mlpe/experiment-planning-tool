package br.ufpe.cin.pcvt.exceptions;

public class UserNotFoundException extends Exception{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7647272314619158825L;
	private String email;
	
	public UserNotFoundException(String email) {
		super("The user '"+email+"' does not exist.");
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}

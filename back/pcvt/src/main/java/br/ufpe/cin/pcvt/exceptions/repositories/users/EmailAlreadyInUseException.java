package br.ufpe.cin.pcvt.exceptions.repositories.users;

public class EmailAlreadyInUseException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7647272314619158825L;
	private String email;
	private static String EXCEPTION_MESSAGE = "This email is already in use";

	public EmailAlreadyInUseException(String email) {
		super(EXCEPTION_MESSAGE);
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
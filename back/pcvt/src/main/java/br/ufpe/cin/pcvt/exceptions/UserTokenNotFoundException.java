package br.ufpe.cin.pcvt.exceptions;

public class UserTokenNotFoundException extends Exception{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7647272314619158825L;
	private static final String EXCEPTION_MESSAGE_FORMAT = "The token is not valid or it was used already"; 
	
	public UserTokenNotFoundException() {
		super(EXCEPTION_MESSAGE_FORMAT);
	}
}

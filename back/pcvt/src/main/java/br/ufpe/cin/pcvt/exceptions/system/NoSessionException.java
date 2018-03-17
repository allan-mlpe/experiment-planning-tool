package br.ufpe.cin.pcvt.exceptions.system;

public class NoSessionException extends Exception{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7647272314619158825L;
	private static final String EXCEPTION_MESSAGE_FORMAT = "There is no valid session active"; 
	
	public NoSessionException() {
		super(EXCEPTION_MESSAGE_FORMAT);
	}
}

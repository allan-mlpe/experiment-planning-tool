package br.ufpe.cin.pcvt.business.security;

public class CryptAgent {

	public static String encryptPassword(String plainText) {
		return BCrypt.hashpw(plainText, BCrypt.gensalt());
	}
	
	public static boolean checkPassword(String plainText, String hashed) {
		return BCrypt.checkpw(plainText, hashed);
	}
}

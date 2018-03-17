package br.ufpe.cin.pcvt.business.security;

import java.math.BigInteger;
import java.security.SecureRandom;

public class PasswordGenerator {

	public static String createPassword() {
		SecureRandom random = new SecureRandom();
		return new BigInteger(130, random).toString(32);
	}
}

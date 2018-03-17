package br.ufpe.cin.pcvt.exceptions;

public class InvalidCredentialsException extends Exception{

    public InvalidCredentialsException(String email) {
        super(String.format("Invalid credentials for: %s", email));
    }
}

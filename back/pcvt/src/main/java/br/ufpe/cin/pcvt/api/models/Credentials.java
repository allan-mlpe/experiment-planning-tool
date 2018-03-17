package br.ufpe.cin.pcvt.api.models;

/**
 * @author Allan Monteiro de Lima (aml3@cin.ufpe.br)
 */
public class Credentials {

    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

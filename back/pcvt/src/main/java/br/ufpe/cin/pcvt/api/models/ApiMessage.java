package br.ufpe.cin.pcvt.api.models;

import javax.ws.rs.core.Response.Status;

/**
 * @author Allan Monteiro de Lima (aml3@cin.ufpe.br)
 */
public class ApiMessage {

    private Integer statusCode;
    private String statusText;
    private String message;

    public ApiMessage() {}

    public ApiMessage(Status responseStatus, String message) {
        statusCode = responseStatus.getStatusCode();
        statusText = responseStatus.getReasonPhrase();
        this.message = message;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusText() {
        return statusText;
    }

    public void setStatusText(String statusText) {
        this.statusText = statusText;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

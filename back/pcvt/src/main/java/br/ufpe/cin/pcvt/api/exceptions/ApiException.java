package br.ufpe.cin.pcvt.api.exceptions;

import br.ufpe.cin.pcvt.api.models.ApiMessage;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

/**
 * @author Allan Monteiro de Lima (aml3@cin.ufpe.br)
 */
public class ApiException extends WebApplicationException {

    public ApiException(Status status, String message) {
        super(Response.status(status)
                .entity(new ApiMessage(status, message))
                .build());
    }
}

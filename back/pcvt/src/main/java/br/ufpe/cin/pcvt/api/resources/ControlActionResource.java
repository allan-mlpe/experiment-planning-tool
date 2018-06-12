package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.models.GenericListWrapper;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Path("control-actions")
public class ControlActionResource {

    @POST
    @Path("/related-threats")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getRelatedThreatsByControlActionKeys(GenericListWrapper wrapper) {

        return null;
    }

    @GET
    @Path("/related-threats/{key}")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getRelatedThreatsByControlActionKey(@PathParam("key") String key) {

        return null;
    }
}

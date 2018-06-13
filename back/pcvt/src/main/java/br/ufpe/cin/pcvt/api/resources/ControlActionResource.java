package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.controllers.ControlActionController;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.data.models.threats.Threat;

import javax.persistence.NoResultException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("control-actions")
public class ControlActionResource {

    private ControlActionController controller = ControllerFactory.createControlActionController();

    @GET
    @Path("/related-threats/{key}")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getRelatedThreatsByControlActionKey(@PathParam("key") String key) {
        try {
            List<Threat> threatsByKey = controller.getRelatedThreatsByControlActionKey(key);

            GenericEntity<List<Threat>> genericList = new GenericEntity<List<Threat>>(threatsByKey) {};
            return Response.ok(genericList).build();
        } catch (NoResultException e) {
            return Response.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }
}

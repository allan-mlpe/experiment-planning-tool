package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.GenericListWrapper;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.ThreatController;
import br.ufpe.cin.pcvt.data.models.controlactions.ControlAction;

import javax.persistence.NoResultException;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.Set;

@Path("threats")
public class ThreatResource {

    private ThreatController controller = ControllerFactory.createThreatController();

    @POST
    @Path("/related-actions")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getControlActionsByThreatByThreatKeys(GenericListWrapper wrapper) {
        try {
            Set<ControlAction> controlActions = controller.getControlActionsByKeys(wrapper.getStringList());

            GenericEntity<Set<ControlAction>> genericList = new GenericEntity<Set<ControlAction>>(controlActions) {};
            return Response.ok(genericList).build();

        } catch (NoResultException e) {
            return Response.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(javax.ws.rs.core.Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }
}

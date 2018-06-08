package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.GenericListWrapper;
import br.ufpe.cin.pcvt.controllers.CharacteristicController;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.data.models.characteristics.Characteristic;
import br.ufpe.cin.pcvt.data.models.threats.Threat;

import javax.persistence.NoResultException;
import javax.ws.rs.*;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Set;

@Path("characteristics")
public class CharacteristicResource {
    
    private CharacteristicController controller = ControllerFactory.createCharacteristicController();

    @GET
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getCharacteristics() throws ApiException {

        try {
            List<Characteristic> characteristics = controller.all();

            GenericEntity<List<Characteristic>> genericList = new GenericEntity<List<Characteristic>>(characteristics) {};
            return Response.ok(genericList).build();
         }  catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }

    @POST
    @Path("/related-threats")
    @Produces(APIConstants.APPLICATION_JSON)
    @Consumes(APIConstants.APPLICATION_JSON)
    public Response getThreatsByCharacteristicKeys(GenericListWrapper wrapper) throws ApiException {
        try {
            Set<Threat> threatsByKey = controller.getThreatsByKey(wrapper.getStringList());

            GenericEntity<Set<Threat>> genericList = new GenericEntity<Set<Threat>>(threatsByKey) {};
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

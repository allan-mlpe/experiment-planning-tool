package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.models.GenericListWrapper;
import br.ufpe.cin.pcvt.controllers.CharacteristicController;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.data.models.characteristics.Characteristic;
import br.ufpe.cin.pcvt.data.models.threats.Threat;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Set;

@Path("characteristics")
public class CharacteristicResource {
    
    private CharacteristicController controller = ControllerFactory.createCharacteristicController();

    @GET
    public Response getCharacteristics() {
        List<Characteristic> characteristics = controller.all();

        GenericEntity<List<Characteristic>> genericList = new GenericEntity<List<Characteristic>>(characteristics) {};
        return Response.ok(genericList).build();
    }

    @POST
    @Path("/related-threats")
    public Response getThreatsByCharacteristicKeys(GenericListWrapper wrapper) {
        Set<Threat> threatsByKey = controller.getThreatsByKey(wrapper.getStringList());

        GenericEntity<Set<Threat>> genericList = new GenericEntity<Set<Threat>>(threatsByKey) {};
        return Response.ok(genericList).build();
    }
}

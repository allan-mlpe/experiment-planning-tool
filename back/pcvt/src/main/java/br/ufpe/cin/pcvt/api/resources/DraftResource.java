package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.converters.ExperimentalDraftVOConverter;
import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.ExperimentalDraftVO;
import br.ufpe.cin.pcvt.api.security.SecureEndpoint;
import br.ufpe.cin.pcvt.api.utils.RequestContextUtils;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.DraftController;
import br.ufpe.cin.pcvt.data.models.experiments.Draft;
import br.ufpe.cin.pcvt.data.models.experiments.EDraftType;
import br.ufpe.cin.pcvt.data.models.user.User;

import javax.ws.rs.*;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@SecureEndpoint
@Path("drafts")
public class DraftResource {

    private DraftController controller = ControllerFactory.createDraftController();

    @GET
    @Path("/{id}")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getDraft(@PathParam("id") Integer draftId, @Context ContainerRequestContext req) throws ApiException {
        try {
            Draft draft = controller.get(draftId);

            if(draft == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental draft not found");

            checkPermission(draft, req);

            ExperimentalDraftVO draftVO = ExperimentalDraftVOConverter.getInstance()
                    .convertToVO(draft);

            return Response.ok(draftVO).build();

        } catch (ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to get the draft");
        }
    }

    @GET
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getDraftsByAuthor(@Context ContainerRequestContext req) throws ApiException{
        try {
            User user = RequestContextUtils.extractUser(req);

            List<Draft> drafts = controller.retrieveByAuthor(user);

            List<ExperimentalDraftVO> draftVOS = drafts.stream().map(
                    draft -> ExperimentalDraftVOConverter.getInstance()
                                .convertToVO(draft)
            ).collect(Collectors.toList());

            GenericEntity<List<ExperimentalDraftVO>> genericList = new GenericEntity<List<ExperimentalDraftVO>>(draftVOS) {};

            return Response.ok(genericList).build();

        } catch (ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to get the drafts");
        }
    }

    @POST
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response saveSimpleDraft(ExperimentalDraftVO draftVO, @Context ContainerRequestContext req) throws ApiException {
        try {
            Draft draft = ExperimentalDraftVOConverter.getInstance().convertToSimpleDraft(draftVO);
            User user = RequestContextUtils.extractUser(req);

            Draft insertedDraft = controller.insert(draft, user.getId());

            draftVO.setId(insertedDraft.getId());

            return Response.ok(draftVO).build();

        } catch (ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to save the draft");
        }
    }

    @POST
    @Path("full")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response saveFullDraft(ExperimentalDraftVO draftVO, @Context ContainerRequestContext req) {
        try {
            Draft draft = ExperimentalDraftVOConverter.getInstance().convertToFullDraft(draftVO);
            User user = RequestContextUtils.extractUser(req);

            Draft insertedDraft = controller.insert(draft, user.getId());

            draftVO.setId(insertedDraft.getId());

            return Response.ok(draftVO).build();

        } catch (ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to save the draft");
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response updateDraft(@PathParam("id") Integer id, @Context ContainerRequestContext req, ExperimentalDraftVO draftVO) {
        try {
            Draft draft = controller.get(id);

            if(draft == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental draft not found");

            checkPermission(draft, req);

            draft.setName(draftVO.getName());
            draft.setDescription(draftVO.getDescription());

            controller.update(draft);

            return Response.ok(draftVO).build();

        } catch (ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the draft");
        }
    }

    @DELETE
    @Path("/{id}")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response deleteDraft(@PathParam("id") Integer id, @Context ContainerRequestContext req) throws ApiException {
        try {
            Draft draft = controller.get(id);

            if(draft == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental draft not found");

            checkPermission(draft, req);

            controller.remove(draft.getId());

            return Response.noContent().build();

        } catch (ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to delete the draft");
        }
    }

    @PUT
    @Path("/{id}/characteristics")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response saveDraftCharacteristics(@PathParam("id") Integer id, @Context ContainerRequestContext req, ExperimentalDraftVO draftVO) {
        try {
            Draft draft = controller.get(id);

            if(draft == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental draft not found");

            checkPermission(draft, req);

            draft.setCharacteristics(draftVO.getCharacteristics());

            controller.update(draft);

            return Response.ok(draftVO).build();
        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the draft");
        }
    }

    @PUT
    @Path("/{id}/threats")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response saveDraftThreats(@PathParam("id") Integer id, @Context ContainerRequestContext req, ExperimentalDraftVO draftVO) {
        try {
            Draft draft = controller.get(id);

            if(draft == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental draft not found");

            if(draft.getDraftType() == EDraftType.SIMPLE)
                throw new ApiException(Response.Status.BAD_REQUEST,
                        "It is not possible to set threats for a simple draft");

            checkPermission(draft, req);

            draft.setThreats(draftVO.getThreats());
            draft.setCustomThreats(draftVO.getCustomThreats());

            controller.update(draft);

            return Response.ok(draftVO).build();
        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the draft");
        }
    }

    @PUT
    @Path("/{id}/control-actions")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response saveDraftActions(@PathParam("id") Integer id, @Context ContainerRequestContext req, ExperimentalDraftVO draftVO) {
        try {
            Draft draft = controller.get(id);

            if(draft == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental draft not found");

            if(draft.getDraftType() == EDraftType.SIMPLE)
                throw new ApiException(Response.Status.BAD_REQUEST,
                        "It is not possible to set control actions for a simple draft");

            checkPermission(draft, req);

            draft.setActions(draftVO.getActions());
            draft.setCustomThreats(draftVO.getCustomThreats());

            controller.update(draft);

            return Response.ok(draftVO).build();
        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the draft");
        }
    }

    @PUT
    @Path("/{id}/generated-threats")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response saveDraftGeneratedThreats(@PathParam("id") Integer id, @Context ContainerRequestContext req, ExperimentalDraftVO draftVO) {
        try {
            Draft draft = controller.get(id);

            if(draft == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental draft not found");

            if(draft.getDraftType() == EDraftType.SIMPLE)
                throw new ApiException(Response.Status.BAD_REQUEST,
                        "It is not possible to set action related threats for a simple draft");

            checkPermission(draft, req);

            draft.setActionRelatedThreats(draftVO.getActionRelatedThreats());

            controller.update(draft);

            return Response.ok(draftVO).build();
        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the draft");
        }
    }

    private static void checkPermission(Draft draft, ContainerRequestContext req) throws ApiException {
        User user = RequestContextUtils.extractUser(req);

        if(user.compareTo(draft.getAuthor()) != 0)
            throw new ApiException(Response.Status.FORBIDDEN,
                    "You don't have permission to access this experimental draft");
    }

}

package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.converters.ExperimentalPlanVOConverter;
import br.ufpe.cin.pcvt.api.converters.ReviewVOConverter;
import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.ExperimentalPlanVO;
import br.ufpe.cin.pcvt.api.models.ReviewVO;
import br.ufpe.cin.pcvt.api.security.SecureEndpoint;
import br.ufpe.cin.pcvt.api.utils.JsonUtils;
import br.ufpe.cin.pcvt.api.utils.PdfGenerator;
import br.ufpe.cin.pcvt.api.utils.RequestContextUtils;
import br.ufpe.cin.pcvt.business.experiments.plan.state.exception.InvalidPlanStateTransitionException;
import br.ufpe.cin.pcvt.controllers.CharacteristicController;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.PlanController;
import br.ufpe.cin.pcvt.controllers.UserController;
import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.threats.Threat;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.exceptions.entities.experiments.plan.PlanAlreadyHasChildException;
import org.apache.commons.io.IOUtils;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.*;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.*;
import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@SecureEndpoint
@Path("plans")
public class ExperimentalPlanResource {

    private static final Long MAX_FILE_SIZE = 5120000L;

    private PlanController experimentalPlanController =
            ControllerFactory.createPlanController();

    private CharacteristicController characteristicController =
            ControllerFactory.createCharacteristicController();

    private UserController userController =
            ControllerFactory.createUserController();

    @POST
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response saveExperimentalPlan(ExperimentalPlanVO planVO, @Context ContainerRequestContext req) throws ApiException {
        Plan plan;
        try {
            plan = new Plan();
            plan.setName(planVO.getName());
            plan.setDescription(planVO.getDescription());
            plan.setDetails(planVO.getDetails());
            plan.setCharacteristics(planVO.getCharacteristics());


            Set<User> userSet = planVO.getCollaborators().stream()
                    .map(userVO -> userController.get(userVO.getId()))
                    .collect(Collectors.toSet());

            plan.setCollaborators(new TreeSet<User>(userSet));

        } catch(Exception e) {
            throw new ApiException(Response.Status.BAD_REQUEST,
                    "Bad request.");
        }

        try {
            // get user from request
            User user = RequestContextUtils.extractUser(req);

            Plan insertedPlan = experimentalPlanController.insert(plan, user.getId());

            ExperimentalPlanVO convertedPlan = ExperimentalPlanVOConverter
                    .getInstance().convertToVO(insertedPlan);

            return Response.ok(convertedPlan).build();

        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to save the experimental plan.");
        }
    }

    @POST
    @Path("custom")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response createCustomPlan(@FormDataParam("file") InputStream file,
                                     @FormDataParam("file") FormDataContentDisposition fileDetails,
                                     @FormDataParam("name") String name,
                                     @FormDataParam("description") String description,
                                     @FormDataParam("details") String details,
                                     @Context ContainerRequestContext req) throws ApiException {

        try {
            byte[] bytes = IOUtils.toByteArray(file);

            if(bytes.length > MAX_FILE_SIZE)
                throw new ApiException(Response.Status.BAD_REQUEST,
                        "Too large file");

            Plan plan = new Plan();
            plan.setName(name);
            plan.setDescription(description);
            plan.setFile(bytes);
            plan.setFilename(fileDetails.getFileName());
            plan.setCustomPlan(true);

            User user = RequestContextUtils.extractUser(req);

            Plan insertedPlan = experimentalPlanController.insert(plan, user.getId());
            experimentalPlanController.moveToReadyToReview(insertedPlan);

            ExperimentalPlanVO planVO = ExperimentalPlanVOConverter
                    .getInstance().convertToVO(insertedPlan);

            return Response.ok(planVO).build();
        } catch (InvalidPlanStateTransitionException e) {
            throw new ApiException(Response.Status.BAD_REQUEST,
                    e.getMessage());
        } catch (ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to save the experimental plan.");
        }
    }

    @POST
    @Path("/{id}")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response createNewVersion(@PathParam("id") Integer id, @Context ContainerRequestContext req){
        try {
            Plan plan = experimentalPlanController.get(id);
            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            checkPermission(plan, req);

            Plan newVersion = experimentalPlanController.createChild(id);

            ExperimentalPlanVO newVersionVO = ExperimentalPlanVOConverter.getInstance()
                    .convertToVO(newVersion);

            return Response.ok(newVersionVO).build();

        } catch(PlanAlreadyHasChildException e) {
            throw new ApiException(Response.Status.BAD_REQUEST, e.getMessage());

        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the plan");
        }
    }

    @GET
    @Path("/{id}/reviews")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getExperimentalPlansReviews(@PathParam("id") Integer planId, @Context ContainerRequestContext req) throws ApiException {
        try {
            User user = RequestContextUtils.extractUser(req);

            Plan plan = experimentalPlanController.get(planId);

            List<ReviewVO> reviewVOS = plan.getReviews().stream()
                    .map(review -> ReviewVOConverter.getInstance()
                            .convertToVO(review)
                    ).collect(Collectors.toList());

            GenericEntity<List<ReviewVO>> genericList = new GenericEntity<List<ReviewVO>>(reviewVOS) {};
            return Response.ok(genericList).build();

        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error.");
        }
    }

    @GET
    @Path("{id}/file")
    @Produces({APIConstants.APPLICATION_JSON, MediaType.APPLICATION_OCTET_STREAM})
    public Response getPlanFile(@PathParam("id") Integer planId, @Context ContainerRequestContext req) throws ApiException{
        try {
            Plan plan = experimentalPlanController.get(planId);
            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            if(!plan.isCustomPlan())
                throw new ApiException(Response.Status.BAD_REQUEST,
                        "This plan have no an associated file");

            //File f = new File(String.format("%s/%s/%s", plan.getAuthor().getName(), plan.getName(), plan.getFilename()));
            //FileUtils.writeByteArrayToFile(f, plan.getFile());

            //Response.ResponseBuilder rb = Response.ok(f);
            //rb.header("Content-Disposition", "attachment; filename=\"" + plan.getFilename() + "\"");

            //return rb.build();
            InputStream responseStream = new ByteArrayInputStream(plan.getFile());

            StreamingOutput output = new StreamingOutput() {
                @Override
                public void write(OutputStream out) throws IOException, WebApplicationException {
                    int length;
                    byte[] buffer = new byte[1024];
                    while((length = responseStream.read(buffer)) != -1) {
                        out.write(buffer, 0, length);
                    }
                    out.flush();
                    responseStream.close();
                }
            };
            return Response.ok(output, MediaType.APPLICATION_OCTET_STREAM).header("Content-Disposition", "attachment; filename=" + plan.getFilename()).build();

        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to get the file");
        }
    }

    @GET
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getExperimentalPlansByAuthor(@Context ContainerRequestContext req, @QueryParam("state") String state) throws ApiException {
        try {
            User user = RequestContextUtils.extractUser(req);

            List<Plan> plans = experimentalPlanController.retrieveByAuthor(user);

            if(state != null) {
                switch (state) {
                    case "planning":
                        plans.removeIf(p -> p.getState() != EPlanState.Planning);
                        break;
                    case "ready":
                        plans.removeIf(p -> p.getState() != EPlanState.ReadyToReview);
                        break;
                    case "reviewing":
                        plans.removeIf(p -> p.getState() != EPlanState.Reviewing);
                        break;
                    case "completed":
                        plans.removeIf(p -> p.getState() != EPlanState.Completed);
                        break;
                    case "archived":
                        plans.removeIf(p -> !p.isArchived());
                        break;
                    case "active":
                        plans.removeIf(p ->
                                p.isArchived()
                                || p.getState() == EPlanState.Reviewing
                                || p.getState() == EPlanState.ReadyToReview
                                || p.getState() == EPlanState.WaitingReview
                                || p.getState() == EPlanState.PartiallyCompleted);
                        break;
                    case "review":
                        plans.removeIf(p->
                            p.getState() != EPlanState.Reviewing
                            && p.getState() != EPlanState.ReadyToReview
                            && p.getState() != EPlanState.WaitingReview
                            && p.getState() != EPlanState.PartiallyCompleted
                        );
                    default:
                        plans.removeIf(p -> p.isArchived());
                        break;
                }
            }

            List<ExperimentalPlanVO> plansVOS = new ArrayList<>();
            plans.forEach(plan -> {
                ExperimentalPlanVO planVO =
                        ExperimentalPlanVOConverter.getInstance().convertToVO(plan);

                plansVOS.add(planVO);

            });

            GenericEntity<List<ExperimentalPlanVO>> genericList = new GenericEntity<List<ExperimentalPlanVO>>(plansVOS) {};

            return Response.ok(genericList).build();
        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to retrieve experimental plans.");
        }
    }

    @GET
    @Path("/{id}")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getExperimentalPlan(@PathParam("id") Integer id, @Context ContainerRequestContext req) throws ApiException {
        try {
            Plan plan = experimentalPlanController.get(id);
            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            checkPermission(plan, req);

            ExperimentalPlanVO planVO = ExperimentalPlanVOConverter.getInstance().convertToVO(plan);

            return Response.ok(planVO).build();
        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to retrieve the plan");
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response updateExperimentalPlan(@PathParam("id") Integer id, @Context ContainerRequestContext req, ExperimentalPlanVO planVO) {
        try {
            Plan plan = experimentalPlanController.get(id);
            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            checkPermission(plan, req);

            plan.setName(planVO.getName());
            plan.setDescription(planVO.getDescription());
            plan.setDetails(planVO.getDetails());
            plan.setCharacteristics(planVO.getCharacteristics());

            experimentalPlanController.update(plan);

            return Response.ok(planVO).build();

        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the plan");
        }
    }

    @DELETE
    @Path("/{id}")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response deleteExperimentalPlan(@PathParam("id") Integer id, @Context ContainerRequestContext req) throws ApiException {
        try {
            Plan plan = experimentalPlanController.get(id);

            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            checkPermission(plan, req);

            experimentalPlanController.remove(plan.getId());

            return Response.noContent().build();
        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to remove the plan");
        }
    }

    @PUT
    @Path("/{id}/status")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response changeToReadyToReview(@PathParam("id") Integer planId, ExperimentalPlanVO planVO, @Context ContainerRequestContext req) throws ApiException {
        try {
            Plan plan = experimentalPlanController.get(planId);

            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            checkPermission(plan, req);
            EPlanState state = planVO.getState();

            switch (state) {
                case ReadyToReview:
                    experimentalPlanController.moveToReadyToReview(plan);
                    break;
                case WaitingReview:
                    experimentalPlanController.moveToWaitingReview(plan);
                    break;
                case Reviewing:
                    experimentalPlanController.moveToReviewing(plan);
                    break;
                case PartiallyCompleted:
                    experimentalPlanController.moveToPartiallyCompleted(plan);
                    break;
                case Refused:
                    experimentalPlanController.moveToRefused(plan);
                    break;
                case Completed:
                    experimentalPlanController.moveToCompleted(plan);
                    break;
                case Canceled:
                    experimentalPlanController.moveToCanceled(plan);
                    break;
                case Expired:
                    experimentalPlanController.moveToExpired(plan);
                    break;
                default:
                    throw new ApiException(Response.Status.BAD_REQUEST,
                            "Bad request. Invalid plan state");
            }

            return Response.ok(planVO).build();

        } catch(ApiException e) {
            throw e;
        } catch (InvalidPlanStateTransitionException e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.BAD_REQUEST,
                    "Bad request. Illegal plan state transition");
        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the plan state");
        }
    }

    @POST
    @Path("/{id}/characteristics")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response savePlanCharacteristics(@PathParam("id") Integer id, @Context ContainerRequestContext req, ExperimentalPlanVO planVO) {
        try {
            Plan plan = experimentalPlanController.get(id);
            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            checkPermission(plan, req);

            plan.setCharacteristics(planVO.getCharacteristics());

            experimentalPlanController.update(plan);

            return Response.ok(planVO).build();

        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the plan");
        }
    }

    @POST
    @Path("/{id}/threats")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response savePlanThreats(@PathParam("id") Integer id, @Context ContainerRequestContext req, ExperimentalPlanVO planVO) {
        try {
            Plan plan = experimentalPlanController.get(id);
            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            checkPermission(plan, req);

            plan.setThreats(planVO.getThreats());
            plan.setCustomThreats(planVO.getCustomThreats());
            experimentalPlanController.update(plan);

            return Response.ok(planVO).build();
        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the plan");
        }
    }

    @POST
    @Path("/{id}/control-actions")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response savePlanControlActions(@PathParam("id") Integer id, @Context ContainerRequestContext req, ExperimentalPlanVO planVO) {
        try {
            Plan plan = experimentalPlanController.get(id);
            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            checkPermission(plan, req);

            plan.setActions(planVO.getActions());
            plan.setActionRelatedThreats(planVO.getActionRelatedThreats());
            plan.setCustomThreats(planVO.getCustomThreats());
            experimentalPlanController.update(plan);

            return Response.ok(planVO).build();
        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the plan");
        }
    }

    @POST
    @Path("/{id}/generated-threats")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response savePlanGeneratedThreats(@PathParam("id") Integer id, @Context ContainerRequestContext req, ExperimentalPlanVO planVO) {
        try {
            Plan plan = experimentalPlanController.get(id);
            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            checkPermission(plan, req);

            plan.setActionRelatedThreats(planVO.getActionRelatedThreats());
            experimentalPlanController.update(plan);

            return Response.ok(planVO).build();
        } catch(ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the plan");
        }
    }

    @PUT
    @Path("/{id}/archive")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response archivePlan(@PathParam("id") Integer id, @Context ContainerRequestContext req, ExperimentalPlanVO planVO) throws ApiException {
        try {
            Plan plan = experimentalPlanController.get(id);
            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            checkPermission(plan, req);

            experimentalPlanController.archive(id);
            planVO.setArchived(true);

            return Response.ok(planVO).build();
        } catch(ApiException e) {
            throw e;
        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the plan");
        }
    }

    @PUT
    @Path("/{id}/unarchive")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response unarchivePlan(@PathParam("id") Integer id, @Context ContainerRequestContext req, ExperimentalPlanVO planVO) throws ApiException {
        try {
            Plan plan = experimentalPlanController.get(id);
            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            checkPermission(plan, req);

            experimentalPlanController.unarchive(id);
            planVO.setArchived(false);

            return Response.ok(planVO).build();
        } catch(ApiException e) {
            throw e;
        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update the plan");
        }
    }

    @GET
    @Path("download-report/{id}")
    @Produces({APIConstants.APPLICATION_JSON, MediaType.APPLICATION_OCTET_STREAM})
    public Response generateReport(@PathParam("id") Integer id, @Context ContainerRequestContext req) throws ApiException {
        try {
            Plan plan = experimentalPlanController.get(id);
            if(plan == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        "Experimental plan not found");

            checkPermission(plan, req);

            Map<String, List<Threat>> groupedThreats = groupThreatsByType(plan);

            ByteArrayOutputStream byteArrayOutputStream = PdfGenerator.generatePlanReport(plan, groupedThreats);


            StreamingOutput output = new StreamingOutput() {
                @Override
                public void write(OutputStream out) throws IOException, WebApplicationException {
                    byteArrayOutputStream.writeTo(out);
                    out.flush();
                    byteArrayOutputStream.close();
                }
            };
            return Response.ok(output, MediaType.APPLICATION_OCTET_STREAM).header("Content-Disposition", "attachment; filename=" + String.format(plan.getName()+".pdf")).build();

        } catch(ApiException e) {
            throw e;
        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to download this plan");
        }
    }

    private Collection<Threat> getSuggestedThreats(String characteristics) throws ApiException{

        try {
            Map<String, String> characteristicsMap = JsonUtils.parseToSimpleMap(characteristics);
            List<String> positiveCharacteristicsKeys = characteristicsMap.keySet().stream()
                    .filter(key ->
                            characteristicsMap.get(key).equals("YES")
                                    || characteristicsMap.get(key).equals("PARTIALLY")
                    )
                    .collect(Collectors.toList());

            Set<Threat> threatsByKey = characteristicController.getThreatsByKey(positiveCharacteristicsKeys);
            return threatsByKey;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Error generating the threats list of this report");
        }
    }

    private Map<String, List<Threat>> groupThreatsByType(Plan plan) {
        Collection<Threat> threats = getSuggestedThreats(plan.getCharacteristics());

        Map<String, List<Threat>> groupedThreats =
                new HashMap<>();

        for(Threat threat : threats) {
            String threatType = threat.getType().getName();
            if(groupedThreats.containsKey(threatType)) {
                List<Threat> threatsArrayList = groupedThreats.get(threatType);
                threatsArrayList.add(threat);

            } else {
               ArrayList<Threat> threatArrayList = new ArrayList<>();
               threatArrayList.add(threat);

               groupedThreats.put(threatType, threatArrayList);
            }
        }

        return groupedThreats;
    }

    private static void checkPermission(Plan plan, ContainerRequestContext req) throws ApiException {
        User user = RequestContextUtils.extractUser(req);

        if(user.compareTo(plan.getAuthor()) != 0)
            throw new ApiException(Response.Status.FORBIDDEN,
                    "You don't have permission to access this plan");
    }
}
package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.converters.ExperimentalPlanVOConverter;
import br.ufpe.cin.pcvt.api.converters.ReviewVOConverter;
import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.ExperimentalPlanVO;
import br.ufpe.cin.pcvt.api.models.ReviewVO;
import br.ufpe.cin.pcvt.api.security.SecureEndpoint;
import br.ufpe.cin.pcvt.api.utils.RequestContextUtils;
import br.ufpe.cin.pcvt.business.experiments.plan.state.exception.InvalidPlanStateTransitionException;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.PlanController;
import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.user.User;

import javax.ws.rs.*;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@SecureEndpoint
@Path("plans")
public class ExperimentalPlanResource {

    private PlanController experimentalPlanController =
            ControllerFactory.createPlanController();

    @POST
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response saveExperimentalPlan(ExperimentalPlanVO planVO, @Context ContainerRequestContext req) throws ApiException {
        Plan plan;
        try {
            plan = new Plan();
            plan.setName(planVO.getName());
            plan.setDescription(planVO.getDescription());
            plan.setPlanDetails(planVO.getPlanDetails());
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
                    default:
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
            plan.setPlanDetails(planVO.getPlanDetails());

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

            plan.setPlanCharacteristics(planVO.getPlanCharacteristics());

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

            plan.setPlanThreats(planVO.getPlanThreats());
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

            plan.setPlanActions(planVO.getPlanActions());
            plan.setPlanActionRelatedThreats(planVO.getPlanActionRelatedThreats());
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

            plan.setPlanActionRelatedThreats(planVO.getPlanActionRelatedThreats());
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

    private static void checkPermission(Plan plan, ContainerRequestContext req) throws ApiException {
        User user = RequestContextUtils.extractUser(req);

        if(user.compareTo(plan.getAuthor()) != 0)
            throw new ApiException(Response.Status.FORBIDDEN,
                    "You don't have permission to access this plan");
    }
}
package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.converters.ExperimentalPlanVOConverter;
import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.ApiMessage;
import br.ufpe.cin.pcvt.api.models.ExperimentalPlanVO;
import br.ufpe.cin.pcvt.api.security.SecureEndpoint;
import br.ufpe.cin.pcvt.api.utils.RequestContextUtils;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.PlanController;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.user.User;

import javax.ws.rs.*;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

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
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getExperimentalPlansByAuthor(@Context ContainerRequestContext req) throws ApiException {
        try {
            User user = RequestContextUtils.extractUser(req);

            List<Plan> plans = experimentalPlanController.retrieveByAuthor(user);
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
    public Response getExperimentalPlan() {
        return null;
    }

    @PUT
    @Path("/{id}")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response updateExperimentalPlan() {
        return null;
    }

    @DELETE
    @Path("/{id}")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response deleteExperimentalPlan() {
        return null;
    }
}

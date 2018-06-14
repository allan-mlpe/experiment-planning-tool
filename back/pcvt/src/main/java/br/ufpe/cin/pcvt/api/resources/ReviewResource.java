package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.ApiMessage;
import br.ufpe.cin.pcvt.api.models.ReviewWrapper;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.PlanController;
import br.ufpe.cin.pcvt.controllers.ReviewController;
import br.ufpe.cin.pcvt.controllers.UserController;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.user.User;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@Path("reviews")
public class ReviewResource {

    private ReviewController reviewController = ControllerFactory.createReviewController();
    private UserController userController = ControllerFactory.createUserController();
    private PlanController planController = ControllerFactory.createPlanController();

    @POST
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response saveReview(ReviewWrapper reviewWrapper) throws ApiException {
        try {
            Plan plan = planController.get(reviewWrapper.getPlan().getId());
            List<User> userList = reviewWrapper.getReviewers().stream()
                    .map(userVO -> userController.get(userVO.getId()))
                    .collect(Collectors.toList());

            reviewController.createReview(plan, userList, reviewWrapper.getDate());

            ApiMessage message = new ApiMessage(Response.Status.OK,
                    "Review successfully created");

            return Response.ok(message).build();

        } catch (ApiException e) {
            throw e;
        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }
}

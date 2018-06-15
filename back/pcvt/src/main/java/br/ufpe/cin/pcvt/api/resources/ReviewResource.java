package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.converters.ExperimentalPlanVOConverter;
import br.ufpe.cin.pcvt.api.converters.ReviewVOConverter;
import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.ApiMessage;
import br.ufpe.cin.pcvt.api.models.ExperimentalPlanVO;
import br.ufpe.cin.pcvt.api.models.ReviewVO;
import br.ufpe.cin.pcvt.api.models.ReviewWrapper;
import br.ufpe.cin.pcvt.api.security.SecureEndpoint;
import br.ufpe.cin.pcvt.api.utils.RequestContextUtils;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.PlanController;
import br.ufpe.cin.pcvt.controllers.ReviewController;
import br.ufpe.cin.pcvt.controllers.UserController;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.experiments.Review;
import br.ufpe.cin.pcvt.data.models.user.User;

import javax.ws.rs.*;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@SecureEndpoint
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
    
    @GET
    @Produces(APIConstants.APPLICATION_JSON)
    public Response loadReviews(@Context ContainerRequestContext req) throws ApiException {
        try {
            User user = RequestContextUtils.extractUser(req);
            List<Review> reviews = reviewController.retrieveByReviewer(user);

            List<ReviewVO> reviewVOS =
                    reviews.stream().map(review ->
                        ReviewVOConverter.getInstance().convertToVO(review)
                    ).collect(Collectors.toList());

            /*List<ExperimentalPlanVO> plans =
                    reviews.stream().map(review ->
                        ExperimentalPlanVOConverter.getInstance()
                                .convertToVO(review.getPlan()
                    )).collect(Collectors.toList());*/

            GenericEntity<List<ReviewVO>> genericList = new GenericEntity<List<ReviewVO>>(reviewVOS) {};

            return Response.ok(genericList).build();

        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error.");
        }

    }
}

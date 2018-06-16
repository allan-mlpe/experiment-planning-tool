package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.converters.ReviewVOConverter;
import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.ApiMessage;
import br.ufpe.cin.pcvt.api.models.ReviewVO;
import br.ufpe.cin.pcvt.api.models.ReviewWrapper;
import br.ufpe.cin.pcvt.api.security.SecureEndpoint;
import br.ufpe.cin.pcvt.api.utils.RequestContextUtils;
import br.ufpe.cin.pcvt.business.experiments.review.state.exception.InvalidReviewStateTransitionException;
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

            GenericEntity<List<ReviewVO>> genericList = new GenericEntity<List<ReviewVO>>(reviewVOS) {};
            return Response.ok(genericList).build();

        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error.");
        }
    }

    @GET
    @Path("/{id}")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getReviewById(@PathParam("id") Integer reviewId, @Context ContainerRequestContext req) throws ApiException {
        try {
            Review review = reviewController.get(reviewId);
            if(review == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        String.format("Review '%d' does not exist", reviewId));

            checkPermission(req, review);

            ReviewVO reviewVO = ReviewVOConverter.getInstance()
                    .convertToVO(review);

            return Response.ok(reviewVO).build();
        } catch(ApiException e) {
            throw e;
        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error.");
        }
    }

    @PUT
    @Path("/{id}/accept")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response acceptReviewRequest(@PathParam("id") Integer reviewId, @Context ContainerRequestContext req) throws ApiException {
        try {
            Review review = reviewController.get(reviewId);
            if(review == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        String.format("Review '%d' does not exist", reviewId));

            checkPermission(req, review);
            Review updatedReview = reviewController.moveToReviewing(review);

            ReviewVO reviewVO = ReviewVOConverter.getInstance()
                    .convertToVO(updatedReview);

            return Response.ok(reviewVO).build();

        } catch(ApiException e) {
            throw e;
        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error.");
        }
    }

    @PUT
    @Path("/{id}/refuse")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response refuseReviewRequest(@PathParam("id") Integer reviewId, @Context ContainerRequestContext req) throws ApiException {
        try {
            Review review = reviewController.get(reviewId);
            if(review == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        String.format("Review '%d' does not exist", reviewId));

            checkPermission(req, review);
            Review updatedReview = reviewController.moveToRefused(review);

            ReviewVO reviewVO = ReviewVOConverter.getInstance()
                    .convertToVO(updatedReview);

            return Response.ok(reviewVO).build();

        } catch(ApiException e) {
            throw e;
        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error.");
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response updateReview(ReviewVO reviewVO, @Context ContainerRequestContext req) throws ApiException {
        try {
            Review review = reviewController.get(reviewVO.getId());
            if(review == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        String.format("Review '%d' does not exist", reviewVO.getId()));

            checkPermission(req, review);
            review.setReviewItems(reviewVO.getReviewItems());

            Review updatedReview = reviewController.update(review);
            return Response.ok(reviewVO).build();

        } catch(ApiException e) {
            throw e;
        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error.");
        }
    }

    @PUT
    @Path("/{id}/complete")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response completeReview(ReviewVO reviewVO, @Context ContainerRequestContext req) throws ApiException {
        try {
            Review review = reviewController.get(reviewVO.getId());
            if(review == null)
                throw new ApiException(Response.Status.NOT_FOUND,
                        String.format("Review '%d' does not exist", reviewVO.getId()));

            checkPermission(req, review);
            review.setReviewItems(reviewVO.getReviewItems());

            // update review
            reviewController.update(review);

            // change review state
            try {
                reviewController.moveToCompleted(review);
            } catch (InvalidReviewStateTransitionException e) {
                throw new ApiException(Response.Status.BAD_REQUEST,
                        e.getMessage());
            }

            return Response.ok(reviewVO).build();

        } catch(ApiException e) {
            throw e;
        } catch(Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error.");
        }
    }

    private static void checkPermission(ContainerRequestContext req, Review review) {
        User user = RequestContextUtils.extractUser(req);
        if(!user.equals(review.getReviewer()))
            throw  new ApiException(Response.Status.FORBIDDEN,
                    "You do not have permission to update this review");
    }
}

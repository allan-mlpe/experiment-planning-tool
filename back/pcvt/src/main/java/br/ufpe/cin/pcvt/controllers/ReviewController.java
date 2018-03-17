package br.ufpe.cin.pcvt.controllers;

import br.ufpe.cin.pcvt.business.experiments.plan.state.exception.InvalidPlanStateTransitionException;
import br.ufpe.cin.pcvt.business.experiments.review.state.ReviewStateTransitionStrategy;
import br.ufpe.cin.pcvt.business.experiments.review.state.ReviewTransitionStrategyFactory;
import br.ufpe.cin.pcvt.business.experiments.review.state.exception.InvalidReviewStateTransitionException;
import br.ufpe.cin.pcvt.data.models.experiments.EReviewState;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.experiments.Review;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.repositories.IReviewRepository;
import br.ufpe.cin.pcvt.data.repositories.IUserRepository;
import br.ufpe.cin.pcvt.data.repositories.RepositoryFactory;

import java.util.Date;
import java.util.List;

public class ReviewController {

	private IReviewRepository reviewRepository;
	private IUserRepository userRepository;
	private PlanController planController;

	protected ReviewController() {
		reviewRepository = RepositoryFactory.createReviewRepository();
		userRepository = RepositoryFactory.createUserRepository();
		planController = ControllerFactory.createPlanController();
	}

	public Review insert(Review review) {
		return reviewRepository.insert(review);
	}

	public Review get(Integer key) {
		return reviewRepository.get(key);
	}

	public void remove(Integer key) {
		reviewRepository.remove(key);
	}

	public Review update(Review review) {
		return reviewRepository.update(review);
	}

	public List<Review> all() {
		return reviewRepository.all();
	}

	public List<Review> retrieveByReviewer(User user) {
		return reviewRepository.retrieveByReviewer(user);
	}

	@SuppressWarnings("deprecation")
	public Plan createReview(Plan plan, List<User> reviewers, Date date) {

		date.setHours(23);
		date.setMinutes(59);
		date.setSeconds(59);
		
		try {
			
			for(User reviewer : reviewers)
			{
				Review review = new Review();
				review.setPlan(plan);
				review.setReviewer(reviewer);
				review = reviewRepository.insert(review);
				
				reviewer = userRepository.update(reviewer);
				plan.getReviews().add(review);
			}
			plan.setDate(date);
			
			planController.moveToWaitingReview(plan);
			
			plan = planController.update(plan);			


		} catch (InvalidPlanStateTransitionException e) {
			e.printStackTrace();
		}

		return plan;
	}

	private Review changeState(Review review, EReviewState intendedState) throws InvalidReviewStateTransitionException {
		review = reviewRepository.get(review.getId());
		ReviewStateTransitionStrategy transitionStrategy = ReviewTransitionStrategyFactory.create(review, intendedState);
		review = transitionStrategy.execute();
		review.setState(intendedState);
		review = reviewRepository.update(review);
		
		planController.refreshReviewState(review.getPlan());
		
		return review;
	}

	public Review moveToReviewing(Review review) throws InvalidReviewStateTransitionException {
		return changeState(review, EReviewState.Reviewing);
	}

	public Review moveToRefused(Review review) throws InvalidReviewStateTransitionException {
		return changeState(review, EReviewState.Refused);
	}

	public Review moveToCanceled(Review review) throws InvalidReviewStateTransitionException {
		return changeState(review, EReviewState.Canceled);
	}

	public Review moveToExpired(Review review) throws InvalidReviewStateTransitionException {
		return changeState(review, EReviewState.Expired);
	}

	public Review moveToCompleted(Review review) throws InvalidReviewStateTransitionException {
		return  changeState(review, EReviewState.Completed);
	}
}

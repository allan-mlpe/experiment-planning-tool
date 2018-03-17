package br.ufpe.cin.pcvt.business.experiments.review.state;

import br.ufpe.cin.pcvt.business.experiments.review.state.exception.InvalidReviewStateTransitionException;
import br.ufpe.cin.pcvt.data.models.experiments.EReviewState;
import br.ufpe.cin.pcvt.data.models.experiments.Review;

public abstract class ReviewStateTransitionStrategy {

	private Review review;
	private EReviewState intendedState;

	public Review execute() throws InvalidReviewStateTransitionException {
		if (validateCurrentState()) {
			modifyState();
			afterTransitionAction();
		} else {
			throw new InvalidReviewStateTransitionException(review.getState(), intendedState);
		}
		return this.review;
	}

	public ReviewStateTransitionStrategy(Review review, EReviewState intendedState) {
		this.review = review;
		this.intendedState = intendedState;
	}

	protected abstract boolean validateCurrentState();

	private void modifyState() {
		this.review.setState(intendedState);
	}

	protected abstract void afterTransitionAction();

	protected Review getReview() {
		return review;
	}

	protected void setReview(Review plan) {
		this.review = plan;
	}
}

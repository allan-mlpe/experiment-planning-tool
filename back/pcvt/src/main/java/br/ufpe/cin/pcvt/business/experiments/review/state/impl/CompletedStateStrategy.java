package br.ufpe.cin.pcvt.business.experiments.review.state.impl;

import br.ufpe.cin.pcvt.business.experiments.review.state.ReviewStateTransitionStrategy;
import br.ufpe.cin.pcvt.data.models.experiments.EReviewState;
import br.ufpe.cin.pcvt.data.models.experiments.Review;

public class CompletedStateStrategy extends ReviewStateTransitionStrategy {

	public CompletedStateStrategy(Review review) {
		super(review, EReviewState.Completed);
	}

	@Override
	protected boolean validateCurrentState() {
		return this.getReview().getState() == EReviewState.Reviewing;
	}

	@Override
	protected void afterTransitionAction() {
		// Do nothing
	}

}

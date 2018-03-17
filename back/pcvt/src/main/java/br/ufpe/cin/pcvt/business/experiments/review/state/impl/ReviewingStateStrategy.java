package br.ufpe.cin.pcvt.business.experiments.review.state.impl;

import br.ufpe.cin.pcvt.business.experiments.review.state.ReviewStateTransitionStrategy;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.EmailController;
import br.ufpe.cin.pcvt.data.models.experiments.EReviewState;
import br.ufpe.cin.pcvt.data.models.experiments.Review;

public class ReviewingStateStrategy extends ReviewStateTransitionStrategy {

	public ReviewingStateStrategy(Review review) {
		super(review, EReviewState.Reviewing);
	}

	@Override
	protected boolean validateCurrentState() {
		return this.getReview().getState() == EReviewState.ReviewRequested;
	}

	@Override
	protected void afterTransitionAction() {
		EmailController controller = ControllerFactory.createEmailController();

		controller.sendReviewerReviewAcceptedEmail(getReview());
		controller.sendAuthorReviewAcceptedEmail(getReview());
	}

}

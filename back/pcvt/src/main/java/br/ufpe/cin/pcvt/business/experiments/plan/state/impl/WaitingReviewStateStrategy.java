package br.ufpe.cin.pcvt.business.experiments.plan.state.impl;

import br.ufpe.cin.pcvt.business.experiments.plan.state.PlanStateTransitionStrategy;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.EmailController;
import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.experiments.Review;

public class WaitingReviewStateStrategy extends PlanStateTransitionStrategy {

	public WaitingReviewStateStrategy(Plan plan) {
		super(plan, EPlanState.WaitingReview);
	}

	@Override
	protected boolean validateCurrentState() {
		return this.getPlan().getState() == EPlanState.ReadyToReview;
	}

	@Override
	protected void modifyState() {
		getPlan().setState(EPlanState.WaitingReview);
	}

	@Override
	protected void afterTransitionAction() {
		EmailController controller = ControllerFactory.createEmailController();
		Plan plan = getPlan();

		for (Review review : plan.getReviews()) {
			controller.sendReviewerNewReviewEmail(review);
		}
	}

}

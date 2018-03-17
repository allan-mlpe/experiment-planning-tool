package br.ufpe.cin.pcvt.business.experiments.plan.state.impl;

import br.ufpe.cin.pcvt.business.experiments.plan.state.PlanStateTransitionStrategy;
import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;

public class ExpiredStateStrategy extends PlanStateTransitionStrategy {

	public ExpiredStateStrategy(Plan plan) {
		super(plan, EPlanState.Expired);
	}

	@Override
	protected boolean validateCurrentState() {
		return this.getPlan().getState() == EPlanState.Reviewing ||
				this.getPlan().getState() == EPlanState.WaitingReview;
	}

	@Override
	protected void modifyState() {
		getPlan().setState(EPlanState.Expired);
	}

	@Override
	protected void afterTransitionAction() {
		// Do nothing
	}

}

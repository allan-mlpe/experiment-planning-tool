package br.ufpe.cin.pcvt.business.experiments.plan.state.impl;

import br.ufpe.cin.pcvt.business.experiments.plan.state.PlanStateTransitionStrategy;
import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;

public class RefusedStateStrategy extends PlanStateTransitionStrategy {

	public RefusedStateStrategy(Plan plan) {
		super(plan, EPlanState.Refused);
	}

	@Override
	protected boolean validateCurrentState() {
		return this.getPlan().getState() == EPlanState.WaitingReview;
	}

	@Override
	protected void modifyState() {
		getPlan().setState(EPlanState.Refused);
	}

	@Override
	protected void afterTransitionAction() {
		// Do nothing
	}

}

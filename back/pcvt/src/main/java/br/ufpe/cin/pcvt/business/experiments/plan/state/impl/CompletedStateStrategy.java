package br.ufpe.cin.pcvt.business.experiments.plan.state.impl;

import br.ufpe.cin.pcvt.business.experiments.plan.state.PlanStateTransitionStrategy;
import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;

public class CompletedStateStrategy extends PlanStateTransitionStrategy {

	public CompletedStateStrategy(Plan plan) {
		super(plan, EPlanState.Completed);
	}

	@Override
	protected boolean validateCurrentState() {
		return this.getPlan().getState() == EPlanState.Reviewing || this.getPlan().getState() == EPlanState.PartiallyCompleted;
	}

	@Override
	protected void modifyState() {
		getPlan().setState(EPlanState.Completed);
	}

	@Override
	protected void afterTransitionAction() {
		// Do nothing
	}

}

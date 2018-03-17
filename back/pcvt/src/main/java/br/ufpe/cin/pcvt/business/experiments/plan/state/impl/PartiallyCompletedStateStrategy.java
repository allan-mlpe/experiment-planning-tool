package br.ufpe.cin.pcvt.business.experiments.plan.state.impl;

import br.ufpe.cin.pcvt.business.experiments.plan.state.PlanStateTransitionStrategy;
import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;

public class PartiallyCompletedStateStrategy extends PlanStateTransitionStrategy {

	public PartiallyCompletedStateStrategy(Plan plan) {
		super(plan, EPlanState.PartiallyCompleted);
	}

	@Override
	protected boolean validateCurrentState() {
		return this.getPlan().getState() == EPlanState.Reviewing;
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

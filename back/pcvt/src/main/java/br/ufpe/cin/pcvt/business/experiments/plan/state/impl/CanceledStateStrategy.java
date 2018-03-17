package br.ufpe.cin.pcvt.business.experiments.plan.state.impl;

import br.ufpe.cin.pcvt.business.experiments.plan.state.PlanStateTransitionStrategy;
import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;

public class CanceledStateStrategy extends PlanStateTransitionStrategy {

	public CanceledStateStrategy(Plan plan) {
		super(plan, EPlanState.Canceled);
	}

	@Override
	protected boolean validateCurrentState() {
		return this.getPlan().getState() == EPlanState.Reviewing ||
				this.getPlan().getState() == EPlanState.WaitingReview;
	}

	@Override
	protected void modifyState() {
		getPlan().setState(EPlanState.Canceled);
	}

	@Override
	protected void afterTransitionAction() {
		// Do nothing
	}

}

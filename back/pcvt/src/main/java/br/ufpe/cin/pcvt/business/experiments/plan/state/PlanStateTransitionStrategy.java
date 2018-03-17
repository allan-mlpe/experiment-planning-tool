package br.ufpe.cin.pcvt.business.experiments.plan.state;

import br.ufpe.cin.pcvt.business.experiments.plan.state.exception.InvalidPlanStateTransitionException;
import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;

public abstract class PlanStateTransitionStrategy {

	private Plan plan;
	private EPlanState intendedState;

	public Plan execute() throws InvalidPlanStateTransitionException {
		if (validateCurrentState()) {
			modifyState();
			afterTransitionAction();
		} else {
			throw new InvalidPlanStateTransitionException(plan.getState(), intendedState);
		}
		return this.plan;
	}

	public PlanStateTransitionStrategy(Plan plan, EPlanState intendedState) {
		this.plan = plan;
		this.intendedState = intendedState;
	}

	protected abstract boolean validateCurrentState();

	protected abstract void modifyState();

	protected abstract void afterTransitionAction();

	protected Plan getPlan() {
		return plan;
	}

	protected void setPlan(Plan plan) {
		this.plan = plan;
	}
}

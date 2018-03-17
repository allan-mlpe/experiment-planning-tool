package br.ufpe.cin.pcvt.business.experiments.plan.state.exception;

import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;

public class InvalidPlanStateTransitionException extends Exception {

	private static final long serialVersionUID = 1L;
	private static final String ERROR_MESSAGE_FORMAT = "There is no possible transition between %s and %s";
	private EPlanState currentState;
	private EPlanState intendedState;

	public InvalidPlanStateTransitionException(EPlanState current, EPlanState intended) {
		super(String.format(ERROR_MESSAGE_FORMAT, current.getDescription(), intended.getDescription()));
		this.currentState = current;
		this.intendedState = intended;
	}

	protected EPlanState getCurrentState() {
		return currentState;
	}

	protected void setCurrentState(EPlanState currentState) {
		this.currentState = currentState;
	}

	protected EPlanState getIntendedState() {
		return intendedState;
	}

	protected void setIntendedState(EPlanState intendedState) {
		this.intendedState = intendedState;
	}

}

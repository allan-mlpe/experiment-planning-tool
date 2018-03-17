package br.ufpe.cin.pcvt.business.experiments.review.state.exception;

import br.ufpe.cin.pcvt.data.models.experiments.EReviewState;

public class InvalidReviewStateTransitionException extends Exception {

	private static final long serialVersionUID = 1L;
	private static final String ERROR_MESSAGE_FORMAT = "There is no possible transition between %s and %s";
	private EReviewState currentState;
	private EReviewState intendedState;

	public InvalidReviewStateTransitionException(EReviewState current, EReviewState intended) {
		super(String.format(ERROR_MESSAGE_FORMAT, current.getDescription(), intended.getDescription()));
		this.currentState = current;
		this.intendedState = intended;
	}

	protected EReviewState getCurrentState() {
		return currentState;
	}

	protected void setCurrentState(EReviewState currentState) {
		this.currentState = currentState;
	}

	protected EReviewState getIntendedState() {
		return intendedState;
	}

	protected void setIntendedState(EReviewState intendedState) {
		this.intendedState = intendedState;
	}
}

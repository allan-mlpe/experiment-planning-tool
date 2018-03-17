package br.ufpe.cin.pcvt.exceptions.entities.experiments.plan;

import br.ufpe.cin.pcvt.data.models.experiments.Plan;

public class PlanAlreadyHasChildException extends Exception{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7647272314619158825L;
	private Plan plan;
	private static String EXCEPTION_MESSAGE = "The plan already has a child";
	
	public PlanAlreadyHasChildException(Plan plan) {
		super(EXCEPTION_MESSAGE);
		this.plan = plan;
	}

	public Plan getPlan() {
		return plan;
	}

	public void setPlan(Plan plan) {
		this.plan = plan;
	}
}

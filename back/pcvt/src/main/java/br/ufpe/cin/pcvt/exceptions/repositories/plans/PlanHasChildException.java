package br.ufpe.cin.pcvt.exceptions.repositories.plans;

import br.ufpe.cin.pcvt.data.models.experiments.Plan;

public class PlanHasChildException extends Exception{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7647272314619158825L;
	private Plan plan;
	private static String EXCEPTION_MESSAGE = "The plan has a child and cannot be deleted.";
	
	public PlanHasChildException(Plan plan) {
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

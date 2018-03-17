package br.ufpe.cin.pcvt.data.models.experiments;

public enum EPlanState {

	Planning("Planning"),
	ReadyToReview("Ready to review"),
	WaitingReview("Waiting review"),
	Refused("Refused"),
	Reviewing("Reviewing"),
	Canceled("Canceled"),
	Expired("Expired"),
	PartiallyCompleted("Partially completed"),
	Completed("Completed");
	
	private String description;
	
	public String getDescription() {
		return description;
	}
	
	EPlanState (String description)
	{
		this.description = description;
	}
	
	public boolean isReportable() {
		return this == EPlanState.Reviewing || this == EPlanState.PartiallyCompleted || this == EPlanState.Completed;
	}
	
	public boolean isCopyable() {
		return this == EPlanState.Completed || this == EPlanState.Canceled  || this == EPlanState.Expired || this == EPlanState.Refused;
	}
	
	public boolean isArchivable() {
		return this == EPlanState.Completed || this == EPlanState.Canceled  || this == EPlanState.Expired || this == EPlanState.Refused;
	}
	
	public boolean isDeletable() {
		return this == Planning || this == EPlanState.ReadyToReview;
	}

	public boolean isExpirable() {
		return this == EPlanState.WaitingReview || this == EPlanState.Reviewing;
	}
}

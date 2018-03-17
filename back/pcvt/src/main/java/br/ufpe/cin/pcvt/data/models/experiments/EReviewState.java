package br.ufpe.cin.pcvt.data.models.experiments;

public enum EReviewState {
	
	
	ReviewRequested("Review Requested"),
	Reviewing("Reviewing"),
	Refused("Refused"),
	Canceled("Canceled"),
	Expired("Expired"),
	Completed("Completed"),
	Invalid("Invalid");
	
	private String description;
	
	public String getDescription() {
		return description;
	}

	EReviewState (String description)
	{
		this.description = description;
	}
	
	public boolean isReportable(){
		return this == Reviewing || this == EReviewState.Completed;
	}
	
	public boolean isExpirable(){
		return this == Reviewing || this == EReviewState.ReviewRequested;
	}
}

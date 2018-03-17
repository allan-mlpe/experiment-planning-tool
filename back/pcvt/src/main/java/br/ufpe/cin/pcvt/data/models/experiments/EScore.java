package br.ufpe.cin.pcvt.data.models.experiments;

public enum EScore {
	Yes(1, "Yes"), No(0, "No"), Partial(0.5, "Partial"), NA(-1, "Not Applicable");

	public double scoreValue;
	public String description;
	
	EScore (double scoreValue, String description)
	{
		this.scoreValue = scoreValue;
		this.description = description;
	}
}

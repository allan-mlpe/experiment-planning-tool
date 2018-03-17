package br.ufpe.cin.pcvt.data.models.experiments;

public enum EPlanCategory {
	
	GoalStating(1, "Stating the goals"),
	HVM(2, "Hypotheses, variables and measurements"),
	Participants(3, "Participants"),
	MaterialAndTasks(4, "Experimental materials and tasks"),
	ExperimentalDesign(5, "Experimental design"),
	Procedure(6, "Procedure"),
	DataColletionAndAnalysis(7, "Data collection and data analysis"),
	Threats(8, "Threats to validity"),
	Document(9, "Document");
	
	public int id;
	private  String description;
	
	public String getDescription() {
		return this.description;
	}
	
	EPlanCategory(int id, String description) {
		this.id = id;
		this.description = description;
	}
	
	/*
	(1) stating the goals; 
	(2)	hypotheses, variables and measurements; 
	(3) participants; 
	(4) experimental materials and tasks; 
	(5)	experimental design; 
	(6) procedure; 
	(7) data collection and data analysis; 
	(8) threats to validity; 
	(9)	document.
	*/
}

package br.ufpe.cin.pcvt.controllers;

public class ControllerFactory {

	public static PlanController createPlanController() {
		return new PlanController();
	}

	public static ReviewController createReviewController() {
		return new ReviewController();
	}
	
	public static UserController createUserController() {
		return new UserController();
	}

	public static UserGroupController createUserGroupController() {
		return new UserGroupController();
	}
	
	public static UserTokenController createUserTokenController() {
		return new UserTokenController();
	}
	
	public static EmailController createEmailController() {
		return new EmailController();
	}

	public static CharacteristicController createCharacteristicController() { return new CharacteristicController(); }

	public static ThreatController createThreatController() { return new ThreatController(); }

    public static ControlActionController createControlActionController() { return new ControlActionController(); }

    public static DraftController createDraftController() { return new DraftController(); }

    public static QMethodologyAssessmentController createQMethodologyAssessmentController() { return new QMethodologyAssessmentController(); }
}

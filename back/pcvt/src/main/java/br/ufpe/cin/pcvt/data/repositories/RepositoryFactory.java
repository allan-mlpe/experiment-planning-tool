package br.ufpe.cin.pcvt.data.repositories;

public class RepositoryFactory {

	public static IUserRepository createUserRepository() {
		return new HibernateUserRepository();
	}

	public static IUserGroupRepository createUserGroupRepository() {
		return new HibernateUserGroupRepository();
	}

	public static IPlanRepository createPlanRepository() {
		return new HibernatePlanRepository();
	}

	public static IReviewRepository createReviewRepository() {
		return new HibernateReviewRepository();
	}

	public static IUserTokenRepository createUserTokenRepository() {
		return new HibernateUserTokenRepository();
	}

    public static IThreatRepository createThreatRepository() { return new HibernateThreatRepository(); }

    public static ICharacteristicRepository createCharacteristicRepository() { return new HibernateCharacteristicRepository(); }

    public static IControlActionRepository createControlActionRepository() { return new HibernateControlActionRepository(); }

    public static IDraftRepository createDraftRepository() { return new HibernateDraftRepository(); }

    public static IQMethodologyAssessmentRepository createQMethodologyRepository() { return new HibernateQMethodologyAssessmentRepository(); }
}

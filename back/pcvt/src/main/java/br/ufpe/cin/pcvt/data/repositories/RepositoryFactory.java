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
}

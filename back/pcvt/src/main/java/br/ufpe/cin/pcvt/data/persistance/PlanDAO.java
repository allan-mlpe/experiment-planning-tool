package br.ufpe.cin.pcvt.data.persistance;

import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.persistance.util.JPADAO;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

public class PlanDAO extends JPADAO <Plan, Integer>{

	@SuppressWarnings("unchecked")
	public List<Plan> retrieveByAuthor(User user) {
		Query query = this.entityManager
				.createQuery("SELECT plan FROM " + this.entityClass.getName() + " plan WHERE plan.author = :user ");
		query.setParameter("user", user);
		try {
			return (List<Plan>) query.getResultList();
		} catch (NoResultException nre) {
			return new ArrayList<Plan>();
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<Plan> retrieveByCollaborator(User user) {
		Query query = this.entityManager
				.createQuery("SELECT plan FROM " + this.entityClass.getName() + " plan WHERE :user MEMBER OF plan.collaborators ");
		query.setParameter("user", user);
		try {
			return (List<Plan>) query.getResultList();
		} catch (NoResultException nre) {
			return new ArrayList<Plan>();
		}
	}
	
}

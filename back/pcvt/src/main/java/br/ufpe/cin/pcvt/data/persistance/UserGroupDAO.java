package br.ufpe.cin.pcvt.data.persistance;

import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.models.user.UserGroup;
import br.ufpe.cin.pcvt.data.persistance.util.JPADAO;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

public class UserGroupDAO extends JPADAO<UserGroup, Integer> {

	@SuppressWarnings("unchecked")
	public List<UserGroup> retrieveByAdmin(User user) {
		Query query = this.entityManager
				.createQuery("SELECT ug FROM " + this.entityClass.getName() + " ug WHERE :user MEMBER OF ug.managers");
		query.setParameter("user", user);
		try {
			return (List<UserGroup>) query.getResultList();
		} catch (NoResultException nre) {
			return new ArrayList<UserGroup>();
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<UserGroup> retrieveByMember(User user) {
		Query query = this.entityManager
				.createQuery("SELECT ug FROM " + this.entityClass.getName() + " ug WHERE :user MEMBER OF ug.members");
		query.setParameter("user", user);
		try {
			return (List<UserGroup>) query.getResultList();
		} catch (NoResultException nre) {
			return new ArrayList<UserGroup>();
		}
	}
}

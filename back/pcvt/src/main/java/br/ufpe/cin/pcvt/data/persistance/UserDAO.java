package br.ufpe.cin.pcvt.data.persistance;

import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.persistance.util.JPADAO;
import br.ufpe.cin.pcvt.exceptions.UserNotFoundException;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

public class UserDAO extends JPADAO<User, Integer> {
	
	public User retrieveByEmail(String email) throws UserNotFoundException {
		Query query = this.entityManager
				.createQuery("SELECT u FROM " + this.entityClass.getName() + " u WHERE u.email = :email");
		query.setParameter("email", email);
		try {
			return (User) query.getSingleResult();
		} catch (NoResultException nre) {
			throw new UserNotFoundException(email);
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<User> getAllAvailable(){
		Query query = this.entityManager
				.createQuery("SELECT u FROM " + this.entityClass.getName() + " u WHERE u.available = true");
		try {
			return (List<User>) query.getResultList();
		} catch (NoResultException nre) {
			return new ArrayList<User>();
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<User> getAllCollaborators(){
		Query query = this.entityManager
				.createQuery("SELECT u FROM " + this.entityClass.getName() + " u WHERE u.collaborator = true");
		try {
			return (List<User>) query.getResultList();
		} catch (NoResultException nre) {
			return new ArrayList<User>();
		}
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<User> retrieveAll() {
		Query query;
		query = this.entityManager.createQuery("SELECT u FROM " + this.entityClass.getName() + " u ORDER BY u.name");
		return query.getResultList();
	}
}

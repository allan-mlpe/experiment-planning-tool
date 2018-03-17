package br.ufpe.cin.pcvt.data.persistance;

import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.models.user.UserToken;
import br.ufpe.cin.pcvt.data.persistance.util.JPADAO;
import br.ufpe.cin.pcvt.exceptions.UserTokenNotFoundException;

import javax.persistence.NoResultException;
import javax.persistence.Query;

public class UserTokenDAO extends JPADAO<UserToken, Integer> {

	public UserToken retrieveByToken(String token) throws UserTokenNotFoundException {
		Query query = this.entityManager
				.createQuery("SELECT u FROM " + this.entityClass.getName() + " u WHERE u.token = :token");
		query.setParameter("token", token);
		try {
			return (UserToken) query.getSingleResult();
		} catch (NoResultException nre) {
			throw new UserTokenNotFoundException();
		}
	}
	
	public UserToken retrieveByUser(User user) throws UserTokenNotFoundException {
		Query query = this.entityManager
				.createQuery("SELECT u FROM " + this.entityClass.getName() + " u WHERE u.user = :user");
		query.setParameter("user", user);
		try {
			return (UserToken) query.getSingleResult();
		} catch (NoResultException nre) {
			throw new UserTokenNotFoundException();
		}
	}
}

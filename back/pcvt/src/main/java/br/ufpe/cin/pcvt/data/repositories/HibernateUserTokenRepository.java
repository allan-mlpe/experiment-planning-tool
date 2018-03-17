package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.models.user.UserToken;
import br.ufpe.cin.pcvt.data.persistance.UserTokenDAO;
import br.ufpe.cin.pcvt.data.persistance.util.JPAHelper;
import br.ufpe.cin.pcvt.exceptions.UserTokenNotFoundException;

public class HibernateUserTokenRepository implements IUserTokenRepository {

	private UserTokenDAO dao;
	
	public HibernateUserTokenRepository() {
		dao = new UserTokenDAO();
	}
	
	@Override
	public UserToken insert(UserToken userToken) {
		tryDeleteUserOldUserToken(userToken.getUser());
		JPAHelper.getInstance().beginTransaction();
		userToken = dao.create(userToken);
		JPAHelper.getInstance().commit();
		return userToken;
	}
	
	private void tryDeleteUserOldUserToken(User user) {
		try {
			UserToken token = dao.retrieveByUser(user);
			remove(token.getId());
		} catch (UserTokenNotFoundException e) {
			// Do nothing
		}
	}

	@Override
	public UserToken getByToken(String token) throws UserTokenNotFoundException {
		return dao.retrieveByToken(token);
	}

	@Override
	public UserToken get(Integer key) {
		return dao.retrieve(key);
	}

	@Override
	public void remove(Integer key) {
		JPAHelper.getInstance().beginTransaction();
		UserToken token = dao.retrieve(key); 
		dao.delete(token);
		JPAHelper.getInstance().commit();
	}
}

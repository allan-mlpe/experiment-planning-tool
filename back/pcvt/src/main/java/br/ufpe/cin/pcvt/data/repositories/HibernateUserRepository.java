package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.persistance.UserDAO;
import br.ufpe.cin.pcvt.data.persistance.util.JPAHelper;
import br.ufpe.cin.pcvt.exceptions.UserNotFoundException;

import java.util.List;

public class HibernateUserRepository implements IUserRepository {

	private UserDAO dao;
	
	public HibernateUserRepository() {
		dao = new UserDAO();
	}
	
	@Override
	public User insert(User user) {
		JPAHelper.getInstance().beginTransaction();
		user = dao.create(user);
		JPAHelper.getInstance().commit();
		return user;
	}

	@Override
	public User get(Integer key) {
		User user = dao.retrieve(key);
		return user;
	}

	@Override
	public void remove(Integer key) {
		JPAHelper.getInstance().beginTransaction();
		User user = dao.retrieve(key);
		dao.delete(user);
		JPAHelper.getInstance().commit();
	}

	@Override
	public User update(User user) {
		JPAHelper.getInstance().beginTransaction();
		user = dao.update(user);
		JPAHelper.getInstance().commit();
		return user;
	}

	@Override
	public List<User> all() {
		List<User> users = dao.retrieveAll();
		return users;
	}
	
	@Override
	public User getByEmail(String email) throws UserNotFoundException {
		User user = dao.retrieveByEmail(email);
		return user;
	}

	@Override
	public List<User> allAvailable() {
		return dao.getAllAvailable();
	}

	@Override
	public List<User> allCollaborators() {
		return dao.getAllCollaborators();
	}
}

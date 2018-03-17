package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.models.user.UserGroup;
import br.ufpe.cin.pcvt.data.persistance.UserGroupDAO;
import br.ufpe.cin.pcvt.data.persistance.util.JPAHelper;

import java.util.List;

public class HibernateUserGroupRepository implements IUserGroupRepository {

	private UserGroupDAO dao;
	
	public HibernateUserGroupRepository() {
		dao = new UserGroupDAO();
	}
	
	@Override
	public UserGroup insert(UserGroup userGroup) {
		JPAHelper.getInstance().beginTransaction();
		userGroup = dao.create(userGroup);
		JPAHelper.getInstance().commit();
		return userGroup;
	}

	@Override
	public UserGroup get(Integer key) {
		UserGroup userGroup = dao.retrieve(key);
		return userGroup;
	}

	@Override
	public void remove(Integer key) {
		JPAHelper.getInstance().beginTransaction();
		UserGroup userGroup = dao.retrieve(key);
		userGroup.getManagers().clear();
		userGroup.getMembers().clear();
		dao.update(userGroup);
		dao.delete(userGroup);
		JPAHelper.getInstance().commit();
	}

	@Override
	public UserGroup update(UserGroup userGroup) {
		JPAHelper.getInstance().beginTransaction();
		userGroup = dao.update(userGroup);
		JPAHelper.getInstance().commit();
		return userGroup;
	}

	@Override
	public List<UserGroup> all() {
		List<UserGroup> userGroups = dao.retrieveAll();
		return userGroups;
	}

	@Override
	public List<UserGroup> getByAdmin(User admin) {
		List<UserGroup> userGroup = dao.retrieveByAdmin(admin);
		return userGroup;
	}
	
	@Override
	public List<UserGroup> getByMember(User member) {
		List<UserGroup> userGroup = dao.retrieveByMember(member);
		return userGroup;
	}
}

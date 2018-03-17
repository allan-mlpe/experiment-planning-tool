package br.ufpe.cin.pcvt.controllers;

import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.models.user.UserGroup;
import br.ufpe.cin.pcvt.data.repositories.IUserGroupRepository;
import br.ufpe.cin.pcvt.data.repositories.RepositoryFactory;

import java.util.List;

public class UserGroupController {

	private IUserGroupRepository repository;

	protected UserGroupController() {
		repository = RepositoryFactory.createUserGroupRepository();
	}

	public UserGroup insert(UserGroup userGroup) {
		return repository.insert(userGroup);
	}

	public UserGroup get(Integer key) {
		return repository.get(key);
	}

	public void remove(Integer key) {
		repository.remove(key);
	}

	public UserGroup update(UserGroup userGroup) {
		return repository.update(userGroup);
	}

	public List<UserGroup> all() {
		return repository.all();
	}

	public List<UserGroup> getByAdmin(User admin) {
		return repository.getByAdmin(admin);
	}
	
	public List<UserGroup> getByMember(User member) {
		return repository.getByMember(member);
	}

	public UserGroup addMember(UserGroup group, User member) {

		group = get(group.getId());
		group.getMembers().add(member);
		group = update(group);

		return group;
	}
	
	public UserGroup removeMember(UserGroup group, Integer userId) {
		group = get(group.getId());
		if (group.getMembers().removeIf((user) -> user.getId() == userId)) {
			update(group);
		}

		return group;
	}

	public UserGroup addAdministrator(UserGroup group, User admin) {

		group = get(group.getId());
		group.getManagers().add(admin);
		group = update(group);

		return group;
	}
}

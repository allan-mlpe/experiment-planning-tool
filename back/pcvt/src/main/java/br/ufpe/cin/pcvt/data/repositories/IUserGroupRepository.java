package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.models.user.UserGroup;

import java.util.List;

public interface IUserGroupRepository {
	
	//CRUD
	UserGroup insert(UserGroup user);
	UserGroup get(Integer key);
	void remove(Integer key);
	UserGroup update(UserGroup user);
	List<UserGroup> all();
	
	//Others
	List<UserGroup> getByAdmin(User admin);
	List<UserGroup> getByMember(User member);
}

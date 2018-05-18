package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.exceptions.UserNotFoundException;

import java.util.List;

public interface IUserRepository {
	
	//CRUD
	User insert(User user);
	User get(Integer key);
	void remove(Integer key) throws UserNotFoundException;
	User update(User user);
	List<User> all();
	
	//Others
	User getByEmail(String email) throws UserNotFoundException;
	List<User> allAvailable();
	List<User> allCollaborators();
}

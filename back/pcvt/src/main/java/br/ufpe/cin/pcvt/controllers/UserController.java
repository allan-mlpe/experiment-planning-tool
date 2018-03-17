package br.ufpe.cin.pcvt.controllers;

import br.ufpe.cin.pcvt.business.security.CryptAgent;
import br.ufpe.cin.pcvt.business.security.PasswordGenerator;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.repositories.IUserRepository;
import br.ufpe.cin.pcvt.data.repositories.RepositoryFactory;
import br.ufpe.cin.pcvt.exceptions.UserDeactivatedException;
import br.ufpe.cin.pcvt.exceptions.UserNotFoundException;
import br.ufpe.cin.pcvt.exceptions.repositories.users.EmailAlreadyInUseException;

import java.util.List;

public class UserController {

	private IUserRepository repository;
	private EmailController emailController;

	protected UserController() {
		repository = RepositoryFactory.createUserRepository();
		emailController = ControllerFactory.createEmailController();
	}

	public User insert(User user) throws EmailAlreadyInUseException {
		validateUserDuplicity(user);
		String password = PasswordGenerator.createPassword();
		user.setPassword(CryptAgent.encryptPassword(password));
		user = repository.insert(user);
		emailController.sendAccountCreatedEmail(user, password);
		return user;
	}

	public User get(Integer key) {
		return repository.get(key);
	}

	public void remove(Integer key) {
		repository.remove(key);
	}

	public User update(User user) throws EmailAlreadyInUseException {
		validateUserDuplicity(user);
		return repository.update(user);
	}

	public User updatePassword(Integer key, String password) {
		User user = get(key);
		user.setPassword(CryptAgent.encryptPassword(password));
		user = repository.update(user);
		return user;

	}

	public List<User> all() {
		return repository.all();
	}

	public User getByEmail(String email) throws UserNotFoundException {
		try {
			return repository.getByEmail(email);
		} catch (Exception e) {
			throw new UserNotFoundException(email);
		}
	}

	public User validateCredentials(String email, String password) throws UserDeactivatedException {
		User user = null;
		try {
			user = getByEmail(email);

			if (user.isDeactivated())
				throw new UserDeactivatedException(email);

			if (!CryptAgent.checkPassword(password, user.getPassword()))
				user = null;
		} catch (UserNotFoundException e) {
			// Do nothing
		}

		return user;
	}

	public List<User> allAvailable() {
		return repository.allAvailable();
	}

	public List<User> allCollaborators() {
		return repository.allCollaborators();
	}

	public void deactivate(Integer userId) {
		User user = null;
		user = get(userId);
		user.setDeactivated(true);
		repository.update(user);
	}

	public void activate(Integer userId) {
		User user = null;
		user = get(userId);
		user.setDeactivated(false);
		repository.update(user);
	}

	private void validateUserDuplicity(User user) throws EmailAlreadyInUseException {
		User oldUser = null;

		try {
			oldUser = repository.getByEmail(user.getEmail());

			if (oldUser.getId() != user.getId()) {
				throw new EmailAlreadyInUseException(user.getEmail());
			}
		} catch (UserNotFoundException e1) {
			// Do nothing
		}
	}
}

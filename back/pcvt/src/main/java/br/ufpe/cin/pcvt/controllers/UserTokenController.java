package br.ufpe.cin.pcvt.controllers;

import br.ufpe.cin.pcvt.business.security.CryptAgent;
import br.ufpe.cin.pcvt.business.security.PasswordGenerator;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.models.user.UserToken;
import br.ufpe.cin.pcvt.data.repositories.IUserRepository;
import br.ufpe.cin.pcvt.data.repositories.IUserTokenRepository;
import br.ufpe.cin.pcvt.data.repositories.RepositoryFactory;
import br.ufpe.cin.pcvt.exceptions.UserTokenNotFoundException;

public class UserTokenController {

	private IUserTokenRepository tokenRepository;
	private IUserRepository userRepository;
	private EmailController emailController;

	protected UserTokenController() {
		tokenRepository = RepositoryFactory.createUserTokenRepository();
		userRepository = RepositoryFactory.createUserRepository();
		emailController = ControllerFactory.createEmailController();
	}

	public UserToken createToken(User user) {
		UserToken userToken = new UserToken();

		String token = PasswordGenerator.createPassword();

		userToken.setUser(user);
		userToken.setToken(token);
		userToken = tokenRepository.insert(userToken);
		
		emailController.sendTokenEmail(userToken);

		return userToken;
	}

	public UserToken getByToken(String token) throws UserTokenNotFoundException {
		return tokenRepository.getByToken(token);
	}

	public User consumeUserToken(UserToken token) {
		
		User user = token.getUser();
		user.setPassword(CryptAgent.encryptPassword(user.getPassword()));
		
		user = userRepository.update(user);
		tokenRepository.remove(token.getId());
		
		return user;
	}

}

package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.user.UserToken;
import br.ufpe.cin.pcvt.exceptions.UserTokenNotFoundException;

public interface IUserTokenRepository {
	
	UserToken insert(UserToken token);
	UserToken getByToken(String token) throws UserTokenNotFoundException;
	UserToken get(Integer key);
	void remove(Integer key);
}

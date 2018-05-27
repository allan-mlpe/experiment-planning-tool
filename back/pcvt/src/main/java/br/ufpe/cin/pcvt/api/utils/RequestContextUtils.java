package br.ufpe.cin.pcvt.api.utils;

import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.exceptions.UserNotFoundException;

import javax.ws.rs.container.ContainerRequestContext;

public class RequestContextUtils {

    private static final String USER_PROPERTY_KEY = "user";

    public static User extractUser(ContainerRequestContext req) {
        User user = (User) req.getProperty(USER_PROPERTY_KEY);
        return user;
    }

    public static void injectUser(ContainerRequestContext req, String email) throws UserNotFoundException {
        User user = ControllerFactory
                .createUserController().getByEmail(email);

        req.setProperty(USER_PROPERTY_KEY, user);
    }
}

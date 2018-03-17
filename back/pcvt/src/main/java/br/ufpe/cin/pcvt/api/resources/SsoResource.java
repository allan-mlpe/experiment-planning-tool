package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.converters.UserVOConverter;
import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.Credentials;
import br.ufpe.cin.pcvt.api.models.UserVO;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.UserController;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.exceptions.InvalidCredentialsException;
import br.ufpe.cin.pcvt.exceptions.UserDeactivatedException;
import br.ufpe.cin.pcvt.exceptions.UserNotFoundException;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author Allan Monteiro de Lima (aml3@cin.ufpe.br)
 */
@Path("sso")
public class SsoResource {

    private UserController userController = ControllerFactory.createUserController();

    private static Logger logger = LogManager.getLogger(SsoResource.class.getName());

    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Credentials credentials) throws ApiException {
        try {
            User user = userController.validateCredentials(credentials.getEmail(), credentials.getPassword());
            UserVO userVO = UserVOConverter.getInstance().convertToVO(user);

            return Response.ok(userVO).build();

        } catch (UserDeactivatedException e) {
            logger.warn(String.format("DEACTIVATED USER for %s", credentials.getEmail()));
            throw new ApiException(Response.Status.FORBIDDEN,
                    "Deactivated user");

        } catch (UserNotFoundException | InvalidCredentialsException e) {
            logger.warn(String.format("LOGIN UNSUCCESSFUL for %s", credentials.getEmail()));

            String message = e instanceof UserNotFoundException ?
                    "User not found" : "Login or password invalid";

            throw new ApiException(Response.Status.UNAUTHORIZED,
                    message);

        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }
}

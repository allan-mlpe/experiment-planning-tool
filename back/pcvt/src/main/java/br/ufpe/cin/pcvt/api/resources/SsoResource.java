package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.converters.UserVOConverter;
import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.ApiMessage;
import br.ufpe.cin.pcvt.api.models.Credentials;
import br.ufpe.cin.pcvt.api.models.UserVO;
import br.ufpe.cin.pcvt.api.utils.JwtUtils;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.UserController;
import br.ufpe.cin.pcvt.controllers.UserTokenController;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.models.user.UserToken;
import br.ufpe.cin.pcvt.exceptions.InvalidCredentialsException;
import br.ufpe.cin.pcvt.exceptions.UserDeactivatedException;
import br.ufpe.cin.pcvt.exceptions.UserNotFoundException;
import br.ufpe.cin.pcvt.exceptions.UserTokenNotFoundException;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author Allan Monteiro de Lima (aml3@cin.ufpe.br)
 */
@Path("sso")
public class SsoResource {

    private UserController userController = ControllerFactory.createUserController();
    private UserTokenController userTokenController = ControllerFactory.createUserTokenController();

    private static Logger logger = LogManager.getLogger(SsoResource.class.getName());

    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Credentials credentials) throws ApiException {
        try {
            User user = userController.validateCredentials(credentials.getEmail(), credentials.getPassword());
            UserVO userVO = UserVOConverter.getInstance().convertToVO(user);

            String token = JwtUtils.buildToken(credentials);
            userVO.setToken(token);

            return Response.ok(userVO).build();

        } catch (UserDeactivatedException e) {
            logger.warn(e.getMessage());
            throw new ApiException(Response.Status.FORBIDDEN,
                    e.getMessage());

        } catch (UserNotFoundException | InvalidCredentialsException e) {
            logger.warn(e.getMessage());

            throw new ApiException(Response.Status.UNAUTHORIZED,
                    e.getMessage());

        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }

    @POST
    @Path("recovery")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response recoveryPassword(@FormParam("email") String email) throws ApiException {
        try {
            User user = userController.getByEmail(email);
            userTokenController.createToken(user);

            return Response.noContent().build();

        } catch (UserNotFoundException e) {
            logger.warn(e.getMessage());
            throw  new ApiException(Response.Status.NOT_FOUND,
                    e.getMessage());

        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }

    @POST
    @Path("resetPassword")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response resetPassword(@FormParam("token") String token,
                                  @FormParam("password") String password) throws ApiException {

        try {
            UserToken userToken = userTokenController.getByToken(token);
            userToken.getUser().setPassword(password);
            userTokenController.consumeUserToken(userToken);

            ApiMessage msg = new ApiMessage(Response.Status.OK,
                    "Successful password reset");

            return Response.ok(msg).build();

        } catch (UserTokenNotFoundException e) {
            throw  new ApiException(Response.Status.BAD_REQUEST,
                    e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }
}

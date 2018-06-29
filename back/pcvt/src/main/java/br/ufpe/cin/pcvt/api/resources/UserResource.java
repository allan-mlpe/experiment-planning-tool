package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.converters.UserVOConverter;
import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.Credentials;
import br.ufpe.cin.pcvt.api.models.UserVO;
import br.ufpe.cin.pcvt.api.security.SecureEndpoint;
import br.ufpe.cin.pcvt.api.utils.RequestContextUtils;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.UserController;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.exceptions.UserNotFoundException;
import br.ufpe.cin.pcvt.exceptions.repositories.users.EmailAlreadyInUseException;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("users")
public class UserResource {

    private UserController userController = ControllerFactory.createUserController();

    private static Logger logger = LogManager.getLogger(UserResource.class.getName());

    @SecureEndpoint
    @GET
    @Path("/{id}")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getUser(@PathParam("id") Integer id) throws ApiException {
        try {
            User user = userController.get(id);
            if(user == null) {
                throw new UserNotFoundException(id.toString());
            }
            UserVO userVO = UserVOConverter.getInstance().convertToVO(user);

            return Response.ok(userVO).build();

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

    @SecureEndpoint
    @GET
    @Produces(APIConstants.APPLICATION_JSON)
    public Response listUsers() throws ApiException {

        // TODO paginate user list

        List<User> users = userController.all();
        List<UserVO> userVOS = new ArrayList<UserVO>();
        users.forEach(user ->
            userVOS.add(UserVOConverter.getInstance().convertToVO(user))
        );

        GenericEntity<List<UserVO>> genericList = new GenericEntity<List<UserVO>>(userVOS) {};
        return Response.ok(genericList).build();
    }

    @SecureEndpoint
    @GET
    @Path("available")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getAvailableUsers(@Context ContainerRequestContext req) {
        User loggedUser = RequestContextUtils.extractUser(req);
        List<User> users = userController.allAvailable();
        users.remove(loggedUser);

        List<UserVO> userVOS = new ArrayList<UserVO>();
        users.forEach(user ->
                userVOS.add(UserVOConverter.getInstance().convertToVO(user))
        );

        GenericEntity<List<UserVO>> genericList = new GenericEntity<List<UserVO>>(userVOS) {};
        return Response.ok(genericList).build();
    }

    @SecureEndpoint
    @GET
    @Path("collaborators")
    @Produces(APIConstants.APPLICATION_JSON)
    public Response getCollaboratorsUsers(@Context ContainerRequestContext req) {
        User loggedUser = RequestContextUtils.extractUser(req);
        List<User> users = userController.allCollaborators();
        users.remove(loggedUser);

        List<UserVO> userVOS = new ArrayList<UserVO>();
        users.forEach(user ->
                userVOS.add(UserVOConverter.getInstance().convertToVO(user))
        );

        GenericEntity<List<UserVO>> genericList = new GenericEntity<List<UserVO>>(userVOS) {};
        return Response.ok(genericList).build();
    }

    @POST
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response saveUser(UserVO userVO) throws ApiException {
        User user = UserVOConverter.getInstance().convertFromVO(userVO);

        try {
            UserVO insertedUserVO = UserVOConverter.getInstance()
                    .convertToVO(userController.insert(user));

            return Response.ok(insertedUserVO).build();

        } catch(ApiException e) {
            throw e;
        } catch (EmailAlreadyInUseException e) {
            throw new ApiException(Response.Status.BAD_REQUEST,
                    e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }

    @SecureEndpoint
    @PUT
    @Path("/{id}")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response updateUser(UserVO userVO, @PathParam("id") Integer userId, @Context ContainerRequestContext req) throws ApiException {
        userVO.setId(userId);

        try {
            User user = UserVOConverter.getInstance().convertFromVO(userVO);
            User oldUser = userController.get(userId);
            if(user == null) {
                throw new UserNotFoundException(userId.toString());
            }

            user.setPassword(oldUser.getPassword());

            UserVO updatedUserVO = UserVOConverter.getInstance()
                    .convertToVO(userController.update(user));

            return Response.ok(updatedUserVO).build();
        } catch(ApiException e) {
            throw e;
        } catch (EmailAlreadyInUseException e) {
            throw new ApiException(Response.Status.BAD_REQUEST,
                    e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }

    @SecureEndpoint
    @PUT
    @Path("/{id}/password")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response updatePassword(@PathParam("id") Integer userId, Credentials credentials, @Context ContainerRequestContext req) throws ApiException {
        try {
            checkUser(userId, req);

            User user = userController
                    .updatePassword(userId, credentials.getPassword());

            UserVO userVO = UserVOConverter.getInstance()
                    .convertToVO(user);

            return Response.ok(userVO).build();

        } catch (ApiException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error. It was not possible to update user password");
        }
    }

    @SecureEndpoint
    @DELETE
    @Path("/{id}")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response deleteUser(@PathParam("id") Integer userId, @Context ContainerRequestContext req) throws ApiException {
        try {
            checkUser(userId, req);
            userController.remove(userId);

            return Response.noContent().build();

        } catch(ApiException e) {
            throw e;
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

    private static void checkUser(Integer userId, ContainerRequestContext req) throws ApiException {
        User user = RequestContextUtils.extractUser(req);
        if(!user.getId().equals(userId))
            throw new ApiException(Response.Status.BAD_REQUEST,
                    "User ID it is not the same as the logged user");
    }
}

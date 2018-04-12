package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.converters.UserVOConverter;
import br.ufpe.cin.pcvt.api.exceptions.ApiException;
import br.ufpe.cin.pcvt.api.models.UserVO;
import br.ufpe.cin.pcvt.controllers.ControllerFactory;
import br.ufpe.cin.pcvt.controllers.UserController;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.exceptions.UserNotFoundException;
import br.ufpe.cin.pcvt.exceptions.repositories.users.EmailAlreadyInUseException;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("users")
public class UserResource {

    private UserController userController = ControllerFactory.createUserController();

    private static Logger logger = LogManager.getLogger(UserResource.class.getName());

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

    @POST
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response saveUser(UserVO userVO) throws ApiException {
        User user = UserVOConverter.getInstance().convertFromVO(userVO);

        try {
            UserVO insertedUserVO = UserVOConverter.getInstance()
                    .convertToVO(userController.insert(user));

            return Response.ok(insertedUserVO).build();

        } catch (EmailAlreadyInUseException e) {
            throw new ApiException(Response.Status.BAD_REQUEST,
                    e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response updateUser(UserVO userVO) throws ApiException {
        User user = UserVOConverter.getInstance().convertFromVO(userVO);

        try {
            UserVO updatedUserVO = UserVOConverter.getInstance()
                    .convertToVO(userController.update(user));

            return Response.ok(updatedUserVO).build();
        } catch (EmailAlreadyInUseException e) {
            throw new ApiException(Response.Status.BAD_REQUEST,
                    e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }

    @DELETE
    @Path("/{id}")
    @Consumes(APIConstants.APPLICATION_JSON)
    @Produces(APIConstants.APPLICATION_JSON)
    public Response deleteUser(@PathParam("id") Integer userId) throws ApiException {
        try {
            userController.remove(userId);

            return Response.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiException(Response.Status.INTERNAL_SERVER_ERROR,
                    "Internal server error");
        }
    }
}

package br.ufpe.cin.pcvt.api.converters;

import br.ufpe.cin.pcvt.api.models.UserVO;
import br.ufpe.cin.pcvt.data.models.user.User;

public class UserVOConverter implements IVOConverter<User, UserVO> {

    private static UserVOConverter instance;

    public static UserVOConverter getInstance() {
        if(instance == null)
            instance = new UserVOConverter();

        return instance;
    }

    private UserVOConverter() {}

    @Override
    public UserVO convertToVO(User user) {
        UserVO userVO = new UserVO();

        userVO.setId(user.getId());
        userVO.setName(user.getName());
        userVO.setEmail(user.getEmail());
        userVO.setProfileLink(user.getProfileLink());
        userVO.setWorkArea(user.getWorkArea());
        userVO.setAdmin(user.isAdmin());
        userVO.setAvailable(user.isAvailable());
        userVO.setCollaborator(user.isCollaborator());
        userVO.setInstitution(user.getInstitution());

        return userVO;
    }

    @Override
    public User convertFromVO(UserVO userVO) {
        User user = new User();

        user.setId(userVO.getId());
        user.setName(userVO.getName());
        user.setEmail(userVO.getEmail());
        user.setInstitution(userVO.getInstitution());
        user.setProfileLink(userVO.getProfileLink());
        user.setWorkArea(userVO.getWorkArea());
        user.setAdmin(userVO.isAdmin() != null ? userVO.isAdmin() : false);
        user.setAvailable(userVO.isAvailable() != null ? userVO.isAvailable() : false);
        user.setCollaborator(userVO.isCollaborator() != null ? userVO.isCollaborator() : false);

        return user;
    }
}

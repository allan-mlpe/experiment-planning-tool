package br.ufpe.cin.pcvt.api.converters;

import br.ufpe.cin.pcvt.api.models.ExperimentalPlanVO;
import br.ufpe.cin.pcvt.api.models.UserVO;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.user.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ExperimentalPlanVOConverter implements IVOConverter<Plan, ExperimentalPlanVO> {

    private static ExperimentalPlanVOConverter instance;

    public static ExperimentalPlanVOConverter getInstance() {
        if(instance == null)
            instance = new ExperimentalPlanVOConverter();

        return instance;
    }
    private ExperimentalPlanVOConverter() {}

    @Override
    public ExperimentalPlanVO convertToVO(Plan plan) {
        ExperimentalPlanVO planVO = new ExperimentalPlanVO();

        planVO.setArchived(plan.isArchived());
        planVO.setAuthor(
            UserVOConverter.getInstance().convertToVO(plan.getAuthor())
        );
        planVO.setName(plan.getName());
        planVO.setDescription(plan.getDescription());
        planVO.setId(plan.getId());
        planVO.setState(plan.getState());
        planVO.setVersion(plan.getVersion());
        planVO.setDetails(plan.getDetails());
        planVO.setCharacteristics(plan.getCharacteristics());
        planVO.setThreats(plan.getThreats());
        planVO.setActions(plan.getActions());
        planVO.setActionRelatedThreats(plan.getActionRelatedThreats());
        planVO.setCustomThreats(plan.getCustomThreats());
        //planVO.setReviews(plan.getReviews());
        planVO.setDate(plan.getDate());
        planVO.setPrivacySetting(plan.getPrivacySetting());
        planVO.setHasChild(plan.hasChild());
        planVO.setCustom(plan.isCustomPlan());
        planVO.setFileName(plan.getFilename());

        Collection<UserVO> userVOS = convertListUserToListUserVO(plan.getCollaborators());
        planVO.setCollaborators(userVOS);


        return planVO;
    }

    @Override
    public Plan convertFromVO(ExperimentalPlanVO planVO) {

        Plan plan = new Plan();

        plan.setName(planVO.getName());
        plan.setDescription(planVO.getDescription());

        return null;
    }

    private Collection<UserVO> convertListUserToListUserVO(Collection<User> users) {
        List<UserVO> usersVOS = new ArrayList<>();

        users.forEach(user -> {
            UserVO userVO = UserVOConverter.getInstance().convertToVO(user);
            usersVOS.add(userVO);
        });

        return usersVOS;
    }
}

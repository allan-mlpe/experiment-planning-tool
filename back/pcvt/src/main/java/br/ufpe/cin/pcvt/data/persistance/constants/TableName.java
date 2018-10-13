package br.ufpe.cin.pcvt.data.persistance.constants;

import br.ufpe.cin.pcvt.data.models.user.User;

public class TableName {
	
	// User related
	public static final String USER = "sys_user";
	public static final String USER_GROUP = "user_group";
	public static final String USER_TOKEN = "sys_user_token";
	public static final String PLAN = "plan";
	public static final String REVIEW = "review";
	public static final String ADMINISTRATOR= "administrator";
	public static final String COLLABORATOR = "collaborator";
	public static final String REVIEWER= "reviewer";
	public static final String VISITOR = "visitor";
	
	// Data related
	public static final String REVIEW_ITEM = "review_item";
	public static final String PLAN_ITEM = "plan_item";
	public static final String PLAN_HAS_COLLABORATOR = "plan_has_collaborator";
	public static final String PLAN_HAS_REVIEWER = "plan_has_reviewer";
	public static final String DRAFT = "draft";

	// Characteristics related
	public static final String CHARACTERISTIC = "characteristic";
	public static final String Q_METHODOLOGY_ASSESSMENT = "q_methodology_assessment";

	// Threats related
	public static final String THREAT = "threat";

	// Control actions related
	public static final String CONTROL_ACTION = "control_action";

    @SuppressWarnings("rawtypes")
	public static String GetTableName(Class entityClass)
	{
		try {
			if (entityClass.newInstance() instanceof User)
				return USER;
		} catch (Exception e) {
			// Do nothing
		}
		
		return null;
	}
	
}

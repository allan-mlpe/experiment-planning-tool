package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.persistance.PlanDAO;
import br.ufpe.cin.pcvt.data.persistance.util.JPAHelper;

import java.util.List;

public class HibernatePlanRepository implements IPlanRepository {
	
	private PlanDAO dao;

	public HibernatePlanRepository() {
		dao = new PlanDAO();
	}

	@Override
	public Plan insert(Plan plan) {
		
		JPAHelper.getInstance().beginTransaction();
		try {

			plan = dao.create(plan);
			
			if (plan.hasParent()) {
				plan.getParentPlan().setChildPlan(plan);
				dao.update(plan.getParentPlan());
			}

		} catch (Exception e) {
			e.printStackTrace();
			JPAHelper.getInstance().rollback();
		}		
		JPAHelper.getInstance().commit();
		
		return plan;
	}

	@Override
	public Plan get(Integer key) {
		Plan plan = dao.retrieve(key);
		return plan;
	}

	@Override
	public void remove(Integer key) {
		JPAHelper.getInstance().beginTransaction();
		
		try {
			Plan plan = dao.retrieve(key);
			
			// Remove plan from its parent
			if (plan.hasParent()) {
				plan.getParentPlan().setChildPlan(null);
				dao.update(plan.getParentPlan());
			}
			
			dao.delete(plan);
			
		} catch (Exception e) {
			JPAHelper.getInstance().rollback();
			throw e;
		}

		JPAHelper.getInstance().commit();
	}

	@Override
	public Plan update(Plan plan) {
		JPAHelper.getInstance().beginTransaction();
		plan = dao.update(plan);
		JPAHelper.getInstance().commit();
		return plan;
	}

	@Override
	public List<Plan> all() {
		List<Plan> plans = dao.retrieveAll();

		return plans;
	}

	@Override
	public List<Plan> retrieveByAuthor(User user) {
		return dao.retrieveByAuthor(user);
	}

	@Override
	public List<Plan> retrieveByCollaborator(User user) {
		return dao.retrieveByCollaborator(user);
	}
}

package br.ufpe.cin.pcvt.controllers;

import br.ufpe.cin.pcvt.business.experiments.plan.state.PlanStateTransitionStrategy;
import br.ufpe.cin.pcvt.business.experiments.plan.state.PlanTransitionStrategyFactory;
import br.ufpe.cin.pcvt.business.experiments.plan.state.exception.InvalidPlanStateTransitionException;
import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.experiments.Review;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.repositories.IPlanRepository;
import br.ufpe.cin.pcvt.data.repositories.IUserRepository;
import br.ufpe.cin.pcvt.data.repositories.RepositoryFactory;
import br.ufpe.cin.pcvt.exceptions.entities.experiments.plan.PlanAlreadyHasChildException;
import br.ufpe.cin.pcvt.exceptions.repositories.plans.PlanHasChildException;

import java.util.List;

public class PlanController {

	private IPlanRepository planRepository;
	private IUserRepository userRepository;

	protected PlanController() {
		planRepository = RepositoryFactory.createPlanRepository();
		userRepository = RepositoryFactory.createUserRepository();
	}

	public Plan insert(Plan plan, Integer authorId) {
		User author = userRepository.get(authorId);

		plan.setAuthor(author);
		plan = planRepository.insert(plan);

		return plan;
	}

	public Plan get(Integer key) {
		return planRepository.get(key);
	}

	public void remove(Integer key) throws PlanHasChildException {
		Plan plan = planRepository.get(key);

		if (plan.hasChild()) {
			throw new PlanHasChildException(plan);
		}

		planRepository.remove(key);
	}

	public Plan createChild(Integer key) throws PlanAlreadyHasChildException {
		Plan plan = planRepository.get(key);
		Plan child = plan.createChild();
		return planRepository.insert(child);
	}

	public Plan archive(Integer key) {
		Plan plan = planRepository.get(key);

		if (plan.isArchivable())
			plan.setArchived(true);

		return planRepository.update(plan);
	}

	public Plan unarchive(Integer key) {
		Plan plan = planRepository.get(key);

		plan.setArchived(false);

		return planRepository.update(plan);
	}

	public Plan update(Plan plan) {
		return planRepository.update(plan);
	}

	public List<Plan> all() {
		return planRepository.all();
	}
	
	public List<Plan> retrieveByAuthor(User user) {
		return planRepository.retrieveByAuthor(user);
	}

	public List<Plan> retrieveByCollaborator(User user) {
		return planRepository.retrieveByCollaborator(user);
	}

	public Plan
	refreshReviewState(Plan plan) {
		int refused = 0;
		int reviewing = 0;
		int completed = 0;
		int total = plan.getReviews().size();

		for (Review r : plan.getReviews()) {
			switch (r.getState()) {
			case Reviewing:
				reviewing++;
				break;
			case Refused:
				refused++;
				break;
			case Completed:
				completed++;
				break;
			default:
				break;
			}
		}

		try {

			if (completed == total) {
				moveToCompleted(plan);
			} else if (completed > 0) {
				moveToPartiallyCompleted(plan);
			} else if (completed == 0) {
				if (refused == total)
					moveToRefused(plan);
				else if (reviewing > 0)
					moveToReviewing(plan);
			}

		} catch (InvalidPlanStateTransitionException e) {
			e.printStackTrace();
		}

		return plan;
	}

	private Plan changeState(Plan plan, EPlanState intendedState) throws InvalidPlanStateTransitionException {
		plan = planRepository.get(plan.getId());
		PlanStateTransitionStrategy transitionStrategy = PlanTransitionStrategyFactory.create(plan, intendedState);
		plan = transitionStrategy.execute();
		plan.setState(intendedState);
		plan = planRepository.update(plan);
		return plan;
	}

	public Plan moveToReadyToReview(Plan plan) throws InvalidPlanStateTransitionException {
		return changeState(plan, EPlanState.ReadyToReview);
	}

	public Plan moveToWaitingReview(Plan plan) throws InvalidPlanStateTransitionException {
		return changeState(plan, EPlanState.WaitingReview);
	}

	public Plan moveToRefused(Plan plan) throws InvalidPlanStateTransitionException {
		return changeState(plan, EPlanState.Refused);
	}

	public Plan moveToReviewing(Plan plan) throws InvalidPlanStateTransitionException {
		return changeState(plan, EPlanState.Reviewing);
	}

	public Plan moveToPartiallyCompleted(Plan plan) throws InvalidPlanStateTransitionException {
		return changeState(plan, EPlanState.PartiallyCompleted);
	}

	public Plan moveToCanceled(Plan plan) throws InvalidPlanStateTransitionException {
		return changeState(plan, EPlanState.Canceled);
	}

	public Plan moveToExpired(Plan plan) throws InvalidPlanStateTransitionException {
		return changeState(plan, EPlanState.Expired);
	}

	public Plan moveToCompleted(Plan plan) throws InvalidPlanStateTransitionException {
		return changeState(plan, EPlanState.Completed);
	}
}

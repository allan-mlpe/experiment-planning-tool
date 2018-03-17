package br.ufpe.cin.pcvt.business.experiments.plan.state;

import br.ufpe.cin.pcvt.business.experiments.plan.state.impl.*;
import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;

import java.security.InvalidParameterException;

public class PlanTransitionStrategyFactory {

	public static PlanStateTransitionStrategy create(Plan plan, EPlanState intendedState) {
		
		PlanStateTransitionStrategy strategy = null;
		
		switch (intendedState) {
			case Planning:
				break;
			case ReadyToReview:
				strategy = new ReadyToReviewStateStrategy(plan);
				break;
			case WaitingReview:
				strategy = new WaitingReviewStateStrategy(plan);
				break;
			case Refused:
				strategy = new RefusedStateStrategy(plan);
				break;
			case Reviewing:
				strategy = new ReviewingStateStrategy(plan);
				break;
			case Canceled:
				strategy = new CanceledStateStrategy(plan);
				break;
			case Expired:
				strategy = new ExpiredStateStrategy(plan);
				break;
			case PartiallyCompleted:
				strategy = new PartiallyCompletedStateStrategy(plan);
				break;
			case Completed:
				strategy = new CompletedStateStrategy(plan);
				break;
			default:
				throw new InvalidParameterException(); 
		}
		
		return strategy;
	}
}

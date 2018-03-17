package br.ufpe.cin.pcvt.business.experiments.review.state;

import br.ufpe.cin.pcvt.business.experiments.review.state.impl.*;
import br.ufpe.cin.pcvt.data.models.experiments.EReviewState;
import br.ufpe.cin.pcvt.data.models.experiments.Review;

import java.security.InvalidParameterException;

public class ReviewTransitionStrategyFactory {

	public static ReviewStateTransitionStrategy create(Review reviewing, EReviewState intendedState) {
		
		ReviewStateTransitionStrategy strategy = null;
		
		switch (intendedState) {
			case ReviewRequested:
				break;
			case Reviewing:
				strategy = new ReviewingStateStrategy(reviewing);
				break;
			case Refused:
				strategy = new RefusedStateStrategy(reviewing);
				break;
			case Canceled:
				strategy = new CanceledStateStrategy(reviewing);
				break;
			case Expired:
				strategy = new ExpiredStateStrategy(reviewing);
				break;
			case Completed:
				strategy = new CompletedStateStrategy(reviewing);
				break;
			default:
				throw new InvalidParameterException(); 
		}
		
		return strategy;
	}
}

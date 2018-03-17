package br.ufpe.cin.pcvt.business.experiments.plan.state;

import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.EReviewState;

public class PlanToReviewStateMapper {

	public static EReviewState Map(EPlanState state) {
		EReviewState reviewState = null;

		switch (state) {
		case Planning:
		case ReadyToReview:
		case PartiallyCompleted:
			reviewState = EReviewState.Invalid;
		case WaitingReview:
			reviewState = EReviewState.ReviewRequested;
			break;
		case Reviewing:
			reviewState = EReviewState.Reviewing;
			break;
		case Completed:
			reviewState = EReviewState.Completed;
			break;
		case Canceled:
			reviewState = EReviewState.Canceled;
			break;
		case Expired:
			reviewState = EReviewState.Expired;
		case Refused:
			reviewState = EReviewState.Refused;
		}

		return reviewState;
	}
}

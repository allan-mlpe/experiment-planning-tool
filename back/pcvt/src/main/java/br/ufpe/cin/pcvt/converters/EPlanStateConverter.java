package br.ufpe.cin.pcvt.converters;

import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter (autoApply = true)
public class EPlanStateConverter implements AttributeConverter<EPlanState, Integer> {

	@Override
	public Integer convertToDatabaseColumn(EPlanState attribute) {
		Integer value = 0;

		switch (attribute) {
		case Planning:
			value = 0;
			break;
		case ReadyToReview:
			value = 1;
			break;
		case WaitingReview:
			value = 2;
			break;
		case Reviewing:
			value = 3;
			break;
		case Completed:
			value = 4;
			break;
		case Refused:
			value = 5;
			break;
		case Canceled:
			value = 6;
			break;
		case Expired:
			value = 7;
			break;
		case PartiallyCompleted:
			value = 8;
			break;
		}

		return value;
	}

	@Override
	public EPlanState convertToEntityAttribute(Integer dbData) {
		EPlanState value = null;
		switch (dbData) {
		case 0:
			value = EPlanState.Planning;
			break;
		case 1:
			value = EPlanState.ReadyToReview;
			break;
		case 2:
			value = EPlanState.WaitingReview;
			break;
		case 3:
			value = EPlanState.Reviewing;
			break;
		case 4:
			value = EPlanState.Completed;
			break;
		case 5:
			value = EPlanState.Refused;
			break;
		case 6:
			value = EPlanState.Canceled;
			break;
		case 7:
			value = EPlanState.Expired;
			break;
		case 8:
			value = EPlanState.PartiallyCompleted;
			break;
		}
		return value;
	}

}

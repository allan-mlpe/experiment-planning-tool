package br.ufpe.cin.pcvt.converters;

import br.ufpe.cin.pcvt.data.models.experiments.EReviewState;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter (autoApply = true)
public class EReviewStateConverter implements AttributeConverter<EReviewState, Integer> {

	@Override
	public Integer convertToDatabaseColumn(EReviewState attribute) {
		Integer value = 0;

		switch (attribute) {
		case ReviewRequested:
			value = 0;
			break;
		case Reviewing:
			value = 1;
			break;
		case Completed:
			value = 2;
			break;
		case Canceled:
			value = 3;
			break;
		case Expired:
			value = 4;
			break;
		case Refused:
			value = 5;
			break;
		case Invalid:
		default:
			value = 6;
			break;
		}

		return value;
	}

	@Override
	public EReviewState convertToEntityAttribute(Integer dbData) {
		EReviewState value = null;
		switch (dbData) {
		case 0:
			value = EReviewState.ReviewRequested;
			break;
		case 1:
			value = EReviewState.Reviewing;
			break;
		case 2:
			value = EReviewState.Completed;
			break;
		case 3:
			value = EReviewState.Canceled;
			break;
		case 4:
			value = EReviewState.Expired;
			break;
		case 5:
			value = EReviewState.Refused;
			break;
		default:
			value = EReviewState.Invalid;
			break;
		}
		return value;
	}

}

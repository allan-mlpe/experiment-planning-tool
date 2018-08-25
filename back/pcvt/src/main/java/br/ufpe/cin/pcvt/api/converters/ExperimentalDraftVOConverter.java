package br.ufpe.cin.pcvt.api.converters;

import br.ufpe.cin.pcvt.api.models.ExperimentalDraftVO;
import br.ufpe.cin.pcvt.data.models.experiments.Draft;
import br.ufpe.cin.pcvt.data.models.experiments.EDraftType;

public class ExperimentalDraftVOConverter implements IVOConverter<Draft, ExperimentalDraftVO> {

    private static ExperimentalDraftVOConverter instace;

    private ExperimentalDraftVOConverter() {}

    public static ExperimentalDraftVOConverter getInstance() {
        if(instace == null) {
            instace = new ExperimentalDraftVOConverter();
        }

        return instace;
    }

    @Override
    public ExperimentalDraftVO convertToVO(Draft draft) {
        ExperimentalDraftVO draftVO = new ExperimentalDraftVO();

        draftVO.setId(draft.getId());
        draftVO.setName(draft.getName());
        draftVO.setDescription(draft.getDescription());
        draftVO.setAuthor(UserVOConverter.getInstance().convertToVO(draft.getAuthor()));
        draftVO.setDraftType(draft.getDraftType());
        draftVO.setCharacteristics(draft.getCharacteristics());
        draftVO.setCustomThreats(draft.getCustomThreats());

        if(draft.getDraftType() == EDraftType.FULL) {
            draftVO.setThreats(draft.getThreats());
            draftVO.setActions(draft.getActions());
            draftVO.setActionRelatedThreats(draft.getActionRelatedThreats());
        }

        return draftVO;
    }

    @Override
    public Draft convertFromVO(ExperimentalDraftVO object) {
        return null;
    }

    public Draft convertToSimpleDraft(ExperimentalDraftVO draftVO) {
        Draft draft = new Draft();

        draft.setName(draftVO.getName());
        draft.setDescription(draftVO.getDescription());
        draft.setDraftType(EDraftType.SIMPLE);

        return draft;
    }

    public Draft convertToFullDraft(ExperimentalDraftVO draftVO) {
        Draft draft = new Draft();

        draft.setName(draftVO.getName());
        draft.setDescription(draftVO.getDescription());
        draft.setDraftType(EDraftType.FULL);

        return draft;
    }
}

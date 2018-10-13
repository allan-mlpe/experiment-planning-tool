package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.assessment.QMethodologyAssessment;

import java.util.List;

public interface IQMethodologyAssessmentRepository {
    QMethodologyAssessment insert(QMethodologyAssessment assessment);
    QMethodologyAssessment get(Integer key);
    void remove(Integer key) throws Exception;
    QMethodologyAssessment update(QMethodologyAssessment assessment);
    List<QMethodologyAssessment> all();
}

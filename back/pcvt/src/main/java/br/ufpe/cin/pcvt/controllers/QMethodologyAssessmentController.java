package br.ufpe.cin.pcvt.controllers;

import br.ufpe.cin.pcvt.data.models.assessment.QMethodologyAssessment;
import br.ufpe.cin.pcvt.data.repositories.IQMethodologyAssessmentRepository;
import br.ufpe.cin.pcvt.data.repositories.RepositoryFactory;

import java.util.List;

public class QMethodologyAssessmentController {

    private IQMethodologyAssessmentRepository repository;

    public QMethodologyAssessmentController() {
        this.repository = RepositoryFactory.createQMethodologyRepository();
    }

    public QMethodologyAssessment create(QMethodologyAssessment assessment) {
        assessment = repository.insert(assessment);
        return assessment;
    }

    public List<QMethodologyAssessment> all() {
        List<QMethodologyAssessment> assessments = repository.all();
        return assessments;
    }
}

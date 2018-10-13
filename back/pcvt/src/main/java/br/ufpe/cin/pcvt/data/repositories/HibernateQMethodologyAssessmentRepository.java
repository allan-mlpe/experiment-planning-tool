package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.assessment.QMethodologyAssessment;
import br.ufpe.cin.pcvt.data.models.controlactions.ControlAction;
import br.ufpe.cin.pcvt.data.persistance.QMethodologyAssessmentDAO;
import br.ufpe.cin.pcvt.data.persistance.util.JPAHelper;

import java.util.List;

public class HibernateQMethodologyAssessmentRepository implements IQMethodologyAssessmentRepository {

    private QMethodologyAssessmentDAO dao;

    public HibernateQMethodologyAssessmentRepository() { dao = new QMethodologyAssessmentDAO(); }

    @Override
    public QMethodologyAssessment insert(QMethodologyAssessment assessment) {
        try {
            JPAHelper.getInstance().beginTransaction();
            assessment = dao.create(assessment);
            JPAHelper.getInstance().commit();
            return assessment;
        } catch(Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
    }

    @Override
    public QMethodologyAssessment get(Integer key) {
        QMethodologyAssessment assessment = dao.retrieve(key);
        return assessment;
    }

    @Override
    public void remove(Integer key) throws Exception {
        try {
            JPAHelper.getInstance().beginTransaction();
            QMethodologyAssessment assessment = dao.retrieve(key);
            if(assessment == null)
                throw new Exception("Assessment not found");
            JPAHelper.getInstance().commit();
        } catch(Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
    }

    @Override
    public QMethodologyAssessment update(QMethodologyAssessment assessment) {
        try {
            JPAHelper.getInstance().beginTransaction();
            assessment = dao.update(assessment);
            JPAHelper.getInstance().commit();
            return assessment;
        } catch (Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
    }

    @Override
    public List<QMethodologyAssessment> all() {
        List<QMethodologyAssessment> assessments = dao.retrieveAll();
        return assessments;
    }
}

package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.controlactions.ControlAction;
import br.ufpe.cin.pcvt.data.models.threats.Threat;
import br.ufpe.cin.pcvt.data.persistance.ControlActionDAO;
import br.ufpe.cin.pcvt.data.persistance.util.JPAHelper;

import java.util.List;

public class HibernateControlActionRepository implements IControlActionRepository {

    private ControlActionDAO dao;

    public HibernateControlActionRepository() { dao = new ControlActionDAO(); }

    @Override
    public ControlAction insert(ControlAction controlAction) {
        try {
            JPAHelper.getInstance().beginTransaction();
            controlAction = dao.create(controlAction);
            JPAHelper.getInstance().commit();
            return controlAction;
        } catch(Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
    }

    @Override
    public ControlAction get(Integer key) {
        ControlAction controlAction = dao.retrieve(key);
        return controlAction;
    }

    @Override
    public void remove(Integer key) throws Exception {
        try {
            JPAHelper.getInstance().beginTransaction();
            ControlAction controlAction = dao.retrieve(key);
            if(controlAction == null)
                throw new Exception("Control action not found");
            JPAHelper.getInstance().commit();
        } catch(Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
    }

    @Override
    public ControlAction update(ControlAction controlAction) {
        try {
            JPAHelper.getInstance().beginTransaction();
            controlAction = dao.update(controlAction);
            JPAHelper.getInstance().commit();
            return controlAction;
        } catch (Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
    }

    @Override
    public List<ControlAction> all() {
        List<ControlAction> controlActions = dao.retrieveAll();
        return controlActions;
    }

    @Override
    public List<Threat> getRelatedThreatsByControlActionKey(String key) {
        List<Threat> threats = dao.getRelatedThreatsByControlActionKey(key);
        return threats;
    }
}

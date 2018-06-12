package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.controlactions.ControlAction;
import br.ufpe.cin.pcvt.data.models.threats.Threat;
import br.ufpe.cin.pcvt.data.models.threats.ThreatType;
import br.ufpe.cin.pcvt.data.persistance.ThreatDAO;
import br.ufpe.cin.pcvt.data.persistance.util.JPAHelper;

import java.util.List;
import java.util.Set;

public class HibernateThreatRepository implements IThreatRepository {

    private ThreatDAO dao;

    public HibernateThreatRepository() { dao = new ThreatDAO(); }

    @Override
    public Threat insert(Threat threat) {
        try {
            JPAHelper.getInstance().beginTransaction();
            threat = dao.create(threat);
            JPAHelper.getInstance().commit();
            return threat;
        } catch (Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
    }

    @Override
    public Threat get(Integer key) {
        Threat threat = dao.retrieve(key);
        return threat;
    }

    @Override
    public void remove(Integer key) throws Exception {
        try {
            JPAHelper.getInstance().beginTransaction();
            Threat threat = dao.retrieve(key);
            if(threat == null)
                throw new Exception("Threat not found");
            dao.delete(threat);
            JPAHelper.getInstance().commit();
        } catch (Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
    }

    @Override
    public Threat update(Threat threat) {
        try {
            JPAHelper.getInstance().beginTransaction();
            threat = dao.update(threat);
            JPAHelper.getInstance().commit();
            return threat;
        } catch(Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
    }

    @Override
    public List<Threat> all() {
        List<Threat> threats = dao.retrieveAll();
        return threats;
    }

    @Override
    public List<Threat> getByType(ThreatType type) {
        List<Threat> threats = dao.getByType(type);
        return threats;
    }

    @Override
    public Set<ControlAction> getControlActionsByKeys(List<String> keys) {
        Set<ControlAction> controlActions = dao.getControlActionsByKeys(keys);
        return controlActions;
    }
}

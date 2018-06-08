package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.characteristics.Characteristic;
import br.ufpe.cin.pcvt.data.models.threats.Threat;
import br.ufpe.cin.pcvt.data.persistance.CharacteristicDAO;
import br.ufpe.cin.pcvt.data.persistance.util.JPAHelper;

import java.util.List;
import java.util.Set;

public class HibernateCharacteristicRepository implements ICharacteristicRepository {

    CharacteristicDAO dao;

    public HibernateCharacteristicRepository() { dao = new CharacteristicDAO(); }

    @Override
    public Characteristic insert(Characteristic characteristic) {
        try {
            JPAHelper.getInstance().beginTransaction();
            characteristic = dao.create(characteristic);
            JPAHelper.getInstance().commit();

            return characteristic;
        } catch(Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
    }

    @Override
    public Characteristic get(Integer key) {
        Characteristic characteristic = dao.retrieve(key);
        return characteristic;
    }

    @Override
    public void remove(Integer key) throws Exception {
        try {
            JPAHelper.getInstance().beginTransaction();
            Characteristic characteristic = dao.retrieve(key);
            if(characteristic == null)
                throw new Exception("Characteristic not found");
            dao.delete(characteristic);
            JPAHelper.getInstance().commit();
        } catch(Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
    }

    @Override
    public Characteristic update(Characteristic characteristic) {
        try {
            JPAHelper.getInstance().beginTransaction();
            characteristic = dao.update(characteristic);
            JPAHelper.getInstance().commit();
            return characteristic;
        } catch(Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
    }

    @Override
    public List<Characteristic> all() {
        List<Characteristic> characteristics = dao.retrieveAll();
        return characteristics;
    }

    @Override
    public Set<Threat> getThreatsByCharacteristicId(List<Integer> ids) {
        return dao.getThreatsByCharacteristicId(ids);
    }

    @Override
    public Set<Threat> getTreatsByCharacteristicKey(List<String> keys) {
        return dao.getThreatsByCharacteristicKey(keys);
    }
}

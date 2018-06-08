package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.characteristics.Characteristic;
import br.ufpe.cin.pcvt.data.models.threats.Threat;

import javax.persistence.NoResultException;
import java.util.List;
import java.util.Set;

public interface ICharacteristicRepository {

    Characteristic insert(Characteristic characteristic);
    Characteristic get(Integer key);
    void remove(Integer key) throws Exception;
    Characteristic update(Characteristic characteristic);
    List<Characteristic> all();

    Set<Threat> getThreatsByCharacteristicId(List<Integer> ids) throws NoResultException;

    Set<Threat> getTreatsByCharacteristicKey(List<String> keys) throws NoResultException;
}

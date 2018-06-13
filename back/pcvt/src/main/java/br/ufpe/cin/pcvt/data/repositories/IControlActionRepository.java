package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.controlactions.ControlAction;
import br.ufpe.cin.pcvt.data.models.threats.Threat;

import java.util.List;

public interface IControlActionRepository {

    ControlAction insert(ControlAction controlAction);
    ControlAction get(Integer key);
    void remove(Integer key) throws Exception;
    ControlAction update(ControlAction controlAction);
    List<ControlAction> all();

    List<Threat> getRelatedThreatsByControlActionKey(String key);
}

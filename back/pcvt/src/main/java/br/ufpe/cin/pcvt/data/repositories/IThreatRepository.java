package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.threats.Threat;
import br.ufpe.cin.pcvt.data.models.threats.ThreatType;

import java.util.List;

public interface IThreatRepository {

    //CRUD
    Threat insert(Threat threat);
    Threat get(Integer key);
    void remove(Integer key) throws Exception;
    Threat update(Threat threat);
    List<Threat> all();

    List<Threat> getByType(ThreatType type);
}

package br.ufpe.cin.pcvt.controllers;

import br.ufpe.cin.pcvt.data.models.threats.Threat;
import br.ufpe.cin.pcvt.data.models.threats.ThreatType;
import br.ufpe.cin.pcvt.data.repositories.IThreatRepository;
import br.ufpe.cin.pcvt.data.repositories.RepositoryFactory;

import java.util.List;

public class ThreatController {

    private IThreatRepository repository;

    protected ThreatController() {
        repository = RepositoryFactory.createThreatRepository();
    }

    public Threat insert(Threat t) {
        return repository.insert(t);
    }

    public List<Threat> all() {
        return repository.all();
    }

    public List<Threat> getByType(ThreatType type) {
        return repository.getByType(type);
    }
}

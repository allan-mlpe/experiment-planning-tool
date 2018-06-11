package br.ufpe.cin.pcvt.controllers;

import br.ufpe.cin.pcvt.data.models.controlactions.ControlAction;
import br.ufpe.cin.pcvt.data.repositories.IControlActionRepository;
import br.ufpe.cin.pcvt.data.repositories.RepositoryFactory;

import java.util.List;

public class ControlActionController {

    private IControlActionRepository repository;

    protected ControlActionController() { repository = RepositoryFactory.createControlActionRepository(); }

    public List<ControlAction> all() { return repository.all(); }
}

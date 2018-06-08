package br.ufpe.cin.pcvt.controllers;

import br.ufpe.cin.pcvt.data.models.characteristics.Characteristic;
import br.ufpe.cin.pcvt.data.models.threats.Threat;
import br.ufpe.cin.pcvt.data.repositories.ICharacteristicRepository;
import br.ufpe.cin.pcvt.data.repositories.RepositoryFactory;

import java.util.List;
import java.util.Set;

public class CharacteristicController {

    private ICharacteristicRepository repository;

    protected CharacteristicController() { repository = RepositoryFactory.createCharacteristicRepository(); }

    public List<Characteristic> all() { return repository.all(); }

    public Set<Threat> getThreatsById(List<Integer> ids) { return repository.getThreatsByCharacteristicId(ids); }

    public Set<Threat> getThreatsByKey(List<String> keys) { return repository.getTreatsByCharacteristicKey(keys); }

//    public static void main(String[] args) {
//        CharacteristicController characteristicController = new CharacteristicController();
//
//        characteristicController.all().forEach(c -> {
//
//            System.out.println(c.getId());
//            StringBuffer sb = new StringBuffer();
//            c.getRelatedThreats().forEach(t -> {
//                sb.append(String.format("[%s], ", t.getKey()));
//            });
//            System.out.println(sb.toString());
//            System.out.println();
//        });
//
//        List<Integer> ids = new ArrayList<>();
//        ids.add(1);
//        ids.add(2);
//        ids.add(3);
//        ids.add(7);
//
//
//        characteristicController.getThreatsById(ids).forEach(t -> {
//            System.out.println(t);
//        });
//    }
}

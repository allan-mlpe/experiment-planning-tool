package br.ufpe.cin.pcvt.data.persistance;

import br.ufpe.cin.pcvt.data.models.characteristics.Characteristic;
import br.ufpe.cin.pcvt.data.models.threats.Threat;
import br.ufpe.cin.pcvt.data.persistance.util.JPADAO;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CharacteristicDAO extends JPADAO<Characteristic, Integer> {

    public Set<Threat> getThreatsByCharacteristicId(List<Integer> ids) throws NoResultException {
        String jpqlString = "SELECT u FROM " + this.entityClass.getName() + " u WHERE u.id IN :ids";
        Query query = this.entityManager
                .createQuery(jpqlString, Characteristic.class)
                .setParameter("ids", ids);

        try {
            List<Characteristic> characteristics = query.getResultList();
            Set<Threat> threats = new HashSet<>();

            characteristics.forEach(ch -> {
                threats.addAll(ch.getRelatedThreats());
            });

            return threats;
        } catch(NoResultException nre) {
            throw nre;
        }
    }

    public Set<Threat> getThreatsByCharacteristicKey(List<String> keys) throws NoResultException {
        String jpqlString = "SELECT u FROM " + this.entityClass.getName() + " u WHERE u.key IN :keys";
        Query query = this.entityManager
                .createQuery(jpqlString, Characteristic.class)
                .setParameter("keys", keys);

        try {
            List<Characteristic> characteristics = query.getResultList();
            Set<Threat> threats = new HashSet<>();

            characteristics.forEach(ch -> {
                threats.addAll(ch.getRelatedThreats());
            });

            return threats;
        } catch(NoResultException nre) {
            throw nre;
        }
    }
}

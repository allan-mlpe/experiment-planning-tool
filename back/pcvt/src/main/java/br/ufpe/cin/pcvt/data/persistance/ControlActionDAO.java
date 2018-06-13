package br.ufpe.cin.pcvt.data.persistance;

import br.ufpe.cin.pcvt.data.models.controlactions.ControlAction;
import br.ufpe.cin.pcvt.data.models.threats.Threat;
import br.ufpe.cin.pcvt.data.persistance.util.JPADAO;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

public class ControlActionDAO extends JPADAO<ControlAction,Integer> {

    public List<Threat> getRelatedThreatsByControlActionKey(String key) {
        String jpqlString = "SELECT u FROM " + this.entityClass.getName() + " u WHERE u.key = :key";
        Query query = this.entityManager
                .createQuery(jpqlString, ControlAction.class)
                .setParameter("key", key);

        List<Threat> threats = new ArrayList<>();
        try {
            List<ControlAction> controlActions = query.getResultList();

            if(controlActions.size() > 0) {
                ControlAction controlAction = controlActions.get(0);
                threats = controlAction.getRelatedThreats();
            }
        } catch(NoResultException nre) {
            throw nre;
        }
        return threats;
    }
}

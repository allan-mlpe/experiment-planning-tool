package br.ufpe.cin.pcvt.data.persistance;

import br.ufpe.cin.pcvt.data.models.threats.Threat;
import br.ufpe.cin.pcvt.data.models.threats.ThreatType;
import br.ufpe.cin.pcvt.data.persistance.util.JPADAO;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.List;

public class ThreatDAO extends JPADAO<Threat, Integer> {

    public List<Threat> getByType(ThreatType type) throws NoResultException {
        Query query = this.entityManager
                .createQuery("SELECT u FROM " + this.entityClass.getName() + " u WHERE u.type = :type", Threat.class);
        query.setParameter("type", type);

        try {
            return query.getResultList();
        } catch (NoResultException nre) {
            throw nre;
        }
    }

}

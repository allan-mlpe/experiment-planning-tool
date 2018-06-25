package br.ufpe.cin.pcvt.data.persistance;

import br.ufpe.cin.pcvt.data.models.experiments.Draft;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.persistance.util.JPADAO;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

public class DraftDAO extends JPADAO<Draft, Integer> {

    public List<Draft> retrieveByAuthor(User user) {
        Query query = this.entityManager
                .createQuery("SELECT draft FROM " + this.entityClass.getName() + " draft WHERE draft.author = :user ", Draft.class);
        query.setParameter("user", user);
        try {
            return query.getResultList();
        } catch (NoResultException nre) {
            return new ArrayList<Draft>();
        }
    }
}

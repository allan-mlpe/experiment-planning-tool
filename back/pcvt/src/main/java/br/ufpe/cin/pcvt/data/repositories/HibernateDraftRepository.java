package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.experiments.Draft;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.persistance.DraftDAO;
import br.ufpe.cin.pcvt.data.persistance.util.JPAHelper;

import java.util.List;

public class HibernateDraftRepository implements IDraftRepository {

    private DraftDAO dao;

    public HibernateDraftRepository() {
        dao = new DraftDAO();
    }

    @Override
    public Draft insert(Draft draft) {

        JPAHelper.getInstance().beginTransaction();
        try {

            draft = dao.create(draft);

        } catch (Exception e) {
            e.printStackTrace();
            JPAHelper.getInstance().rollback();
        }
        JPAHelper.getInstance().commit();

        return draft;
    }

    @Override
    public Draft get(Integer key) {
        Draft draft = dao.retrieve(key);
        return draft;
    }

    @Override
    public void remove(Integer key) {
        JPAHelper.getInstance().beginTransaction();

        try {
            Draft draft = dao.retrieve(key);
            dao.delete(draft);

        } catch (Exception e) {
            JPAHelper.getInstance().rollback();
            throw e;
        }
        JPAHelper.getInstance().commit();
    }

    @Override
    public Draft update(Draft draft) {
        JPAHelper.getInstance().beginTransaction();
        draft = dao.update(draft);
        JPAHelper.getInstance().commit();
        return draft;
    }

    @Override
    public List<Draft> all() {
        List<Draft> drafts = dao.retrieveAll();

        return drafts;
    }

    @Override
    public List<Draft> retrieveByAuthor(User user) {
        return dao.retrieveByAuthor(user);
    }
}

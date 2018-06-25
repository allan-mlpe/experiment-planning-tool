package br.ufpe.cin.pcvt.controllers;

import br.ufpe.cin.pcvt.data.models.experiments.Draft;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.repositories.IDraftRepository;
import br.ufpe.cin.pcvt.data.repositories.IUserRepository;
import br.ufpe.cin.pcvt.data.repositories.RepositoryFactory;

import java.util.List;

public class DraftController {

    private IDraftRepository draftRepository;
    private IUserRepository userRepository;

    protected DraftController() {
        draftRepository = RepositoryFactory.createDraftRepository();
        userRepository = RepositoryFactory.createUserRepository();
    }

    public Draft insert(Draft draft, Integer authorId) {
        User author = userRepository.get(authorId);

        draft.setAuthor(author);
        draft = draftRepository.insert(draft);

        return draft;
    }

    public Draft get(Integer key) {
        return draftRepository.get(key);
    }

    public void remove(Integer key) {
        Draft draft = draftRepository.get(key);
        draftRepository.remove(key);
    }

    public Draft update(Draft draft) {
        return draftRepository.update(draft);
    }

    public List<Draft> all() {
        return draftRepository.all();
    }

    public List<Draft> retrieveByAuthor(User user) {
        return draftRepository.retrieveByAuthor(user);
    }
    
}

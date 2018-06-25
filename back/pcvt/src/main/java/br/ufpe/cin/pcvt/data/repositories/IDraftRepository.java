package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.experiments.Draft;
import br.ufpe.cin.pcvt.data.models.user.User;

import java.util.List;

public interface IDraftRepository {

    Draft insert(Draft draft);
    Draft get(Integer key);
    void remove(Integer key);
    Draft update(Draft draft);
    List<Draft> all();
    List<Draft> retrieveByAuthor(User user);
}

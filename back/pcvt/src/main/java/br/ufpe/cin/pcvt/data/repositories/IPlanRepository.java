package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.user.User;

import java.util.List;

public interface IPlanRepository {
	
	Plan insert(Plan plan);
	Plan get(Integer key);
	void remove(Integer key);
	Plan update(Plan plan);
	List<Plan> all();
	List<Plan> retrieveByAuthor(User user);
	List<Plan> retrieveByCollaborator(User user);
}

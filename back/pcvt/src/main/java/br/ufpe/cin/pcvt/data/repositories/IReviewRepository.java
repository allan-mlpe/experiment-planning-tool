package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.experiments.Review;
import br.ufpe.cin.pcvt.data.models.user.User;

import java.util.List;

public interface IReviewRepository {
	
	Review insert(Review review);
	Review get(Integer key);
	void remove(Integer key);
	Review update(Review review);
	List<Review> all();
	List<Review> retrieveByReviewer(User user);
}

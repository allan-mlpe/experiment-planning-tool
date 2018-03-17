package br.ufpe.cin.pcvt.data.persistance;

import br.ufpe.cin.pcvt.data.models.experiments.Review;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.persistance.util.JPADAO;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

public class ReviewDAO extends JPADAO <Review, Integer>{

	@SuppressWarnings("unchecked")
	public List<Review> retrieveByReviewer(User user) {
		Query query = this.entityManager
				.createQuery("SELECT review FROM " + this.entityClass.getName() + " review WHERE review.reviewer = :user ");
		query.setParameter("user", user);
		try {
			return (List<Review>) query.getResultList();
		} catch (NoResultException nre) {
			return new ArrayList<Review>();
		}
	}
}

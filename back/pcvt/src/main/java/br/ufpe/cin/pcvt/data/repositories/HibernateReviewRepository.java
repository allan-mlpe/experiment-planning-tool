package br.ufpe.cin.pcvt.data.repositories;

import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.experiments.Review;
import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.persistance.PlanDAO;
import br.ufpe.cin.pcvt.data.persistance.ReviewDAO;
import br.ufpe.cin.pcvt.data.persistance.UserDAO;
import br.ufpe.cin.pcvt.data.persistance.util.JPAHelper;

import java.util.List;

public class HibernateReviewRepository implements IReviewRepository {
	
	private ReviewDAO dao;
	private PlanDAO planDao;
	private UserDAO userDao;

	public HibernateReviewRepository() {
		dao = new ReviewDAO();
		planDao = new PlanDAO();
		userDao = new UserDAO(); 
	}

	@Override
	public Review insert(Review review) {
		
		JPAHelper.getInstance().beginTransaction();
		review = dao.create(review);
		JPAHelper.getInstance().commit();
		
		return review;
	}

	@Override
	public Review get(Integer key) {
		Review review = dao.retrieve(key);
		return review;
	}

	@Override
	public void remove(Integer key) {
		JPAHelper.getInstance().beginTransaction();
		
		try {
			Review review = dao.retrieve(key);
			Plan plan = review.getPlan();
			User user = review.getReviewer(); 
			
			plan.getReviews().remove(review);
			
			planDao.update(plan);
			userDao.update(user);
			dao.delete(review);
			
		} catch (Exception e) {
			JPAHelper.getInstance().rollback();
			throw e;
		}

		JPAHelper.getInstance().commit();
	}

	@Override
	public Review update(Review review) {
		JPAHelper.getInstance().beginTransaction();
		review = dao.update(review);
		JPAHelper.getInstance().commit();
		return review;
	}

	@Override
	public List<Review> all() {
		List<Review> reviews = dao.retrieveAll();
		return reviews;
	}

	@Override
	public List<Review> retrieveByReviewer(User user) {
		return dao.retrieveByReviewer(user);
	}
}

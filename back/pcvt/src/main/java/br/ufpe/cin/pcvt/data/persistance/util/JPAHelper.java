package br.ufpe.cin.pcvt.data.persistance.util;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.Stack;

public class JPAHelper {

	private static Logger logger = LogManager.getLogger(JPAHelper.class.getName());

	private static JPAHelper instance;

	private EntityManagerFactory emf;
	private EntityManager entityManagers;
	private Stack<EntityTransaction> transactions;

	static {
		try {
			instance = new JPAHelper();
		} catch (Throwable t) {
			logger.fatal("Error trying to instantiate the JPAHelper.", t);
		}
	}

	private JPAHelper() {
		this.emf = Persistence.createEntityManagerFactory("br.ufpe.cin.pcvt");
	}

	public static JPAHelper getInstance() {
		return instance;
	}

	public EntityManager getEntityManager() {
		EntityManager entityManager = entityManagers;

		if (entityManager == null) {
			entityManager = this.emf.createEntityManager();
			this.entityManagers = entityManager;
		}

		return entityManager;
	}

	public void beginTransaction() {
		EntityTransaction transaction = getEntityManager().getTransaction();
		transaction.begin();

		if (this.transactions == null) {
			this.transactions = new Stack<EntityTransaction>();
		}

		this.transactions.push(transaction);
	}

	public void commit() {
		this.transactions.peek().commit();
		this.transactions.pop();
	}

	public void rollback() {
		this.entityManagers.clear();

		EntityTransaction transaction = transactions.pop();
		if(transaction.isActive())
			this.transactions.pop().rollback();
	}
}

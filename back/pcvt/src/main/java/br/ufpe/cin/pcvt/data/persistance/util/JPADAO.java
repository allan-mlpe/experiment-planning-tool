package br.ufpe.cin.pcvt.data.persistance.util;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

public abstract class JPADAO<E, K extends Serializable> implements DAO<E, K> {

	protected Class<E> entityClass;
	protected EntityManager entityManager;

	public JPADAO(Class<E> entityClass) {
		this.entityClass = entityClass;
		this.entityManager = JPAHelper.getInstance().getEntityManager();
	}

	@SuppressWarnings("unchecked")
	public JPADAO() {
		ParameterizedType genericSuperclass = (ParameterizedType) getClass().getGenericSuperclass();
		this.entityClass = (Class<E>) genericSuperclass.getActualTypeArguments()[0];
		this.entityManager = JPAHelper.getInstance().getEntityManager();
	}

	public E create(E entity) {
		E mergedEntity = this.entityManager.merge(entity);
		return mergedEntity;
	}

	public E retrieve(K key) {
		E rvalue;
		rvalue = this.entityManager.find(this.entityClass, key);
		return rvalue;
	}

	@SuppressWarnings("unchecked")
	public List<E> retrieveAll() {
		Query query;
		query = this.entityManager.createQuery("SELECT e FROM " + this.entityClass.getName() + " e");
		return query.getResultList();
	}

	public E update(E entity) {
		E rvalue;
		rvalue = this.entityManager.merge(entity);
		this.entityManager.merge(rvalue);
		return rvalue;
	}

	public void delete(E entity) {
		entity = this.entityManager.merge(entity);
		this.entityManager.remove(entity);
	}
}

package br.ufpe.cin.pcvt.data.persistance.util;

import java.io.Serializable;
import java.util.List;

public interface DAO<E,K extends Serializable> {

	public E create(E entity);
	
	public E retrieve(K key);
	
	public List<E> retrieveAll();
	
	public E update(E entity);
	
	public void delete(E entity);
	
}

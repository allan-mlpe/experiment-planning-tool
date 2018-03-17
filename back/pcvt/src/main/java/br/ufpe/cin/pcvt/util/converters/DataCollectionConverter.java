package br.ufpe.cin.pcvt.util.converters;

import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;

public class DataCollectionConverter <K> {

	public List<K> toList(K[] array){
		List<K> list = new ArrayList<K>();
		
		for (K k : array) {
			list.add(k);
		}
		return list;		
	}
	
	public List<K> toList(SortedSet<K> array){
		List<K> list = new ArrayList<K>();
		
		for (K k : array) {
			list.add(k);
		}
		return list;		
	}
}

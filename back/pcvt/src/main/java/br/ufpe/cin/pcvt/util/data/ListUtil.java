package br.ufpe.cin.pcvt.util.data;

import java.util.*;

public class ListUtil<T> {

	public List<T> clone(List<T> toClone) {
		List<T> clone = new ArrayList<T>();
		if (toClone != null) {
			for (T element : toClone) {
				clone.add(element);
			}
		}

		return clone;
	}
	
	public Set<T> clone(Set<T> toClone) {
		Set<T> clone = new HashSet<T>();
		if (toClone != null) {
			for (T element : toClone) {
				clone.add(element);
			}
		}

		return clone;
	}
	
	public SortedSet<T> clone(SortedSet<T> toClone) {
		SortedSet<T> clone = new TreeSet<T>();
		if (toClone != null) {
			for (T element : toClone) {
				clone.add(element);
			}
		}

		return clone;
	}
}

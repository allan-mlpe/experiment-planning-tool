package br.ufpe.cin.pcvt.data.models.user;

import br.ufpe.cin.pcvt.data.persistance.constants.TableName;

import javax.persistence.*;
import java.util.SortedSet;
import java.util.TreeSet;

@Entity
@Table(name = TableName.USER_GROUP)
public class UserGroup implements Comparable<UserGroup> {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "usergroup_sequence", sequenceName = "usergroup_sequence")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usergroup_sequence")
	private Integer id;
	@Column(name = "name")
	private String name;

	// Relations
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@OrderBy("name ASC")
	@JoinTable(name="user_group_has_manager")
	private SortedSet<User> managers;
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@OrderBy("name ASC")
	@JoinTable(name="user_group_has_members")
	private SortedSet<User> members;

	public UserGroup() {
		members = new TreeSet<>();
		managers = new TreeSet<>();
	}

	public UserGroup(String name) {
		super();
		this.name = name;
		members = new TreeSet<>();
		managers = new TreeSet<>();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public SortedSet<User> getManagers() {
		return managers;
	}

	public void setManagers(SortedSet<User> managers) {
		this.managers = managers;
	}

	public SortedSet<User> getMembers() {
		return members;
	}

	public void setMembers(SortedSet<User> members) {
		this.members = members;
	}

	@Override
	public int compareTo(UserGroup o) {
		return this.id - o.id;
	}
}

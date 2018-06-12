package br.ufpe.cin.pcvt.data.models.user;

import br.ufpe.cin.pcvt.data.persistance.constants.TableName;

import javax.persistence.*;

@Entity
@Table(name = TableName.USER)
public class User implements Comparable<User>{
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "usersystem_sequence", sequenceName = "usersystem_sequence")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usersystem_sequence")
	private Integer id;
	@Column(name = "email", unique = true)
	private String email;
	@Column(name = "password")
	private String password;
	@Column(name = "deactivated")
	private boolean deactivated;
	@Column(name = "admin")
	private boolean admin;

	// Profile
	@Column(name = "name")
	private String name;
	@Column(name = "institution")
	private String institution;
	@Column(name = "profileLink")
	private String profileLink;
	@Column(name = "work_area")
	private String workArea;
	@Column(name = "available")
	private boolean available;
	@Column(name = "collaborator")
	private boolean collaborator;

	public User() {
	}

	public User(String name, String email, String password) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isDeactivated() {
		return deactivated;
	}

	public void setDeactivated(boolean deactivated) {
		this.deactivated = deactivated;
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getInstitution() {
		return institution;
	}

	public void setInstitution(String institution) {
		this.institution = institution;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email.trim();
	}

	public String getProfileLink() {
		return profileLink;
	}

	public void setProfileLink(String profileLink) {
		if(profileLink != null) {
			if (profileLink.startsWith("http://") || profileLink.startsWith("https://")) {
				this.profileLink = profileLink;
			} else {
				this.profileLink = "http://"+profileLink;
			}
		}
	}

	public String getWorkArea() {
		return workArea;
	}

	public void setWorkArea(String workArea) {
		this.workArea = workArea;
	}

	public boolean isAvailable() {
		return available && !deactivated	;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	public boolean isCollaborator() {
		return collaborator;
	}

	public void setCollaborator(boolean collaborator) {
		this.collaborator = collaborator;
	}

	@Override
	public int compareTo(User o) {
		return this.id - o.id;
	}
}

package br.ufpe.cin.pcvt.data.models.user;

import br.ufpe.cin.pcvt.data.persistance.constants.TableName;

import javax.persistence.*;

@Entity
@Table(name = TableName.USER_TOKEN)
public class UserToken {
	@Id
	@Column(name = "id")
	@SequenceGenerator(name = "usersystemtoken_sequence", sequenceName = "usersystemtoken_sequence")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usersystemtoken_sequence")
	private Integer id;
	@OneToOne
	@JoinColumn(name = "sys_user_id")
	private User user;
	@Column(name = "token")
	private String token;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
}

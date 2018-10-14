package br.ufpe.cin.pcvt.data.models.assessment;

import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.persistance.constants.TableName;

import javax.persistence.*;

@Entity
@Table(name = TableName.Q_METHODOLOGY_ASSESSMENT)
public class QMethodologyAssessment {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Lob
    @Column(name = "content")
    private String content;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author", unique = true)
    private User user;

    public QMethodologyAssessment() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

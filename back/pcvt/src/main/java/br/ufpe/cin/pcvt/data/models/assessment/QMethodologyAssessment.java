package br.ufpe.cin.pcvt.data.models.assessment;

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
}

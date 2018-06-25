package br.ufpe.cin.pcvt.data.models.experiments;

import br.ufpe.cin.pcvt.data.models.user.User;
import br.ufpe.cin.pcvt.data.persistance.constants.TableName;

import javax.persistence.*;

@Entity
@Table(name = TableName.DRAFT)
public class Draft {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "draft_type")
    private EDraftType draftType;

    @Column(name = "author")
    private User author;

    @Lob
    @Column(name = "characteristics")
    private String planCharacteristics;

    @Lob
    @Column(name = "threats")
    private String planThreats;

    @Lob
    @Column(name = "actions")
    private String actions;

    @Lob
    @Column(name = "related_threats")
    private String actionRelatedThreats;

    public Draft() {}

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EDraftType getDraftType() {
        return draftType;
    }

    public void setDraftType(EDraftType draftType) {
        this.draftType = draftType;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getPlanCharacteristics() {
        return planCharacteristics;
    }

    public void setPlanCharacteristics(String planCharacteristics) {
        this.planCharacteristics = planCharacteristics;
    }

    public String getPlanThreats() {
        return planThreats;
    }

    public void setPlanThreats(String planThreats) {
        this.planThreats = planThreats;
    }

    public String getActions() {
        return actions;
    }

    public void setActions(String actions) {
        this.actions = actions;
    }

    public String getActionRelatedThreats() {
        return actionRelatedThreats;
    }

    public void setActionRelatedThreats(String actionRelatedThreats) {
        this.actionRelatedThreats = actionRelatedThreats;
    }
}

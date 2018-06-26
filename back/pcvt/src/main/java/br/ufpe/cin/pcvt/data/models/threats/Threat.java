package br.ufpe.cin.pcvt.data.models.threats;

import br.ufpe.cin.pcvt.data.models.controlactions.ControlAction;
import br.ufpe.cin.pcvt.data.persistance.constants.TableName;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = TableName.THREAT)
public class Threat {

    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "threat_seq", sequenceName = "threat_seq", initialValue = 64, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "threat_seq")
    private Integer id;

    @Column(name = "key")
    private String key;

    @Column(name = "label")
    private String label;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "description")
    private String description;

    @ManyToMany
    @JoinTable(name = "control_actions_for_threats",
            joinColumns = {@JoinColumn(name = "threat_id")},
            inverseJoinColumns = {@JoinColumn(name = "control_action_id")}
    )
    private List<ControlAction> relatedControlActions;

    @Column(name = "threat_type")
    private ThreatType type;

    public Threat() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ControlAction> getRelatedControlActions() {
        return relatedControlActions;
    }

    public void setRelatedControlActions(List<ControlAction> relatedControlActions) {
        this.relatedControlActions = relatedControlActions;
    }

    public ThreatType getType() {
        return type;
    }

    public void setType(ThreatType type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return String.format("[%s] (%s Validity) - %s", key, type.getName(), label);
    }
}

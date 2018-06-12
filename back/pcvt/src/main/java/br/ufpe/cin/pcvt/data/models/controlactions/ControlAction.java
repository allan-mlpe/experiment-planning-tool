package br.ufpe.cin.pcvt.data.models.controlactions;

import br.ufpe.cin.pcvt.data.models.threats.Threat;
import br.ufpe.cin.pcvt.data.persistance.constants.TableName;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;
import java.util.List;

@Entity
@Table(name = TableName.CONTROL_ACTION)
public class ControlAction {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "key")
    private String key;

    @Column(name = "label")
    private String label;

    @ManyToMany
    @JoinTable(name = "threats_for_control_actions",
            joinColumns = {@JoinColumn(name = "control_action_id")},
            inverseJoinColumns = {@JoinColumn(name = "threat_id")}
    )
    private List<Threat> relatedThreats;

    public ControlAction() {}

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

    @JsonIgnore
    @XmlTransient
    public List<Threat> getRelatedThreats() {
        return relatedThreats;
    }

    public void setRelatedThreats(List<Threat> relatedThreats) {
        this.relatedThreats = relatedThreats;
    }
}

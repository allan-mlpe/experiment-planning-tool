package br.ufpe.cin.pcvt.data.models.characteristics;

import br.ufpe.cin.pcvt.data.models.threats.Threat;
import br.ufpe.cin.pcvt.data.persistance.constants.TableName;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = TableName.CHARACTERISTIC)
public class Characteristic {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "category")
    private String category;

    @Column(name = "key")
    private String key;

    @Column(name = "label")
    private String label;

    @ManyToMany
    @JoinTable(name = "threats_for_characteristics",
            joinColumns = {@JoinColumn(name = "characteristic_id")},
            inverseJoinColumns = {@JoinColumn(name = "threat_id")}
    )
    private List<Threat> relatedThreats;

    public Characteristic() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public List<Threat> getRelatedThreats() {
        return relatedThreats;
    }

    public void setRelatedThreats(List<Threat> relatedThreats) {
        this.relatedThreats = relatedThreats;
    }
}

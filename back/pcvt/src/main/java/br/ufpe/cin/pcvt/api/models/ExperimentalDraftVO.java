package br.ufpe.cin.pcvt.api.models;

import br.ufpe.cin.pcvt.data.models.experiments.EDraftType;

public class ExperimentalDraftVO {

    private Integer id;
    private String name;
    private String description;
    private EDraftType draftType;
    private UserVO author;
    private String characteristics;
    private String threats;
    private String actions;
    private String actionRelatedThreats;
    private String customThreats;

    public ExperimentalDraftVO() {}

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

    public UserVO getAuthor() {
        return author;
    }

    public void setAuthor(UserVO author) {
        this.author = author;
    }

    public String getCharacteristics() {
        return characteristics;
    }

    public void setCharacteristics(String characteristics) {
        this.characteristics = characteristics;
    }

    public String getThreats() {
        return threats;
    }

    public void setThreats(String threats) {
        this.threats = threats;
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

    public String getCustomThreats() {
        return customThreats;
    }

    public void setCustomThreats(String customThreats) {
        this.customThreats = customThreats;
    }
}

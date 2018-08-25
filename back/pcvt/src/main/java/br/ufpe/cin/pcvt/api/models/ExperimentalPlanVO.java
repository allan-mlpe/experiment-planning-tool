package br.ufpe.cin.pcvt.api.models;

import br.ufpe.cin.pcvt.data.models.experiments.EPlanState;
import br.ufpe.cin.pcvt.data.models.experiments.EPrivacy;
import br.ufpe.cin.pcvt.data.models.experiments.Review;

import java.util.Collection;
import java.util.Date;
import java.util.List;

public class ExperimentalPlanVO {

    private Integer id;
    private String name;
    private String description;
    private Integer version;
    private UserVO author;
    private Collection<UserVO> collaborators;
    private Date date;
    private EPrivacy privacySetting;
    private EPlanState state;
    private List<Review> reviews;
    private boolean archived;
    private String details;
    private String characteristics;
    private String threats;
    private String actions;
    private String actionRelatedThreats;
    private String customThreats;
    private Boolean hasChild;
    private Boolean isCustom;
    private String fileName;

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

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public UserVO getAuthor() {
        return author;
    }

    public void setAuthor(UserVO author) {
        this.author = author;
    }

    public Collection<UserVO> getCollaborators() {
        return collaborators;
    }

    public void setCollaborators(Collection<UserVO> collaborators) {
        this.collaborators = collaborators;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public EPrivacy getPrivacySetting() {
        return privacySetting;
    }

    public void setPrivacySetting(EPrivacy privacySetting) {
        this.privacySetting = privacySetting;
    }

    public EPlanState getState() {
        return state;
    }

    public void setState(EPlanState state) {
        this.state = state;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
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

    public String getActionRelatedThreats() { return actionRelatedThreats; }

    public void setActionRelatedThreats(String actionRelatedThreats) { this.actionRelatedThreats = actionRelatedThreats; }

    public Boolean getHasChild() {
        return hasChild;
    }

    public void setHasChild(Boolean hasChild) {
        this.hasChild = hasChild;
    }

    public Boolean getCustom() {
        return isCustom;
    }

    public void setCustom(Boolean custom) {
        isCustom = custom;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getCustomThreats() {
        return customThreats;
    }

    public void setCustomThreats(String customThreats) {
        this.customThreats = customThreats;
    }
}

package br.ufpe.cin.pcvt.api.models;

/**
 * @author Allan Monteiro de Lima (aml3@cin.ufpe.br)
 */
public class UserVO {

    private Integer id;
    private String name;
    private String email;
    private String profileLink;
    private String workArea;

    private String institution;

    private Boolean admin;
    private Boolean collaborator;
    private Boolean available;

    private String token;

    public UserVO() { }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileLink() {
        return profileLink;
    }

    public void setProfileLink(String profileLink) {
        this.profileLink = profileLink;
    }

    public String getWorkArea() {
        return workArea;
    }

    public void setWorkArea(String workArea) {
        this.workArea = workArea;
    }

    public Boolean isAdmin() {
        return admin;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public Boolean isCollaborator() {
        return collaborator;
    }

    public void setCollaborator(Boolean collaborator) {
        this.collaborator = collaborator;
    }

    public Boolean isAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}

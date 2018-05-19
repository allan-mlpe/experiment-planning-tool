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

    private Boolean isAdmin;
    private Boolean isCollaborator;
    private Boolean isAvailable;

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
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public Boolean isCollaborator() {
        return isCollaborator;
    }

    public void setCollaborator(Boolean collaborator) {
        isCollaborator = collaborator;
    }

    public Boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}

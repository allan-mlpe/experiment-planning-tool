package br.ufpe.cin.pcvt.api.models;

import br.ufpe.cin.pcvt.data.models.user.User;

public class UserVO {

    private String name;
    private String email;
    private String profileLink;
    private String workArea;

    private Boolean isAdmin;
    private Boolean isCollaborator;
    private Boolean isAvailable;

    public UserVO() { }

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

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public Boolean getCollaborator() {
        return isCollaborator;
    }

    public void setCollaborator(Boolean collaborator) {
        isCollaborator = collaborator;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    public static void main(String[] args) {
    }
}

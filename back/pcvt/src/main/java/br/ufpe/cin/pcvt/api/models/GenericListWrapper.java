package br.ufpe.cin.pcvt.api.models;

import java.util.List;

public class GenericListWrapper {

    private List<String> stringList;

    public GenericListWrapper() {}

    public List<String> getStringList() {
        return stringList;
    }

    public void setStringList(List<String> stringList) {
        this.stringList = stringList;
    }
}

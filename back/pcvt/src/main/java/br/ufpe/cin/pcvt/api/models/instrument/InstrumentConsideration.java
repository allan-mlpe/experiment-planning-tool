package br.ufpe.cin.pcvt.api.models.instrument;

import java.util.List;

public class InstrumentConsideration {
    private String state;
    private List<String> items;

    public InstrumentConsideration() {}

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }
}

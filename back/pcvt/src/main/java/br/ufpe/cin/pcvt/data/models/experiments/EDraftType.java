package br.ufpe.cin.pcvt.data.models.experiments;

public enum EDraftType {
    SIMPLE("Simple"),
    FULL("Full");

    private String label;

    private EDraftType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}

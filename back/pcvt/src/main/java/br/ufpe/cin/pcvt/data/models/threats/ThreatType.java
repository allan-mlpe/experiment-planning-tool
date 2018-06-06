package br.ufpe.cin.pcvt.data.models.threats;

public enum ThreatType {

    INTERNAL("Internal"),
    EXTERNAL("External"),
    CONSTRUCT("Construct"),
    CONCLUSION("Conclusion");

    String name;

    private ThreatType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

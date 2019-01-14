package br.ufpe.cin.pcvt.api.models.instrument;

public class InstrumentQuestion {
    private String projectKey;
    private String title;
    private String hint;
    private String fieldType;
    private InstrumentConsideration considerations;

    public InstrumentQuestion() {}

    public String getProjectKey() {
        return projectKey;
    }

    public void setProjectKey(String projectKey) {
        this.projectKey = projectKey;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    public InstrumentConsideration getConsiderations() {
        return considerations;
    }

    public void setConsiderations(InstrumentConsideration considerations) {
        this.considerations = considerations;
    }

    public String getFieldType() {
        return fieldType;
    }

    public void setFieldType(String fieldType) {
        this.fieldType = fieldType;
    }
}

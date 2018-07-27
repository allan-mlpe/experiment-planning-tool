package br.ufpe.cin.pcvt.api.models.instrument;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.nio.charset.Charset;
import java.util.List;

public class InstrumentSection {
    private String section;
    private String key;
    private String description;
    private List<InstrumentQuestion> questions;

    public InstrumentSection() {}

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<InstrumentQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<InstrumentQuestion> questions) {
        this.questions = questions;
    }
}

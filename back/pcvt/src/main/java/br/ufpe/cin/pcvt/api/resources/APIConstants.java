package br.ufpe.cin.pcvt.api.resources;

import br.ufpe.cin.pcvt.api.models.instrument.InstrumentSection;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import javax.ws.rs.core.MediaType;
import java.io.InputStream;
import java.io.StringWriter;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

public class APIConstants {

    private static Logger logger = LogManager.getLogger(APIConstants.class.getName());

    private static final String CHARSET_UTF8 = ";charset=utf-8";
    public static final String APPLICATION_JSON = MediaType.APPLICATION_JSON + CHARSET_UTF8;
    public static final List<InstrumentSection> INSTRUMENT_SECTIONS = buildInstrumentObject();

    private static List<InstrumentSection> buildInstrumentObject() {
        List<InstrumentSection> sections = new ArrayList<>();
        try {
            ClassLoader classLoader = InstrumentSection.class.getClassLoader();
            InputStream resourceAsStream1 = classLoader.getResourceAsStream("json-resources/instrument_questions.json");
            StringWriter stringWriter = new StringWriter();
            IOUtils.copy(resourceAsStream1, stringWriter, Charset.defaultCharset());

            //System.out.println(stringWriter.toString());

            Gson gson = new Gson();

            sections = gson.fromJson(stringWriter.toString(), new TypeToken<List<InstrumentSection>>() {
            }.getType());

        } catch (Exception e) {
            logger.error("Unable to build instrument object", e);
        }

        return sections;
    }

}

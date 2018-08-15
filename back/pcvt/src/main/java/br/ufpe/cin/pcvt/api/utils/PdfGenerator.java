package br.ufpe.cin.pcvt.api.utils;

import br.ufpe.cin.pcvt.api.models.instrument.InstrumentQuestion;
import br.ufpe.cin.pcvt.api.models.instrument.InstrumentSection;
import br.ufpe.cin.pcvt.api.resources.APIConstants;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.threats.Threat;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class PdfGenerator {

    public static final String THREATS_SECTION_KEY = "tv";

    private static Font getBoldFormat(Integer size) {
        return new Font(Font.FontFamily.HELVETICA, size, Font.BOLD);
    }

    private static Paragraph getBoldParagraph(String paragraphContent, Integer size) {
        return new Paragraph(paragraphContent, getBoldFormat(size));
    }

    private static Paragraph getItalicParagraph(String paragraphContent, Integer size) {
        Font italic = new Font(Font.FontFamily.HELVETICA, size, Font.ITALIC);
        return new Paragraph(paragraphContent, italic);
    }

    private static Paragraph getSingleParagraph(String paragraphContent) {
        return new Paragraph(paragraphContent);
    }

    private static PdfPTable getHeader(Plan experimentalPlan) {
        PdfPTable table = new PdfPTable(2);

        PdfPCell cell;

        cell = new PdfPCell(new Phrase("ValidEPlan - Validity-Driven Software Engineering Experiments Planning Tool"));
        cell.setColspan(2);
        table.addCell(cell);

        table.addCell("Experiment name:");
        table.addCell(experimentalPlan.getName());
        table.addCell("Experiment Description");
        table.addCell(experimentalPlan.getDescription());

        return table;
    }

    private static Paragraph getKeyValueParagraph(String label, String value) {
        Chunk keyChunk = new Chunk(label, getBoldFormat(12));
        Chunk valueChunk = new Chunk(value);
        Paragraph p1 = new Paragraph();
        p1.add(keyChunk);
        p1.add(valueChunk);

        return p1;
    }

    public static ByteArrayOutputStream generatePlanReport(Plan experimentalPlan,
                                                           Map<String, List<Threat>> groupedThreats) {
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            Map<String, String> detailsMap = JsonUtils.parseToSimpleMap(experimentalPlan.getDetails());

            List<InstrumentSection> instrumentQuestions = APIConstants.INSTRUMENT_SECTIONS;
            int questionNumber = 1;
            PdfWriter.getInstance(document, baos);

            document.open();

            // report header
            document.add(getBoldParagraph("ValidEPlan - Validity-Driven Software Engineering Experiments Planning Tool", 14));
            document.add(Chunk.NEWLINE);
            document.add(getKeyValueParagraph("Experiment name: ", experimentalPlan.getName()));
            document.add(getKeyValueParagraph("Experiment description: ", experimentalPlan.getDescription()));
            document.add(Chunk.NEWLINE);


            for(InstrumentSection section : instrumentQuestions) {
                document.add(getBoldParagraph(section.getSection(), 12));
                document.add(Chunk.NEWLINE);

                for(InstrumentQuestion question : section.getQuestions()) {
                    String questionStatement =
                            String.format("%d. %s", questionNumber, question.getTitle());
                    document.add(getItalicParagraph(questionStatement, 12));

                    document.add(getSingleParagraph(detailsMap.get(question.getProjectKey())));
                    document.add(Chunk.NEWLINE);

                    if(section.getKey().equals(THREATS_SECTION_KEY)) {
                        buildSuggestedThreats(document, groupedThreats);
                    }

                    questionNumber++;
                }

                document.add(Chunk.NEWLINE);
                document.add(Chunk.NEWLINE);
            }
        }
        catch(DocumentException de) {
            System.err.println(de.getMessage());
        }
        document.close();

        return baos;
    }

    private static void buildSuggestedThreats(Document document, Map<String, List<Threat>> groupedThreats) throws DocumentException {

        Set<String> types = groupedThreats.keySet();
        for(String type : types) {
            Paragraph threatType = getItalicParagraph(String.format("# %s #", type), 12);
            document.add(threatType);

            document.add(Chunk.NEWLINE);

            List<Threat> threats = groupedThreats.get(type);
            for(Threat t : threats) {
                Paragraph threatDescription =
                        getSingleParagraph(String.format("- %s: %s", t.getLabel(), t.getDescription()));

                document.add(threatDescription);
            }

            document.add(Chunk.NEWLINE);
        }
    }
}

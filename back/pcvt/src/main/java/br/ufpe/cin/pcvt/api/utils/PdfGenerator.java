package br.ufpe.cin.pcvt.api.utils;

import br.ufpe.cin.pcvt.api.models.instrument.InstrumentQuestion;
import br.ufpe.cin.pcvt.api.models.instrument.InstrumentSection;
import br.ufpe.cin.pcvt.api.resources.APIConstants;
import br.ufpe.cin.pcvt.data.models.experiments.Plan;
import br.ufpe.cin.pcvt.data.models.threats.Threat;
import com.google.gson.internal.LinkedTreeMap;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
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
            Map<String, Object> detailsMap = JsonUtils.parseToGenericMap(experimentalPlan.getDetails());

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

                    Object auxObject = detailsMap.get(question.getProjectKey());

                    if(auxObject instanceof String) {
                        String statement = auxObject.toString();
                        document.add(getSingleParagraph(statement));
                    } else if(auxObject instanceof LinkedTreeMap) {
                        // if hits here, the field has text and tables
                        LinkedTreeMap<String, Object> auxMap
                                = (LinkedTreeMap<String, Object>) auxObject;

                        // write text field
                        String textField = (String) auxMap.get("text");
                        document.add(getSingleParagraph(textField));

                        // draw table
                        Object tableObject = auxMap.get("table");
                        if(tableObject != null) {
                            PdfPTable table = buildAnswerTable(tableObject, document);
                            document.add(table);
                        }

                    } else {
                        PdfPTable table = buildAnswerTable(auxObject, document);
                        document.add(table);
                    }

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

    private static PdfPTable buildAnswerTable(Object obj, Document document) throws DocumentException {
        document.add(Chunk.NEWLINE);
        PdfPTable table = null;
        List<LinkedTreeMap<String, String>> answerTable = (ArrayList<LinkedTreeMap<String, String>>) obj;

        if(answerTable.size() > 0) {
            // each item is a table row <tr>
            for (LinkedTreeMap<String, String> item : answerTable) {
                Set<Map.Entry<String, String>> entries = item.entrySet();

                if (table == null) {
                    table = new PdfPTable(entries.size());
                }

                // each entry is a table data <td>
                for (Map.Entry<String, String> entry : entries) {
                    String value = entry.getValue();

                    buildTableCell(table, value);
                }
            }
        }

        return table;
    }

    private static void buildTableCell(PdfPTable table, String value) {
        PdfPCell cell = new PdfPCell(new Phrase(value.length() != 0 ? value : " "));
        table.addCell(cell);
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

    public static void main(String[] args) {
        String details = "{\"sg1\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"sg2\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"sg3\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"hvm1\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"hvm2\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"hvm3\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"p1\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"p2\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"p3\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"p4\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"p5\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"p6\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"emt1\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"emt2\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"emt3\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"ed1\":[{\"p1\":\"esta é uma tabela simples\"}],\"ed2\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"ed3\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"ed4\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"pcd1\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"pcd2\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"pcd3\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"pcd4\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"pcd5\":[{\"p1\":\"esta é uma tabela complexta\",\"715kdv\":\"esta também\"},{\"p1\":\"ok mano\",\"715kdv\":\"espero que dê certo né\"}],\"dcda1\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"dcda2\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"dcda3\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"dcda4\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\",\"tv1\":[{\"p1\":\"\"}],\"d1\":\"Assim mesmo, o consenso sobre a necessidade de qualificação obstaculiza a apreciação da importância dos modos de operação convencionais. Desta maneira, o entendimento das metas propostas cumpre um papel essencial na formulação do sistema de participação geral. Caros amigos, a mobilidade dos capitais internacionais acarreta um processo de reformulação e modernização das diretrizes de desenvolvimento para o futuro\"}";
    }
}

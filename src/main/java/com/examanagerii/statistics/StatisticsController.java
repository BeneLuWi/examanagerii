package com.examanagerii.statistics;

import com.examanagerii.exam.Exam;
import com.examanagerii.exam.ExamRepository;
import com.examanagerii.group.Group;
import com.examanagerii.group.GroupRepository;
import com.examanagerii.result.Exercise;
import com.examanagerii.result.Result;
import com.examanagerii.result.ResultRepository;
import com.examanagerii.student.Student;
import com.examanagerii.student.StudentRepository;
import com.opencsv.CSVWriter;
import com.opencsv.CSVWriterBuilder;
import com.opencsv.ICSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/statistics")
public class StatisticsController {


    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ResultRepository resultRepository;

    @Autowired
    ExamRepository examRepository;

    @Autowired
    GroupRepository groupRepository;

    @GetMapping("/getStatistics/{examId}/{groupId}")
    public Statistics getStatistics(@PathVariable("examId") String examId, @PathVariable("groupId") String groupId) {

        List<Result> results = resultRepository.findResultsByGroupIdAndExamId(groupId, examId);

        List<String> studIds = results.stream().map(Result::getStudentId).collect(Collectors.toList());

        List<Student> students = studentRepository
                .findByIdIn(studIds);

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new NoSuchElementException(examId));

        return new Statistics(exam, results, students);

    }

    @GetMapping("/downloadCsv/{examId}/{groupId}")
    public void exportCSV(HttpServletResponse response, @PathVariable("examId") String examId, @PathVariable("groupId") String groupId) throws Exception {

        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new NoSuchElementException(examId));
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new NoSuchElementException(groupId));
        List<Result> results = resultRepository.findResultsByGroupIdAndExamId(groupId, examId);
        List<String> studIds = results.stream().map(Result::getStudentId).collect(Collectors.toList());
        List<Student> students = studentRepository
                .findByIdIn(studIds);

        //set file name and content type
        String filename = exam.getName() + "_"+ group.getName() + ".csv";

        response.setContentType("text/csv");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + filename + "\"");

        //create a csv writer
        ICSVWriter writer = new CSVWriterBuilder(response.getWriter())
                .withQuoteChar(CSVWriter.NO_QUOTE_CHARACTER)
                .withSeparator(';')
                .build();


        List<String[]> csvOutput = new ArrayList<>();


        // General Info
        String[] info = {exam.getName(), exam.getDescription(), group.getName(), group.getDescription()};

        csvOutput.add(info);

        // Individual Student Results
        String[] studentNamesHeader = {"Nachname", "Vorname", "Geschlecht", "Note", "Note (differenziert)", "MSS", "Gesamtpunkte"};

        String[] firstSectionHeader = ArrayUtils.addAll(
                studentNamesHeader,
                exam.getExercises()
                .stream()
                .map(Exercise::getName)
                .toArray(String[]::new)
        );

        Statistics statistics = new Statistics(exam, results, students);

        Locale fmtLocale = Locale.getDefault(Locale.Category.FORMAT);
        NumberFormat formatter = NumberFormat.getInstance(fmtLocale);
        formatter.setMaximumFractionDigits(1);


        // Overall Statistics
        String[] avgGradeTotal = {"Durchschnittsnote (MSS)", formatter.format(statistics.getAvgGradeTotal())};
        String[] avgGradeFemale = {"Durchschnittsnote w (MSS)", formatter.format(statistics.getAvgGradeFemale())};
        String[] avgGradeMale = {"Durchschnittsnote m (MSS)", formatter.format(statistics.getAvgGradeMale())};

        csvOutput.add(avgGradeTotal);
        csvOutput.add(avgGradeFemale);
        csvOutput.add(avgGradeMale);


        // Single Results of students
        List<String[]> firstSectionContent = statistics.getStudentResults()
                .stream()
                .map(studentResult ->
                        ArrayUtils.addAll(
                                studentResult.getStudent().toArray(),
                                studentResult.getResult().toArray()
                        ))
                .collect(Collectors.toList());


        csvOutput.add(firstSectionHeader);
        csvOutput.addAll(firstSectionContent);

        // Descriptive Statistics
        String[] descrptivesHeaderstart = {"Metrik", "Gesamte Klausur"};

        String[] descriptivesHeader = ArrayUtils.addAll(
                descrptivesHeaderstart,
                exam.getExercises()
                        .stream()
                        .map(Exercise::getName)
                        .toArray(String[]::new)
        );


        csvOutput.add(descriptivesHeader);
        csvOutput.addAll(statistics.toArray());


        // Write to user
        writer.writeAll(csvOutput);

    }

}

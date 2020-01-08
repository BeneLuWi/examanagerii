package com.examanagerii.statistics;

import com.examanagerii.exam.Exam;
import com.examanagerii.exam.ExamRepository;
import com.examanagerii.result.Result;
import com.examanagerii.result.ResultRepository;
import com.examanagerii.student.Student;
import com.examanagerii.student.StudentRepository;
import com.opencsv.CSVWriter;
import com.opencsv.CSVWriterBuilder;
import com.opencsv.ICSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
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
import java.util.List;
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
        List<Result> results = resultRepository.findResultsByGroupIdAndExamId(groupId, examId);
        List<String> studIds = results.stream().map(Result::getStudentId).collect(Collectors.toList());
        List<Student> students = studentRepository
                .findByIdIn(studIds);

        //set file name and content type
        String filename = exam.getName() + ".csv";

        response.setContentType("text/csv");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + filename + "\"");


        //create a csv writer
        ICSVWriter writer = new CSVWriterBuilder(response.getWriter())
                .withQuoteChar(CSVWriter.NO_QUOTE_CHARACTER)
                .withSeparator(';')
                .build();

        String[] studentsArray = students.stream().map(Student::getFirstname).toArray(String[]::new);

    }

}

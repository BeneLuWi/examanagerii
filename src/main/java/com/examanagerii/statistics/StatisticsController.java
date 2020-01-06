package com.examanagerii.statistics;

import com.examanagerii.exam.Exam;
import com.examanagerii.exam.ExamRepository;
import com.examanagerii.result.Result;
import com.examanagerii.result.ResultRepository;
import com.examanagerii.student.Student;
import com.examanagerii.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

}

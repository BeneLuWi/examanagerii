package com.examanagerii.exam;

import com.examanagerii.security.SecurityService;
import com.examanagerii.user.ExaUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/exams")
public class ExamController {


    @Autowired
    SecurityService securityService;

    @Autowired
    ExamRepository repository;

    @GetMapping("myExams")
    public List<Exam> getMyExams() {
        return repository.findByUserId(securityService.getCurrentUserId());
    }

    @PostMapping("create")
    public void createExam(@RequestBody Exam exam) {
        exam.setUserId(securityService.getCurrentUserId());
        List<Double> defaultRating = new ArrayList<>();
        for (double i = 0; i < 15; i++) {
            defaultRating.add(i /15);
        }
        exam.setRating(defaultRating);

        repository.save(exam);
    }

    @PutMapping("update")
    public void updateExam(@RequestBody Exam exam) {
        repository.save(exam);
    }

}

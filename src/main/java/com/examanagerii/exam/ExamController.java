package com.examanagerii.exam;

import com.examanagerii.result.Result;
import com.examanagerii.result.ResultRepository;
import com.examanagerii.security.SecurityService;
import com.examanagerii.user.ExaUser;
import com.examanagerii.user.ExaUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    @Autowired
    SecurityService securityService;

    @Autowired
    ExamRepository repository;

    @Autowired
    ExaUserRepository userRepository;

    @Autowired
    ResultRepository resultRepository;

    @GetMapping("myExams")
    public List<Exam> getMyExams() {
        return repository.findByUserId(securityService.getCurrentUserId());
    }

    @PostMapping("create")
    public void createExam(@RequestBody Exam exam) {
        exam.setUserId(securityService.getCurrentUserId());
        List<Double> defaultRatings = new ArrayList<>();
        for (double i = 0; i < 15; i++) {
            defaultRatings.add(Math.floor((i /15) * 100));
        }
        exam.setRatings(defaultRatings);

        Exam created = repository.save(exam);
        ExaUser user = securityService.getCurrentAuthenticatedUser();
        user.addExam(exam.getId());

        userRepository.save(user);
    }

    @GetMapping("byId/{id}")
    public Exam getExamById(@PathVariable String id) {
        Exam exam = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException(id));

        if (!exam.getUserId().equals(securityService.getCurrentUserId())) return null;
        else return exam;
    }

    @PutMapping("update")
    public void updateExam(@RequestBody Exam exam) {

        List<Result> results = resultRepository.findAllByExamId(exam.getId());

        results.forEach(result -> result.updateExercises(exam.getExercises()));

        resultRepository.saveAll(results);
        repository.save(exam);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGroup(@PathVariable("id") String id) {
        repository.deleteById(id);
        resultRepository.deleteAllByExamId(id);
    }

}

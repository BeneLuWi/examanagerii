package com.examanagerii.student;

import com.examanagerii.exam.Exam;
import com.examanagerii.exam.ExamRepository;
import com.examanagerii.result.Result;
import com.examanagerii.result.ResultRepository;
import com.examanagerii.statistics.StudentResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/students")
public class StudentController {

    @Autowired
    StudentRepository repository;

    @Autowired
    ExamRepository examRepository;

    @Autowired
    ResultRepository resultRepository;

    @GetMapping("byGroup/{id}")
    public List<Student> getStudentsByGroup(@PathVariable("id") String id) {
        return repository.findByGroupId(id);
    }

    @GetMapping("byGroupAsResult/{id}")
    public List<StudentResult> getStudentsByGroupAsStudentResult(@PathVariable("id") String id) {
        return repository.findByGroupId(id)
                .stream()
                .map(student -> new StudentResult(student, null))
                .collect(Collectors.toList());
    }

    @PostMapping("create")
    public void createStudent(@RequestBody Student student) {
        repository.save(student);
    }

    @PutMapping("update")
    public void updateStudent(@RequestBody Student student) {

        Student old = repository.findById(student.getId())
                .orElseThrow(() -> new NoSuchElementException(student.getId()));
        old.setGender(student.getGender());
        old.setFirstname(student.getFirstname());
        old.setLastname(student.getLastname());
        old.setGroupId(student.getGroupId());

        repository.save(old);

    }

    @GetMapping("byGroupWithResult/{groupId}/{examId}")
    public List<StudentResult> getStudentsByGroupWithResult(@PathVariable("groupId") String groupId, @PathVariable("examId") String examId) {

        List<Result> results = resultRepository.findResultsByGroupIdAndExamId(groupId, examId);
        List<Student> students = repository.findByGroupId(groupId);

        return students
                .stream()
                .map(student ->
                        new StudentResult(
                                student,
                                results.stream()
                                        .filter(result -> result.getStudentId().equals(student.getId()))
                                        .findAny()
                                        .orElse(null)))
                .collect(Collectors.toList());

    }

}

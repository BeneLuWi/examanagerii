package com.examanagerii.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/students")
public class StudentController {

    @Autowired
    StudentRepository repository;

    @GetMapping("byGroup/{id}")
    public List<Student> getStudentsByGroup(@PathVariable("id") String id) {
        return repository.findByGroupId(id);
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

}

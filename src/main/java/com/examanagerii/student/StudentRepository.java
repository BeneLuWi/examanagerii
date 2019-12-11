package com.examanagerii.student;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {

    Optional<Student> findById(String id);

    List<Student> findByGroupId(String id);

}

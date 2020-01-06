package com.examanagerii.student;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {

    Optional<Student> findById(String id);

    List<Student> findByGroupId(String id);

    List<Student> findByIdIn(List<String> ids);

}

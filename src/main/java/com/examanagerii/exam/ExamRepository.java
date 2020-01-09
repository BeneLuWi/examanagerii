package com.examanagerii.exam;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ExamRepository extends MongoRepository<Exam, String> {

    Optional<Exam> findById(String id);

    List<Exam> findByUserId(String id);

    void deleteById(String id);
}

package com.examanagerii.result;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface ResultRepository extends MongoRepository<Result, String> {

    Optional<Result> findById(String id);

    List<Result> findResultsByGroupIdAndExamId(String groupId, String examId);

    Optional<Result> findResultByStudentIdAndExamId(String studentId, String examId);

    List<Result> findAllByExamId(String examId);

    void deleteById(String id);

    void deleteAllByStudentId(String id);

    void deleteAllByExamId(String id);

    void deleteAllByGroupId(String id);
}

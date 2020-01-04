package com.examanagerii.result;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ResultRepository extends MongoRepository<Result, String> {

    Optional<Result> findById(String id);

    List<Result> findResultsByGroupIdAndExamId(String groupId, String examId);

    @Query(" { $and: [ {'groupId': {$elemMatch: {$in : [?0]} }}, {'examId': {$elemMatch: {$in : [?1]}} ]}")
    List<Result> findMyResults(List<String> groupIds, List<String> examIds);

}

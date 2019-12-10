package com.examanagerii.group;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GroupRepository extends MongoRepository<Group, String> {

    Optional<Group> findById(String id);

}

package com.examanagerii.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ExaUserRepository extends MongoRepository<ExaUser, String> {

    Optional<ExaUser> findById(String username);

    Optional<ExaUser> findByUsername(String username);

    List<ExaUser> findAll();

}

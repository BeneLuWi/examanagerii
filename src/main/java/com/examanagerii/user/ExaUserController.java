package com.examanagerii.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/")
public class ExaUserController {

    @Autowired
    ExaUserRepository repository;

    @Secured({"ROLE_ADMIN"})
    @PutMapping("/create")
    public void createUser(@RequestBody ExaUser user) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));

        Optional<ExaUser> existingUser = repository.findByUsername(user.getUsername());

        if (existingUser.isPresent()) {
            ExaUser newUser = existingUser.get();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(user.getPassword());
            newUser.setRole(user.getRole());
            repository.save(newUser);
        } else {
            repository.save(new ExaUser(user.getUsername(), user.getPassword(), user.getRole()));
        }
    }

    @Secured({"ROLE_ADMIN"})
    @GetMapping("/getAll")
    public List<ExaUser> getAllUsers() {
        return repository.findAll();
    }


    @Secured({"ROLE_ADMIN"})
    @DeleteMapping("/delete/{username}")
    public List<ExaUser>  deleteUser(@PathVariable("username") String username) {
        ExaUser user = repository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException(username));
        repository.delete(user);

        return repository.findAll();
    }



}

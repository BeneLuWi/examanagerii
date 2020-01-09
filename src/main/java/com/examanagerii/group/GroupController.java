package com.examanagerii.group;

import com.examanagerii.result.ResultRepository;
import com.examanagerii.security.SecurityService;
import com.examanagerii.student.StudentRepository;
import com.examanagerii.user.ExaUser;
import com.examanagerii.user.ExaUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    GroupRepository repository;

    @Autowired
    ExaUserRepository userRepository;

    @Autowired
    SecurityService securityService;

    @Autowired
    GroupRepository groupRepository;

    @Autowired
    ResultRepository resultRepository;

    @Autowired
    StudentRepository studentRepository;

    @GetMapping("/myGroups")
    public List<Group> getMyGroups() {
        ExaUser user = securityService.getCurrentAuthenticatedUser();
        return  user.getGroups().size() > 0 ?
                   user.getGroups()
                            .stream()
                            .map(g -> groupRepository.findById(g).orElse(null))
                            .filter(Objects::nonNull)
                            .collect(Collectors.toList()) :
                 Collections.emptyList();
    }

    @PostMapping("/create")
    public void createGroup(@RequestBody Group group) {

        Group created = repository.save(group);

        ExaUser user = securityService.getCurrentAuthenticatedUser();

        user.addGroup(created.getId());
        userRepository.save(user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGroup(@PathVariable("id") String id) {
        repository.deleteById(id);
        studentRepository.deleteAllByGroupId(id);
        resultRepository.deleteAllByGroupId(id);
    }

}

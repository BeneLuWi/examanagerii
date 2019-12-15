package com.examanagerii.group;

import com.examanagerii.security.SecurityService;
import com.examanagerii.user.ExaUser;
import com.examanagerii.user.ExaUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
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

    @GetMapping("/myGroups")
    public List<Group> getMyGroups() {
        ExaUser user = securityService.getCurrentAuthenticatedUser();
        return user
                .getGroups()
                .stream()
                .map(g -> groupRepository.findById(g).orElseThrow(() -> new NoSuchElementException(g)))
                .collect(Collectors.toList());
    }

    @PostMapping("/create")
    public void createGroup(@RequestBody Group group) {

        Group created = repository.save(group);

        ExaUser user = securityService.getCurrentAuthenticatedUser();

        user.addGroup(created.getId());
        userRepository.save(user);
    }

}

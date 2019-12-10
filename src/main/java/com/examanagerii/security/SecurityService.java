package com.examanagerii.security;

import com.examanagerii.user.ExaUser;
import com.examanagerii.user.ExaUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Component
public class SecurityService {


    @Autowired
    ExaUserRepository userRepository;

    public String getCurrentUserId() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AuthUser user = (AuthUser) auth.getPrincipal();

        return user.getId();
    }


    public ExaUser getCurrentAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AuthUser user = (AuthUser) auth.getPrincipal();
        return userRepository.findById(user.getId()).orElseThrow(() -> new NoSuchElementException("User"));
    }

}

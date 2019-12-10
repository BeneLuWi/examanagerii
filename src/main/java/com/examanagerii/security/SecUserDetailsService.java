package com.examanagerii.security;

import com.examanagerii.user.ExaUser;
import com.examanagerii.user.ExaUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

@Component
public class SecUserDetailsService implements UserDetailsService {

    @Autowired
    private ExaUserRepository exaUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ExaUser user = exaUserRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException(username));

        String role = user.getRole();
        if (role == null) role = "ROLE_USER";

        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));

        return new AuthUser(user.getUsername(), user.getPassword(), authorities, user.getId());
    }
}

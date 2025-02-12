package com.gli.clic.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gli.clic.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        com.gli.clic.model.User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        // Create and return a UserDetails object with the username, password, and authorities.
        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles("USER")  // Set roles as needed (e.g., "USER")
                .build();
    }
}

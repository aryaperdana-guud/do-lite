package com.gli.clic.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.gli.clic.dto.UserDTO;
import com.gli.clic.model.User;
import com.gli.clic.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerUser(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            return "Email already registered!";
        }

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        userRepository.save(user);
        return "User registered successfully!";
    }

    public String loginUser(UserDTO userDTO) {
        Optional<User> user = userRepository.findByEmail(userDTO.getEmail());

        if (user.isPresent() && passwordEncoder.matches(userDTO.getPassword(), user.get().getPassword())) {
            return "Login successful!";
        } else {
            return "Invalid credentials!";
        }
    }
}

package com.gli.clic.service;

import com.gli.clic.dto.*;
import com.gli.clic.model.User;
import com.gli.clic.repository.UserRepository;
import com.gli.clic.security.JwtTokenProvider;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public RegisterResponse registerUser(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            return new RegisterResponse("Email already exists", false);
        }

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(user);

        return new RegisterResponse("User registered successfully", true);
    }

    public Optional<String> authenticate(UserDTO userDTO) {
        return userRepository.findByEmail(userDTO.getEmail())
                .filter(user -> passwordEncoder.matches(userDTO.getPassword(), user.getPassword()))
                .map(user -> jwtTokenProvider.createToken(user.getEmail()));
    }

    public ResponseEntity<ApiResponse> updateEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse("User not found", false));
        }

        User user = userOpt.get();
        user.setEmail(email);
        userRepository.save(user);
        return ResponseEntity.ok(new ApiResponse("Email updated successfully", true));
    }

    public ResponseEntity<ApiResponse> deleteUserByEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse("User not found", false));
        }

        userRepository.delete(userOpt.get());
        return ResponseEntity.ok(new ApiResponse("User deleted successfully", true));
    }
}

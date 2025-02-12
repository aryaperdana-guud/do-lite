package com.gli.clic.Controller;

import com.gli.clic.dto.UserDTO;
import com.gli.clic.model.User;
import com.gli.clic.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final String jwtSecretKey = "your_secret_key";

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody UserDTO userDTO) {
        Optional<User> user = userRepository.findByEmail(userDTO.getEmail());

        if (user.isPresent() && passwordEncoder.matches(userDTO.getPassword(), user.get().getPassword())) {
            String token = Jwts.builder()
                    .setSubject(userDTO.getEmail())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiry
                    .signWith(SignatureAlgorithm.HS256, jwtSecretKey.getBytes())
                    .compact();

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered!");
        }

        User newUser = new User();
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        userRepository.save(newUser);
        return ResponseEntity.ok("User registered successfully!");
    }
}

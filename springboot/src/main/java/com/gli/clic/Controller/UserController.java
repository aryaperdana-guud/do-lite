package com.gli.clic.Controller;

import com.gli.clic.model.User;
import com.gli.clic.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestParam String username, @RequestParam String password) {
        try {
            userService.registerUser(username, password);
            return "User registered successfully!";
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        Optional<User> user = userService.loginUser(username, password);
        return user.isPresent() ? "Login successful!" : "Invalid credentials!";
    }

    @GetMapping("/users/{username}")
    public Optional<User> getUser(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }
}

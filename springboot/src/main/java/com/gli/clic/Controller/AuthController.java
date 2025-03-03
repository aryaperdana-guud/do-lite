package com.gli.clic.Controller;

import com.gli.clic.dto.*;
import com.gli.clic.service.UserService;
import com.gli.clic.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody @Valid UserDTO userDTO) {
        RegisterResponse response = userService.registerUser(userDTO);
        return buildApiResponse(response.getMessage(), response.isSuccess());
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody @Valid UserDTO userDTO) {
        return userService.authenticate(userDTO)
                .map(token -> buildApiResponse("Login successful", true, Map.of("token", token)))
                .orElse(buildApiResponse("Invalid credentials", false));
    }

    @PutMapping("/update/email")
    public ResponseEntity<ApiResponse> updateEmail(@RequestBody @Valid UpdateEmailDTO updateEmailDTO,
                                                   @RequestHeader("Authorization") String token) {
        return processAuthenticatedRequest(token, email -> userService.updateEmail(updateEmailDTO.getEmail()));
    }

    @DeleteMapping("/delete/email")
    public ResponseEntity<ApiResponse> deleteUser(@RequestBody Map<String, String> requestBody,
                                                  @RequestHeader("Authorization") String token) {
        String email = requestBody.get("email");
        if (email == null || email.isEmpty()) {
            return buildApiResponse("Email is required", false, HttpStatus.BAD_REQUEST);
        }
        return processAuthenticatedRequest(token, authenticatedEmail -> userService.deleteUserByEmail(email));
    }

    private ResponseEntity<ApiResponse> processAuthenticatedRequest(String token, AuthAction action) {
        if (token == null || !token.startsWith("Bearer ")) {
            return buildApiResponse("Missing or invalid token", false, HttpStatus.UNAUTHORIZED);
        }

        String cleanToken = token.replace("Bearer ", "");
        if (!jwtTokenProvider.validateToken(cleanToken)) {
            return buildApiResponse("Invalid token", false, HttpStatus.UNAUTHORIZED);
        }

        String authenticatedEmail = jwtTokenProvider.extractEmail(cleanToken);
        return action.execute(authenticatedEmail);
    }

    private ResponseEntity<ApiResponse> buildApiResponse(String message, boolean status) {
        return ResponseEntity.ok(new ApiResponse(message, status));
    }

    private ResponseEntity<ApiResponse> buildApiResponse(String message, boolean status, HttpStatus httpStatus) {
        return ResponseEntity.status(httpStatus).body(new ApiResponse(message, status));
    }

    private ResponseEntity<ApiResponse> buildApiResponse(String message, boolean status, Map<String, Object> data) {
        return ResponseEntity.ok(new ApiResponse(message, status, data));
    }

    @FunctionalInterface
    interface AuthAction {
        ResponseEntity<ApiResponse> execute(String authenticatedEmail);
    }
}

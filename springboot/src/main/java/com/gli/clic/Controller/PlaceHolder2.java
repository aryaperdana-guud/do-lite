/*
 * package com.gli.clic.Controller;
 * 
 * import com.gli.clic.model.User; import com.gli.clic.service.UserService;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.http.HttpStatus; import
 * org.springframework.http.ResponseEntity; import
 * org.springframework.web.bind.annotation.*; import
 * org.springframework.security.crypto.password.PasswordEncoder;
 * 
 * import javax.crypto.spec.SecretKeySpec; import java.security.Key;
 * 
 * import io.jsonwebtoken.Jwts; import io.jsonwebtoken.SignatureAlgorithm;
 * 
 * import java.util.Date; import java.util.HashMap; import java.util.Map; import
 * java.util.Optional;
 * 
 * @RestController
 * 
 * @RequestMapping("/api/auth") public class UserController {
 * 
 * @Autowired private UserService userService;
 * 
 * @Autowired private PasswordEncoder passwordEncoder; // Inject PasswordEncoder
 * here
 * 
 * @PostMapping("/register") public String register(@RequestBody User user) {
 * try { userService.registerUser(user.getUsername(), user.getPassword());
 * return "User registered successfully!"; } catch (RuntimeException e) { return
 * e.getMessage(); } }
 * 
 * 
 * @PostMapping("/login") public ResponseEntity<Map<String, String>>
 * login(@RequestBody User loginRequest) { Optional<User> userOptional =
 * userService.findByUsername(loginRequest.getUsername());
 * 
 * if (!userOptional.isPresent()) { return
 * ResponseEntity.status(HttpStatus.UNAUTHORIZED) .body(Map.of("error",
 * "User not found!")); } //task method jwt dipanggil User user =
 * userOptional.get(); boolean isPasswordCorrect =
 * passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()); if
 * (isPasswordCorrect) { // Generate JWT token String secretKey = "SecretKey";
 * // Use a secure key long expirationTime = 86400000; // 1 day in milliseconds
 * byte[] apiKeySecretBytes = secretKey.getBytes(); Key signingKey = new
 * SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());
 * 
 * String token = Jwts.builder() .setSubject(user.getUsername())
 * .setIssuedAt(new Date()) .setExpiration(new Date(System.currentTimeMillis() +
 * expirationTime)) .signWith(signingKey) .compact();
 * 
 * Map<String, String> response = new HashMap<>(); response.put("message",
 * "Login successful!"); response.put("token", token); return
 * ResponseEntity.ok(response); } else { return
 * ResponseEntity.status(HttpStatus.UNAUTHORIZED) .body(Map.of("error",
 * "Invalid credentials!")); } }
 * 
 * 
 * 
 * @PostMapping("/forgot-password") public String forgotPassword(@RequestParam
 * String username) { try { String token =
 * userService.generateResetToken(username); return "Reset token generated: " +
 * token; // Ideally, send via email } catch (RuntimeException e) { return
 * e.getMessage(); } }
 * 
 * 
 * @PostMapping("/reset-password") public String resetPassword(@RequestParam
 * String token, @RequestParam String newPassword) { try {
 * userService.resetPassword(token, newPassword); return
 * "Password reset successful!"; } catch (RuntimeException e) { return
 * e.getMessage(); } } }
 */
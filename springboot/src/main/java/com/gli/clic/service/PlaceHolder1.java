/*
 * package com.gli.clic.service;
 * 
 * import com.gli.clic.model.User; import
 * com.gli.clic.repository.UserRepository; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.security.crypto.password.PasswordEncoder; import
 * org.springframework.stereotype.Service;
 * 
 * import java.util.Optional; import java.util.UUID;
 * 
 * @Service public class UserService {
 * 
 * @Autowired private UserRepository userRepository;
 * 
 * @Autowired private PasswordEncoder passwordEncoder;
 * 
 * public User registerUser(String username, String password) { if
 * (userRepository.findByUsername(username).isPresent()) { throw new
 * RuntimeException("Username already exists!"); }
 * 
 * String hashedPassword = passwordEncoder.encode(password); // Hash the
 * password User user = new User(username, hashedPassword); return
 * userRepository.save(user); }
 * 
 * public Optional<User> loginUser(String username, String password) {
 * Optional<User> userOptional = userRepository.findByUsername(username); if
 * (userOptional.isPresent()) { User user = userOptional.get(); return
 * passwordEncoder.matches(password, user.getPassword()) ? Optional.of(user) :
 * Optional.empty(); } return Optional.empty(); }
 * 
 * public Optional<User> findByUsername(String username) { return
 * userRepository.findByUsername(username); }
 * 
 * 
 * public String generateResetToken(String username) { Optional<User> user =
 * userRepository.findByUsername(username); if (user.isPresent()) { String token
 * = UUID.randomUUID().toString(); user.get().setResetToken(token);
 * userRepository.save(user.get()); return token; } else { throw new
 * RuntimeException("User not found"); } }
 * 
 * public void resetPassword(String token, String newPassword) { Optional<User>
 * user = userRepository.findByResetToken(token); if (user.isPresent()) {
 * user.get().setPassword(passwordEncoder.encode(newPassword));
 * user.get().setResetToken(null); userRepository.save(user.get()); } else {
 * throw new RuntimeException("Invalid reset token"); } } }
 */
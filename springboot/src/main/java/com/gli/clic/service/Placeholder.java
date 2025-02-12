/*
 * package com.gli.clic.service;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.security.core.userdetails.UserDetails; import
 * org.springframework.security.core.userdetails.UserDetailsService; import
 * org.springframework.security.core.userdetails.UsernameNotFoundException;
 * import org.springframework.stereotype.Service;
 * 
 * import com.gli.clic.model.*; import com.gli.clic.repository.UserRepository;
 * 
 * 
 * @Service public class CustomUserDetailsService implements UserDetailsService
 * {
 * 
 * @Autowired private UserRepository userRepository;
 * 
 * @Override public UserDetails loadUserByUsername(String username) throws
 * UsernameNotFoundException { // Check if username is null or empty before
 * querying the database if (username == null || username.trim().isEmpty()) {
 * throw new UsernameNotFoundException("Username cannot be empty"); }
 * 
 * // Proceed with fetching the user from the repository com.gli.clic.model.User
 * user = userRepository.findByUsername(username) .orElseThrow(() -> new
 * UsernameNotFoundException("User not found: " + username));
 * 
 * return User.builder() .username(user.getUsername())
 * .password(user.getPassword()) .roles("USER") // Set roles as per your
 * requirements .build(); } }
 */
package com.gli.clic.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gli.clic.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}

package com.pharma.users.service;

import com.pharma.users.model.User;
import com.pharma.users.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserRepository userRepository;

	public User addUser(User user) {
	    logger.info("Adding new user: {}", user.getEmail());
	    return userRepository.save(user);
	}

	public List<User> getAllUsers() {
	    logger.info("Fetching all users");
	    return userRepository.findAll();
	}

	public Optional<User> getUserById(Long  id) {
	    logger.info("Fetching user by ID: {}", id);
	    return userRepository.findById(id);
	}

	public Optional<User> getUserByEmail(String email) {
	    logger.info("Fetching user by email: {}", email);
	    return userRepository.findByEmail(email);
	}

	public User updateUser(Long  id, User updatedUser) {
	    logger.info("Updating user with ID: {}", id);
	    updatedUser.setId(id);
	    return userRepository.save(updatedUser);
	}
	
	public void setUserRepository(UserRepository userRepository) {
	    this.userRepository = userRepository;
	}


	public void deleteUser(Long  id) {
	    logger.info("Deleting user with ID: {}", id);
	    userRepository.deleteById(id);
	}

	// Signup with role restriction
	public User signup(User user) {
	    logger.info("Signing up user: {}", user.getEmail());
	    Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
	    if (existingUser.isPresent()) {
	        logger.warn("Signup failed: user already exists with email: {}", user.getEmail());
	        throw new RuntimeException("User already exists with this email.");
	    }

	    // Only allow DOCTOR to self-signup
	    if (!"DOCTOR".equalsIgnoreCase(user.getRole()) && !"ROLE_DOCTOR".equalsIgnoreCase(user.getRole())) {
	        logger.warn("Signup failed: Non-doctor roles cannot self-register. Role attempted: {}", user.getRole());
	        throw new RuntimeException("Only users with DOCTOR role can sign up directly.");
	    }

	    logger.info("User signed up successfully: {}", user.getEmail());
	    return userRepository.save(user);
	}

	public User login(String email, String password) {
	    logger.info("Attempting login for email: {}", email);
	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> {
	                logger.error("Login failed: user not found with email: {}", email);
	                return new RuntimeException("Invalid email or password");
	            });

	    if (!password.equals(user.getPassword())) {
	        logger.error("Login failed: invalid password for email: {}", email);
	        throw new RuntimeException("Invalid email or password");
	    }

	    logger.info("Login successful for email: {}", email);
	    return user;
	}
}
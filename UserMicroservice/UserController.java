package com.pharma.users.controller;

import com.pharma.users.model.User;
import com.pharma.users.model.User; import com.pharma.users.service.UserService; import org.springframework.beans.factory.annotation.Autowired; import org.springframework.web.bind.annotation.*; import org.slf4j.Logger; import org.slf4j.LoggerFactory; import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List; import java.util.Optional;
import com.pharma.users.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public User addUser(@RequestBody User user) {
	    logger.info("API Request: Add user {}", user.getEmail());
	    return userService.addUser(user);
	}

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public List<User> getAllUsers() {
	    logger.info("API Request: Get all users");
	    return userService.getAllUsers();
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public Optional<User> getUserById(@PathVariable Long  id) {
	    logger.info("API Request: Get user by ID {}", id);
	    return userService.getUserById(id);
	}

	@GetMapping("/email/{email}")
	@PreAuthorize("hasRole('ADMIN')")
	public Optional<User> getUserByEmail(@PathVariable String email) {
	    logger.info("API Request: Get user by email {}", email);
	    return userService.getUserByEmail(email);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public User updateUser(@PathVariable Long  id, @RequestBody User user) {
	    logger.info("API Request: Update user with ID {}", id);
	    return userService.updateUser(id, user);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteUser(@PathVariable Long  id) {
	    logger.info("API Request: Delete user with ID {}", id);
	    userService.deleteUser(id);
	}
}
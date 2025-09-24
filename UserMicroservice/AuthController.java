package com.pharma.users.controller;

import com.pharma.users.model.User;
import com.pharma.users.model.User; import com.pharma.users.repository.UserRepository; import com.pharma.users.security.JwtUtil; import com.pharma.users.service.UserService; import org.springframework.beans.factory.annotation.Autowired; import org.springframework.http.HttpStatus; import org.springframework.http.ResponseEntity; import org.springframework.security.core.Authentication; import org.springframework.web.bind.annotation.*;

import java.util.HashMap; import java.util.Map;
import com.pharma.users.security.JwtUtil;
import com.pharma.users.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import com.pharma.users.model.User; import com.pharma.users.repository.UserRepository; import org.springframework.beans.factory.annotation.Autowired; import org.springframework.security.core.Authentication; import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@RestController
@RequestMapping("/api/auth") 
public class AuthController {

	@Autowired
	private UserService userService;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserRepository userRepository;

	// Signup
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody User user) {
	    try {
	        User createdUser = userService.signup(user);
	        return ResponseEntity.ok(createdUser);
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	    }
	}

	// Login
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
	    try {
	        User user = userService.login(request.getEmail(), request.getPassword());
	        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

	        Map<String, Object> res = new HashMap<>();
	        res.put("token", token);
	        res.put("email", user.getEmail());
	        res.put("role", user.getRole());

	        return ResponseEntity.ok(res);
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
	    }
	}

	// Current authenticated user
	@GetMapping("/me")
	public ResponseEntity<?> getCurrentUser(Authentication authentication) {
	    if (authentication == null || !authentication.isAuthenticated()
	            || authentication.getPrincipal().equals("anonymousUser")) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
	    }

	    String email = authentication.getName();
	    Optional<User> userOpt = userRepository.findByEmail(email);

	    if (userOpt.isPresent()) {
	        return ResponseEntity.ok(userOpt.get());
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	    }
	}

	// DTO
	public static class LoginRequest {
	    private String email;
	    private String password;

	    public String getEmail() { return email; }
	    public void setEmail(String email) { this.email = email; }
	    public String getPassword() { return password; }
	    public void setPassword(String password) { this.password = password; }
	}
}
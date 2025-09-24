package com.pharma.users.security;

import io.jsonwebtoken.*; import org.springframework.stereotype.Component; import java.util.Date;
import io.jsonwebtoken.*; import io.jsonwebtoken.security.Keys; import org.springframework.stereotype.Component;
import io.jsonwebtoken.*; import io.jsonwebtoken.security.Keys; import org.springframework.stereotype.Component;

import java.security.Key; import java.util.Date;
import java.util.Date;
@Component public class JwtUtil {

	// Generate a secure 512-bit key
	private final Key SECRET_KEY = Keys.hmacShaKeyFor( "pharma-jwt-secret-key-1234567890123456789012345678901234567890".getBytes() );

	private final long EXPIRATION_TIME = 86400000; // 1 day

	public String generateToken(String email, String role) {
	    return Jwts.builder()
	            .setSubject(email)
	            .claim("role", role.toUpperCase())
	            .setIssuedAt(new Date())
	            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
	            .signWith(SECRET_KEY)
	            .compact();
	}

	public String getEmailFromToken(String token) {
	    return getClaims(token).getSubject();
	}

	public String getRoleFromToken(String token) {
	    return getClaims(token).get("role", String.class);
	}

	public boolean validateToken(String token) {
	    try {
	        getClaims(token);
	        return true;
	    } catch (JwtException | IllegalArgumentException e) {
	        return false;
	    }
	}

	private Claims getClaims(String token) {
	    return Jwts.parserBuilder()
	            .setSigningKey(SECRET_KEY)
	            .build()
	            .parseClaimsJws(token)
	            .getBody();
	}
}
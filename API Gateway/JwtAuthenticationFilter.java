package com.pharma.api_gateway.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.List;
import io.jsonwebtoken.Claims; import io.jsonwebtoken.Jwts; import io.jsonwebtoken.security.Keys; import org.springframework.cloud.gateway.filter.GatewayFilterChain; import org.springframework.cloud.gateway.filter.GlobalFilter; import org.springframework.core.Ordered; import org.springframework.http.HttpStatus; import org.springframework.http.server.reactive.ServerHttpRequest; import org.springframework.stereotype.Component; import org.springframework.web.server.ServerWebExchange; import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets; import java.security.Key; import java.util.List; import java.util.logging.Logger;

@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

	private static final Logger logger = Logger.getLogger(JwtAuthenticationFilter.class.getName());

	private static final List<String> openEndpoints = List.of(
	    "/api/auth/login",
	    "/api/auth/signup",
	    "/users/swagger-ui",
	    "/users/swagger-ui/",
	    "/users/swagger-ui/index.html",
	    "/users/v3/api-docs",
	    "/users/webjars/",
	    "/users/webjars/swagger-ui.css",
	    "/users/webjars/swagger-ui-bundle.js",
	    "/users/webjars/swagger-ui-standalone-preset.js"
	);

	private final String SECRET = "pharma-jwt-secret-key-1234567890123456789012345678901234567890";
	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
	    ServerHttpRequest request = exchange.getRequest();
	    String path = request.getPath().value();

	    logger.info("Incoming request path: " + path);

	    if (
	        path.contains("/swagger-ui") ||
	        path.contains("/v3/api-docs") ||
	        path.contains("/webjars") ||
	        openEndpoints.stream().anyMatch(path::startsWith)
	    ) {
	        logger.info("Allowed public path: " + path);
	        return chain.filter(exchange);
	    }

	    if (!request.getHeaders().containsKey("Authorization")) {
	        logger.warning("Missing Authorization header");
	        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
	        return exchange.getResponse().setComplete();
	    }

	    String authHeader = request.getHeaders().getFirst("Authorization");
	    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	        logger.warning("Invalid Authorization format");
	        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
	        return exchange.getResponse().setComplete();
	    }

	    String token = authHeader.substring(7);
	    try {
	        Key key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
	        Claims claims = Jwts.parserBuilder()
	            .setSigningKey(key)
	            .build()
	            .parseClaimsJws(token)
	            .getBody();

	        String email = claims.getSubject();
	        String role = claims.get("role", String.class);

	        logger.info("Token verified. Email: " + email + " | Role: " + role);

	        ServerHttpRequest mutated = request.mutate()
	            .header("X-Role", role)
	            .header("X-User-Email", email)
	            .build();

	        return chain.filter(exchange.mutate().request(mutated).build());

	    } catch (Exception e) {
	        logger.warning(" JWT validation failed: " + e.getMessage());
	        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
	        return exchange.getResponse().setComplete();
	    }
	}

	@Override
	public int getOrder() {
	    return -1;
	}
}
package com.pharma.api_gateway.security;

import org.springframework.cloud.gateway.filter.GatewayFilterChain; import org.springframework.cloud.gateway.filter.GlobalFilter; import org.springframework.core.Ordered; import org.springframework.http.HttpStatus; import org.springframework.http.server.reactive.ServerHttpRequest; import org.springframework.stereotype.Component; import org.springframework.web.server.ServerWebExchange; import reactor.core.publisher.Mono;

@Component 
public class RoleAuthorizationFilter implements GlobalFilter, Ordered {
	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
	    ServerHttpRequest request = exchange.getRequest();
	    String path = request.getPath().value();
	    String role = request.getHeaders().getFirst("X-Role");

	    // Allow login and signup without role
	    if (path.startsWith("/api/auth")) {
	        return chain.filter(exchange);
	    }

	    // Role-based path restrictions
	    if (path.startsWith("/api/users") && !"ADMIN".equalsIgnoreCase(role)) {
	        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
	        return exchange.getResponse().setComplete();
	    }

	    if (path.startsWith("/api/sales") && !"ADMIN".equalsIgnoreCase(role)) {
	        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
	        return exchange.getResponse().setComplete();
	    }

	    // All other endpoints are allowed for both roles
	    return chain.filter(exchange);
	}

	@Override
	public int getOrder() {
	    return 0; // Run after JwtAuthenticationFilter (which has order -1)
	}

}
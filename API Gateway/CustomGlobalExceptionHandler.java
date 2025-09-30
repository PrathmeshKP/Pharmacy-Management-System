package com.pharma.api_gateway.exception;

import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler; import org.springframework.core.annotation.Order; import org.springframework.core.io.buffer.DataBufferFactory; import org.springframework.http.MediaType; import org.springframework.http.HttpStatus; import org.springframework.stereotype.Component; import org.springframework.web.server.ServerWebExchange; import reactor.core.publisher.Mono; import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap; import java.util.Map;

@Component @Order(-2) 
public class CustomGlobalExceptionHandler implements ErrorWebExceptionHandler {
	private final ObjectMapper mapper = new ObjectMapper();

	@Override
	public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
	    DataBufferFactory bufferFactory = exchange.getResponse().bufferFactory();
	    exchange.getResponse().setStatusCode(HttpStatus.BAD_REQUEST);
	    exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);

	    Map<String, Object> errorResponse = new HashMap<>();
	    errorResponse.put("message", ex.getMessage());
	    errorResponse.put("path", exchange.getRequest().getPath().value());
	    errorResponse.put("status", 400);

	    byte[] bytes;
	    try {
	        bytes = mapper.writeValueAsBytes(errorResponse);
	    } catch (Exception e) {
	        bytes = "{\"message\":\"Internal error\"}".getBytes();
	    }

	    return exchange.getResponse().writeWith(Mono.just(bufferFactory.wrap(bytes)));
	}

}
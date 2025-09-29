package com.pharma.salesreport.exception;
import org.springframework.http.HttpStatus; import org.springframework.http.ResponseEntity; import org.springframework.web.bind.annotation.ControllerAdvice; import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime; import java.util.HashMap; import java.util.Map;


@ControllerAdvice public class GlobalExceptionHandler {
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, Object>> handleException(Exception ex) {
	    Map<String, Object> error = new HashMap<>();
	    error.put("message", ex.getMessage());
	    error.put("timestamp", LocalDateTime.now());
	    error.put("status", 500);
	    return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	
}
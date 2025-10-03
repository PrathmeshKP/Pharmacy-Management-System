package com.bot.dto;

public class ChatRequest {
    private String message;
    // getters and setters

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ChatRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ChatRequest(String message) {
		super();
		this.message = message;
	}

	@Override
	public String toString() {
		return "ChatRequest [message=" + message + "]";
	}
    
    
}


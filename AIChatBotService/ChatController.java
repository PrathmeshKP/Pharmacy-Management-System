package com.bot.controller;

import com.bot.service.SimpleChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final SimpleChatService chatService;

    public ChatController(SimpleChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/ask")
    public ChatResponse ask(@RequestBody ChatRequest request) {
        String reply = chatService.chat(request.role(), request.message());
        return new ChatResponse(reply);
    }

    public record ChatRequest(String role, String message) { }
    public record ChatResponse(String message) { }
}

package com.bot.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SimpleChatService {

    private final ChatClient chatClient;
    private final JsonNode knowledgeBase;

    public SimpleChatService(ChatClient.Builder chatClientBuilder) throws IOException {
        this.chatClient = chatClientBuilder.build();
        ObjectMapper mapper = new ObjectMapper();
        this.knowledgeBase = mapper.readTree(new ClassPathResource("PharmacyKnowledge.json").getInputStream());
    }

    private String buildPrompt(String role) {
        StringBuilder prompt = new StringBuilder(
                "You are an assistant for a Pharmacy Management System. " +
                "You help users (Doctors and Admins) understand how to use the system's services. " +
                "Only explain the operations available for the given role. " +
                "If a user asks for something outside their permissions, politely tell them that the action is restricted.\n\n"
        );

        knowledgeBase.fields().forEachRemaining(service -> {
            prompt.append(service.getKey()).append(":\n");
            service.getValue().fields().forEachRemaining(method -> {
                JsonNode methodDetails = method.getValue();
                String allowedRoles = methodDetails.get("role").asText();
                if (allowedRoles.contains(role.toLowerCase())) {
                    prompt.append("  - ").append(method.getKey())
                          .append(": ").append(methodDetails.get("description").asText())
                          .append("\n");
                }
            });
            prompt.append("\n");
        });

        return prompt.toString();
    }

    public String chat(String role, String userMessage) {
        String rolePrompt = buildPrompt(role);
        return chatClient.prompt()
                .system(rolePrompt)
                .user(userMessage)
                .call()
                .content();
    }
}

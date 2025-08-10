package com.jobportal.controller;


import com.jobportal.dto.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {

    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/chat/{roomId}")
    public Message sendMessage(Message message) {
        System.out.println("Message"+message.toString());

        return message;
    }
}

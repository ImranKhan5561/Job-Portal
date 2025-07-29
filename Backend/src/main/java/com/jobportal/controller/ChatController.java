package com.jobportal.controller;
import com.jobportal.Repository.RoomRepository;
import com.jobportal.dto.Message;
import com.jobportal.dto.MessageRequest;
import com.jobportal.entity.Room;
import com.jobportal.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    RoomRepository roomRepository;

    @PostMapping("/send/{roomId}")
    public void sendMessage(
            @PathVariable String roomId,
            @RequestBody MessageRequest request) {

        chatService.saveMessage(request.getSenderId(), request.getReceiverId(), request.getContent(), roomId);
    }




    @GetMapping("/chats/{userId}")
    public List<Room> getUserChats(@PathVariable String userId) {
        return chatService.getUserChatRooms(userId);
    }

    @GetMapping("/messages/{roomId}")
    public List<Message> getMessagesByRoom(@PathVariable String roomId) {
        return roomRepository.findByRoomId(roomId)
                .map(Room::getMessages)
                .orElse(Collections.emptyList());
    }

}

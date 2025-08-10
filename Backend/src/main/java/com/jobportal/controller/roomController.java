package com.jobportal.controller;
import com.jobportal.dto.roomRequest;
import com.jobportal.entity.Room;
import com.jobportal.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/room")
public class roomController {

    @Autowired
    private ChatService chatService;

    @PostMapping ("/createRoom")
    public Room findRoom(@RequestBody roomRequest room){
        return chatService.CreateRoom(room);
    }

}


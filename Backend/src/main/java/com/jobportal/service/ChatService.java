package com.jobportal.service;
import com.jobportal.Repository.RoomRepository;
import com.jobportal.dto.Message;
import com.jobportal.dto.roomRequest;
import com.jobportal.entity.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ChatService {

    @Autowired
    private RoomRepository roomRepository;


    public Room CreateRoom(roomRequest room) {
        System.out.println("Room Id"+room.getRoomId());
        return roomRepository.findByRoomId(room.getRoomId())
                .orElseGet(() -> {
                    Room newRoom = new Room(room.getUser1Id(), room.getUser2Id());
                    return roomRepository.save(newRoom);
                });
    }

    public Room getOrCreateRoom(String senderId, String receiverId) {
        String roomId = senderId.compareTo(receiverId) < 0 ? senderId + "_" + receiverId : receiverId + "_" + senderId;

        return roomRepository.findByRoomId(roomId)
                .orElseGet(() -> {
                    Room newRoom = new Room(senderId, receiverId);
                    return roomRepository.save(newRoom);
                });
    }

    public void saveMessage(String senderId, String receiverId, String content, String roomId) {
        Optional<Room> roomOptional = roomRepository.findByRoomId(roomId);
        if (roomOptional.isPresent()) {
            Room room = roomOptional.get(); // Get the Room object

            Message message = new Message(content, senderId, receiverId);
            message.setStatus("Unread");
            room.getMessages().add(message); // Add message to the room

            roomRepository.save(room); // Save the updated Room object
        }
    }


    public List<Room> getUserChatRooms(String userId) {
        return roomRepository.findByUser1IdOrUser2Id(userId, userId);
    }


}


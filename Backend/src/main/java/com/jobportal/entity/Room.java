package com.jobportal.entity;
import com.jobportal.dto.Message;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "rooms")
public class Room {
    @Id
    private String id;
    private String roomId; // Unique identifier (e.g., user1Id_user2Id)
    private String user1Id; // First participant
    private String user2Id; // Second participant
    private List<Message> messages = new ArrayList<>();

    public Room(String user1Id, String user2Id) {
        this.user1Id = user1Id;
        this.user2Id = user2Id;
        this.roomId = generateRoomId(user1Id, user2Id);
    }

    private String generateRoomId(String user1Id, String user2Id) {
        return (user1Id.trim().replaceAll("\\s+", "_").toLowerCase() + "_" +
                user2Id.trim().replaceAll("\\s+", "_").toLowerCase());
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getUser1Id() {
        return user1Id;
    }

    public void setUser1Id(String user1Id) {
        this.user1Id = user1Id;
    }

    public String getUser2Id() {
        return user2Id;
    }

    public void setUser2Id(String user2Id) {
        this.user2Id = user2Id;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
}


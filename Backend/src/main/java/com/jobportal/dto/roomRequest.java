package com.jobportal.dto;
public class roomRequest {
    private String roomId; // Unique identifier (e.g., user1Id_user2Id)
    private String user1Id; // First participant
    private String user2Id; // Second participant

    public roomRequest() {
    }

    public roomRequest(String roomId, String user1Id, String user2Id) {
        this.roomId = roomId;
        this.user1Id = user1Id;
        this.user2Id = user2Id;
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
}


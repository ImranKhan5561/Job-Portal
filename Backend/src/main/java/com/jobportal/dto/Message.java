package com.jobportal.dto;

import java.time.LocalDateTime;

public class Message {
    private String content;
    private String senderId;
    private String receiverId;
    private LocalDateTime timeStamp;

    private String status;
    public Message() {
    }

    public Message(String content, String senderId, String receiverId,LocalDateTime timeStamp,String status) {
        this.content = content;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.timeStamp=timeStamp;
        this.status=status;
    }

    public Message(String content, String sender, String receiverId) {
        this.content = content;
        this.senderId = sender;
        this.receiverId = receiverId;
        this.timeStamp=LocalDateTime.now();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return senderId;
    }

    public void setSender(String sender) {
        this.senderId = sender;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverIdId) {
        this.receiverId = receiverIdId;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

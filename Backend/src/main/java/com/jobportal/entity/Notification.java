package com.jobportal.entity;

import com.jobportal.dto.NotificationDTO;
import com.jobportal.dto.NotificationStatus;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection="notification")
public class Notification {
    private Long id;
    private Long userId;
    private String message;
    private String action;
    private String route;
    private NotificationStatus status;
    private LocalDateTime timeStamp;


    public NotificationDTO toDTO(){
        return new NotificationDTO(this.id,this.userId,this.message,this.action,this.route,this.status,this.timeStamp);
    }
    public Notification(Long id, Long userId, String message, String action, String route, NotificationStatus status, LocalDateTime timeStamp) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.action = action;
        this.route = route;
        this.status = status;
        this.timeStamp = timeStamp;
    }

    public Notification() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public NotificationStatus getStatus() {
        return status;
    }

    public void setStatus(NotificationStatus status) {
        this.status = status;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }
}

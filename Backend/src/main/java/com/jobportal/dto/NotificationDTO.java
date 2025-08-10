package com.jobportal.dto;

import com.jobportal.entity.Notification;

import java.time.LocalDateTime;

public class NotificationDTO {
    private Long id;
    private Long userId;
    private String message;
    private String action;
    private String route;
    private NotificationStatus status;
    private LocalDateTime timeStamp;


    public Notification toEntity(){
        return new Notification(this.id,this.userId,this.message,this.action,this.route,this.status,this.timeStamp);
    }

    public NotificationDTO(Long id, Long userId, String message, String action, String route, NotificationStatus status, LocalDateTime timeStamp) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.action = action;
        this.route = route;
        this.status = status;
        this.timeStamp = timeStamp;
    }

    public NotificationDTO() {
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

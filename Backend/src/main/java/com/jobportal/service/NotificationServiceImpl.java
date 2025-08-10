package com.jobportal.service;

import com.jobportal.Repository.NotificationRepository;
import com.jobportal.dto.NotificationDTO;
import com.jobportal.dto.NotificationStatus;
import com.jobportal.entity.Notification;
import com.jobportal.exception.JobPortalException;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service("notificationService")
public class NotificationServiceImpl implements NotificationService{
    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException {
        notificationDTO.setId(Utilities.getNextSequence("notification"));
        notificationDTO.setStatus(NotificationStatus.UNREAD);
        notificationDTO.setTimeStamp(LocalDateTime.now());
        notificationRepository.save(notificationDTO.toEntity());
    }

    @Override
    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndStatus(userId, NotificationStatus.UNREAD);
    }

    @Override
    public void readNotification(Long id) throws JobPortalException{
        Notification noti=notificationRepository.findById(id).orElseThrow(()->new JobPortalException("No Notification found"));
        noti.setStatus(NotificationStatus.READ);
        notificationRepository.save(noti);
    }
}

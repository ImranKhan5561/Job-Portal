package com.jobportal.dto;

import java.time.LocalDateTime;

public class Application {
    private Long id;
    private Long applicantId;
    private LocalDateTime interviewTime;
    private ApplicationStatus applicationStatus;

    public Application() {
    }

    public Application(Long id, Long applicantId, LocalDateTime interviewTime, ApplicationStatus applicationStatus) {
        this.id = id;
        this.applicantId = applicantId;
        this.interviewTime = interviewTime;
        this.applicationStatus = applicationStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getApplicantId() {
        return applicantId;
    }

    public void setApplicantId(Long applicantId) {
        this.applicantId = applicantId;
    }

    public LocalDateTime getInterviewTime() {
        return interviewTime;
    }

    public void setInterviewTime(LocalDateTime interviewTime) {
        this.interviewTime = interviewTime;
    }

    public ApplicationStatus getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(ApplicationStatus applicationStatus) {
        this.applicationStatus = applicationStatus;
    }
}

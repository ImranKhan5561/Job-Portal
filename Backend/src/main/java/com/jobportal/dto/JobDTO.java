package com.jobportal.dto;

import com.jobportal.entity.Job;

import java.time.LocalDateTime;
import java.util.List;


public class JobDTO {
    private Long id;
    private String jobTitle;
    private String company;
    private List<ApplicantDTO> applicants;
    private String about;
    private String experience;
    private String jobType;
    private String location;
    private Long packageOffered;
    private LocalDateTime postTime;
    private String description;
    private List<String> skillsRequired;
    private JobStatus jobStatus;
    private Long postedBy;


    public Job toEntity(){
        return new Job(this.id,this.jobTitle,this.company,this.applicants!=null?this.applicants.stream().map(ApplicantDTO::toEntity).toList():null,this.about,this.experience,this.jobType,
        this.location,this.packageOffered,this.postTime,this.description,this.skillsRequired,this.jobStatus,this.postedBy);
    }

    public JobDTO(Long id, String jobTitle, String company, List<ApplicantDTO> applicants, String about, String experience, String jobType, String location, Long packageOffered, LocalDateTime postTime, String description, List<String> skillsRequired, JobStatus jobStatus, Long postedBy) {
        this.id = id;
        this.jobTitle = jobTitle;
        this.company = company;
        this.applicants = applicants;
        this.about = about;
        this.experience = experience;
        this.jobType = jobType;
        this.location = location;
        this.packageOffered = packageOffered;
        this.postTime = postTime;
        this.description = description;
        this.skillsRequired = skillsRequired;
        this.jobStatus = jobStatus;
        this.postedBy = postedBy;
    }

    public JobDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public List<ApplicantDTO> getApplicants() {
        return applicants;
    }

    public void setApplicants(List<ApplicantDTO> applicants) {
        this.applicants = applicants;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getPackageOffered() {
        return packageOffered;
    }

    public void setPackageOffered(Long packageOffered) {
        this.packageOffered = packageOffered;
    }

    public LocalDateTime getPostTime() {
        return postTime;
    }

    public void setPostTime(LocalDateTime postTime) {
        this.postTime = postTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getSkillsRequired() {
        return skillsRequired;
    }

    public void setSkillsRequired(List<String> skillsRequired) {
        this.skillsRequired = skillsRequired;
    }

    public JobStatus getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(JobStatus jobStatus) {
        this.jobStatus = jobStatus;
    }

    public Long getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(Long postedBy) {
        this.postedBy = postedBy;
    }
}

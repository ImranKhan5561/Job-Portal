package com.jobportal.service;

import com.jobportal.Repository.JobRepository;
import com.jobportal.dto.*;
import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import com.jobportal.exception.JobPortalException;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service("jobService")
public class JobServiceImpl implements JobService{

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private NotificationService notificationService;
    private static final Logger logger = LoggerFactory.getLogger(JobServiceImpl.class);
    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
        if(jobDTO.getId()==0){
            jobDTO.setId(Utilities.getNextSequence("jobs"));
            jobDTO.setPostTime((LocalDateTime.now()));
            NotificationDTO notiDTO=new NotificationDTO();
            notiDTO.setAction("Job Posted Successfully");
            notiDTO.setMessage("Job Posted Successfully for "+jobDTO.getJobTitle()+" at "+jobDTO.getCompany());
            notiDTO.setUserId(jobDTO.getPostedBy());
            notiDTO.setRoute("/posted-jobs/"+jobDTO.getId());
                notificationService.sendNotification(notiDTO);}

        else{
            Job job=jobRepository.findById(jobDTO.getId()).orElseThrow(()->new JobPortalException("JOB_NOT_FOUND"));
            if(job.getJobStatus().equals(JobStatus.DRAFT)||jobDTO.getJobStatus().equals(JobStatus.CLOSED)) jobDTO.setPostTime(LocalDateTime.now());
        }
        return jobRepository.save(jobDTO.toEntity()).toDTO();
    }

    @Override
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll().stream().map(Job::toDTO).toList();
    }

    @Override
    public JobDTO getJob(Long id) throws JobPortalException {
        return jobRepository.findById(id).orElseThrow(()->new JobPortalException("JOB_NOT_FOUND")).toDTO();
    }

    @Override
    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {
        Job job=jobRepository.findById(id).orElseThrow(()->new JobPortalException("JOB_NOT_FOUND"));
        List<Applicant>applicants=job.getApplicants();
        if(applicants==null){
            applicants=new ArrayList<>();
        }

        if(applicants.stream().filter((x)->x.getApplicantId()==applicantDTO.getApplicantId()).toList().size()>0)
            throw new JobPortalException("JOB_APPLIED_ALREADY");

        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicants.add(applicantDTO.toEntity());
        job.setApplicants(applicants);
        jobRepository.save(job);
    }

    @Override
    public List<JobDTO> getJobsPostedBy(Long id) {
        return jobRepository.findByPostedBy(id).stream().map(Job::toDTO).toList();
    }

    @Override
    public void changeAppStatus(Application application) throws JobPortalException {
        Job job=jobRepository.findById(application.getId()).orElseThrow(()->new JobPortalException("JOB_NOT_FOUND"));
        List<Applicant>applicants=job.getApplicants().stream().map((x)->{
            if(application.getApplicantId()==x.getApplicantId()){
                x.setApplicationStatus(application.getApplicationStatus());
           if(application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)){
               x.setInterviewTime(application.getInterviewTime());

           NotificationDTO notiDTO=new NotificationDTO();
           notiDTO.setAction("Interview Scheduled");
           notiDTO.setMessage("Interview scheduled for job id: "+application.getId());
           notiDTO.setUserId(application.getApplicantId());
           notiDTO.setRoute("/job-history");
           try{
             notificationService.sendNotification(notiDTO);
           }
           catch(JobPortalException e){
               logger.error("Error sending notification: {}", e.getMessage());
           }
            }

            }
            return x;
        }).toList();

       job.setApplicants(applicants);
        jobRepository.save(job);
    }

}

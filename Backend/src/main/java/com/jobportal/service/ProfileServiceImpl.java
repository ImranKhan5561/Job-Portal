package com.jobportal.service;

import com.jobportal.Repository.ProfileRepository;
import com.jobportal.dto.ProfileDTO;
import com.jobportal.entity.Profile;
import com.jobportal.exception.JobPortalException;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService{
    @Autowired
    private ProfileRepository profileRepository;
    @Override
    public Long createProfile(String email,String name) throws JobPortalException {
     Profile profile=new Profile();
     profile.setId(Utilities.getNextSequence("profiles"));
     profile.setEmail(email);
     profile.setName(name);
     profile.setSkills(new ArrayList<>());
     profile.setExperiences(new ArrayList<>());
     profile.setCertifications(new ArrayList<>());
     profileRepository.save(profile);
     return profile.getId();
    }

    @Override
    public ProfileDTO getProfile(Long id) throws JobPortalException {
        return profileRepository.findById(id).orElseThrow(()->new JobPortalException("Profile Not Found")).toDTO();
    }

    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException {
        profileRepository.findById(profileDTO.getId()).orElseThrow(()->new JobPortalException("Profile Not Found"));
        profileRepository.save(profileDTO.toEntity());
        return profileDTO;
    }

    @Override
    public List<ProfileDTO> getAllProfiles() {
        return profileRepository.findAll().stream().map((x)->x.toDTO()).toList();
    }
}

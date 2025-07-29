package com.jobportal.jwt;

import com.jobportal.dto.UserDTO;
import com.jobportal.exception.JobPortalException;
import com.jobportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            UserDTO user=userService.getUserByEmail(email);

            return new CustomUserDetails(user.getId(),user.getEmail(),user.getName(),user.getPassword(),user.getProfileId(),user.getAccountType(),new ArrayList<>());


        } catch (JobPortalException e) {
            e.printStackTrace();
        }
return null;
    }
}

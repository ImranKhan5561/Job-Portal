package com.jobportal.utility;

import com.jobportal.entity.sequence;
import com.jobportal.exception.JobPortalException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;


@Component
public class Utilities {
    private static MongoOperations mongoOperations;
    @Autowired
    public void setMongoOperation(MongoOperations mongoOperations){
        Utilities.mongoOperations=mongoOperations;
    }
    public static Long getNextSequence(String key) throws JobPortalException{
        Query query= new Query(Criteria.where("_id").is(key));
        Update update =new Update();
        update.inc("seq",1);
        FindAndModifyOptions options=new FindAndModifyOptions();
        options.returnNew(true);
        sequence seq= mongoOperations.findAndModify(query,update,options,sequence.class);
        if(seq==null)throw new JobPortalException("Unable to get sequence id for key :  "+key);
        return seq.getSeq();
    }


    public static String generateOTP(){
        StringBuilder otp=new StringBuilder();
        SecureRandom random=new SecureRandom();
        for(int i=0;i<6;i++){
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }


}

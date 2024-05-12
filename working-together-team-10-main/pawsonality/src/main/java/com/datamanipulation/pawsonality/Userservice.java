package com.datamanipulation.pawsonality;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class Userservice {

    @Autowired
    private fetchdataUser fetchdataUser;



    public List<UserModel> getAllUserProducts() {
        return fetchdataUser.findAll();
    }

    public void deleteUserData(String email) {
        Logger logger = LoggerFactory.getLogger(this.getClass());

        UserModel existingUser = fetchdataUser.fetchUser(email);
        if(existingUser == null) {
            logger.error("User not found with email: {}", email);
            throw new IllegalArgumentException("User not found with email : " + email);
        }

        fetchdataUser.delete(existingUser);
        logger.info("User deleted successfully: {}", email);
    }



}

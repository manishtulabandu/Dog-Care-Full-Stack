package com.datamanipulation.pawsonality;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface fetchdataUser extends JpaRepository<UserModel,String>{
    @Override
    void delete(UserModel entity);

    @Override
    List<UserModel> findAll();

    @Override
    <S extends UserModel> S save(S entity);

    @Override
    Optional<UserModel> findById(String s);

    @Transactional
    @Modifying
    @Query(value="select * from Users where Email=?", nativeQuery=true)
    List<Map<String,Object>> fetchUserDetails(String email);

    @Transactional
    @Modifying
    @Query(value="select Email from Users where Email=? and Password=?", nativeQuery=true)
    List<Map<String,Object>> validateUser(String email,String password);

    @Transactional
    @Modifying
    @Query(value="select Email from Users where Email=?", nativeQuery=true)
    List<Map<String,Object>> validateUser2(String email);

    @Transactional
    @Modifying
    @Query(value="select SSN from Users where Email=?", nativeQuery=true)
    UserModel fetchUser(String email);

    @Transactional
    @Modifying
    @Query(value="UPDATE `Users` SET `First Name`=?,`Last Name`=?,`Phone Number`=?,`Address line 1`=?,`Address line 2`=?,`City`=?,`State`=?,`Country`=?,`DOB`=?,`SSN`=?,`Password`=? WHERE `Email`=?", nativeQuery=true)
    void updateUserDetails(String firstName, String lastName, String phNumber, String address1, String address2, String city, String state, String country, Date dob, Integer ssn, String password, String email);

    @Transactional
    @Modifying
    @Query(value="INSERT INTO `Users`(`First Name`, `Last Name`,`Email`,`Password`) VALUES (?,?,?,?)", nativeQuery=true)
    void insertUserDetails(String firstName, String lastName,String email,String password);

    @Transactional
    @Modifying
    @Query(value="UPDATE `Users` SET `Password`=? WHERE Email=?", nativeQuery=true)
    void updatePassword(String password,String email);



}


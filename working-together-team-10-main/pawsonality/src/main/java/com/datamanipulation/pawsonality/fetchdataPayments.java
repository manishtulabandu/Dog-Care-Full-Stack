package com.datamanipulation.pawsonality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public interface fetchdataPayments extends JpaRepository<Product,String> {


    @Transactional
    @Modifying
    @Query(value="SELECT * FROM Payments JOIN startup ON Payments.startupEmail=startup.Email COLLATE UTF8MB4_GENERAL_CI where userEmail=?;", nativeQuery=true)
    List<Map<String,Object>> fetchUserPayments(String email);

    @Transactional
    @Modifying
    @Query(value="SELECT StartupName,`userEmail`, `startupEmail`, sum( `amount`) as amount, sum(`bits`) as bits FROM `Payments` JOIN `startup` ON Payments.startupEmail=startup.Email COLLATE UTF8MB4_GENERAL_CI WHERE userEmail=? GROUP BY startupEmail", nativeQuery=true)
    List<Map<String,Object>> fetchCUserPayments(String email);

    @Transactional
    @Modifying
    @Query(value="SELECT * FROM `Payments` join Users WHERE Payments.userEmail=Users.Email and startupEmail=? ORDER by amount desc LIMIT 10", nativeQuery=true)
    List<Map<String,Object>> fetchTop10Payments(String email);

    @Transactional
    @Modifying
    @Query(value="SELECT * FROM `Payments` join Users WHERE Payments.userEmail=Users.Email and startupEmail=? ORDER by Payments.date desc,Payments.timeOfInvestment desc", nativeQuery=true)
    List<Map<String,Object>> fetchRecentPayments(String email);

    @Transactional
    @Modifying
    @Query(value="INSERT INTO `Payments`(`userEmail`, `productId`, `bits`, `amount`, `date`, `timeOfInvestment`) VALUES (?,?,?,?,CURRENT_DATE,CURRENT_TIME)", nativeQuery=true)
    void addPayment(String userEmail,String productId, int bits,Double amount);

    @Transactional
    @Modifying
    @Query(value="select sum(amount) as totalFund from Payments where startupEmail=?", nativeQuery=true)
    List<Map<String,Object>> totalFund(String Email);

    @Query(value = "SELECT SUM(amount) FROM payments", nativeQuery = true)
    Double sumAmount();


    @Transactional
    @Modifying
    @Query(value="SELECT SUM(amount) as totalAmount, DATEDIFF(MAX(date), MIN(date)) as dateDifference\n" +
            "FROM Payments\n" +
            "WHERE startupEmail = ?", nativeQuery=true)
    List<Map<String,Object>> fetchSuccessList(String email);


}

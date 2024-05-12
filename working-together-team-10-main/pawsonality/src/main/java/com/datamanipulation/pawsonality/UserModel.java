package com.datamanipulation.pawsonality;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.format.annotation.DateTimeFormat;

//import javax.validation.constraints.NotNull;
//import javax.validation.constraints.Pattern;
import java.sql.Date;

@Entity
@Table(name = "Users")
public class UserModel {
    @Id
    @Column(name ="Email")
    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\\.com$", message = "Invalid Email")
    String email;

    @Column(name = "First Name")
    @NotNull
    String firstName;

    @Column(name = "Last Name")
    String lastName;

    @Column(name = "Phone Number")
    @NotNull
    String phNumber;

    @Column(name = "Address line 1")
    @NotNull
    String address1;

    @Column(name = "Address line 2")
    @NotNull
    String address2;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "MM-dd-yyyy")
    @Column(name = "DOB", columnDefinition = "DATE DEFAULT CURRENT_DATE")
    Date dob;

    @Column(name = "City")
    String city;

    @Column(name = "State")
    String state;

    @Column(name = "Country")
    String country;

    @Column(name = "SSN")
    @NotNull
    Integer ssn;

    @Column(name ="Password")
    @NotNull
    @ValidPassword
    String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhNumber() {
        return phNumber;
    }

    public void setPhNumber(String phNumber) {
        this.phNumber = phNumber;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Integer getSsn() {
        return ssn;
    }

    public void setSsn(Integer ssn) {
        this.ssn = ssn;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserModel() {
        super();
    }

    public UserModel(String email, String password, String firstName, String lastName, String phNumber, String address1, String address2, Date dob, String city, String state, String country, Integer ssn) {
        super();
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phNumber = phNumber;
        this.address1 = address1;
        this.address2 = address2;
        this.dob = dob;
        this.city = city;
        this.state = state;
        this.country = country;
        this.ssn = ssn;
    }
}

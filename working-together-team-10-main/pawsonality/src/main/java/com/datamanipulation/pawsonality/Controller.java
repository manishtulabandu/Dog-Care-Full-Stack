package com.datamanipulation.pawsonality;



import dto.*;

import org.springframework.mail.MailSendException;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.multipart.MultipartFile;

//import javax.validation.Valid;
import java.io.IOException;
import java.sql.Date;
import java.sql.Time;
import java.util.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class Controller {
    @Autowired
    fetchdataUser fetchdata_User;
    @Autowired
    private ProductService productService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private InventoryManagmentService inventoryService;


    @Autowired
    fetchdataPayments fetchdata_payments;

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private Userservice userservice;


    @GetMapping(value = "login", produces = MediaType.APPLICATION_JSON_VALUE)
    public loginResponse login(@RequestParam String email, @RequestParam String password) {
        loginResponse response = new loginResponse();
        try {
            List<Map<String, Object>> resi = new ArrayList<Map<String, Object>>();
            resi = fetchdata_User.validateUser(email, password);
            if (resi.size() == 0) {
                response.setMessage("Invalid UserName or Password");
                return response;
            }
            if (resi.size() != 0) {
                response.setMessage("user");
                return response;
            } else {
                response.setMessage("notUser");
                return response;
            }

        } catch (Exception e) {
            System.out.println(e);
            response.setMessage("Fail");
            return response;
        }

    }


    @GetMapping(value = "getUsers/{Email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserModel> getUsers(@PathVariable String Email) {

        try {
            UserModel response = new UserModel();
            List<Map<String, Object>> data = fetchdata_User.fetchUserDetails(Email);
            System.out.println(Email);
            Map<String, Object> row = data.get(0);
            response.setAddress1(row.get("Address Line 1") != null ? row.get("Address Line 1").toString() : "");
            response.setCity(row.get("City") != null ? row.get("City").toString() : "");
            response.setAddress2(row.get("Address line 2") != null ? row.get("Address line 2").toString() : "");
            response.setDob(row.get("DOB") != null ? (Date) row.get("DOB") : null);
            response.setPhNumber(row.get("Phone Number") != null ? row.get("Phone Number").toString() : "");
            response.setEmail(row.get("Email") != null ? row.get("Email").toString() : "");
            response.setFirstName(row.get("First Name") != null ? row.get("First Name").toString() : "");
            response.setLastName(row.get("Last Name") != null ? row.get("Last Name").toString() : "");
            response.setSsn(row.get("SSN") != null ? (Integer) row.get("SSN") : null);
            response.setState(row.get("State") != null ? row.get("State").toString() : "");
            response.setCountry(row.get("Country") != null ? row.get("Country").toString() : "");
            response.setPassword(row.get("Password") != null ? row.get("Password").toString() : "");

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<UserModel>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/api/addUser")
    public ResponseEntity<UserModel> addUser(@Valid @RequestBody UserModel m) {
        Optional<UserModel> User = fetchdata_User.findById(m.email);
        if (!User.isPresent()) {
            return new ResponseEntity<UserModel>(fetchdata_User.save(m), HttpStatus.OK);
        } else {
            return new ResponseEntity<UserModel>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/api/getUser/{Email}")
    public ResponseEntity<UserModel> getUser(@PathVariable String Email) {
        Optional<UserModel> User = fetchdata_User.findById(Email);
        if (User.isPresent()) {
            return new ResponseEntity<UserModel>(User.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<UserModel>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("api/User/{Email}/{Password}")
    public ResponseEntity<UserModel> authUser(@PathVariable String Email, @PathVariable String Password) {
        Optional<UserModel> userDetails = fetchdata_User.findById(Email);
        if (userDetails.isPresent()) {
            String password = userDetails.get().password;
            if (password.equals(Password)) {
                System.out.println("success");
                return new ResponseEntity<UserModel>(HttpStatus.OK);
            } else {
                System.out.println("Failure");
                return new ResponseEntity<UserModel>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<UserModel>(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteUser(@PathVariable UserModel user) {
        fetchdata_User.delete(user);
        System.out.println("user Deleted");
    }


    @PutMapping("api/user/updateDetails/{Email}")
    public ResponseEntity<?> updateUserDetails(@PathVariable String Email, @RequestBody UserModel m) {
        Optional<UserModel> user = fetchdata_User.findById(Email);

        try {

            if (user.isPresent()) {
                fetchdata_User.updateUserDetails(m.firstName, m.lastName, m.phNumber, m.address1, m.address2, m.city, m.state, m.country, m.dob, m.ssn, m.password, Email);

            } else {
                UserModel userModified = new UserModel(
                        m.email,
                        m.password,
                        m.firstName,
                        m.lastName,
                        m.phNumber,
                        m.address1,
                        m.address2,
                        m.dob,
                        m.city,
                        m.state,
                        m.country,
                        m.ssn
                );
                fetchdata_User.save(userModified);
//                fetchdata_User.insertUserDetails(m.firstName,m.lastName,m.phNumber,m.address1,m.address2,m.city,m.state,m.country,m.dob,m.email,m.ssn,m.password);

            }
//                deleteUser(user.get());
//                userModified = new UserModel(
//                        m.email,
//                        m.password,
//                        user.get().getFirstName(),
//                        user.get().getLastName(),
//                        user.get().getPhNumber(),
//                        user.get().getAddress1(),
//                        user.get().getAddress2(),
//                        user.get().getDob(),
//                        user.get().getCity(),
//                        user.get().getState(),
//                        user.get().getCountry(),
//                        user.get().getSsn()
//                );
//                System.out.println(m.email);
//                return new ResponseEntity<>(fetchdata_User.save(userModified), HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
        } catch (Exception e) {
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body("success");
    }

    @PutMapping("api/User/signup/{Email}")
    public loginResponse signUpUser(@PathVariable String Email, @RequestBody UserModel m) {
        loginResponse response = new loginResponse();
        Optional<UserModel> user = fetchdata_User.findById(Email);

        try {
            if (user.isPresent()) {
                response.setMessage("User Already existed...");
                return (response);
            } else {

                fetchdata_User.insertUserDetails(m.firstName, m.lastName, m.email, m.password);
            }
        } catch (Exception e) {
            response.setMessage(e.getMessage().toString());
            return (response);
        }
        response.setMessage("success");
        return (response);
    }

    //---------------------------------------------- StartUp Crud operations------------------------------------------

   
   
    @PutMapping("api/user/updateUserPassword/{Email}")
    public loginResponse updateUserPassword(@PathVariable String Email, @RequestParam String password) {
        loginResponse response = new loginResponse();
        try {


            fetchdata_User.updatePassword(password, Email);

            response.setMessage("success");
            return (response);
        } catch (Exception e) {
            response.setMessage(e.getMessage().toString());
            return (response);
        }
    }

    @PutMapping("api/user/forgetPassword/{Email}")
    public loginResponse forgetPassword(@PathVariable String Email, @RequestParam String password) {
        loginResponse response = new loginResponse();
        try {
            List<Map<String, Object>> resi = new ArrayList<Map<String, Object>>();
            List<Map<String, Object>> ress = new ArrayList<Map<String, Object>>();
            resi = fetchdata_User.validateUser2(Email);
            if (resi.size() == 0 ) {
                response.setMessage("Entered Account is not Exists...");
                return response;
            }
            if (resi.size() != 0) {
                fetchdata_User.updatePassword(password, Email);
                response.setMessage("success");
                return response;
            } else {
                response.setMessage("failed");
                return response;
            }

        } catch (Exception e) {
            System.out.println(e);
            response.setMessage("Failed to Update Password,Try Again...");
            return response;
        }
    }


    
    @GetMapping("/api/payments/{Email}")
    public List<UserPayments> getPayments(@PathVariable String Email) {

        List<UserPayments> response = new ArrayList<UserPayments>();
        try {
            List<Map<String, Object>> res = fetchdata_payments.fetchUserPayments(Email);
            for (Map<String, Object> row : res) {
                UserPayments a = new UserPayments();
                a.setproductName(row.get("productName") != null ? row.get("productName").toString() : "");
                a.setamount(row.get("amount") != null ? (Double) row.get("amount") : 0);
                a.setDate(row.get("date") != null ? (Date) row.get("date") : null);
                a.setTime(row.get("timeOfInvestment") != null ? (Time) row.get("timeOfInvestment") : null);
                response.add(a);
            }

        } catch (Exception e) {
            System.out.println(e);

        }
        return response;

    }

    @GetMapping("/api/top10payments/{Email}")
    public List<UserPayments> getTop10Payments(@PathVariable String Email) {

        List<UserPayments> response = new ArrayList<UserPayments>();
        try {
            List<Map<String, Object>> res = fetchdata_payments.fetchTop10Payments(Email);
            for (Map<String, Object> row : res) {
                UserPayments a = new UserPayments();
                a.setUser(row.get("First Name") != null ? row.get("First Name").toString() : "");
                a.setamount(row.get("amount") != null ? (Double) row.get("amount") : 0);
                a.setDate(row.get("date") != null ? (Date) row.get("date") : null);
                a.setTime(row.get("timeOfInvestment") != null ? (Time) row.get("timeOfInvestment") : null);
                a.setUserEmail(row.get("UserEmail") != null ? row.get("UserEmail").toString() : "");
                response.add(a);
            }

        } catch (Exception e) {
            System.out.println(e);

        }
        return response;

    }

   

    @GetMapping("/api/recentPayments/{Email}")
    public List<UserPayments> getRecentPayments(@PathVariable String Email) {

        List<UserPayments> response = new ArrayList<UserPayments>();
        try {
            List<Map<String, Object>> res = fetchdata_payments.fetchRecentPayments(Email);
            for (Map<String, Object> row : res) {
                UserPayments a = new UserPayments();
                a.setUser(row.get("First Name") != null ? row.get("First Name").toString() : "");
                a.setamount(row.get("amount") != null ? (Double) row.get("amount") : 0);
                a.setDate(row.get("date") != null ? (Date) row.get("date") : null);
                a.setTime(row.get("timeOfInvestment") != null ? (Time) row.get("timeOfInvestment") : null);
                a.setUserEmail(row.get("UserEmail") != null ? row.get("UserEmail").toString() : "");
                response.add(a);
            }

        } catch (Exception e) {
            System.out.println(e);

        }
        return response;

    }

    @PutMapping("api/user/payment")
    public loginResponse payment(@RequestParam String userEmail , @RequestParam String productId, @RequestParam int bits, @RequestParam Double amount) {
        loginResponse res = new loginResponse();
        try {
            fetchdata_payments.addPayment(userEmail, productId, bits, amount);
            res.setMessage("success");
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(userEmail);
            message.setSubject("Payment Successful");
            message.setText("Your Payment received Successfully,\nTotal Amount : $"+amount+"\n For More Details Contact: pawsonalitywebsite@gmail.com");
            mailSender.send(message);
            return (res);
        }
        catch(MailSendException e){
            res.setMessage("success");
            return(res);
        }
        catch (Exception e) {
            res.setMessage("Fail");
            return (res);
        }
    }

    @GetMapping("/api/totalFund/{Email}")
    public Double getTotalFund(@PathVariable String Email) {


        try {
            List<Map<String, Object>> res = fetchdata_payments.totalFund(Email);
            for (Map<String, Object> row : res) {
                return (row.get("totalFund") != null ? (Double) row.get("totalFund") : 0.0);
            }

        } catch (Exception e) {
            System.out.println(e);

        }
        return 0.0;

    }

    @PostMapping("/generate-otp")
    public loginResponse generateOtp(@RequestParam String user) {
        loginResponse res = new loginResponse();
        try {

            String otp = generateOtp();
            res.setMessage(otp);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user);
            message.setSubject("OTP Verification");
            message.setText("Your OTP is: " + otp);

            mailSender.send(message);
            return res;
        } catch (Exception e) {
            System.out.println(e);
            res.setMessage("Fail");
            return res;
        }
    }

    private String generateOtp() {
        // generate a 6-digit random OTP
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }


    @PostMapping("/{productId}/image")
    public ResponseEntity<?> uploadImage(@PathVariable Long productId, @RequestParam("file") MultipartFile file) {
        try {
            productService.uploadImage(productId, file.getBytes());
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/addProduct")
    public ResponseEntity<?> saveProduct( @RequestParam("file") MultipartFile file,@RequestParam("description") String description,@RequestParam("price") Long price,@RequestParam("quantity") Long quantity,@RequestParam("name") String name,@RequestParam("category") String category) {
        try {
            productService.saveProduct( file.getBytes(),description,price,quantity,name,category);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getProducts")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam String keyword) {
        List<Product> products = productService.getProductsByCategory(keyword);
        return ResponseEntity.ok(products);
    }

    @PutMapping("update/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestBody Product product) {
        try {
            productService.updateProduct(productId, product);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("delete/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



//=======================================Inventory Controller ============================
@PostMapping("/addInventoryManagmentProducts")
public ResponseEntity<?> saveInventoryProduct(@RequestParam("name") String name,
                                              @RequestParam("price") Long price,
                                              @RequestParam("file") MultipartFile file,
                                              @RequestParam(value = "quantity", required = false) Long quantity) {
    try {
        byte[] imageData = file.getBytes();
        inventoryService.saveInventoryProduct(name, price, imageData);
        return ResponseEntity.ok().build();
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}



@GetMapping("/getInventoryManagmentProducts")
public ResponseEntity<List<InventoryManagmentProducts>> getAllInventoryProducts() {
    List<InventoryManagmentProducts> products = inventoryService.getAllInventoryProducts();
    return ResponseEntity.ok(products);
}

@PutMapping("updateInventoryManagment/{productId}")
public ResponseEntity<?> updateInventoryProduct(@PathVariable Long productId, @RequestBody InventoryManagmentProducts InventoryManagmentproduct) {
    try {
        inventoryService.updateInventoryProduct(productId, InventoryManagmentproduct);
        return ResponseEntity.ok().build();
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

@DeleteMapping("deleteInventoryManagment/{productId}")
public ResponseEntity<?> deleteInventoryProduct(@PathVariable Long productId) {
    try {
        inventoryService.deleteInventoryProduct(productId);
        return ResponseEntity.ok().build();
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}


@PostMapping("Inventory/{productId}/image")
public ResponseEntity<?> uploadInventoryImage(@PathVariable Long productId, @RequestParam("file") MultipartFile file) {
    try {
        inventoryService.uploadInventoryImage(productId, file.getBytes());
        return ResponseEntity.ok().build();
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
//=======================user model===================

    @GetMapping("/getUsersData")
    public ResponseEntity<List<UserModel>> getAllusers() {
        List<UserModel> users = userservice.getAllUserProducts();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("deleteUsersData/{email}")
    public ResponseEntity<?> deleteUsersData(@PathVariable String email) {
        try {
            userservice.deleteUserData(email);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    //====================payments class
    @RestController
    @RequestMapping("/payments")
    public class PaymentController {
        @Autowired
        private PaymentService paymentService;


        @GetMapping("/statistics")
        public ResponseEntity<Map<String, Object>> getPaymentStatistics() {
            Map<String, Object> statistics = paymentService.getPaymentStatistics();
            return ResponseEntity.ok(statistics);
        }
    }
//========================comments=====
// API endpoint to add a comment
@PostMapping("/api/comments")
public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
    return ResponseEntity.ok(commentRepository.save(comment));
}

    // API endpoint to retrieve all comments
    @GetMapping("/api/comments")
    public ResponseEntity<List<Comment>> getAllComments() {
        return ResponseEntity.ok(commentRepository.findAll());
    }

}

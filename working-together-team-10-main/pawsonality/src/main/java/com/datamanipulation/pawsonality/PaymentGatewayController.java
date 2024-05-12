package com.datamanipulation.pawsonality;

import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin("*")
@RequestMapping("/api/payment")
public class PaymentGatewayController {

    private StripeClient stripeClient;
    @Autowired
    PaymentGatewayController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }
    @PostMapping("/charge")
    public String chargeCard(@RequestHeader(value="token") String token, @RequestHeader(value="amount") Double amount) throws Exception {
        Charge a=new Charge();
        try {
            a=this.stripeClient.chargeNewCard(token, amount);
            return(a.toJson());
        }
        catch(Exception e){
            System.out.println(e);
            return e.getLocalizedMessage();
        }
    }
}
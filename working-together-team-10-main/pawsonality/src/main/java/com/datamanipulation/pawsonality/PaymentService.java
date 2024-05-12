package com.datamanipulation.pawsonality;

import com.datamanipulation.pawsonality.fetchdataPayments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {
    @Autowired
    private fetchdataPayments paymentRepository;

    public Map<String, Object> getPaymentStatistics() {
        Map<String, Object> statistics = new HashMap<>();
        // Example statistics, you should calculate these based on your requirements
        long totalPayments = paymentRepository.count();
        double totalAmount = paymentRepository.sumAmount();
        // Add other statistics as needed

        statistics.put("totalPayments", totalPayments);
        statistics.put("totalAmount", totalAmount);
        // Add other statistics to the map

        return statistics;
    }
}

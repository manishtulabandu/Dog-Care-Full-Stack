import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {projectUrl} from "./configure";

const PaymentStatistics = () => {
    const [totalPayments, setTotalPayments] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleStatistics = async () => {
        try {
            const response = await axios.get(`${projectUrl}`+'/getPaymentStatistics');
            console.log('Payment statistics:', response.data);
            setTotalPayments(response.data.totalPayments);
            setTotalAmount(response.data.totalAmount);
        } catch (error) {
            console.error('Error fetching payment statistics:', error);
            // Display an error message to the user or handle the error in some other way
        }
    };


    return (
        <div>
            <h1>Payment Statistics</h1>
            <p>Total Payments: {totalPayments}</p>
            <p>Total Amount: {totalAmount}</p>
            <Button onClick={handleStatistics}>Fetch Statistics</Button>
        </div>
    );
};

export default PaymentStatistics;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "react-bootstrap";
const ECPayment = ({cName, cId, cAmount}) => {
    const [formData, setFormData] = useState({
        MerchantID: '',
        MerchantTradeNo: '',
        TotalAmount: 0,
        ItemName: '',
        ReturnURL: '',
        PaymentInfoURL: '',
        MerchantTradeDate: '',
        PaymentType: '',
        TradeDesc: '',
        ChoosePayment: '',
        EncryptType: 1,
        ExpireDate: 1,
    });

    useEffect(() => {
        
        axios.post('http://localhost/Allend/backend/public/api/ecpay',{
            c_name: cName,
            cid: cId,
            c_amount: cAmount
        }) 
            .then(response => {

                setFormData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSubmit = () => {
        
        const form = document.createElement('form');
        form.method = 'POST';
        form.type = 'hidden';
        form.action = 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5';


        
        Object.entries(formData).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        

        
        document.body.appendChild(form);
        form.submit();
    };

    return (
        <>
            <Button variant="info" size="lg" onClick={handleSubmit}>前往付款</Button>
        </>
    );
};

export default ECPayment;

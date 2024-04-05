import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ECPayment = () => {
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
        EncryptType: 0,
        ExpireDate: 0,
    });

    useEffect(() => {
        // 发起请求获取后端数据
        axios.post('http://localhost/Allend/backend/public/api/ecpay') // 根据您的后端路由进行修改
            .then(response => {
                // 将后端数据设置为 formData 的状态
                setFormData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSubmit = () => {
        // 构建提交表单
        const form = document.createElement('form');
        form.method = 'POST';
        form.type = 'hidden';
        form.action = 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5';

        // 添加表单字段
        Object.entries(formData).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        // 将表单添加到页面并自动提交
        document.body.appendChild(form);
        form.submit();
    };

    return (
        <div>
            <button onClick={handleSubmit}>前往付款</button>
        </div>
    );
};

export default ECPayment;

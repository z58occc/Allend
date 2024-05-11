<?php

namespace App\Http\Controllers;

use Ecpay\Sdk\Factories\Factory;
use Ecpay\Sdk\Services\UrlService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class ECPaymentController extends Controller
{
    public function Payment(Request $request)
    {
        $factory = new Factory([
            'hashKey' => 'pwFHCqoQZGmho4w6',
            'hashIv' => 'EkRm7iFT261dpevs',
        ]);

        $autoSubmitFormService = $factory->create('AutoSubmitFormWithCmvService');

        $baseURL = 'https://178b-106-64-151-32.ngrok-free.app/Allend/backend/public/api';
        $input = [
            'MerchantID' => '3002607',
            'MerchantTradeNo' => $request->cid,
            'MerchantTradeDate' => date('Y/m/d H:i:s'),
            'PaymentType' => 'aio',
            'TotalAmount' => $request->c_amount,
            'TradeDesc' => UrlService::ecpayUrlEncode('交易描述範例'),
            'ItemName' => $request->c_name,
            'ChoosePayment' => 'ATM',
            'EncryptType' => 1,

            // ATM 專用參數
            'ExpireDate' => 7,

            // 請參考 example/Payment/GetCheckoutResponse.php 範例開發
            'ReturnURL' => $baseURL . '/callback',
            'PaymentInfoURL' => $baseURL . '/callbackinfo',
            'ClientBackURL' => 'http://localhost:3000',
        ];

        $action = 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5';
        // 生成表單數據
        $formData = $autoSubmitFormService->generate($input, $action);

        // Extract input fields using regular expression
        preg_match_all('/<input.*?name=("|\')(.*?)("|\')(?:\s+.*?value=("|\')(.*?)("|\'))?.*?>/', $formData, $matches);

        // Combine matches into key-value pairs
        $jsonFormData = [];
        foreach ($matches[2] as $index => $name) {
            $value = $matches[5][$index] ?? ''; // Set default value to empty string if value attribute doesn't exist
            $jsonFormData[$name] = $value;
        }
        return Response::json($jsonFormData);
    }

    public function Callback(Request $request)
    {
        // $_POST = [
        //     'MerchantID' => '2000132',
        //     'MerchantTradeNo' => 'WPLL4E341E122DB44D62',
        //     'PaymentDate' => '2019/05/09 00:01:21',
        //     'PaymentType' => 'Credit_CreditCard',
        //     'PaymentTypeChargeFee' => '1',
        //     'RtnCode' => '1',
        //     'RtnMsg' => '交易成功',
        //     'SimulatePaid' => '0',
        //     'TradeAmt' => '500',
        //     'TradeDate' => '2019/05/09 00:00:18',
        //     'TradeNo' => '1905090000188278',
        //     'CheckMacValue' => '59B085BAEC4269DC1182D48DEF106B431055D95622EB285DECD400337144C698',
        // ];
        // Step 2: Verify the received payment result message from ECPay
        // Perform verification of checksum or any other necessary validation

        // For now, let's assume the verification is successful
        $verificationPassed = true;
        // Step 3: Respond back to ECPay
        if ($verificationPassed && $request->RtnCode === '1') {
            $cid = $request->input('MerchantTradeNo');
            DB::table('established_case')->where('cid', $cid)
            ->update([
                'c_status' => 2,
                'updated_at' => now(),
                'completed_time' => now()
            ]);

            return '1|OK';
        } else {
            return '0|Error';
        }
    }

    public function CallbackInfo(Request $request)
    {
        dd($request->all());
    }
}

# README Template
## 概述
這是一個接案網站，會員可以發案接案，使用分類及搜索功能查詢符合自身需求的案件。  
接發案雙方可透過聊天室直接溝通，且從會員中心追蹤案件進度。結案後透過金流及評價系統完成付款及評分

* 接案功能:  
會員可對符合資深需求的案件提出報價
* 發案功能:  
會員可根據自身需求發布案件
* 分類及搜索功能:  
使用者可根據篩選條件或案件及服務名稱進行查詢
* 追蹤案件功能:  
會員可透過會員中心追蹤案件目前狀態
* 評價功能:  
揭發案雙方皆可在結案後對雙方提出評價，會員平均評價會以1~5顆星顯示在會員的個人資訊頁


![image](https://github.com/shritesong/Allend/blob/main/img/img.jpg)
- [網站內容觀看連結](https://youtu.be/XeKvh7GjDLQ)

## 安裝套件
```bash
cd Allend/frondend
npm i
```
```bash
cd Allend/backend
npm i
composer i
php artisan jwt:secret
```

## 後端env設定
```bash
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USERNAME=your email
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="your email"
MAIL_FROM_NAME="${APP_NAME}"
BROADCAST_DRIVER=ably
JWT_SECRET=
JWT_ALGO=HS256
ABLY_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT=http://localhost:3000/auth/google/callback
```

## 專案技術
Frontend : React.js 18.2.0  
Backend : laravel 10.48  
排版 : Boostrap  
DB : MySQL   

## 第三方服務
聊天室 : Ably  
金流 : 綠界  

## 使用聊天室請啟動
```bash
cd Allend/backend
php artisan serve
```

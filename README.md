# README Template
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

## 後端.env設定
1. 產生APP_KEY 
```bash
cd Allend/backend
php artisan key:generate
```
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
排版 : Boostrap 5、React-Bootstrap
DB : MySQL

## 第三方服務
聊天室 : Ably  
金流 : 綠界  

## 使用聊天室請啟動
```bash
cd Allend/backend
php artisan serve
```

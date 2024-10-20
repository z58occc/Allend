# 外包網站 - 包您滿意

---

## 網站展示
![image](https://github.com/shritesong/Allend/blob/main/img/img.jpg)
- [網站內容觀看連結](https://youtu.be/XeKvh7GjDLQ)

## 專案技術
- Frontend：React.js 18.3.1
- Backend：Laravel 10.10 
- DB：MySQL 
- 排版：Boostrap 5、React-Bootstrap 

## 第三方服務
- 聊天室：Ably 
- 金流：綠界金流

## 安裝套件 (需有npm、composer)
- 前端
```bash
cd Allend/frondend
npm i
```
- 後端
```bash
cd Allend/backend
npm i
composer i
php artisan jwt:secret
```

## 後端.env設定
- 產生APP_KEY 
```bash
cd Allend/backend
php artisan key:generate
```
- 其他功能
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

## 啟動聊天室功能
```bash
cd Allend/backend
php artisan serve
```
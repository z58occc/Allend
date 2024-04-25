# README Template

- [網站內容觀看連結](https://youtu.be/XeKvh7GjDLQ)
## 安裝套件
```bash
cd Allend/frondend
npm install
```
```bash
cd Allend/backend
composer i
php artisan jwt:secret
composer require php-open-source-saver/jwt-auth
php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"
```
## 專案技術
Frontend:React.js 18.2.0  
Backend:laravel 10.x  
排版:Boostrap  
DB:MySQL   

## 第三方服務
聊天室:Ably  
金流:綠界  

## 使用聊天室請啟動
```bash
cd Allend/backend
php artisan serve
```

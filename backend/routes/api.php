<?php

use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ClosethecaseController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommitController;
use App\Http\Controllers\DemmandContentController;
use App\Http\Controllers\ECPaymentController;
use App\Http\Controllers\GetmemberemailController;
use App\Http\Controllers\IFindCaseController;
use App\Http\Controllers\IFindPeopleController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\MemberInfoController;
use App\Http\Controllers\Pop_QuoteAgreeController;
use App\Http\Controllers\ServiceContentController;
use App\Http\Controllers\TalentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// 首頁
Route::get('/index', IndexController::class);
// 查看我要接案
Route::get('/findcase', IFindCaseController::class);
// 查看我要找人
Route::get('/printservicecardcontent', IFindPeopleController::class);
// 查看人才頁面
Route::get('/talent', TalentController::class);
// 查看案件內容
Route::get('/demmand_content/{did}', DemmandContentController::class);
// 查看服務內容
Route::get('/service_content', ServiceContentController::class);

// 取得email
Route::get('/user/email', GetmemberemailController::class);

// 忘記密碼(發信)
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
// 重設密碼
Route::post('/reset-password', [NewPasswordController::class, 'store']);

// 重寄驗證信 (信箱驗證在web)
Route::post('/emailverification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1']);
// 生成、驗證驗證碼
// Route::get('/capgeneration', [CaptchaController::class, 'reloadCaptcha']);
// Route::post('/capvalidation', [CaptchaController::class, 'validateCaptcha']);

/* verified */

// 送出發案表單
Route::post('/commitcase', CommitController::class)->middleware(['auth', 'verified']);

// 送出、查看、接受、拒絕報價
Route::post('/quote', [Pop_QuoteAgreeController::class, 'sendQuote']);
Route::get('/pop_quote', [Pop_QuoteAgreeController::class, 'getQuote']);
Route::post('/pop_agree', [Pop_QuoteAgreeController::class, 'agreeQuote']);
Route::post('/pop_disagree', [Pop_QuoteAgreeController::class, 'disagreeQuote']);

// 聊天室
Route::post('new-message', [ChatController::class, 'Newmessage']);
Route::get('get-mlist', [ChatController::class, 'Getlist']);
Route::get('get-message', [ChatController::class, 'Getmessage']);

// 從移交到結案、評價畫面
Route::get('/take_submit', [ClosethecaseController::class, 'submitData']); // 接案者的提交按鈕 => 接案進行中轉成等待中(狀態3)
Route::get('/publish_recevice', [ClosethecaseController::class, 'receviceData']); // 案主接收結果的按鈕 => 發案者、接案者案件狀態轉成已結案
Route::post('/publicEvaluation', [ClosethecaseController::class, 'publishEvaluation']); // 發案者的發送對接案者評價按鈕 => 在已結案發送評價
Route::post('/takeEvaluation', [ClosethecaseController::class, 'takeEvaluation']); // 接案者的評價按鈕

// 綠界
Route::post('/ecpay', [ECPaymentController::class, 'Payment']);
Route::post('/callback', [ECPaymentController::class, 'Callback']);
Route::post('/callbackinfo', [ECPaymentController::class, 'CallbackInfo']);

Route::controller(AuthController::class)->group(function () {
    // 註冊
    Route::post('/register', 'register');
    // 登入
    Route::post('/login', 'login');
    // 登出
    Route::post('/logout', 'logout');
});

// 會員功能
Route::controller(MemberInfoController::class)->group(function () {
    // 會員儀表板
    Route::get('/dashboard', 'dashboard')->withoutMiddleware('verified');
    // 獲取接案方資料
    Route::get('/mem', 'getMemInfo')->withoutMiddleware('verified');
    // 修改接案方資料
    Route::post('/updateprofiles', 'updateMemInfo')->withoutMiddleware('verified');
    // 獲取發案方資料
    Route::get('/demmandmem', 'getDemmandInfo')->withoutMiddleware('verified');
    // 修改發案方資料
    Route::post('/updatedemmand', 'updateDemmandInfo')->withoutMiddleware('verified');
    // 修改密碼
    Route::post('/updatepassword', 'updatePassword')->withoutMiddleware('verified');
    // 獲取頭像、姓名
    Route::get('/avaname', 'getAvatar')->withoutMiddleware('verified');
    // 修改頭像
    Route::post('/avatar', 'updateAvatar')->withoutMiddleware('verified');

    // 獲取接案紀錄
    Route::get('/memtakecase', 'getTakeCase');
    // 編輯接案紀錄
    Route::post('/updatetakecase', 'updateTakeCase');
    // 刪除接案紀錄
    Route::post('/delmembertakecase', 'delTakeCase');

    // 獲取發案紀錄
    Route::get('/mempublishcase', 'getPublishCase');
    // 編輯發案刊登
    Route::post('/updatepublishcase', 'updatePublishCase');
    // 刪除發案紀錄
    Route::post('/delpublishcase', 'delPublishCase');

    // 獲取服務管理頁面(服務、作品、影音)
    Route::get('/memservice', 'getServicePage');
    // 新增服務
    Route::post('/addservice', 'addService');
    // 編輯服務
    Route::post('/updateservice', 'updateService');
    // 刪除服務
    Route::post('/delmemser', 'delService');
    // 新增作品
    Route::post('/work', 'addWork');
    // 編輯作品
    Route::post('/upwork', 'updateWork');
    // 刪除作品
    Route::post('/delwork', 'delWork');
    // 新增影音
    Route::post('/video', 'addVideo');
    // 編輯影音
    Route::post('/upvideo', 'updateVideo');
    // 刪除影音
    Route::post('/delvideo', 'delVideo');

    // 獲取我的收藏頁面
    Route::get('/collection', 'getCollection');
    // 新增收藏
    Route::post('/addcollection', 'addCollection');
    // 取消收藏
    Route::post('/delcollection', 'delCollection');
});

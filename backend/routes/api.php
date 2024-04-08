<?php

// use App\Http\Controllers\AcceptanceIssueController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\AuthController;
// use App\Http\Controllers\CaptchaController;
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
// use App\Http\Controllers\MemberServiceController;
// use App\Http\Controllers\MemberserviceDeleteController;
// use App\Http\Controllers\MemberTakeCaseController;
// use App\Http\Controllers\MemberTakeCaseDeleteController;
use App\Http\Controllers\Pop_QuoteAgreeController;
use App\Http\Controllers\ProviderController;
// use App\Http\Controllers\PublishCaseController;
// use App\Http\Controllers\PublishCaseDeleteController;
use App\Http\Controllers\ServiceContentController;
// use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TalentController;
use App\Http\Controllers\UpdateProjectController;
use App\Http\Controllers\UpdateServiceController;

// use App\Http\Controllers\VideoController;
// use App\Http\Controllers\WorkController;

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
// 查看我要找人.
Route::get('/printservicecardcontent', IFindPeopleController::class);
// 查看人才頁面
Route::get('/talent', TalentController::class);
// 查看案件內容
Route::get('/demmand_content/{did}', DemmandContentController::class);
// 查看服務內容
Route::get('/service_content', ServiceContentController::class);

// 送出發案表單
Route::post('/commitcase', CommitController::class)->middleware(['auth', 'verified']);

Route::post('/updateservice', UpdateServiceController::class);
Route::post('/updateproject', UpdateProjectController::class);

// 送出、查看、接受、拒絕報價
Route::post('/quote', [Pop_QuoteAgreeController::class, 'sendQuote']);
Route::get('/pop_quote', [Pop_QuoteAgreeController::class, 'getQuote']);
Route::post('/pop_agree', [Pop_QuoteAgreeController::class, 'agreeQuote']);
Route::post('/pop_disagree', [Pop_QuoteAgreeController::class, 'disagreeQuote']);

//綠界
Route::post('/ecpay', [ECPaymentController::class, 'Payment']);
Route::post('/callback', [ECPaymentController::class, 'Callback']);

//取得email
Route::get('/user/email', GetmemberemailController::class);
// 接發案內容
// Route::get('/pulish_view', [AcceptanceIssueController::class,'getPublishedData']); //查看發案主的刊登中
// Route::post('/pulish_save', [AcceptanceIssueController::class,'savePublishedData']); //編輯刊登中案件
// Route::get('/publish_progress_view', [AcceptanceIssueController::class,'publishprogressData']); //查看發案主的進行中
// Route::post('/publish_recevice', [AcceptanceIssueController::class,'receviceData']); //提交成果給發案主的按鈕
// Route::get('/take_view', [AcceptanceIssueController::class,'takegetData']); //接案者的接案紀錄
// Route::post('/take_save', [AcceptanceIssueController::class,'takesaveData']); //接案者的儲存變更按鈕
// Route::get('/take_progress_view', [AcceptanceIssueController::class,'takeprogressData']); //接案者的進行中
// Route::post('/take_submit', [AcceptanceIssueController::class,'submitData']); //接案者的提交按鈕
// Route::post('/publicEvaluation', [AcceptanceIssueController::class,'publishEvaluation']); //發案者的評價按鈕
// Route::post('/takeEvaluation', [AcceptanceIssueController::class,'takeEvaluation']); //接案者的評價按鈕

// 從移交到結案、評價畫面
Route::get('/take_submit', [ClosethecaseController::class,'submitData']); // 接案者的提交按鈕 => 接案進行中轉成等待中(狀態3)
Route::get('/publish_recevice', [ClosethecaseController::class,'receviceData']); // 案主接收結果的按鈕 => 發案者、接案者案件狀態轉成已結案
Route::post('/publicEvaluation', [ClosethecaseController::class,'publishEvaluation']); // 發案者的發送對接案者評價按鈕 => 在已結案發送評價
// Route::get('/takeclose_view', [ClosethecaseController::class,'takeClose']); // 接案者看到的結案畫面
Route::post('/takeEvaluation', [ClosethecaseController::class,'takeEvaluation']); // 接案者的評價按鈕
// Route::get('/publishclose_view', [ClosethecaseController::class,'publishClose']); // 案主看到的最終結案畫面

Route::controller(AuthController::class)->group(function(){
    // 註冊
    Route::post('/register', 'register');
    // 登入
    Route::post('/login', 'login');
    // 登出
    Route::post('/logout', 'logout');
});


// 忘記密碼(發信)
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
// 重設密碼
Route::post('/reset-password', [NewPasswordController::class, 'store']);
// 信箱驗證
Route::get('/verifyemail/{id}/{hash}', VerifyEmailController::class)
->middleware(['auth', 'throttle:6,1'])->name('verifyemail');
// 重寄驗證信
Route::post('/emailverification-notification', [EmailVerificationNotificationController::class, 'store'])
->middleware(['auth', 'throttle:6,1']);
// 生成、驗證驗證碼
// Route::get('/capgeneration', [CaptchaController::class, 'reloadCaptcha']);
// Route::post('/capvalidation', [CaptchaController::class, 'validateCaptcha']);

// 會員功能
Route::controller(MemberInfoController::class)->group(function(){
    // 會員儀表板
    Route::get('/dashboard', 'dashboard');
    // 獲取接案方資料
    Route::get('/mem', 'getMemInfo');
    // 修改接案方資料
    Route::post('/updateprofiles', 'updateMemInfo');
    // 獲取發案方資料
    Route::get('/demmandmem', 'getDemmandInfo');
    // 修改發案方資料
    Route::post('/updatedemmand', 'updateDemmandInfo');
    // 修改密碼
    Route::post('/fixp', 'updatePassword');
    // 獲取頭像、姓名
    Route::get('/avaname', 'getAvatar');
    // 修改頭像
    Route::post('/avatar', 'updateAvatar');
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

    // 獲取服務管理頁面
    Route::get('/memservice', 'getService');
    // 新增服務
    Route::post('/addservice', 'addService');
    // 編輯服務
    Route::post('/updateservice', 'updateService');
    // 刪除服務
    Route::get('/delmemser', 'delService');
    // 新增作品
    Route::post('/work', 'addWork');
    // 編輯作品
    Route::post('/upwork', 'updateWork');
    // 新增影音
    Route::post('/video', 'addVideo');
    // 編輯影音
    Route::post('/upvideo', 'updateVideo');
    // 獲取我的收藏頁面
    Route::get('/collection', 'getCollection');
});


//會員服務管理，刪除
// Route::get('/memservice',MemberServiceController::class);
// Route::post('/memserviceDelete',MemberserviceDeleteController::class);
//會員接案紀錄，刪除
// Route::get('/memberTakeCase',MemberTakeCaseController::class);
// Route::post('/memberTakeCaseDelete',MemberTakeCaseDeleteController::class);
//會員發案紀錄，刪除
// Route::get('/publishCase',PublishCaseController::class);
// Route::post('/publishCaseDelete',PublishCaseDeleteController::class);
// 新增服務
// Route::post('/service',ServiceController::class);
// 新增作品
// Route::post('/work',WorkController::class);
// 新增影音
// Route::post('/video',VideoController::class);
// 會員服務管理、刪除
// Route::get('/memservice',MemberServiceController::class);
// Route::post('/memserviceDelete',MemberserviceDeleteController::class);
// 會員接案紀錄
// Route::get('/memTakeCase',MemberTakeCaseController::class);





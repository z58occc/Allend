<?php

use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommitController;
use App\Http\Controllers\demmandContentController;
use App\Http\Controllers\IFindCommitController;
use App\Http\Controllers\IFindPeopleController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\IWantQuoteController;
use App\Http\Controllers\MeMInfoController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TalentController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\WorkController;
use Illuminate\Database\Query\IndexHint;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// 首頁
Route::get('/index',IndexController::class);
// 人才頁面
Route::get('/Talent',TalentController::class);
// 案件內容
Route::get('/demmand_content',demmandContentController::class);
// 我要報價
Route::post('/quote', IWantQuoteController::class);
// 發案分類
Route::get('/findcommmit',IFindCommitController::class);
// 服務分類
Route::get('/findpeople',IFindPeopleController::class);
// 發案表單
Route::post('/commit_crime', CommitController::class);
// 新增服務
Route::post('/service',ServiceController::class);
// 新增作品
Route::post('/work',WorkController::class);
// 新增影音
Route::post('/video',VideoController::class);
// 註冊、登入
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');

    Route::post('/login', 'login');
    Route::post('/logout', 'logout');
    Route::post('/updateprofiles', 'update');
    // 寄忘記密碼信
    Route::post('/forgetpwd', [PasswordResetLinkController::class, 'store']);
    // 完成修改密碼
    Route::post('/resetpwd', [NewPasswordController::class, 'store']);
});

Route::controller(MeMInfoController::class)->group(function(){
    // 會員儀表板
    Route::get('/dashboard', 'dashboard');
    // 獲取會員資料
    Route::post('/mem', 'getMemInfo');
    // 服務管理頁面
    Route::post('/servicemanagement', 'getService');
    // 我的收藏
    Route::post('/collection', 'getCollection');
});
    // 等待驗證網址 => 可以重發驗證信
    Route::post('/waitingverification');
  // 信箱確認信 => 驗證網址連結 => 驗證成功後跳轉首頁
  Route::get('/verifyemail/{mid}/{hash}', VerifyEmailController::class)
  ->middleware('auth:api')
//   ->middleware(['auth', 'signed', 'throttle:6,1'])
  ->name('verifyemail');
  // 重送驗證信
  Route::post('/emailverification-notification', [EmailVerificationNotificationController::class, 'store'])
  ->middleware(['auth', 'throttle:6,1']);

// Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
//                 ->middleware(['auth', 'signed', 'throttle:6,1'])
//                 ->name('verification.verify');

// Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
//                 ->middleware(['auth', 'throttle:6,1'])
//                 ->name('verification.send');

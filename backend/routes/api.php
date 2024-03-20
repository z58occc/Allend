<?php

use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommitController;
use App\Http\Controllers\IFindCommitController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\WorkController;


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

//發案分類
Route::get('/category',IFindCommitController::class);
//發案表單API
Route::post('/commit_crime', CommitController::class);
//服務API
Route::post('/service',ServiceController::class);
//作品API
Route::post('/work',WorkController::class);
//新增影音
Route::post('/video',VideoController::class);
// 註冊、登入
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    // Route::post('/login', 'login');
    // Route::post('/updateprofiles', 'update');
    // // 獲取會員資料
    // Route::post('/mem-data', 'acquire');
});

// Route::post('/forgetpwd', [PasswordResetLinkController::class, 'store']);
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
     ->middleware('guest')
     ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
     ->middleware('guest')
     ->name('password.update');

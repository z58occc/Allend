<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommitController;
use App\Http\Controllers\RegisterController;
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

//發案表單API
Route::post('/commit_crime', CommitController::class);
//新增服務API
Route::post('/service',ServiceController::class);
//新增作品API
Route::post('work',WorkController::class);
//新增影音
Route::post('video',VideoController::class);
// 註冊
Route::post('/register', [RegisterController::class, 'create']);

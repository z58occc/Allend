<?php

use App\Http\Controllers\ProviderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return ['Laravel' => app()->version()];
// });

// 轉址
Route::get('/auth/google/redirect', [ProviderController::class, 'redirect']);
// 回調
Route::get('/auth/google/callback', [ProviderController::class, 'callback']);
require __DIR__.'/auth.php';

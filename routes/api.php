<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\FetchUsers;
use App\Http\Controllers\FinacesTbController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\ProductsTbController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
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

Route::resource('/blog',BlogController::class);
Route::resource('/finance',FinacesTbController::class);
Route::resource('/chat',MessagesController::class);
Route::resource('/product',ProductsTbController::class);

Route::get('/fetchUsers', [FetchUsers::class, "index"]);

Route::post('/storeConvs', [MessagesController::class, 'storeConvs']);
Route::get('/fetchConvs', [MessagesController::class, 'fetchConvs']);
Route::delete('/deleteConversion/{id}', [MessagesController::class, 'deleteConversion']);

// 

Route::get('/fetchMessages/{id}', [MessagesController::class,'index']);

// Route::get('/users', RegisterController::class);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {

    return $request->user();
});

<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactUsInfoController;
use App\Http\Controllers\FetchUsers;
use App\Http\Controllers\FinacesTbController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\ProductsTbController;
use App\Http\Controllers\ProductCommentsController;
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


//  comment routes
Route::get('/comments/{id}', [ProductCommentsController::class, 'index']);
Route::post('/comments/store', [ProductCommentsController::class, 'store']);
Route::post('/comments/update/{id}', [ProductCommentsController::class, 'update']);
Route::delete('/comments/{id}', [ProductCommentsController::class, 'destroy']);

//  contact Us  routes
Route::get('/contact', [ContactUsInfoController::class, 'index']);
Route::post('/contact/store', [ContactUsInfoController::class, 'store']);
Route::post('/contact/update/{id}', [ContactUsInfoController::class, 'update']);
Route::delete('/contact/{id}', [ContactUsInfoController::class, 'destroy']);

// products routes
Route::get('/product', [ProductsTbController::class, 'index']);
Route::post('/product/store', [ProductsTbController::class, 'store']);
Route::post('/product/update/{id}', [ProductsTbController::class, 'update']);
Route::delete('/product/{id}', [ProductsTbController::class, 'destroy']);

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

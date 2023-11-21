<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\AuthController;

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


//{
//    "token": "10|WFjXEcrHXnWyxJUjpkYNvDGCgjKmzqyuwZstMqH020b17c56"
//}



Route::post('login', [AuthController::class, 'login'])->name('login');;
Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']);


//Route::middleware('auth:sanctum')->group(function () {
//    // Ваши защищенные маршруты здесь
//});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [\App\Http\Controllers\UserController::class, 'index']);


    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

    Route::get('/user/{id}', [\App\Http\Controllers\UserController::class, 'show']);

    Route::post('/user', [\App\Http\Controllers\UserController::class, 'store']);

    Route::put('/user/{id}', [\App\Http\Controllers\UserController::class, 'update']);

    Route::delete('/user/{id}', [\App\Http\Controllers\UserController::class, 'destroy']);


    Route::get('/products', [\App\Http\Controllers\ProductController::class, 'index']);

    Route::get('/product/{id}', [\App\Http\Controllers\ProductController::class, 'show']);

    Route::post('/product', [App\Http\Controllers\ProductController::class, 'store']);

    Route::put('/product/{id}', [\App\Http\Controllers\ProductController::class, 'update']);

    Route::post('/upload', [\App\Http\Controllers\ProductController::class, 'upload_image']);

    Route::delete('/product/{id}', [\App\Http\Controllers\ProductController::class, 'destroy']);

    Route::apiResource('/orders', \App\Http\Controllers\OrderController::class)->only('index', 'show');
//    Route::apiResource('/permissions', \App\Http\Controllers\PermissionController::class)->only('index');
    Route::get('/permissions', [\App\Http\Controllers\PermissionController::class, 'index']);

    Route::get('/export', [\App\Http\Controllers\OrderController::class, 'export']);


    Route::get('/chart', [\App\Http\Controllers\DashboardController::class, 'chart']);

    Route::get('/roles', [RoleController::class, 'index']);
    Route::get('/role/{id}', [RoleController::class, 'show']);
    Route::put('/role/{id}', [RoleController::class, 'update']);
    Route::post('/role_create', [RoleController::class, 'store']);
    Route::delete('/role/{id}', [RoleController::class, 'destroy']);


});

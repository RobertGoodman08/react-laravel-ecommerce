<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

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
Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [\App\Http\Controllers\AuthController::class, 'user']);
    Route::post('/user/info', [\App\Http\Controllers\AuthController::class, 'updateInfo']);
    Route::post('/users/password', [\App\Http\Controllers\AuthController::class, 'updatePassword']);
});


//Route::middleware('auth:sanctum')->group(function () {
//    // Ваши защищенные маршруты здесь
//});




// middleware(['auth:sanctum', 'scope:admin'])

Route::prefix('admin')->middleware(['auth:sanctum', 'scope:admin'])->namespace('Admin')->group( function () {
    Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index']);


    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

    Route::get('/user/{id}', [\App\Http\Controllers\Admin\UserController::class, 'show']);

    Route::post('/user', [\App\Http\Controllers\Admin\UserController::class, 'store']);

    Route::put('/user/{id}', [\App\Http\Controllers\Admin\UserController::class, 'update']);

    Route::delete('/user/{id}', [\App\Http\Controllers\Admin\UserController::class, 'destroy']);






    Route::get('/products', [\App\Http\Controllers\Admin\ProductController::class, 'index']);

    Route::get('/product/{id}', [\App\Http\Controllers\Admin\ProductController::class, 'show']);

    Route::post('/product', [\App\Http\Controllers\Admin\ProductController::class, 'store']);

    Route::put('/product/{id}', [\App\Http\Controllers\Admin\ProductController::class, 'update']);

    Route::post('/upload', [\App\Http\Controllers\Admin\ProductController::class, 'upload_image']);

    Route::delete('/product/{id}', [\App\Http\Controllers\Admin\ProductController::class, 'destroy']);

//    Route::apiResource('/orders', \App\Http\Controllers\Admin\OrderController::class)->only('index', 'show');

    Route::get('/orders', [\App\Http\Controllers\Admin\OrderController::class, 'index']);
    Route::get('/order/{id}', [\App\Http\Controllers\Admin\OrderController::class, 'show']);


//    Route::apiResource('/permissions', \App\Http\Controllers\Admin\PermissionController::class)->only('index');
    Route::get('/permissions', [\App\Http\Controllers\Admin\PermissionController::class, 'index']);

    Route::get('/export', [\App\Http\Controllers\Admin\OrderController::class, 'export']);


    Route::get('/chart', [\App\Http\Controllers\Admin\DashboardController::class, 'chart']);

    Route::get('/roles', [RoleController::class, 'index']);
    Route::get('/role/{id}', [RoleController::class, 'show']);
    Route::put('/role/{id}', [RoleController::class, 'update']);
    Route::post('/role_create', [RoleController::class, 'store']);
    Route::delete('/role/{id}', [RoleController::class, 'destroy']);


});


Route::prefix('influencer')->namespace('Influencer')->group( function () {
    Route::get('products', [\App\Http\Controllers\Influencer\ProductController::class, 'index']);


    Route::middleware(['auth:sanctum', 'scope:influencer'])->group(function () {

    });
});

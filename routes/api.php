<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/login',[UserController::class, 'login']);

//PortFolio Routes
Route::get('/portfolios/all',[PortfolioController::class, 'allPorfolios']);
Route::get('/portfolios/latest',[PortfolioController::class, 'latestPortfolios']);
Route::get('/portfolios/{slug}',[PortfolioController::class, 'showslug']);

//Contact Routes
Route::post('/contact',[ContactController::class, 'store']);



Route::middleware('auth:sanctum')->group(function(){

    //CurrentUser
    Route::get('/user', [UserController::class, 'getUser']);
    //logout
    Route::post('/logout',[UserController::class, 'logout']);

    //PortFolio Routes
    Route::get('/portfolios',[PortfolioController::class, 'index']);
    Route::get('/portfolio/{id}',[PortfolioController::class, 'show']);
    Route::post('/portfolio',[PortfolioController::class, 'store']);
    Route::put('/portfolio/{id}',[PortfolioController::class, 'update']);
    Route::delete('/portfolio/{id}',[PortfolioController::class, 'destroy']);

    //Contact Routes
    Route::get('/contacts',[ContactController::class, 'index']);
    Route::get('/contact/{id}',[ContactController::class, 'show']);
    Route::put('/contact/{id}',[ContactController::class, 'update']);
    Route::delete('/contact/{id}',[ContactController::class, 'destroy']);

    //User Routes
    Route::get('/users',[UserController::class, 'index']);
    Route::get('/user/{id}',[UserController::class, 'show']);
    Route::put('/user/{id}',[UserController::class, 'update']);
    Route::delete('/user/{id}',[UserController::class, 'destroy']);

});
<?php

use Illuminate\Support\Facades\Route;

// route to serve admin include api
Route::get('/admins', function () {
    return view('admin');
});

Route::get('/admins/{any}', function () {
    return view('admin');
})->where('any', '.*');

// Catch-all for frontend routes (avoid matching api and admins)
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!api/?)(?!admins/?).*$');
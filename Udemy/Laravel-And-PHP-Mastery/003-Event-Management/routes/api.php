<?php

use App\Http\Controllers\Api\AttendeeController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login'])->middleware('throttle:login');

Route::apiResource('events', EventController::class)->only(['index', 'show']);
Route::apiResource('events.attendees', AttendeeController::class)->scoped()->only(['index', 'show']);

Route::middleware(['auth:sanctum', 'throttle:writes'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResource('events', EventController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('events.attendees', AttendeeController::class)->scoped()->only(['store', 'destroy']);
});

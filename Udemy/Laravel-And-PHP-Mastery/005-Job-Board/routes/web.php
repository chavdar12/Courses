<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\MyJobController;
use App\Http\Middleware\EnsureEmployer;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/jobs');
Route::resource('jobs', JobController::class)->only(['index', 'show']);

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'create'])->name('login');
    Route::post('login', [AuthController::class, 'store'])->middleware('throttle:5,1');
});

Route::middleware('auth')->group(function () {
    Route::delete('logout', [AuthController::class, 'destroy'])->name('logout');

    Route::get('jobs/{job}/apply', [JobApplicationController::class, 'create'])->name('jobs.apply');
    Route::post('jobs/{job}/apply', [JobApplicationController::class, 'store'])->name('jobs.apply.store');
    Route::get('my-applications', [JobApplicationController::class, 'index'])->name('applications.index');
    Route::delete('my-applications/{application}', [JobApplicationController::class, 'destroy'])->name('applications.destroy');

    Route::get('employer/create', [EmployerController::class, 'create'])->name('employer.create');
    Route::post('employer', [EmployerController::class, 'store'])->name('employer.store');

    Route::resource('my-jobs', MyJobController::class)->except('show')->middleware(EnsureEmployer::class);
});

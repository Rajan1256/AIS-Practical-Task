<?php

use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\StateController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/departments', [DepartmentController::class, 'index']);
Route::get('/states', [StateController::class, 'index']);
Route::get('/states/{state}/cities', [StateController::class, 'cities']);
Route::get('/cities', [CityController::class, 'index']);

Route::apiResource('employees', EmployeeController::class);

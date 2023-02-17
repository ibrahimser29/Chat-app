<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;

Route::prefix('/conversation')->middleware('auth:sanctum')->group(function(){
    Route::get('/',[ChatController::class,'index']);
    Route::get('/{conversationId}',[ChatController::class,'showConversation']);
    Route::post('/{userId}',[ChatController::class,'startConversation']);
    Route::post('/{conversationId}/send-message',[ChatController::class,'sendMessage']);
});
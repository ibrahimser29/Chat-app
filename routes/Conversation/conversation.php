<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;

Route::prefix('/conversation')->middleware('auth:sanctum')->group(function(){
    Route::get('/',[ChatController::class,'index']);
    Route::get('/{conversationId}',[ChatController::class,'showConversation']);
    Route::get('/{userId}',[ChatController::class,'startConversation']);
    Route::get('/{conversationId}/send-message',[ChatController::class,'sendMessage']);
});
<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;

Route::prefix('/conversations')->middleware('auth:sanctum')->group(function(){
    Route::get('/',[ChatController::class,'index']);
    Route::get('/{conversationId}/messages',[ChatController::class,'showConversation']);
    Route::get('/{userId}',[ChatController::class,'startConversation']);
    Route::post('/{conversationId}/send-message',[ChatController::class,'sendMessage']);
});
<?php
namespace App\Http\Controllers;

use App\Events\MessageSent;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Conversation;
use App\Models\Message;


class ChatController extends Controller
{
    public function index()
    {
        try{
            // Retrieve all users except the authenticated user
        $users = User::where('id', '!=', auth()->id())->get();

        // Retrieve the conversations for the authenticated user
        $conversations = Conversation::where('user1_id', auth()->id())
            ->orWhere('user2_id', auth()->id())
            ->get();

            return response()->success([
                'users' => $users,
                'conversations' => $conversations
            ]);
        }catch (\Exception $e) {
            return response()->error($e->getMessage());
        }
    }

    public function showConversation($conversationId)
    {
        try{
        // Retrieve the messages for the given conversation
        $messages = Message::with('user')->where('conversation_id', $conversationId)->get();

        return response()->success(['messages' => $messages]);
        }catch (\Exception $e) {
            return response()->error($e->getMessage());
        }
        
    }

    public function startConversation($userId)
    {
        try{
            // Check if a conversation between the authenticated user and the selected user already exists
        $conversation = Conversation::where(function ($query) use ($userId) {
            $query->where('user1_id', auth()->id())
                ->where('user2_id', $userId);
        })->orWhere(function ($query) use ($userId) {
            $query->where('user1_id', $userId)
                ->where('user2_id', auth()->id());
        })->first();

        // If a conversation does not exist, create a new one
        if (!$conversation) {
            $conversation = new Conversation();
            $conversation->user1_id = auth()->id();
            $conversation->user2_id = $userId;
            $conversation->save();
        }

        return response()->success(['conversation'=>$conversation]);
        } catch (\Exception $e) {
            return response()->error($e->getMessage());
        }
        
    }

    public function sendMessage($conversationId, Request $request)
    {
        try{
            $request->validate([
                'message' => 'required|string|max:255',
            ]);
            $conversation = Conversation::find($conversationId);
            if(!$conversation) return response()->error('No Such Chat');
            $user1_id = $conversation->user1_id;
            $user2_id = $conversation->user2_id;
            $message = new Message();
            $message->conversation_id = $conversationId;
            $message->user_id = Auth()->user()->id;
            $message->message = $request->input('message');
            $message->save();
            broadcast(new MessageSent(Message::with('user')->find($message->id),$user1_id,$user2_id));
            return response()->success(['message'=>'Message sent successfully']);
        }catch (\Exception $e) {
            return response()->error($e->getMessage());
        }
    }
}



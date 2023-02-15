<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;
use App\Models\Conversation;
use App\Models\Message;

class ChatController extends Controller
{
    public function index()
    {
        // Retrieve all users except the authenticated user
        $users = User::where('id', '!=', auth()->id())->get();

        // Retrieve the conversations for the authenticated user
        $conversations = Conversation::where('user1_id', auth()->id())
            ->orWhere('user2_id', auth()->id())
            ->get();

            return response()->json([
                'users' => $users,
                'conversations' => $conversations
            ]);
    }

    public function showConversation(Conversation $conversation)
    {
        // Retrieve the messages for the given conversation
        $messages = Message::where('conversation_id', $conversation->id)->get();

        return view('chat.show', compact('conversation', 'messages'));
    }

    public function startConversation(User $user)
    {
        // Check if a conversation between the authenticated user and the selected user already exists
        $conversation = Conversation::where(function ($query) use ($user) {
            $query->where('user1_id', auth()->id())
                ->where('user2_id', $user->id);
        })->orWhere(function ($query) use ($user) {
            $query->where('user1_id', $user->id)
                ->where('user2_id', auth()->id());
        })->first();

        // If a conversation does not exist, create a new one
        if (!$conversation) {
            $conversation = new Conversation();
            $conversation->user1_id = auth()->id();
            $conversation->user2_id = $user->id;
            $conversation->save();
        }

        return redirect()->route('conversation', $conversation);
    }

    public function sendMessage(Conversation $conversation, Request $request)
    {
        // Create a new message for the given conversation
        $message = new Message();
        $message->conversation_id = $conversation->id;
        $message->user_id = auth()->id();
        $message->message = $request->input('message');
        $message->save();

        return redirect()->route('conversation', $conversation);
    }
}



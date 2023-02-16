<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

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

            return response()->json([
                'users' => $users,
                'conversations' => $conversations
            ]);
        }catch (\Exception $e) {
            return response()->json([
                'error' => 'Unable to retrieve data.',
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function showConversation($conversationId)
    {
        try{
        // Retrieve the messages for the given conversation
        $messages = Message::where('conversation_id', $conversationId)->get();

        return response()->json([
            'messages' => $messages
        ]);
        }catch (\Exception $e) {
            return response()->json([
                'error' => 'Unable to retrieve conversation messages.',
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
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

        return new JsonResource($conversation);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unable to start conversation.',
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function sendMessage($conversationId, Request $request)
    {
        try{
            $request->validate([
                'message' => 'required|string|max:255',
                'conversation_id' => [
                    'required',
                    Rule::exists('conversations', 'id')->where(function ($query) use ($conversationId) {
                        $query->where('id', $conversationId);
                    }),
                ],
            ]);
            // Create a new message for the given conversation
            $message = new Message();
            $message->conversation_id = $conversationId;
            $message->user_id = auth()->id();
            $message->message = $request->input('message');
            $message->save();
    
            return response()->json('Message sent successfully');
        }
        catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation error.',
                'message' => $e->getMessage(),
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }catch (\Exception $e) {
            return response()->json([
                'error' => 'Unable to send message.',
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}



<?php
namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\UnauthorizedException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->success([
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        throw_if(!Auth::attempt($validatedData),UnauthorizedException::class);
        try{
             /** @var \App\Models\MyUserModel $user **/
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;

            return response()->success([
                'token' => $token,
                'user' => $user,
            ]);
        }catch(Exception $e){
            return response()->error($e->getMessage());
        }
    }

    public function logout()
    {
        User::find(Auth::user()->id)->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}

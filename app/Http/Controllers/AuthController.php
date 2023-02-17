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
        try{
            $input = $request->only(['name','email']);
            $input['password'] =  Hash::make($request->password);
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $image_name = time() . '.' . $image->getClientOriginalExtension();
                $destinationPath = public_path('/images');
                $image->move($destinationPath, $image_name);
                $input['image'] = $image_name;
            }
            $user = User::create($input);
    
            $token = $user->createToken('token')->plainTextToken;
    
            return response()->success([
                'token' => $token,
                'user' => $user,
            ]);
        
        }catch(Exception $e){
            return response()->error($e->getMessage());
        }
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        throw_if(!Auth::attempt($validatedData),UnauthorizedException::class);
        try{
             /** @var \App\Models\User $user **/
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

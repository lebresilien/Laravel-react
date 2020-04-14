<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\RegistersUsers;
use Response;
use Validator;

class AuthController extends Controller
{

    //use RegistersUsers;

    protected $rules =
    [
        'name' => 'required|string',
        'email' => 'required|string|email|unique:users',
        'password' => 'required|string|confirmed'
    ];

    public function register(Request $request)
    {
        $validator = Validator::make($request->all() , $this->rules);
		 if ($validator->fails()) {
            return Response::json(array('errors' => $validator->getMessageBag()->toArray()));
        }else {

                $user = new User([
                                  'name' => $request->name,
                                  'email' => $request->email,
                                  'password' => bcrypt($request->password)
                               ]);

                $user->save();

                return response()->json([
                                         'success' => true,
                                         'id' => $user->id,
                                         'name' => $user->name,
                                         'email' => $user->email,
                                        ], 201);
        } 
        
    }

    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized Access, please confirm credentials or verify your email'
            ], 401);

        $user = $request->user();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        return response()->json([
            'success' => true,
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ], 201);
    }

    
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function created(Request $request)
    {
        return response()->json("edeee");
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Response;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Auth\Events\Verified;

class RegisterController extends Controller
{
    
    //use RegistersUsers;
    use VerifiesEmails;

    protected $rules =
    [
        'name' => 'required|string',
        'email' => 'required|string|email|unique:users',
        'password' => 'required|string|confirmed|min:8',
    ];
   
    public function __construct()
    {
        $this->middleware('guest');
    }

    protected function create(Request $request)
    {

       $validator = Validator::make($request->all() , $this->rules);

        if($validator->fails()) {
            return Response::json(array('errors' => $validator->getMessageBag()->toArray()));
        }
        else
        {
           
          $user =  User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
          ]);

          return response()->json([
                                  'success' => true,
                                  'id' => $user->id,
                                  'name' => $user->name,
                                  'email' => $user->email,
                                ], 201);   
        }
 
    }
}

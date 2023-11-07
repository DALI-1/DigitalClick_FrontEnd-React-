<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;

class Controller extends BaseController
{
    
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function register(Request $request)
    {
        $fields=$request->validate(['name'=>'required|string','email'=>'require|string|unique:user,email',
        'password'=>'require|string|confirmed'
    ]);
        $user=User::create([
            'name'=>$fields['name'],
            'email'=>$fields['email'],
            'password'=>bcrypt($fields['password'])


        ]);
        $token=$user->createToken('myapptoken');
        $response=[
            'user'=>$user,
            'token'=>$token
        ];
        return Response($response,201);
        

    }

    


}

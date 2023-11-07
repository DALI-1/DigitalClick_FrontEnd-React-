<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;


class SignInController extends Controller
{
    public function SignIn(Request $req)
    {
        if($req->has("Username") and $req->has("Password"))
         {
            $Username=$req->input("Username");
            $Password=$req->input("Password");
            $UserTest=User::where("Username","=",$Username)->first();
            if($UserTest==null)
            {
                return response()->json([
                    'UsernameDoesntExist' => 'Yes',
                    'UserValidated' => 'No',                 
                ]);

            }
            else
            {

                if(Hash::check($Password, $UserTest->Password))
            {
                $UserTest->save();
                $Token=$UserTest->createToken("UserToken")->plainTextToken;
                return response()->json([
                    'UserValidated' => 'Yes',
                    "Token"=>$Token
                    
                ]);

            }
            else
            {
                return response()->json([
                    'UserValidated' => 'No',
                    'WrongPassword' => 'Yes'
                    
                ]);
            }





            }
            



         }
         else
         {
            return response()->json([
                'Missing_Attributes' => 'Username,Password',
                'UserValidated' => 'No',
                
            ]);
            
         }


    }
    
}

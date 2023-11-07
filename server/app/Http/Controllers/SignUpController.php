<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;


class SignUpController extends Controller
{
    //
    

    public function SignUp(Request $req)
    {

        if($req->has("Username") and $req->has("Password")and $req->has("C_Password")and $req->has("First_Name")and $req->has("Last_Name")
        ) {

            $Username=$req->input("Username");
            $Password=$req->input("Password");
            $C_Password=$req->input("C_Password");
            $First_Name=$req->input("First_Name");
            $Last_Name=$req->input("Last_Name");
            $UserCount=User::all()->count();
            $UserTest=User::where("Username","=",$Username)->first();
            $date = Carbon::now();

            
            if($UserTest===null)
            {
                if ($C_Password===$Password) {
                    $NewUser=new User();
                    $NewUser->setAttribute("Username",$Username);
                     $NewUser->setAttribute("Password",bcrypt($Password));
                     $NewUser->setAttribute("First_Name",$First_Name);
                     $NewUser->setAttribute("Last_Name",$Last_Name);
                     $NewUser->setAttribute("PFP_URL","Default");
                     if($UserCount==0)
                     {
                        $NewUser->setAttribute("Role","Admin_User");
                        
                     }
                     else
                     {
                        $NewUser->setAttribute("Role","Normal_User");
                     }
                     
                     $NewUser->setAttribute("Poste","Visitor");
                     $NewUser->setAttribute("created_at",$date);
                     $NewUser->setAttribute("updated_at",$date);
                
                $NewUser->save();
                return response()->json([
                    'UserAdded' => 'Yes',
                    
                ]);
                }
                else
                {
                    return response()->json([
                        'C_Password_Wrong' => 'Yes',
                        'UserAdded' => 'No'
                        
                    ]);

                }




            }
            else
            {
                return response()->json([
                    'UsernameExist' => 'Yes',
                    'UserAdded' => 'No'
                    
                ]);
                
            }

            

            




            
        }
        else
        {
            return response()->json([
                'Missing_Attributes' => 'Username,Password,C_Password,First_Name,Last_Name',
                
            ]);
           
        }


    }











}

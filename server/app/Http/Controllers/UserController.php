<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\File; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    public function GetUserbyusername(Request $req)
    {
        if($req->has("Username"))
        {
            $Username=$req->input("Username");
            $user=DB::table('users')
            ->where("Username","=",$Username)->get()->toJson();

            return $user;

        }
        else
        {
            return response()->json([
                'Missing params' => 'Username'
                    
            ]);


        }

    }

    public function GetAllUsers(Request $req)
    {
        $Users = DB::table('users')->get()->toJson();
        return $Users;
        

    }

    public function SetUserAdmin(Request $req)
    {
        if($req->has("ID_Person"))
        {
            $UserID=$req->input("ID_Person");
          $User=user::find($UserID);
          $User->setAttribute("Role","Admin_User");
          $User->save();
          return response()->json([
            'UserisAdmin' => 'True'   
          ]);
        }
    }
    public function SetUserUser(Request $req)
    {
        if($req->has("ID_Person"))
        {
            $UserID=$req->input("ID_Person");
          $User=user::find($UserID);
          $User->setAttribute("Role","Normal_User");
          $User->save();
          return response()->json([
            'UserisUser' => 'True'   
          ]);
        }
    }

    public function SetUserModerator(Request $req)
    {
        if($req->has("ID_Person"))
        {
            $UserID=$req->input("ID_Person");
          $User=user::find($UserID);
          $User->setAttribute("Role","Moderator_User");
          $User->save();
          return response()->json([
            'UserisUser' => 'True'   
          ]);
        }
    }


    public function DeleteUser(Request $req)
    {
        if($req->has("ID_Person"))
        {
            $UserID=$req->input("ID_Person");
          $User=user::find($UserID);
            if($User->PFP_URL!="Default")
            {
                $destinationPath = 'Images/';
                File::delete($destinationPath.$User->PFP_URL);
            }
            $User->delete();
          return response()->json([
            'UserisUser' => 'True'   
          ]);
        }
    }
    


    public function EditUser(Request $req)
   {

    
                

            $Username=$req->input("Username");
            $First_Name=$req->input("First_Name");
            $Last_Name=$req->input("Last_Name");
            $Role=$req->input("Role");
            $Poste=$req->input("Poste");
            $Password=$req->input("Password");
            $NPassword=$req->input("NewPassword");
            $image = $req->file('UserPFP');
            $user=User::select("*")
            ->where("Username","=",$Username)->first();
            

           

        
            if(Hash::check($Password, $user->getAuthPassword()))
            {


                $user->setAttribute("Username", $Username);
                $user->setAttribute("Role", $Role);
$user->setAttribute("First_Name", $First_Name);
$user->setAttribute("Last_Name", $Last_Name);
$user->setAttribute("Poste", $Poste);
if($NPassword!=null)
$user->setAttribute("Password", bcrypt($NPassword));


if ($image!==null) {
    $destinationPath = 'Images/';
               
    File::delete($destinationPath.$user->PFP_URL);
                 
                
            
                
                            
                                
    $profileImage = $Username. "." . $image->getClientOriginalExtension();
    $destinationPath = public_path('Images\\');
    $user->setAttribute("PFP_URL", $profileImage);
                            
                            
    $image->move($destinationPath, $profileImage);
}

$user->save();
return response()->json([
    'WrongPass' => 'False',
    'UserAdded'=>"Yes",
    "Username"=>$user->Username,
    "Password"=>$NPassword
        
]);
            }
            else
            {
                return response()->json([
                    'WrongPass' => 'True'
                        
                ]);

            }
        
            

          
           
           
           
           
          
   }

}

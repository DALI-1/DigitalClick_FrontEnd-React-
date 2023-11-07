<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\File; 
use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\CPhoneNumber;
use App\Models\CEmail;
use Illuminate\Support\Str;
use App\Models\Server;
use App\Models\Contract;
use App\Models\User;
use App\Models\OperatingSystem;
use App\Models\PartitionContract;
use App\Models\ServerContract;
use App\Models\VirtualMachine;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Constraint\Operator;
use Illuminate\Support\Facades\Hash;
class ClientController extends Controller
{
   public function AddClient(Request $req)
   {

    if($req->has("First_Name") and $req->has("Last_Name")and $req->has("Adress")and $req->has("C_Nationality")and $req->has("C_City")and $req->has("Company_Name")and $req->has("Company_Adress")and $req->has("Phone_Number_0")and $req->has("Email_0"))
        {
            $First_Name=$req->input("First_Name");
            $Last_Name=$req->input("Last_Name");
            $Adress=$req->input("Adress");
            $Company_Name=$req->input("Company_Name");
            $C_Nationality=$req->input("C_Nationality");
            $C_City=$req->input("C_City");
            $Company_Name=$req->input("Company_Name");
            $Company_Adress=$req->input("Company_Adress");
            $NewClient=new Client();
            $NewClient->setAttribute("First_Name",$First_Name);
            $NewClient->setAttribute("Last_Name",$Last_Name);
            $NewClient->setAttribute("Adress",$Adress);
            $NewClient->setAttribute("Company_Name",$Company_Name);
            $NewClient->setAttribute("C_Nationality",$C_Nationality);
            $NewClient->setAttribute("C_City",$C_City);
            $NewClient->setAttribute("Company_Adress",$Company_Adress);
            

            $Arguments=$req->all();
            $emailadded=0;
            foreach( $Arguments as $Argument)
            { 
                $IsNum= is_numeric($Argument);
                if(str::length($Argument)==8 and $IsNum==true)
                {
                    $FindPhoneNumber=CPhoneNumber::where("Phone_Number","=",$Argument)->first();
                    if($FindPhoneNumber==null)
                    {
                        $image = $req->file('ClientPFP');
                        $profileImage = $Company_Name. "." . $image->getClientOriginalExtension();
                        $destinationPath = public_path('Images\\'); 
                      $NewClient->setAttribute("ClientPFP",$profileImage);
                    $NewClient->save();
                    
                    $image->move($destinationPath,$profileImage);  
                    

                   




                    $newCPhoneNumber=new CPhoneNumber();
                    $newCPhoneNumber->setAttribute("Phone_Number",$Argument);
                    
                    $Client_ID=$NewClient->Client_ID;
                    
                    $newCPhoneNumber->setAttribute("PhoneOwnerID",$Client_ID);
                    $newCPhoneNumber->save();
                    }
                    else
                    {
                        return response()->json([
                            'ClientAdded' => 'No',
                            'PhoneNumberExist' => 'Yes',  
                            'PhonesAdded' => 'No', 
                            'EmailAdded' => 'No'
                        ]);

                    }                
                }
                if(filter_var($Argument, FILTER_VALIDATE_EMAIL))
                {
                    
                    $FindEmail=CEmail::where("Email","=",$Argument)->first();
                    if($FindEmail==null)
                    {
                        
                    $newCEmail=new CEmail();
                    $newCEmail->setAttribute("Email",$Argument);
                
                    $newCEmail->setAttribute("Email_OwnerID",$Client_ID);
                    $newCEmail->save();
                    $emailadded++;

                    }
                    else
                    {
                        return response()->json([
                            'ClientAdded' => 'Yes',
                            'EmailExist' => 'Yes',
                            'PhonesAdded' => 'Yes', 
                            'EmailAdded' => 'No'  
                        ]);

                    }

                }
                else
                {

                }
            }
            if($emailadded==0)
            {
                return response()->json([
                    'ClientAdded' => 'Yes',
                    'PhonesAdded' => 'Yes', 
                     'EmailAdded' => 'No'  
                          
                ]); 
            }
            else
            {
                return response()->json([
                    'ClientAdded' => 'Yes',
                    'PhonesAdded' => 'Yes', 
                     'EmailAdded' => 'Yes'  
                          
                ]); 
            }

           

        }
        else
        {
            return response()->json([
                'Client_Added' => 'No',
                'Missing_Parameters' => 'First_Name,Last_Name,Adress,C_Nationality,C_City,Company_Name,Company_Adress,Phone_Number_0,Email_0'      
            ]); 
        }


   }

   public function GetClientNumbers(Request $req)
   {
    if ( $req->has("Client_ID"))
    {
        
            $Client_ID=$req->input("Client_ID");
              
            
           
            //checking authentification
            
                $client=Client::find($Client_ID);
                $Numbers=$client->CPhoneNumbers()->get();
                
                return $Numbers->toJson();
            
           
    }
    else
    {
        return response()->json([
            'GetClientNumbers' => 'No',
            'Missing_Parameters' => 'Client_ID'      
        ]);

    }
    
   }
   public function GetClientEmails(Request $req)
   {
    if( $req->has("Client_ID"))
    {
        
            $Client_ID=$req->input("Client_ID");
            
            //checking authentification
            
                $client=Client::find($Client_ID);
                $Emails=$client->CEmails()->get();
                
                return $Emails->toJson();
            
    }
    else
    {
        return response()->json([
            'GetClientEmails' => 'No',
            'Missing_Parameters' => 'Client_ID'      
        ]);

    }
    
   }
   public function GetAllClients(Request $req)
   {
   
    $Client=Client::all()->toJson();
    
 return $Client;
    
}
public function GetAllClientNumbers(Request $req)
{
 $Client=CPhoneNumber::all()->toJson();
return $Client;
}

public function GetClientByID(Request $req)
{
    $ClientID=$req->input("ClientID");

 $Client=DB::table('clients')
 ->where("Client_ID","=",$ClientID)->get()->toJson();

return $Client;
}



public function RemoveClientByID(Request $req)
{
   


    if($req->has("ClientID"))
    {

        $ClientID=$req->input("ClientID");
        $Client=Client::find($ClientID);
        $Numbers=CPhoneNumber::all()
        ->where("PhoneOwnerID","=",$ClientID);
        $ServerContracts=ServerContract::all()
        ->where("Client_ID","=",$ClientID);
        $VMContracts=PartitionContract::all()
        ->where("Client_ID","=",$ClientID);
        foreach($Numbers as $number)
        {
             $number->delete();

        }
        $emails=CEmail::all()
        ->where("Email_OwnerID","=",$ClientID);
        foreach($emails as $email)
        {
             $email->delete();

        }

        foreach($ServerContracts as $ServerContract)
        {
            $ServerContract->delete();

        }

        foreach($VMContracts as $VMContract)
        {
            $VMContract->delete();

        }




           
           $destinationPath = 'Images/';
           
           File::delete($destinationPath.$Client->ClientPFP);
        $Client->delete();
        return response()->json([
            'RemoveClientByID'=>'Yes',
                
        ]); 



    }
    else
    {
        return response()->json([
            'RemoveClientByID'=>'No',
            'Missing_Parameters' => 'ClientID'      
        ]); 
    }

}



public function EditClient(Request $req)
   {

    if($req->has("First_Name") and $req->has("Last_Name")and $req->has("Adress")and $req->has("C_Nationality")and $req->has("C_City")and $req->has("Company_Name")and $req->has("Company_Adress")and $req->has("Phone_Number_0")and $req->has("Email_0"))
        {
            $ClientID=$req->input("ClientID");
            $First_Name=$req->input("First_Name");
            $Last_Name=$req->input("Last_Name");
            $Adress=$req->input("Adress");
            $Company_Name=$req->input("Company_Name");
            $C_Nationality=$req->input("C_Nationality");
            $C_City=$req->input("C_City");
            $Company_Name=$req->input("Company_Name");
            $Company_Adress=$req->input("Company_Adress");
            $NewClient=Client::find($ClientID);
            $NewClient->setAttribute("First_Name",$First_Name);
            $NewClient->setAttribute("Last_Name",$Last_Name);
            $NewClient->setAttribute("Adress",$Adress);
            $NewClient->setAttribute("Company_Name",$Company_Name);
            $NewClient->setAttribute("C_Nationality",$C_Nationality);
            $NewClient->setAttribute("C_City",$C_City);
            $NewClient->setAttribute("Company_Adress",$Company_Adress);
            $Numbers=CPhoneNumber::all()
            //deleting old phone numbers
            ->where("PhoneOwnerID","=",$ClientID);
            foreach($Numbers as $number)
            {
                 $number->delete();
    
            }
            //deleting old emails
            $emails=CEmail::all()
            ->where("Email_OwnerID","=",$ClientID);
            foreach($emails as $email)
            {
                 $email->delete();
    
            }
            
            $image = $req->file('ClientPFP');
            echo($image);
            if($image!==null)
            {
                $destinationPath = 'Images/';
           
                File::delete($destinationPath.$NewClient->ClientPFP);
             
            }
        
            $Arguments=$req->all();
            $emailadded=0;
            foreach( $Arguments as $Argument)
            { 
                $IsNum= is_numeric($Argument);
                if(str::length($Argument)==8 and $IsNum==true)
                {
                    $FindPhoneNumber=CPhoneNumber::where("Phone_Number","=",$Argument)->first();
                    if($FindPhoneNumber==null)
                    {
                        if($image!=null)
                        {
                            $image = $req->file('ClientPFP');
                            $profileImage = $Company_Name. "." . $image->getClientOriginalExtension();
                            $destinationPath = public_path('Images\\'); 
                          $NewClient->setAttribute("ClientPFP",$profileImage);
                        
                        
                        $image->move($destinationPath,$profileImage);  
                        }
                        
                        
                    

                   



                        $NewClient->save();
                    $newCPhoneNumber=new CPhoneNumber();
                    $newCPhoneNumber->setAttribute("Phone_Number",$Argument);
                    
                    $Client_ID=$NewClient->Client_ID;
                    
                    $newCPhoneNumber->setAttribute("PhoneOwnerID",$Client_ID);
                    $newCPhoneNumber->save();
                    }
                    else
                    {
                        return response()->json([
                            'ClientAdded' => 'No',
                            'PhoneNumberExist' => 'Yes',  
                            'PhonesAdded' => 'No', 
                            'EmailAdded' => 'No'
                        ]);

                    }                
                }
                if(filter_var($Argument, FILTER_VALIDATE_EMAIL))
                {
                    
                    $FindEmail=CEmail::where("Email","=",$Argument)->first();
                    if($FindEmail==null)
                    {
                        
                    $newCEmail=new CEmail();
                    $newCEmail->setAttribute("Email",$Argument);
                
                    $newCEmail->setAttribute("Email_OwnerID",$Client_ID);
                    $newCEmail->save();
                    $emailadded++;

                    }
                    else
                    {
                        return response()->json([
                            'ClientAdded' => 'Yes',
                            'EmailExist' => 'Yes',
                            'PhonesAdded' => 'Yes', 
                            'EmailAdded' => 'No'  
                        ]);

                    }

                }
                else
                {

                }
            }
            if($emailadded==0)
            {
                return response()->json([
                    'ClientAdded' => 'Yes',
                    'PhonesAdded' => 'Yes', 
                     'EmailAdded' => 'No'  
                          
                ]); 
            }
            else
            {
                return response()->json([
                    'ClientAdded' => 'Yes',
                    'PhonesAdded' => 'Yes', 
                     'EmailAdded' => 'Yes'  
                          
                ]); 
            }

           

        }
        else
        {
            return response()->json([
                'Client_Added' => 'No',
                'Missing_Parameters' => 'First_Name,Last_Name,Adress,C_Nationality,C_City,Company_Name,Company_Adress,Phone_Number_0,Email_0'      
            ]); 
        }


   }


}

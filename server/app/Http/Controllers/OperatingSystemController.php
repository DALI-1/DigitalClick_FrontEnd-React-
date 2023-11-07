<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OperatingSystem;
use App\Models\OperatingSystemProvider;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class OperatingSystemController extends Controller
{
    //


    public function AddOSProvider(Request $req)
    {
        if($req->has("OperatingSystem_Company_Name"))
        {
            $OperatingSystem_Company_Name=$req->input("OperatingSystem_Company_Name");
            
if (!is_null($OperatingSystem_Company_Name)) {
    
    $OperatingSystemProvider=new OperatingSystemProvider();
    $OperatingSystemProvider->setAttribute("OperatingSystem_Company_Name", $OperatingSystem_Company_Name);
   
    $OperatingSystemProvider->save();
    return response()->json([
    'OperatingSystemProviderAdded' => 'Yes'
                
            ]);
}
else
{
    return response()->json([
        'OperatingSystemProviderAdded' => 'No',
        'EmptyField' => 'Yes'
                    
                ]); 
}
              
        }
        else
        {
            return response()->json([
                'OperatingSystemProviderAdded' => 'No',
                'Missing_Parameters' => 'OperatingSystem_Company_Name'      
            ]);
        }
        

    }




    public function AddOS(Request $req)
    {
        if($req->has("OperatingSystemProvider_ID") and $req->has("OperatingSystem_Name"))
        {
            $OperatingSystemProvider_ID=$req->input("OperatingSystemProvider_ID");
            $OperatingSystem_Name=$req->input("OperatingSystem_Name");
               if(!is_null($OperatingSystemProvider_ID) && !is_null($OperatingSystem_Name))
               {
                $OSP=OperatingSystemProvider::find($OperatingSystemProvider_ID);

            if( !is_null($OSP))
            {
                $NewOS=new OperatingSystem();
            $NewOS->setAttribute("OperatingSystemProvider_ID",$OperatingSystemProvider_ID);
            $NewOS->setAttribute("OperatingSystem_Name",$OperatingSystem_Name);
            $NewOS->save();
            return response()->json([
                'OperatingSystem_Added' => 'Yes',
                     
            ]); 

            }
            else
            {
                return response()->json([
                    'OperatingSystem_Added' => 'No',
                    'OperatingSystemProvider_ID'=>"Is wrong"
                         
                ]); 
            }

               }
               else
               {
                return response()->json([
                    'OperatingSystem_Added' => 'No',
                    'EmptyArguments'=>"Yes"
                         
                ]); 

               }

            
       
        }
        else
        {
            return response()->json([
                'OperatingSystem_Added' => 'No',
                'Missing_Parameters' => 'OperatingSystemProvider_ID,OperatingSystem_Name'      
            ]); 
        }


    }



    public function GetAllOSProviders(Request $req)
    {
       return OperatingSystemProvider::all()->toJson();
    }


    public function GetAllOSs(Request $req)
    {
        $OSs = DB::table('operating_systems')
        ->join('operating_system_providers', 'operating_systems.OperatingSystemProvider_ID', '=', 'operating_system_providers.OperatingSystemProvider_ID')
        ->select('operating_systems.*', 'operating_system_providers.OperatingSystem_Company_Name')
        ->get()->toJson();
        return $OSs;
      
    }

    
}

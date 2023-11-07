<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServiceProvider;
class ServiceProviderController extends Controller
{
    //


    public function CreateServiceProvider(Request $req)
    {
        if($req->has("Service_Provider_Company_Name") and $req->has("Service_Provider_Email")and $req->has("Service_Provider_PhoneNumber"))
        {
            $Service_Provider_Company_Name=$req->input("Service_Provider_Company_Name");
            $Service_Provider_Email=$req->input("Service_Provider_Email");
            $Service_Provider_PhoneNumber=$req->input("Service_Provider_PhoneNumber");
if (!is_null($Service_Provider_Company_Name)&&!is_null($Service_Provider_Email)&&!is_null($Service_Provider_PhoneNumber)) {
    $ServiceProvider=new ServiceProvider();
    $ServiceProvider->setAttribute("Service_Provider_Company_Name", $Service_Provider_Company_Name);
    $ServiceProvider->setAttribute("Service_Provider_Email", $Service_Provider_Email);
    $ServiceProvider->setAttribute("Service_Provider_PhoneNumber", $Service_Provider_PhoneNumber);
    $ServiceProvider->save();
    return response()->json([
    'ServiceProvider_Added' => 'Yes'
                
            ]);
}
else
{
    return response()->json([
        'ServiceProvider_Added' => 'No',
        'EmptyField' => 'Yes'
                    
                ]); 
}
              
        }
        else
        {
            return response()->json([
                'ServiceProvider_Added' => 'No',
                'Missing_Parameters' => 'Service_Provider_Company_Name,Service_Provider_Email,Service_Provider_PhoneNumber'      
            ]);
        }
        

    }


    public function DeleteServiceProvider(Request $req)
    {
        if($req->has("Service_Provider_ID"))
        {
            $Service_Provider_ID=$req->input("Service_Provider_ID");
            
if (!is_null($Service_Provider_ID)) {
    $ServiceProvider=ServiceProvider::find($Service_Provider_ID);
   
    $ServiceProvider->delete();
    return response()->json([
    'ServiceProvider_Deleted' => 'Yes'
                
            ]);
}
else
{
    return response()->json([
        'ServiceProvider_Deleted' => 'No',
        'EmptyField' => 'Yes'
                    
                ]); 
}
              
        }
        else
        {
            return response()->json([
                'ServiceProvider_Deleted' => 'No',
                'Missing_Parameters' => 'Service_Provider_ID'      
            ]);
        }
        

    }

    public function  GetAllServiceProviders(Request $req)
    {
       return ServiceProvider::all()->toJson();
    }

    
}

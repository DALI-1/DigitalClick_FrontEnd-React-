<?php

namespace App\Http\Controllers;
use App\Models\VirtualMachine;
use App\Models\VMProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VirtualMachineController extends Controller
{
    
 public function CreateVMProvider(Request $req)
 {
    if($req->has("VMProvider_Company_Name"))
    {
        $VMProvider_Company_Name=$req->input("VMProvider_Company_Name");
        
if (!is_null($VMProvider_Company_Name)) {

$VMProvider=new VMProvider();
$VMProvider->setAttribute("VMProvider_Company_Name", $VMProvider_Company_Name);

$VMProvider->save();
return response()->json([
'VMProviderAdded' => 'Yes'
            
        ]);
}
else
{
return response()->json([
    'VMProviderAdded' => 'No',
    'EmptyField' => 'Yes'
                
            ]); 
}
          
    }
    else
    {
        return response()->json([
            'VMProviderAdded' => 'No',
            'Missing_Parameters' => 'VMProvider_Company_Name'      
        ]);
    }
      
 }




    public function AddVirtualMachine(Request $req)
    {
        $VMProvider_ID=$req->input("VMProvider_ID");
        $VM_Name=$req->input("VM_Name");
        if($req->has("VMProvider_ID") and $req->has("VM_Name"))
        {
            if(!is_null($VMProvider_ID) && !is_null($VM_Name))
               {
                $VM=VMProvider::find($VMProvider_ID);

            if( !is_null($VM))
            {
                $NewVM=new VirtualMachine();
            $NewVM->setAttribute("VMProvider_ID",$VMProvider_ID);
            $NewVM->setAttribute("VM_Name",$VM_Name);
            $NewVM->save();
            return response()->json([
                'VM_Added' => 'Yes',
                     
            ]); 

            }
            else
            {
                return response()->json([
                    'VMAdded' => 'No',
                    'VM_ID'=>"Is wrong"
                         
                ]); 
            }

               }
               else
               {
                return response()->json([
                    'VM_Added' => 'No',
                    'EmptyArguments'=>"Yes"
                         
                ]); 

               } 
        }
        else
        {
            return response()->json([
                'VM_Added' => 'No',
                'Missing_Parameters' => 'VMProvider_ID,VM_Name'      
            ]);
        }



    }
    public function  GetVMProviders(Request $req)
    {
       return VMProvider::all()->toJson();
    }


    public function GetAllVMs(Request $req)
    {
    $VMs = DB::table('virtual_machines')
    ->join('v_m_providers', 'virtual_machines.VMProvider_ID', '=', 'v_m_providers.VMProvider_ID')
    ->select('virtual_machines.*', 'v_m_providers.VMProvider_Company_Name')
    ->get()->toJson();
    return $VMs;
}
   

}

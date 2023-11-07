<?php

namespace App\Http\Controllers;

use App\Models\Disk;
use App\Models\DiskPartition;
use App\Models\LogicalVolume;
use App\Models\VL_VM;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Scalar\MagicConst\Dir;

class VLController extends Controller
{
    

public function CreateVL(request $req)
{

    if($req->has("VL_Name")&&$req->has("Total_Size")&&$req->has("Server_ID"))
    {

        $VL_Name=$req->input("VL_Name");
        $Total_Size=$req->input("Total_Size");
        $Server_ID=$req->input("Server_ID");
        $VL=new LogicalVolume();
        $VL->setAttribute("VL_Name",$VL_Name);
        $VL->setAttribute("Total_Size",$Total_Size);
        $VL->setAttribute("Server_ID",$Server_ID);
        $VL->save();
        return response()->json([
            'VL_created' => 'Yes'
            
                  
        ]); 
    }
}
public function AssociateDiskToVL(Request $req)
{
    if($req->has("VL_ID")&&$req->has("ServerVMPartition_ID"))
    {

        $VL_ID=$req->input("VL_ID");
        $ServerVMPartition_ID=$req->input("ServerVMPartition_ID");
       
        $VL=new VL_VM();
        $VL->setAttribute("VL_ID",$VL_ID);
        $VL->setAttribute("ServerVMPartition_ID",$ServerVMPartition_ID);
       
        $VL->save();
        return response()->json([
            'VL-VM_created' => 'Yes'          
        ]); 
    }
}



public function DeAssociateDiskToVL(Request $req)
{
    if($req->has("ServerVMPartition_ID"))
    {

        
        $ServerVMPartition_ID=$req->input("ServerVMPartition_ID");
       
        $VM=DB::table("v_l__v_m_s")->where("ServerVMPartition_ID","=",$ServerVMPartition_ID)->get();
        foreach( $VM as $V)
        {
            $S=VL_VM::find($V->ID);
            $S->delete();
        }
       
        
        return response()->json([
            'VMDeAssociated' => 'Yes'          
        ]); 
    }
}
public function AddDisktoVL(Request $req)
{
    if($req->has("VL_ID")&&$req->has("Disk_ID"))
    {
        $VL_ID=$req->input("VL_ID");
        $Disk_ID=$req->input("Disk_ID");
       
        $Disk=Disk::find( $Disk_ID);
        $Disk->setAttribute("VL_ID",$VL_ID);
        $Disk->save();
        return response()->json([
            'DiskAddedtoVL' => 'Yes'
            
                  
        ]); 


    }
}


public function RemoveVLM(Request $req)
{
    if($req->has("VL_ID"))
    {
        $VL_ID=$req->input("VL_ID");
        
        $VLDisks = DB::table('disks')
        ->where("VL_ID","=", $VL_ID)->get();

        foreach($VLDisks as $Disk)
        {

                        
                $ServerID=$Disk->Disk_ID;       
                $Server=Disk::find($ServerID);
                $Partitions = DB::table('disk_partitions')
                ->where("Disk_ID","=", $ServerID)->get();
               
               foreach($Partitions as $Partition)
                {
                    
                    $Contract1=DiskPartition::find($Partition->DiskP_ID);
                    $Contract1->delete();
                }
                $Server->delete();
                 
            
           
            
            $Server->delete();
        }

        $VLVM = DB::table('v_l__v_m_s')
        ->where("VL_ID","=", $VL_ID)->get();

        foreach($VLVM as $VL)
        {
           
           $V= VL_VM::find($VL->ID); 
                 
            $V->delete(); 
            
        }
        $VL=LogicalVolume::find($VL_ID);
        
        $VL->delete();
        return response()->json([
            'VLDeleted' => 'Yes'        
        ]); 
    
    }
}


public function GetAllVLs(Request $req)
{

    if($req->has("Server_ID"))
    {
        $Server_ID=$req->input("Server_ID");
        $VL = DB::table('logical_volumes')
        ->where("Server_ID","=", $Server_ID)->get();
        return $VL;

    }
    

}
}

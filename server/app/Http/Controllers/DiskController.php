<?php

namespace App\Http\Controllers;

use App\Models\Disk;
use App\Models\DiskPartition;
use Illuminate\Http\Request;
use App\Models\DiskProvider;
use App\Models\LogicalVolume;
use App\Models\Server;
use App\Models\ServerVMPartition;
use Illuminate\Support\Facades\DB;

class DiskController extends Controller
{
    public function CreateDiskProvider(Request $req)
    {
        if($req->has("DProvider_Company_Name"))
    {
        $DProvider_Company_Name=$req->input("DProvider_Company_Name");
        
if (!is_null($DProvider_Company_Name)) {

$DiskProvider=new DiskProvider();
$DiskProvider->setAttribute("DProvider_Company_Name", $DProvider_Company_Name);

$DiskProvider->save();
return response()->json([
'DiskProviderAdded' => 'Yes'           
        ]);
}
else
{
return response()->json([
    'DiskProviderAddedd' => 'No',
    'EmptyField' => 'Yes'              
            ]); 
}         
    }
    else
    {
        return response()->json([
            'DiskProviderAdded' => 'No',
            'Missing_Parameters' => 'DProvider_Company_Name'      
        ]);
    }
    }
   public function CreateDisk(Request $req)
   {
    $Disk_Model=$req->input("Disk_Model");
        $Disk_Type=$req->input("Disk_Type");
        $Total_Size=$req->input("Total_Size");
        $DProvider_ID=$req->input("DProvider_ID");
        $Server_ID=$req->input("Server_ID");
        $Disk_IMG_URL=$req->input("Disk_IMG_URL");
        $VLID=$req->input("VL_ID");


        if($req->has("Disk_Model") and $req->has("Disk_Type")and $req->has("Total_Size")and $req->has("DProvider_ID")and $req->has("Server_ID")and $req->has("Disk_IMG_URL"))
        {
            if(!is_null($Disk_Model) && !is_null($Disk_Type)&& !is_null($Total_Size)&& !is_null($DProvider_ID)&& !is_null($Server_ID)&& !is_null($Disk_IMG_URL))
               {
                $Server=Server::find($Server_ID);
                $DiskProvider=DiskProvider::find($DProvider_ID);
            if( !is_null($Server)&&!is_null($DiskProvider))
            {
                $NewDisk=new Disk();
            $NewDisk->setAttribute("Disk_Model",$Disk_Model);
            $NewDisk->setAttribute("Disk_Type",$Disk_Type);
            $NewDisk->setAttribute("Total_Size",$Total_Size);
            $NewDisk->setAttribute("DProvider_ID",$DProvider_ID);
            $NewDisk->setAttribute("Server_ID",$Server_ID);
            $NewDisk->setAttribute("Disk_IMG_URL",$Disk_IMG_URL);
            $NewDisk->setAttribute("VL_ID",$VLID);
            $NewDisk->save();

                    $VL= LogicalVolume::find($VLID);

                    $VL->setAttribute("Total_Size",$VL->Total_Size+$Total_Size);
                    $VL->save();
            return response()->json([
                'Disk_Added' => 'Yes',
                     
            ]); 

            }
            else
            {
                return response()->json([
                    'DiskAdded' => 'No',
                    'Server_ID'=>"Is wrong",
                    'DProvider_ID'=>"Is wrong"
                         
                ]); 
            }

               }
               else
               {
                return response()->json([
                    'Disk_Added' => 'No',
                    'EmptyArguments'=>"Yes"
                         
                ]); 

               } 
        }
        else
        {
            return response()->json([
                'Disk_Added' => 'No',
                'Missing_Parameters' => 'Disk_Model,Disk_Types,Total_Size,DProvider_ID,Server_ID,Disk_IMG_URL'      
            ]);
        }
   }
   public function CreateDiskPartition(Request $req)
   {
    $PartitionValue=$req->input("PartitionValue");
        $PartitionUsage=$req->input("PartitionUsage");
        $Disk_ID=$req->input("Disk_ID");
        $ServerVMPartition_ID=$req->input("ServerVMPartition_ID");
        



        if($req->has("PartitionValue") and $req->has("PartitionUsage")and $req->has("Disk_ID")and $req->has("ServerVMPartition_ID"))
        {
            if(!is_null($PartitionValue) && !is_null($PartitionUsage)&& !is_null($Disk_ID)&& !is_null($ServerVMPartition_ID))
               {
                
                $ServerVMPartition=ServerVMPartition::find($ServerVMPartition_ID);
                $Disk=Disk::find($Disk_ID);
            if( !is_null($ServerVMPartition)&&!is_null($Disk))
            {
              $DiskServerID=$Disk->Server_ID;
              $ServerVMPartitionServerID=$ServerVMPartition->Server_ID;
               
              if($DiskServerID==$ServerVMPartitionServerID)
              {
                $NewDiskPartition=new DiskPartition();
                $NewDiskPartition->setAttribute("PartitionValue",$PartitionValue);
                $NewDiskPartition->setAttribute("PartitionUsage",$PartitionUsage);
                $NewDiskPartition->setAttribute("Disk_ID",$Disk_ID);
                $NewDiskPartition->setAttribute("ServerVMPartition_ID",$ServerVMPartition_ID);
                $NewDiskPartition->save();
                return response()->json([
                    'DiskPartitionAdded' => 'Yes',
                         
                ]); 
    

              }
              else
              {
                return response()->json([
                    'DiskPartitionAdded' => 'No',
                    'The Disk Associated is not related to the VM given'=>'Make sure you creating a partition in the Disk'
                         
                ]);

              }

              
            }
            else
            {
                return response()->json([
                    'DiskPartitionAdded' => 'No',
                    'Disk_ID'=>"Is wrong",
                    'ServerVMPartition_ID'=>"Is wrong"
                         
                ]); 
            }

               }
               else
               {
                return response()->json([
                    'DiskPartitionAdded' => 'No',
                    'EmptyArguments'=>"Yes"
                         
                ]); 

               } 
        }
        else
        {
            return response()->json([
                'DiskPartitionAdded' => 'No',
                'Missing_Parameters' => 'ServerVMPartition_ID,Disk_ID,PartitionValue,PartitionUsage'      
            ]);
        }



   }

public function GetAllDiskProviders(Request $req)
{
$ADP=DiskProvider::all();
return $ADP->toJson();

}

public function GetServerDisks(Request $req)
{
    if($req->has("ServerID")&&$req->has("VL_ID"))
    {
        $Server_ID=$req->input("ServerID"); 
        $VL_ID=$req->input("VL_ID"); 
        $ADP=DB::table('disks')
        ->join('disk_providers', 'disks.DProvider_ID', '=', 'disk_providers.DProvider_ID')
        ->where("Server_ID","=",$Server_ID)
        ->where("VL_ID","=",$VL_ID)
        ->get();
        
        return $ADP->toJson();
    }
    else
    {
        return response()->json([
            'GetServerDisks' => 'No',
            'Missing_Parameters' => 'ServerID'      
        ]); 
    }
  

}

public function GetAllServerDisks(Request $req)
{
    if($req->has("ServerID"))
    {
        $Server_ID=$req->input("ServerID");  
        $ADP=DB::table('disks')
        ->where("Server_ID","=",$Server_ID)
        ->get();
        
        return $ADP->toJson();
    }
    else
    {
        return response()->json([
            'GetAllServerDisks' => 'No',
            'Missing_Parameters' => 'ServerID'      
        ]); 
    }
  

}


public function GetDiskByID(Request $req)
{
    
    if($req->has("Disk_ID"))
    {
        $Disk_ID=$req->input("Disk_ID"); 
        
        $ADP=DB::table('disks')
        ->join('disk_providers', 'disks.DProvider_ID', '=', 'disk_providers.DProvider_ID')
        ->where("Disk_ID","=",$Disk_ID)->get();
        
        return $ADP->toJson();
    }
    else
    {
        return response()->json([
            'GetServerDisks' => 'No',
            'Missing_Parameters' => 'Disk_ID'      
        ]); 
    }
  

}


public function GetDiskPartitions(Request $req)
{
    
    if($req->has("DiskID"))
    {
        $Server_ID=$req->input("DiskID"); 
        
        $ADP=DB::table('disk_partitions')
        ->join('server_v_m_partitions', 'disk_partitions.ServerVMPartition_ID', '=', 'server_v_m_partitions.ServerVMPartition_ID')
        ->where("Disk_ID","=",$Server_ID)->get();   
        return $ADP->toJson();
    }
    else
    {
        return response()->json([
            'GetDiskPartitions' => 'No',
            'Missing_Parameters' => 'DiskID'      
        ]); 
    }
  

}




public function GetDiskPartitionByID(Request $req)
{
    
    if($req->has("DiskPID"))
    {
        $Server_ID=$req->input("DiskPID"); 
        
        $ADP=DB::table('disk_partitions')
        ->join('server_v_m_partitions', 'disk_partitions.ServerVMPartition_ID', '=', 'server_v_m_partitions.ServerVMPartition_ID')
        ->where("DiskP_ID","=",$Server_ID)->get();   
        return $ADP->toJson();
    }
    else
    {
        return response()->json([
            'GetDiskPartitions' => 'No',
            'Missing_Parameters' => 'DiskID'      
        ]); 
    }
  

}


public function EditPartitionDisk(Request $req)
{
   
if($req->has("DiskPID")and $req->has("PartitionValue")and$req->has("PartitionUsage"))
        {
            
            $PID=$req->input("DiskPID");
            $PartitionValue=$req->input("PartitionValue");
            $PartitionUsage=$req->input("PartitionUsage");
            
            $ServerVMPartition_ID=$req->input("ServerVMPartition_ID");
            $Server=DiskPartition::find($PID);
            $Server->setAttribute("PartitionValue",$PartitionValue);
            $Server->setAttribute("PartitionUsage",$PartitionUsage);
            $Server->setAttribute("ServerVMPartition_ID",$ServerVMPartition_ID);


            $Server->save();

            return response()->json([
                'GetDiskPByID'=>'Yes',             
            ]); 
        }
        else
        {
            return response()->json([
                'GetDiskPByID'=>'No',
                'Missing_Parameters' => 'DiskPID,PartitionValue,PartitionUsage,ServerVMPartition_ID'      
            ]); 
        }
    }

public function RemoveDiskPByID(Request $req)
{

if($req->has("DiskPID"))
        {
            
            $ServerID=$req->input("DiskPID");
            
            $Server=DiskPartition::find($ServerID);
            
            $Server->delete();
            return response()->json([
                'RemoveDiskPByID'=>'Yes',             
            ]); 
        }
        else
        {
            return response()->json([
                'RemoveDiskPByID'=>'No',
                'Missing_Parameters' => 'DiskPID'      
            ]); 
        }
    }


    public function RemoveDiskByID(Request $req)
{

if($req->has("DiskID"))
        {            
            $ServerID=$req->input("DiskID");       
            $Server=Disk::find($ServerID);
            $Partitions = DB::table('disk_partitions')
            ->where("Disk_ID","=", $ServerID)->get();

            $DiskStorage=$Server->Total_Size;
            $PID=$Server->VL_ID;
            
            $VL=LogicalVolume::find($PID);
            $VL->setAttribute("Total_Size",$VL->Total_Size -$DiskStorage);
            $VL->save();


           
           foreach($Partitions as $Partition)
            {
                
                $Contract1=DiskPartition::find($Partition->DiskP_ID);
                $Contract1->delete();
            }
            $Server->delete();
            return response()->json([
                'RemoveDiskPByID'=>'Yes',             
            ]); 
        }
        else
        {
            return response()->json([
                'RemoveDiskPByID'=>'No',
                'Missing_Parameters' => 'DiskPID'      
            ]); 
        }
    }

    public function EditDisk(Request $req)
    {
        if($req->has("Disk_ID") and $req->has("Disk_Model") and $req->has("Disk_Type") and $req->has("Total_Size")and $req->has("DProvider_ID")
        and $req->has("Server_ID"))
      
        {
            $Disk_ID=$req->input("Disk_ID");
            $Disk_Model=$req->input("Disk_Model");
            $Disk_Type=$req->input("Disk_Type");
            $Total_Size=$req->input("Total_Size");
            $DProvider_ID=$req->input("DProvider_ID");
            $Server_ID=$req->input("Server_ID");
           
            
                  $NewDisk=disk::find($Disk_ID);
                  $VLID=$NewDisk->getAttribute("VL_ID");
                  $VL=LogicalVolume::find($VLID);
                
                  $VL->setAttribute("Total_Size",$VL->Total_Size-$NewDisk->Total_Size+$Total_Size);
                  $VL->save();
                  $NewDisk->setAttribute("Disk_Model", $Disk_Model);
                  $NewDisk->setAttribute("Disk_Type", $Disk_Type);
                  $NewDisk->setAttribute("Total_Size", $Total_Size);
                  $NewDisk->setAttribute("DProvider_ID", $DProvider_ID);
                  $NewDisk->setAttribute("Server_ID", $Server_ID);


                  $NewDisk->save();
                  return response()->json([
                'EditDisk' => 'Yes'
                
                
            ]);
           
              
        
        }
        else
        {
            return response()->json([
                'EditDisk' => 'No',
                'Missing_Parameters' => 'Disk_ID,Disk_Model,Disk_Type,Total_Size,DProvider_ID,Server_ID'      
            ]);
        }

    }



}

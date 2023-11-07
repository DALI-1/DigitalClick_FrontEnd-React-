<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\DiskPartition;
use App\Models\OperatingSystem;
use App\Models\PartitionContract;
use App\Models\ServerVMPartition;
use App\Models\VirtualMachine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServerVMPartitionController extends Controller
{
    public function CreateServerVMPartition(Request $req)
    {
        if($req->has("OperatingSystem_ID") and $req->has("PartitionName") and $req->has("Server_ID")
        and $req->has("SVMP_IP_Adress")and $req->has("Backup")and $req->has("SVMP_MAC_Adress")and $req->has("Nb_Allocated_Cores")
       and $req->has("Allocated_RAM")and $req->has("Description"))
        {
            $OperatingSystem_ID=$req->input("OperatingSystem_ID");

            $PartitionName=$req->input("PartitionName");
            $Server_ID=$req->input("Server_ID");
            
            $SVMP_IP_Adress=$req->input("SVMP_IP_Adress");
            $Backup=$req->input("Backup");
            $SVMP_MAC_Adress=$req->input("SVMP_MAC_Adress");
            $Nb_Allocated_Cores=$req->input("Nb_Allocated_Cores");
            $Allocated_RAM=$req->input("Allocated_RAM");

            $Description=$req->input("Description");
           
            $OS=OperatingSystem::find(intval($OperatingSystem_ID));
          
              if ($OS!=null) {
                  $NewServerPartition=new ServerVMPartition();
                  $NewServerPartition->setAttribute("OperatingSystem_ID", $OperatingSystem_ID);
                  $NewServerPartition->setAttribute("PartitionName", $PartitionName);
                  $NewServerPartition->setAttribute("Server_ID", $Server_ID);
                 
                  $NewServerPartition->setAttribute("SVMP_IP_Adress", $SVMP_IP_Adress);
                  $NewServerPartition->setAttribute("Backup", $Backup);
                  $NewServerPartition->setAttribute("SVMP_MAC_Adress", $SVMP_MAC_Adress);
                  $NewServerPartition->setAttribute("Nb_Allocated_Cores", $Nb_Allocated_Cores);
                  $NewServerPartition->setAttribute("Allocated_RAM", $Allocated_RAM);
                  $NewServerPartition->setAttribute("Description", $Description);
                  $NewServerPartition->save();
                  return response()->json([
                'NewServerPartition_Added' => 'Yes'
                
            ]);
              }
              else
              {
                return response()->json([
                    'NewServerPartition_Added' => 'No',
                    'OS_ID' => 'NotFound',
                    'Server_ID' => 'NotFound'      
                ]);

              }
        
        }
        else
        {
            return response()->json([
                'NewServerPartition_Added' => 'No',
                'Missing_Parameters' => 'OperatingSystem_ID,PartitionName,Server_ID,SVMP_IP_Adress,Backup,SVMP_MAC_Adress,Nb_Allocated_Cores,Allocated_RAM,Description'      
            ]);
        }

    }


    public function GetPartitionByID(Request $req)
    { 
        if($req->has("PartitionID"))
        {

              $Server_ID=$req->input("PartitionID");
            $Paritions = DB::table('server_v_m_partitions')
            ->join('operating_systems', 'server_v_m_partitions.OperatingSystem_ID', '=', 'operating_systems.OperatingSystem_ID')
            ->join('operating_system_providers', 'operating_system_providers.OperatingSystemProvider_ID', '=', 'operating_systems.OperatingSystemProvider_ID')
            
            ->select('server_v_m_partitions.*', 'operating_systems.OperatingSystem_Name', 'operating_system_providers.OperatingSystem_Company_Name')
            ->where("ServerVMPartition_ID","=",$Server_ID)
            ->get()->toJson();
                return $Paritions;
        }
        else
        {
            return response()->json([
                'GetServerPartitions' => 'No',
                'Missing_Parameters' => 'ServerID'      
            ]);
        }
            
    }


    public function GetServerPartitions(Request $req)
    { 
        if($req->has("ServerID"))
        {

              $Server_ID=$req->input("ServerID");
            $Paritions = DB::table('server_v_m_partitions')
            ->join('operating_systems', 'server_v_m_partitions.OperatingSystem_ID', '=', 'operating_systems.OperatingSystem_ID')
            ->join('operating_system_providers', 'operating_system_providers.OperatingSystemProvider_ID', '=', 'operating_systems.OperatingSystemProvider_ID')
           
            ->select('server_v_m_partitions.*', 'operating_systems.OperatingSystem_Name', 'operating_system_providers.OperatingSystem_Company_Name')
            ->where("Server_ID","=",$Server_ID)
            ->get()->toJson();
                return $Paritions;
        }
        else
        {
            return response()->json([
                'GetServerPartitions' => 'No',
                'Missing_Parameters' => 'ServerID'      
            ]);
        }
            
    }


    public function RemovePartitionByID(Request $req)
    {
       


        if($req->has("PartitionID"))
        {

            $PartitionID=$req->input("PartitionID");

            $Partition=ServerVMPartition::find($PartitionID);
            $Contracts = DB::table('partition_contracts')
            ->where("ServerVMPartition_ID","=",$PartitionID)->get();

            $Disks = DB::table('disk_partitions')
            ->where("ServerVMPartition_ID","=",$PartitionID)->get();
            foreach($Contracts as $contract)
            {
                
                $Contract1=PartitionContract::find($contract->PContract_ID);
                $Contract1->delete();
            }
            foreach($Disks as $Disk)
            {
                
                $Diskf=DiskPartition::find($Disk->DiskP_ID);
                $Diskf->delete();
            }


            $Partition->delete();
            return response()->json([
                'RemovePartitionByID'=>'Yes',
                    
            ]); 



        }
        else
        {
            return response()->json([
                'RemoveServerByID'=>'No',
                'Missing_Parameters' => 'PartitionID'      
            ]); 
        }

    }


    public function EditServerVM(Request $req)
    {
        if($req->has("PartitionName") and $req->has("Server_ID")  and $req->has("SVMP_IP_Adress")and $req->has("SVMP_MAC_Adress")
       and $req->has("Description")and $req->has("OperatingSystem_ID")
        and $req->has("Nb_Allocated_Cores")and $req->has("Allocated_RAM")
        and $req->has("Backup") and $req->has("ServerVMPartition_ID"))
        {
            $ServerVMPartition_ID=$req->input("ServerVMPartition_ID");
            $Server_Name=$req->input("PartitionName");
            $Nb_Cores=$req->input("Nb_Allocated_Cores");
            $RAM=$req->input("Allocated_RAM");
            $Backup=$req->input("Backup");
            $Server_ID=$req->input("Server_ID");
            $Server_IP_Adress=$req->input("SVMP_IP_Adress");
            $Server_MAC_Adress=$req->input("SVMP_MAC_Adress");
            $Description=$req->input("Description");
            $Server_OperatingSystem_ID=$req->input("OperatingSystem_ID");
            $OS=OperatingSystem::find(intval($Server_OperatingSystem_ID));
              if ($OS!=null ) {
                  $NewServer=ServerVMPartition::find($ServerVMPartition_ID);
                  $NewServer->setAttribute("PartitionName", $Server_Name);
                  $NewServer->setAttribute("SVMP_IP_Adress", $Server_IP_Adress);
                  $NewServer->setAttribute("SVMP_MAC_Adress", $Server_MAC_Adress);   
                  $NewServer->setAttribute("Description", $Description);
                  $NewServer->setAttribute("Nb_Allocated_Cores", $Nb_Cores);
                  $NewServer->setAttribute("Allocated_RAM", $RAM);
                  $NewServer->setAttribute("Server_ID", $Server_ID);
                  $NewServer->setAttribute("Backup", $Backup);
                  $NewServer->setAttribute("OperatingSystem_ID",$OS->OperatingSystem_ID);
                
                  $NewServer->save();
                  return response()->json([
                'EditServer' => 'Yes',
                ''=>''
                
            ]);
              }
              else
              {
                return response()->json([
                    'EditServer' => 'No',
                    'OS_ID' => 'NotFound',
                    'ServicePovider_ID' => 'NotFound'      
                ]);

              }
        
        }
        else
        {
            return response()->json([
                'EditServer' => 'No',
                'Missing_Parameters' => 'Nb_Sockets,Nb_Cores,RAM,BIOS,Backup,PaymentType,Server_Type,Server_Name,Server_IP_Adress,Server_MAC_Adress,Server_Country,Server_Location,Server_OperatingSystem_ID,Description'      
            ]);
        }

    }

    public function GetPartitionVL(Request $req)
    {


        if($req->has("ServerVMPartition_ID"))
        {
              $ServerVMPartition_ID=$req->input("ServerVMPartition_ID");
            $VL = DB::table('v_l__v_m_s')
        ->where("ServerVMPartition_ID","=", $ServerVMPartition_ID)
        ->join('logical_volumes', 'logical_volumes.VL_ID', '=', 'v_l__v_m_s.VL_ID')
            ->select('logical_volumes.*',"v_l__v_m_s.*")
        ->get();
        return $VL;
        }
    }

}

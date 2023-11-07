<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Server;
use App\Models\Contract;
use App\Models\PartitionContract;
use App\Models\ServerContract;
use App\Models\ServerVMPartition;
use App\Models\VirtualMachine;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ContractController extends Controller
{


    public function createPartition_Contract (Request $req)
    {
       

        if($req->has("Server_ID") and $req->has("ServerVMPartition_ID")and $req->has("Client_ID")
        and $req->has("SSL_Ending_Date")
        and $req->has("Access_status_Temppass")and $req->has("Rent_price")and $req->has("Payment_Type"))
        {
            $Server_ID=$req->input("Server_ID");
            $ServerVMPartition_ID=$req->input("ServerVMPartition_ID");
            $Client_ID=$req->input("Client_ID");
          
            $SSL_Ending_Date=$req->input("SSL_Ending_Date");
            $Access_status_Temppass=$req->input("Access_status_Temppass");
            $Rent_price=$req->input("Rent_price");
            $Payment_Type=$req->input("Payment_Type");
            if(!is_null($Server_ID) && !is_null($ServerVMPartition_ID)&& !is_null($Client_ID)
            && !is_null($SSL_Ending_Date)&& !is_null($Access_status_Temppass)&& !is_null($Rent_price)&& !is_null($Payment_Type))
               {
                $Server=Server::find($Server_ID);
                $ServerVMPartition=ServerVMPartition::find($ServerVMPartition_ID);
                $Client=Client::find($Client_ID);
            if( !is_null($Server)&&!is_null($ServerVMPartition)&&!is_null($Client))
            {
            $PartitionContract=new PartitionContract();
            $PartitionContract->setAttribute("Server_ID",$Server_ID);
            $PartitionContract->setAttribute("ServerVMPartition_ID",$ServerVMPartition_ID);
            $PartitionContract->setAttribute("Client_ID",$Client_ID);

            if($Payment_Type=="Monthly")
            {
              $NextFacturationDate = Carbon::now();
              $NextFacturationDate->addMonth();
              $Date=$NextFacturationDate->toDateString();
            }
            else
            {
              $NextFacturationDate = Carbon::now();
              $NextFacturationDate->addYear();
              $Date=$NextFacturationDate->toDateString();
            }
           
            $PartitionContract->setAttribute("Next_Facturation_Date",$Date);
            $PartitionContract->setAttribute("SSL_Ending_Date",$SSL_Ending_Date);
            $PartitionContract->setAttribute("Access_status_Temppass",$Access_status_Temppass);
            $PartitionContract->setAttribute("Rent_price",$Rent_price);
            $PartitionContract->setAttribute("Payment_Type",$Payment_Type);
            $PartitionContract->save();
            return response()->json([
                'PartitionContractCreated' => 'Yes',
                     
            ]); 

            }
            else
            {
                return response()->json([
                    'PartitionContractCreated' => 'No',
                    'Server_ID'=>"Is wrong",
                    'ServerVMPartition_ID'=>"Is wrong",
                    'Client_ID'=>"Is wrong"  
                ]); 
            }

               }
               else
               {
                return response()->json([
                    'PartitionContractCreated' => 'No',
                    'EmptyArguments'=>"Yes"
                         
                ]); 

               } 
        }
        else
        {
            return response()->json([
                'PartitionContractCreated' => 'No',
                'Missing_Parameters' => 'Server_ID,ServerVMPartition_ID,Client_ID,Contract_Start_Date,SSL_Ending_Date,Access_status_Temppass,Rent_price,Payment_Type'      
            ]);
        }
    }






    public function createServer_Contract (Request $req)
    {
       

        if($req->has("Server_ID") and $req->has("Client_ID")
        and $req->has("SSL_Ending_Date")
        and $req->has("Access_status_Temppass")and $req->has("Rent_price")and $req->has("Payment_Type"))
        {
            $Server_ID=$req->input("Server_ID");
        
            $Client_ID=$req->input("Client_ID");
          
            $SSL_Ending_Date=$req->input("SSL_Ending_Date");
            $Access_status_Temppass=$req->input("Access_status_Temppass");
            $Rent_price=$req->input("Rent_price");
            $Payment_Type=$req->input("Payment_Type");
            if(!is_null($Server_ID) && !is_null($Client_ID)
            && !is_null($SSL_Ending_Date)&& !is_null($Access_status_Temppass)&& !is_null($Rent_price)&& !is_null($Payment_Type))
               {
                $Server=Server::find($Server_ID);
              
                $Client=Client::find($Client_ID);
            if( !is_null($Server)&&!is_null($Client))
            {
            $PartitionContract=new ServerContract();
            $PartitionContract->setAttribute("Server_ID",$Server_ID);
           
            $PartitionContract->setAttribute("Client_ID",$Client_ID);

            if($Payment_Type=="Monthly")
            {
              $NextFacturationDate = Carbon::now();
              $NextFacturationDate->addMonth();
              $Date=$NextFacturationDate->toDateString();
            }
            else
            {
              $NextFacturationDate = Carbon::now();
              $NextFacturationDate->addYear();
              $Date=$NextFacturationDate->toDateString();
            }

            $DateNow = Carbon::now();
            $DateNow1=$DateNow->toDateString();
            $PartitionContract->setAttribute("Contract_Start_Date",$DateNow1);
            $PartitionContract->setAttribute("Next_Facturation_Date",$Date);
            $PartitionContract->setAttribute("SSL_Ending_Date",$SSL_Ending_Date);
            $PartitionContract->setAttribute("Access_status_Temppass",$Access_status_Temppass);
            $PartitionContract->setAttribute("Rent_price",$Rent_price);
            $PartitionContract->setAttribute("Payment_Type",$Payment_Type);
            $PartitionContract->save();
            return response()->json([
                'createServer_Contract' => 'Yes',
                     
            ]); 

            }
            else
            {
                return response()->json([
                    'createServer_Contract' => 'No',
                    'Server_ID'=>"Is wrong",
                    
                    'Client_ID'=>"Is wrong"  
                ]); 
            }

               }
               else
               {
                return response()->json([
                    'createServer_Contract' => 'No',
                    'EmptyArguments'=>"Yes"
                         
                ]); 

               } 
        }
        else
        {
            return response()->json([
                'createServer_Contract' => 'No',
                'Missing_Parameters' => 'Server_ID,Client_ID,Contract_Start_Date,SSL_Ending_Date,Access_status_Temppass,Rent_price,Payment_Type'      
            ]);
        }
    }


    public function GetAllPartitionContracts (Request $req)
    {

        $Servers = DB::table('partition_contracts')
        ->join('servers', 'partition_contracts.Server_ID', '=', 'servers.Server_ID')
        ->join('server_v_m_partitions', 'server_v_m_partitions.ServerVMPartition_ID', '=', 'partition_contracts.ServerVMPartition_ID')
        ->join('clients', 'clients.Client_ID', '=', 'partition_contracts.Client_ID')    
        ->select('partition_contracts.*', 'servers.Server_Name', 'server_v_m_partitions.PartitionName','clients.First_Name','clients.Last_Name')
        ->get()->toJson();

            return $Servers;

    }

    public function GetPartitionContractsByID (Request $req)
    {
               $ContractID=$req->input("ContractID");
        $Servers = DB::table('partition_contracts')
        ->join('servers', 'partition_contracts.Server_ID', '=', 'servers.Server_ID')
        ->join('server_v_m_partitions', 'server_v_m_partitions.ServerVMPartition_ID', '=', 'partition_contracts.ServerVMPartition_ID')
        ->join('clients', 'clients.Client_ID', '=', 'partition_contracts.Client_ID')    
        ->select('partition_contracts.*', 'servers.Server_Name', 'server_v_m_partitions.PartitionName','clients.First_Name','clients.Last_Name')
        ->where("PContract_ID","=",$ContractID)
        ->get()->toJson();

            return $Servers;

    }

    public function GetServersContractsByID (Request $req)
    {
               $ContractID=$req->input("ContractID");
        $Servers = DB::table('server_contracts')
        ->join('servers', 'server_contracts.Server_ID', '=', 'servers.Server_ID')
        ->join('clients', 'clients.Client_ID', '=', 'server_contracts.Client_ID')    
        ->select('server_contracts.*', 'servers.Server_Name','clients.First_Name','clients.Last_Name')
        ->where("SContract_ID","=",$ContractID)
        ->get()->toJson();

            return $Servers;

    }

    

    public function GetAllServerContracts (Request $req)
    {

        $Servers = DB::table('server_contracts')
        ->join('servers', 'server_contracts.Server_ID', '=', 'servers.Server_ID')
       
        ->join('clients', 'clients.Client_ID', '=', 'server_contracts.Client_ID')    
        ->select('server_contracts.*', 'servers.Server_Name','clients.First_Name','clients.Last_Name')
        ->get()->toJson();

            return $Servers;

    }




    public function GetServerContractsByID (Request $req)
    {
        
        $Server_ID=$req->input("ServerID");
        $Paritions = DB::table('partition_contracts')
        ->join('servers', 'partition_contracts.Server_ID', '=', 'servers.Server_ID')
        ->join('server_v_m_partitions', 'server_v_m_partitions.ServerVMPartition_ID', '=', 'partition_contracts.ServerVMPartition_ID')
        ->join('clients', 'clients.Client_ID', '=', 'partition_contracts.Client_ID')    
        ->select('partition_contracts.*', 'servers.Server_Name', 'server_v_m_partitions.PartitionName','clients.First_Name','clients.Last_Name')

        ->where("partition_contracts.Server_ID","=",$Server_ID)
        ->get()->toJson();
            return $Paritions;
    }

    public function RemoveServerContractByID(Request $req)
    {
        if($req->has("ServerContractID"))
        {

            $ServerID=$req->input("ServerContractID");
            $Server=ServerContract::find($ServerID);
            $Server->delete();
            return response()->json([
                'RemoveServerContractByID'=>'Yes',             
            ]); 
        }
        else
        {
            return response()->json([
                'RemoveServerContractByID'=>'No',
                'Missing_Parameters' => 'ServerContractID'      
            ]); 
        }

    }
    

    public function RemovePartitionContractByID(Request $req)
    {
        if($req->has("PartitionContractID"))
        {

            $ServerID=$req->input("PartitionContractID");
            $Server=PartitionContract::find($ServerID);
            $Server->delete();
            return response()->json([
                'RemoveServerContractByID'=>'Yes',             
            ]); 
        }
        else
        {
            return response()->json([
                'RemoveServerContractByID'=>'No',
                'Missing_Parameters' => 'PartitionContractID'      
            ]); 
        }

    }





    public function EditPartitionContract(Request $req)
    {
    $PContract_ID=$req->input("PContract_ID");
    $Server_ID=$req->input("Server_ID");
    $ServerVMPartition_ID=$req->input("ServerVMPartition_ID");
    $Client_ID=$req->input("Client_ID");
    $Next_Facturation_Date=$req->input("Next_Facturation_Date");
    $SSL_Ending_Date=$req->input("SSL_Ending_Date");
    $Access_status_Temppass=$req->input("Access_status_Temppass");
    $Rent_price=$req->input("Rent_price");
    $Payment_Type=$req->input("Payment_Type");
            
            
    $Contract=PartitionContract::find($PContract_ID);
    $Contract->setAttribute("Server_ID", $Server_ID);
    $Contract->setAttribute("ServerVMPartition_ID", $ServerVMPartition_ID);
    $Contract->setAttribute("Client_ID", $Client_ID);
    $Contract->setAttribute("Next_Facturation_Date", $Next_Facturation_Date);
    $Contract->setAttribute("SSL_Ending_Date", $SSL_Ending_Date);
    $Contract->setAttribute("Access_status_Temppass", $Access_status_Temppass);
    $Contract->setAttribute("Rent_price", $Rent_price);
    $Contract->setAttribute("Payment_Type", $Payment_Type);
    $Contract->save();
    return response()->json([
            'EditPartitionContract' => 'Yes',
            ''=>''
                
        ]);
}



public function EditServerContract(Request $req)
{
$PContract_ID=$req->input("PContract_ID");
$Server_ID=$req->input("Server_ID");
$Client_ID=$req->input("Client_ID");
$Next_Facturation_Date=$req->input("Next_Facturation_Date");
$SSL_Ending_Date=$req->input("SSL_Ending_Date");
$Access_status_Temppass=$req->input("Access_status_Temppass");
$Rent_price=$req->input("Rent_price");
$Payment_Type=$req->input("Payment_Type");       
$Contract=ServerContract::find($PContract_ID);
$Contract->setAttribute("Server_ID", $Server_ID);
$Contract->setAttribute("Client_ID", $Client_ID);
$Contract->setAttribute("Next_Facturation_Date", $Next_Facturation_Date);
$Contract->setAttribute("SSL_Ending_Date", $SSL_Ending_Date);
$Contract->setAttribute("Access_status_Temppass", $Access_status_Temppass);
$Contract->setAttribute("Rent_price", $Rent_price);
$Contract->setAttribute("Payment_Type", $Payment_Type);
$Contract->save();
return response()->json([
        'EditServerContract' => 'Yes'    
    ]);
}

    




}


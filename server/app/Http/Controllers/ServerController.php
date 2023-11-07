<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Server;
use App\Models\Contract;
use App\Models\Disk;
use App\Models\DiskPartition;
use App\Models\User;
use App\Models\OperatingSystem;
use App\Models\PartitionContract;
use App\Models\ServerContract;
use App\Models\ServerVMPartition;
use App\Models\ServiceProvider;
use App\Models\VirtualMachine;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Constraint\Operator;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;


class ServerController extends Controller
{
    public function AddServer(Request $req)
    {
        if($req->has("Server_Name") and $req->has("Service_Provider_ID") and $req->has("Server_IP_Adress")and $req->has("Server_MAC_Adress")
        and $req->has("Server_Country")and $req->has("Server_Location")and $req->has("Description")and $req->has("Server_OperatingSystem_ID")
        and $req->has("Nb_Sockets")and $req->has("Nb_Cores")and $req->has("RAM")and $req->has("BIOS")
        and $req->has("Backup")and $req->has("PaymentType")and $req->has("Server_Type"))
        {
            $Server_Name=$req->input("Server_Name");

            $Service_Provider_ID=$req->input("Service_Provider_ID");
            $Nb_Sockets=$req->input("Nb_Sockets");
            $Nb_Cores=$req->input("Nb_Cores");
            $RAM=$req->input("RAM");
            $BIOS=$req->input("BIOS");
            $Backup=$req->input("Backup");
            $PaymentType=$req->input("PaymentType");
            $Server_Type=$req->input("Server_Type");

            $Server_IP_Adress=$req->input("Server_IP_Adress");
            $Server_MAC_Adress=$req->input("Server_MAC_Adress");
            $Server_Country=$req->input("Server_Country");
            $Server_Location=$req->input("Server_Location");
            $Description=$req->input("Description");
            $Server_OperatingSystem_ID=$req->input("Server_OperatingSystem_ID");
            $OS=OperatingSystem::find(intval($Server_OperatingSystem_ID));
            $SP=ServiceProvider::find(intval($Service_Provider_ID));
              if ($OS!=null && $SP!=null) {
                  $NewServer=new Server();
                  $NewServer->setAttribute("Server_Name", $Server_Name);
                  $NewServer->setAttribute("Server_IP_Adress", $Server_IP_Adress);
                  $NewServer->setAttribute("Server_MAC_Adress", $Server_MAC_Adress);
                  $NewServer->setAttribute("Server_Country", $Server_Country);
                  $NewServer->setAttribute("Description", $Description);

                  $NewServer->setAttribute("Service_Provider_ID", $Service_Provider_ID);
                  $NewServer->setAttribute("Nb_Sockets", $Nb_Sockets);
                  $NewServer->setAttribute("Nb_Harddrive","0");
                  if($PaymentType=="Monthly")
                  {
                    $NextFacturationDate = Carbon::now();
                    $NextFacturationDate->addMonth()->toDateString();
                    $Date=$NextFacturationDate->toDateString();
                  }
                  else
                  {
                    $NextFacturationDate = Carbon::now();
                    $NextFacturationDate->addYear();
                    $Date=$NextFacturationDate->toDateString();

                  }

                  $NewServer->setAttribute("NextFacturationDate",$Date);
                  $NewServer->setAttribute("Nb_Cores", $Nb_Cores);
                  $NewServer->setAttribute("RAM", $RAM);
                  $NewServer->setAttribute("BIOS", $BIOS);
                  $NewServer->setAttribute("Backup", $Backup);
                  $NewServer->setAttribute("PaymentType", $PaymentType);
                  $NewServer->setAttribute("Server_Type", $Server_Type);


                  $NewServer->setAttribute("Server_OperatingSystem_ID",$OS->OperatingSystem_ID);
                  $NewServer->setAttribute("Server_Location", $Server_Location);
                  $NewServer->save();
                  return response()->json([
                'Server_Added' => 'Yes',
                ''=>''
                
            ]);
              }
              else
              {
                return response()->json([
                    'Server_Added' => 'No',
                    'OS_ID' => 'NotFound',
                    'ServicePovider_ID' => 'NotFound'      
                ]);

              }
        
        }
        else
        {
            return response()->json([
                'Server_Added' => 'No',
                'Missing_Parameters' => 'Service_Provider_ID,Nb_Sockets,Nb_Cores,RAM,BIOS,Backup,PaymentType,Server_Type,Server_Name,Server_IP_Adress,Server_MAC_Adress,Server_Country,Server_Location,Server_OperatingSystem_ID,Description'      
            ]);
        }

    }

    public function UpdateServerDiskNumbers()
    {
        $Servers=DB::table("servers")->get();
        foreach($Servers as $server)
        {
            $ADP=DB::table('disks')
            ->where("Server_ID","=",$server->Server_ID)
            ->get();
            $nb=0;
            foreach($ADP as $disk)
            {
              $nb++;
            }

            $Srvr=Server::find($server->Server_ID);

            
            $Srvr->setAttribute("Nb_Harddrive",$nb);
            $Srvr->save();
            

        }

        
         
         
    }

    public function GetAllServers(Request $req)
    {
        if($req->has("Username") and $req->has("Password"))
        {
            ServerController::UpdateServerDiskNumbers();
            $Username=$req->input("Username");
            $Password=$req->input("Password");
            
            
            $User=User::where([["Username","=",$Username]])
            ->first();
            $VerifyPass=Hash::check($Password, $User->Password);
            //checking authentification
            if($User!=null && $VerifyPass==true)
            {
                
                /*$Servers=Server::Join('operating_systems as OS','OperatingSystem_ID','=','OperatingSystem_ID')->Join('operating_system_providers as OSP','OSP.OperatingSystemProvider_ID','=','OS.OperatingSystemProvider_ID')
                ->get()->toJson();*/

$Servers = DB::table('servers')
            ->join('operating_systems', 'servers.Server_OperatingSystem_ID', '=', 'operating_systems.OperatingSystem_ID')
            ->join('operating_system_providers', 'operating_system_providers.OperatingSystemProvider_ID', '=', 'operating_systems.OperatingSystemProvider_ID')
            ->join('service_providers', 'service_providers.Service_Provider_ID','=','servers.Service_Provider_ID')
            ->select('servers.*', 'operating_systems.OperatingSystem_Name', 'operating_system_providers.OperatingSystem_Company_Name','service_providers.service_Provider_Company_Name')
            ->get()->toJson();

                return $Servers;
 
            }
            else
            {
                return response()->json([
                    'AuthentificationError' => 'Yes',
                        
                ]);

            }

        }
        else
        {
            return response()->json([
                'GetAllServers' => 'No',
                'Missing_Parameters' => 'Username,Password'      
            ]);
        }


    }

    public function GetServerByID(Request $req)
    {


        if($req->has("Username") and $req->has("Password"))
        {
            $Username=$req->input("Username");
            $Password=$req->input("Password");
            $ServerID=$req->input("ServerID");
            


            
            $User=User::where([["Username","=",$Username]])
            ->first();
            $VerifyPass=Hash::check($Password, $User->Password);
            //checking authentification
            if($User!=null && $VerifyPass==true&&!$ServerID==null) 
            {


                $Server=DB::table('servers')
        ->join('operating_systems', 'servers.Server_OperatingSystem_ID', '=', 'operating_systems.OperatingSystem_ID')
        ->join('operating_system_providers', 'operating_systems.OperatingSystemProvider_ID', '=', 'operating_system_providers.OperatingSystemProvider_ID')
        ->join('service_providers', 'servers.Service_Provider_ID', '=', 'service_providers.Service_Provider_ID')
        ->where("Server_ID","=",$ServerID)->get();
              // $Server=Server::all()->where("Server_ID","=",$ServerID)->first()->toJson();

           
           
                if($Server==null)
                {
                    return response()->json([
                        'Unkown Error' => 'Cant find the SERVER by ID',
                        'ServerGetById'=>'No',   
                    ]); 
                }
                return $Server;
 
            }
            else
            {
                return response()->json([
                    'AuthentificationError' => 'Yes',
                        
                ]);

            }

        }
        else
        {
            return response()->json([
                'ServerGetById'=>'No',
                'Missing_Parameters' => 'Username,Password,ServerID'      
            ]);
        }
    }



    public function RemoveServerByID(Request $req)
    {
       


        if($req->has("ServerID"))
        {

            $ServerID=$req->input("ServerID");
            $Server=server::find($ServerID);
            $Contracts = DB::table('partition_contracts')
            ->where("Server_ID","=", $ServerID)->get();
            $SRVContracts = DB::table('server_contracts')
            ->where("Server_ID","=", $ServerID)->get();
            $SRVDisks = DB::table('disks')
            ->where("Server_ID","=", $ServerID)->get();
            $SVPartitions = DB::table('server_v_m_partitions')
            ->where("Server_ID","=", $ServerID)->get();
           foreach($Contracts as $contract)
            {
                
                $Contract1=PartitionContract::find($contract->PContract_ID);
                $Contract1->delete();
            }
            foreach($SRVContracts as $SRVContract)
            {
                
                $Contract1=ServerContract::find($SRVContract->SContract_ID);
                $Contract1->delete();
            }


            foreach($SRVDisks as $SRVDisk)
            {
                
                $Disk=Disk::find($SRVDisk->Disk_ID);
                $DiskPartitions = DB::table('disk_partitions')
                ->where("Disk_ID","=",$Disk->Disk_ID )->get();

                foreach($DiskPartitions as $DiskPartition)
                {
                    $DiskParition=DiskPartition::find($DiskPartition->DiskP_ID);
                    $DiskParition->delete();
                }
                $Disk->delete();
            }

            foreach($SVPartitions as $SVPartition)
            {
                
                $Contract1=ServerVMPartition::find($SVPartition->ServerVMPartition_ID);
                $Contract1->delete();
            }
            
            $Server->delete();
            return response()->json([
                'RemoveServerByID'=>'Yes',
                    
            ]); 



        }
        else
        {
            return response()->json([
                'RemoveServerByID'=>'No',
                'Missing_Parameters' => 'ServerID'      
            ]); 
        }

    }

    public function GetServerOSProvider(Request $req)
    {




        if($req->has("ServerID"))
        {

            $ServerID=$req->input("ServerID");
            
            $Servers = DB::table('servers')
            ->join('operating_systems', 'servers.Server_OperatingSystem_ID', '=', 'operating_systems.OperatingSystem_ID')
            ->join('operating_system_providers', 'operating_system_providers.OperatingSystemProvider_ID', '=', 'operating_systems.OperatingSystemProvider_ID')
            ->join('service_providers', 'service_providers.Service_Provider_ID','=','servers.Service_Provider_ID')
            ->select('operating_systems.OperatingSystem_Name', 'operating_system_providers.OperatingSystem_Company_Name','service_providers.service_Provider_Company_Name')
            ->where("Server_ID","=",$ServerID)
            ->get()->toJson();
    
                return $Servers;



        }
        else
        {
            return response()->json([
                'GetServerOSD'=>'No',
                'Missing_Parameters' => 'ServerID'      
            ]); 
        }
        

        
        
    }
    
    

    public function EditServer(Request $req)
    {
        if($req->has("Server_Name") and $req->has("Server_ID") and $req->has("Service_Provider_ID") and $req->has("Server_IP_Adress")and $req->has("Server_MAC_Adress")
        and $req->has("Server_Country")and $req->has("Server_Location")and $req->has("Description")and $req->has("Server_OperatingSystem_ID")
        and $req->has("Nb_Sockets")and $req->has("Nb_Cores")and $req->has("RAM")and $req->has("BIOS")
        and $req->has("Backup")and $req->has("PaymentType")and $req->has("Server_Type")and $req->has("NextFacturationDate"))
        {
            $Server_Name=$req->input("Server_Name");

            $Service_Provider_ID=$req->input("Service_Provider_ID");
            $NextFacturationDate=$req->input("NextFacturationDate");
            $Nb_Sockets=$req->input("Nb_Sockets");
            $Nb_Cores=$req->input("Nb_Cores");
            $RAM=$req->input("RAM");
            $BIOS=$req->input("BIOS");
            $Backup=$req->input("Backup");
            $PaymentType=$req->input("PaymentType");
            $Server_Type=$req->input("Server_Type");
            $Server_ID=$req->input("Server_ID");
            $Server_IP_Adress=$req->input("Server_IP_Adress");
            $Server_MAC_Adress=$req->input("Server_MAC_Adress");
            $Server_Country=$req->input("Server_Country");
            $Server_Location=$req->input("Server_Location");
            $Description=$req->input("Description");
            $Server_OperatingSystem_ID=$req->input("Server_OperatingSystem_ID");
            $OS=OperatingSystem::find(intval($Server_OperatingSystem_ID));
            $SP=ServiceProvider::find(intval($Service_Provider_ID));
              if ($OS!=null && $SP!=null) {
                  $NewServer=server::find($Server_ID);
                  $NewServer->setAttribute("Server_Name", $Server_Name);
                  $NewServer->setAttribute("Server_IP_Adress", $Server_IP_Adress);
                  $NewServer->setAttribute("Server_MAC_Adress", $Server_MAC_Adress);
                  $NewServer->setAttribute("Server_Country", $Server_Country);
                  $NewServer->setAttribute("Description", $Description);
                  $NewServer->setAttribute("Service_Provider_ID", $Service_Provider_ID);
                  $NewServer->setAttribute("Nb_Sockets", $Nb_Sockets);
                  $NewServer->setAttribute("Nb_Harddrive","0");
                  $NewServer->setAttribute("NextFacturationDate",$NextFacturationDate);
                  $NewServer->setAttribute("Nb_Cores", $Nb_Cores);
                  $NewServer->setAttribute("RAM", $RAM);
                  $NewServer->setAttribute("BIOS", $BIOS);
                  $NewServer->setAttribute("Backup", $Backup);
                  $NewServer->setAttribute("PaymentType", $PaymentType);
                  $NewServer->setAttribute("Server_Type", $Server_Type);	
                 
                  $NewServer->setAttribute("Server_OperatingSystem_ID",$OS->OperatingSystem_ID);
                  $NewServer->setAttribute("Server_Location", $Server_Location);
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
                'Missing_Parameters' => 'NextFacturationDate,Service_Provider_ID,Nb_Sockets,Nb_Cores,RAM,BIOS,Backup,PaymentType,Server_Type,Server_Name,Server_IP_Adress,Server_MAC_Adress,Server_Country,Server_Location,Server_OperatingSystem_ID,Description'      
            ]);
        }

    }



   




}

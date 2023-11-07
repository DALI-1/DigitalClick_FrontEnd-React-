<?php

namespace App\Http\Controllers;

use App\Models\PartitionContract;
use App\Models\PContractNotification;
use App\Models\SContractNotification;
use App\Models\Server;
use App\Models\ServerContract;
use App\Models\ServerNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
 
    public function CheckServerFacturationDate(Request $req)
    {

        $servers=Server::all();
        $changes=0;

        
        foreach($servers as $server)
        {
            $SV=Server::find($server->Server_ID);
            $Payment_Type=$SV->PaymentType;
            $currdate = Carbon::now();
            if($currdate>=$SV->NextFacturationDate)
            {
                $changes++;
                if($Payment_Type=="Per Month")
                {
                  $NextFacturationDate = Carbon::now()->firstOfMonth();
                 
                  $NextFacturationDate->addMonth();
                  $Date=$NextFacturationDate->toDateString();
                }
                else
                {
                  $NextFacturationDate = Carbon::now()->firstOfMonth();
                 
                  $NextFacturationDate->addYear();
                  $Date=$NextFacturationDate->toDateString();
                }


                $NewServerNotif= new ServerNotification();
                $NewServerNotif->setAttribute("Server_ID",$SV->Server_ID);
                $NewServerNotif->setAttribute("Notification_Reciever_Specific_User","None specifique");
                $NewServerNotif->setAttribute("Notification_Reciever_Role","Admin_User");
                $NewServerNotif->setAttribute("Notification_Description","Vous devez payer les frais de votre serveur ". $SV->Server_Name ." le plus rapidement possible, vous avez sauté le délai");
                $NewServerNotif->setAttribute("Notification_Type","URGENT");
                
                $NewServerNotif->save();
                $SV->NextFacturationDate=$Date;
                $SV->save();
             

            }



           



        }
        return response()->json([
            'Notifications added'=>$changes
        ]);

    }

    public function CheckVMContractFacturationDate(Request $req)
    {


        
        $changes=0;
        $Partitions = DB::table('partition_contracts')
        ->join('servers', 'partition_contracts.Server_ID', '=', 'servers.Server_ID')
        ->join('server_v_m_partitions', 'server_v_m_partitions.ServerVMPartition_ID', '=', 'partition_contracts.ServerVMPartition_ID')
        ->join('clients', 'clients.Client_ID', '=', 'partition_contracts.Client_ID')    
        ->select('partition_contracts.*', 'servers.Server_Name', 'server_v_m_partitions.PartitionName','clients.First_Name','clients.Last_Name')->get();

        
        
        foreach($Partitions as $Partition)
        
        {
           
            $SV=PartitionContract::find($Partition->PContract_ID);
            $Payment_Type=$SV->Payment_Type;
            $currdate = Carbon::now();
           
            if($currdate>=$SV->Next_Facturation_Date)
            {
                $changes++;
                if($Payment_Type=="Monthly")
                {
                  $NextFacturationDate = Carbon::now()->firstOfMonth();
                  
                  $NextFacturationDate->addMonth();
                  $Date=$NextFacturationDate->toDateString();
                }
                else
                {
                  $NextFacturationDate = Carbon::now()->firstOfMonth();
                 
                  $NextFacturationDate->addYear();
                  $Date=$NextFacturationDate->toDateString();
                }


                $NewServerNotif= new PContractNotification();
                $NewServerNotif->setAttribute("PContract_ID",$SV->PContract_ID);
                $NewServerNotif->setAttribute("Notification_Reciever_Specific_User","None specifique");
                $NewServerNotif->setAttribute("Notification_Reciever_Role","Admin_User");
                $NewServerNotif->setAttribute("Notification_Description","Le Client ".$Partition->First_Name." ". $Partition->Last_Name." ne vous a pas payé pour la Machine virtuelle ".$Partition->PartitionName ." qu'il loue, veuillez le contacter au plus vite.");
                $NewServerNotif->setAttribute("Notification_Type","MEDICORE");
                
                $NewServerNotif->save();
                $SV->Next_Facturation_Date=$Date;
                $SV->save();
             

            }



           



        }
        return response()->json([
            'Notifications added'=>$changes
        ]); 
    }
    public function CheckSRVRContractFacturationDate(Request $req)
    {


        
        $changes=0;
        $Partitions = DB::table('server_contracts')
        ->join('servers', 'server_contracts.Server_ID', '=', 'servers.Server_ID')
        ->join('clients', 'clients.Client_ID', '=', 'server_contracts.Client_ID')    
        ->select('server_contracts.*', 'servers.Server_Name','clients.First_Name','clients.Last_Name')
        
        ->get();
        
        
        foreach($Partitions as $Partition)
        
        {
           
            $SV=ServerContract::find($Partition->SContract_ID);
            $Payment_Type=$SV->Payment_Type;
            $currdate = Carbon::now();
           
            if($currdate>=$SV->Next_Facturation_Date)
            {
                $changes++;
                if($Payment_Type=="Monthly")
                {
                  $NextFacturationDate = Carbon::now()->firstOfMonth();
                  
                  $NextFacturationDate->addMonth();
                  $Date=$NextFacturationDate->toDateString();
                }
                else
                {
                  $NextFacturationDate = Carbon::now()->firstOfMonth();
                  
                  $NextFacturationDate->addYear();
                  $Date=$NextFacturationDate->toDateString();
                }


                $NewServerNotif= new SContractNotification();
                $NewServerNotif->setAttribute("SContract_ID",$SV->SContract_ID);
                $NewServerNotif->setAttribute("Notification_Reciever_Specific_User","None specifique");
                $NewServerNotif->setAttribute("Notification_Reciever_Role","Admin_User");
                $NewServerNotif->setAttribute("Notification_Description","Le Client ".$Partition->First_Name." ". $Partition->Last_Name." ne vous a pas payé pour la Server ".$Partition->Server_Name ." qu'il loue, veuillez le contacter au plus vite.");
                $NewServerNotif->setAttribute("Notification_Type","MEDICORE");
                
                $NewServerNotif->save();
                $SV->Next_Facturation_Date=$Date;
                $SV->save();
            }
        }
        return response()->json([
            'Notifications added'=>$changes
        ]); 
    }



    public function GetServerNotifications (Request $req)
    {
           return ServerNotification::all()->toJson();
    }
    public function GetServerContractNotifications (Request $req)
    {
           return SContractNotification::all()->toJson();
    }
    public function GetVMContractNotifications (Request $req)
    {
           return PContractNotification::all()->toJson();
    }



    public function ClearNotifications (Request $req)
    {
       $SNots=SContractNotification::all();
       $VMNots=PContractNotification::all();
       $SSNots=ServerNotification::all();
       
       foreach($SNots as $Nots)
       {
        
        $SV=SContractNotification::find($Nots->Notification_ID);
           $SV->delete();     
       }
       foreach($VMNots as $Nots)
       {
        $SV=PContractNotification::find($Nots->Notification_ID);
           $SV->delete();      
       }
       foreach($SSNots as $Nots)
       {
        $SV=ServerNotification::find($Nots->id);
           $Nots->delete();       
       }
       return response()->json([
        'Notifications Cleared'=>"Done!"
    ]); 
    }
}

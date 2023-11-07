<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SignInController;
use App\Http\Controllers\SignUpController;
use App\Http\Controllers\VirtualMachineController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\OperatingSystemController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\ServiceProviderController;
use App\Http\Controllers\DiskController;
use App\Http\Controllers\ServerVMPartitionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IMGController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\VLController;
use App\Models\ServerNotification;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/CreateServiceProvider', [ServiceProviderController::class,'CreateServiceProvider']);
Route::get('/GetAllServiceProviders', [ServiceProviderController::class,'GetAllServiceProviders']);
Route::get('/DeleteServiceProvider', [ServiceProviderController::class,'DeleteServiceProvider']);
Route::get('/SignUp', [SignUpController::class,'SignUp']    );
Route::get('/SignIn', [SignInController::class,'SignIn']   );
Route::get('/AddVirtualMachine', [VirtualMachineController::class,'AddVirtualMachine']);
Route::get('/GetVMProviders', [VirtualMachineController::class,'GetVMProviders']);
Route::get('/CreateVMProvider', [VirtualMachineController::class,'CreateVMProvider']);
Route::get('/GetAllVMs', [VirtualMachineController::class,'GetAllVMs']);
Route::get('/AddServer', [ServerController::class,'AddServer']);
Route::get('/EditServer', [ServerController::class,'EditServer']);
Route::get('/GetServerOSProvider', [ServerController::class,'GetServerOSProvider']);
Route::get('/RemoveServerByID', [ServerController::class,'RemoveServerByID']);
Route::get('/GetAllServers', [ServerController::class,'GetAllServers']);
Route::get('/GetServerByID', [ServerController::class,'GetServerByID']);
Route::get('/AddOS', [OperatingSystemController::class,'AddOS']);
Route::get('/AddOSProvider', [OperatingSystemController::class,'AddOSProvider']);
Route::get('/GetAllOSProviders', [OperatingSystemController::class,'GetAllOSProviders']);
Route::get('/GetAllOSs', [OperatingSystemController::class,'GetAllOSs']);
Route::post('/AddClient', [ClientController::class,'AddClient']);
Route::get('/GetClientByID', [ClientController::class,'GetClientByID']);
Route::get('/GetClientNumbers', [ClientController::class,'GetClientNumbers']);
Route::get('/GetClientEmails', [ClientController::class,'GetClientEmails']);
Route::post('/EditClient', [ClientController::class,'EditClient']);
Route::get('/GetUserbyusername', [UserController::class,'GetUserbyusername']);
Route::post('/EditUser', [UserController::class,'EditUser']);
Route::get('/ClearNotifications', [NotificationController::class,'ClearNotifications']);
Route::get('/GetServerContractNotifications', [NotificationController::class,'GetServerContractNotifications']);
Route::get('/GetVMContractNotifications', [NotificationController::class,'GetVMContractNotifications']);
Route::get('/GetServerNotifications', [NotificationController::class,'GetServerNotifications']);
Route::get('/CheckSRVRContractFacturationDate', [NotificationController::class,'CheckSRVRContractFacturationDate']);
Route::get('/CheckVMContractFacturationDate', [NotificationController::class,'CheckVMContractFacturationDate']);
Route::get('/CheckServerFacturationDate', [NotificationController::class,'CheckServerFacturationDate']);
Route::get('/GetAllClients', [ClientController::class,'GetAllClients']);
Route::get('/RemoveClientByID', [ClientController::class,'RemoveClientByID']);
Route::get('/GetAllClientNumbers', [ClientController::class,'GetAllClientNumbers']);

Route::post('/UploadIMG',[IMGController::class,"UploadIMG"] );

Route::get('/GetServerContracts', [ServerController::class,'GetServerContracts']);
Route::get('/GetServerVirtualMachines', [ServerController::class,'GetServerVirtualMachines']);

Route::get('/CreateServerPartition', [ServerVMPartitionController::class,'CreateServerVMPartition']);
Route::get('/GetServerPartitions', [ServerVMPartitionController::class,'GetServerPartitions']);
Route::get('/RemovePartitionByID', [ServerVMPartitionController::class,'RemovePartitionByID']);
Route::get('/GetPartitionByID', [ServerVMPartitionController::class,'GetPartitionByID']);
Route::get('/EditServerVM', [ServerVMPartitionController::class,'EditServerVM']);
Route::get('/GetPartitionVL', [ServerVMPartitionController::class,'GetPartitionVL']);

Route::get('/GetPartitionContractsByID', [ContractController::class,'GetPartitionContractsByID']);
Route::get('/createPartitionContract', [ContractController::class,'createPartition_Contract']);
Route::get('/GetAllPartitionContracts', [ContractController::class,'GetAllPartitionContracts']);


Route::get('/createServer_Contract', [ContractController::class,'createServer_Contract']);
Route::get('/GetAllServerContracts', [ContractController::class,'GetAllServerContracts']);
Route::get('/RemoveServerContractByID', [ContractController::class,'RemoveServerContractByID']);
Route::get('/RemovePartitionContractByID', [ContractController::class,'RemovePartitionContractByID']);
Route::get('/GetServerContractsByID', [ContractController::class,'GetServerContractsByID']);
Route::get('/EditPartitionContract', [ContractController::class,'EditPartitionContract']);
Route::get('/GetServersContractsByID', [ContractController::class,'GetServersContractsByID']);
Route::get('/EditServerContract', [ContractController::class,'EditServerContract']);


Route::get('/RemoveDiskByID', [DiskController::class,'RemoveDiskByID']);
Route::get('/CreateDiskProvider', [DiskController::class,'CreateDiskProvider']);
Route::get('/CreateDisk', [DiskController::class,'CreateDisk']);
Route::get('/GetServerDisks', [DiskController::class,'GetServerDisks']);
Route::get('/CreateDiskPartition', [DiskController::class,'CreateDiskPartition']);
Route::get('/GetAllDiskProviders', [DiskController::class,'GetAllDiskProviders']);
Route::get('/GetDiskPartitions', [DiskController::class,'GetDiskPartitions']);
Route::get('/RemoveDiskPByID', [DiskController::class,'RemoveDiskPByID']);
Route::get('/GetDiskByID', [DiskController::class,'GetDiskByID']);
Route::get('/EditDisk', [DiskController::class,'EditDisk']);
Route::get('/GetAllServerDisks', [DiskController::class,'GetAllServerDisks']);
Route::get('/GetAllUsers', [UserController::class,'GetAllUsers']);
Route::get('/SetUserAdmin', [UserController::class,'SetUserAdmin']);
Route::get('/SetUserUser', [UserController::class,'SetUserUser']);
Route::get('/SetUserModerator', [UserController::class,'SetUserModerator']);
Route::get('/DeleteUser', [UserController::class,'DeleteUser']);

Route::get('/GetDiskPartitionByID', [DiskController::class,'GetDiskPartitionByID']);
Route::get('/EditPartitionDisk', [DiskController::class,'EditPartitionDisk']);

Route::get('/CreateVL', [VLController::class,'CreateVL']);
Route::get('/AssociateDiskToVL', [VLController::class,'AssociateDiskToVL']);
Route::get('/AddDisktoVL', [VLController::class,'AddDisktoVL']);
Route::get('/GetAllVLs', [VLController::class,'GetAllVLs']);
Route::get('/RemoveVLM', [VLController::class,'RemoveVLM']);
Route::get('/DeAssociateDiskToVL', [VLController::class,'DeAssociateDiskToVL']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {

    return $request->user();
});



    

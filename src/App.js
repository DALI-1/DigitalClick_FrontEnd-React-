
import React,{ Component } from 'react'
import ManageServers from './WebPages/ManageServers_WebPage.jsx';

import Image from './components/images/BackgroundImage_Default.jpg';
import NotificationBell from './components/Notification.jsx';
import AddServer from './WebPages/AddServer_WebPage.jsx';
import AddVirtualMachine from './WebPages/AddVirtualMachine_WebPage.jsx';
import AddVMCompany from './WebPages/AddVMCompany_WebPage.jsx';
import AddClient from './WebPages/AddClient_WebPage.jsx';

import Home from './WebPages/Home_WebPage.jsx';
import ManageClients from './WebPages/ManageClients_WebPage.jsx';
import ManagePartitionContracts from './WebPages/ManagePartitionContracts_WebPage.jsx';
import ManageServerPartitions from './WebPages/ManageServer_Partitions_WebPage.jsx';
import ManagePartitionDisks from './WebPages/ManagePartitionDisks_WebPage.jsx';
import ManageLogicalVolume from './WebPages/ManageLogicalVolume_WebPage';
import AddServiceProvider from './WebPages/AddServiceProvider_WebPage.jsx';
import ManageServerContracts from './WebPages/ManageServerContracts_WebPage.jsx';
import ManageServersContracts from './WebPages/ManageServersContracts_WebPage.jsx';
import EditServer from './WebPages/EditServer_WebPage.jsx';
import EditPartition from './WebPages/EditPartition_WebPage.jsx';
import ManageClientContracts from './WebPages/ManageClientContracts_WebPage.jsx';
import AddOS from './WebPages/AddOS_WebPage.jsx';
import AddOSCompany from './WebPages/AddOSCompany_WebPage.jsx';
import EditClient from './WebPages/EditClient_WebPage.jsx';
import ManageProfile from './WebPages/ManageProfile_WebPage.jsx';
import AddServerContract from './WebPages/AddServerContract_WebPage';
import AddDisk from './WebPages/AddDisk_WebPage';
import DevPage from './WebPages/Dev_WebPage.jsx';
import AddPartitionContract from './WebPages/AddPartitionContract_WebPage.jsx';
import EditContract from './WebPages/EditContract_WebPage.jsx';
import SignUp from './WebPages/SignUp_WebPage.jsx'
import CreateDiskPartition from './WebPages/CreateDiskPartition_WebPage.jsx'
import EditDiskPartition from './WebPages/EditDiskPartition_WebPage.jsx'
import SignIn from './WebPages/SignIn_WebPage.jsx'
import ManageDiskParitions from './WebPages/ManageDiskPartitions_WebPage.jsx'
import EditDisk from './WebPages/EditDisk_WebPage.jsx'
import ManageServerPartitionDisks from './WebPages/ManageServerPartitionDisks_WebPage.jsx'
import AddDiskProvider from './WebPages/AddDiskProvider_WebPage'
import AddServerPartition from './WebPages/AddServerPartition_WebPage';
import EditSrvrContract from './WebPages/EditSrvrContract_WebPage';
import ADDVL from './WebPages/AddVL_WebPage';
import Admin from './WebPages/Admin_WebPage';
import UnAuth from './WebPages/UnAuthorized_WebPage';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";

function App() {
  return (


    
    <Router>
       
       <Routes>
       <Route exact path="/Admin" element={<Admin/>}/>
        <Route exact path="/Dev" element={<DevPage/>}/>
        <Route exact path="/ManagePartitionContracts" element={<ManagePartitionContracts/>}/>
        <Route exact path="/ManageServerContracts" element={<ManageServerContracts/>}/>
        <Route exact path="/SignIn" element={<SignIn/>}/>
        <Route exact path="/SignUp" element={<SignUp/>}/>
        <Route exact path="/ManagePartitionDisks" element={<ManagePartitionDisks/>}/>
        <Route exact path="/ManageClientContracts" element={<ManageClientContracts/>}/>
        <Route exact path="/ManageClients" element={<ManageClients/>}/>
        <Route exact path="/ManageServers" element={<ManageServers/>}/>
        <Route exact path="/ManageProfile" element={<ManageProfile/>}/>
        <Route exact path="/EditServer" element={<EditServer/>}/>
        <Route exact path="/AddClient" element={<AddClient/>}/>
        <Route exact path="/AddServer" element={<AddServer/>}/>
        <Route exact path="/AddVirtualMachine" element={<AddVirtualMachine/>}/>
        <Route exact path="/AddPartitionContract" element={<AddPartitionContract/>}/>
        <Route exact path="/EditContract" element={<EditContract/>}/>
        <Route exact path="/AddOS" element={<AddOS/>}/>
        <Route exact path="/AddVMCompany" element={<AddVMCompany/>}/>
        <Route exact path="/AddOSCompany" element={<AddOSCompany/>}/>
        <Route exact path="/AddServiceProvider" element={<AddServiceProvider/>}/>
        <Route exact path="/ManageServerPartitions" element={<ManageServerPartitions/>}/>
        <Route exact path="/ManageServersContracts" element={<ManageServersContracts/>}/>
        <Route exact path="/EditClient" element={<EditClient/>}/>
        <Route exact path="/EditPartition" element={<EditPartition/>}/>
        <Route exact path="/AddServerContract" element={<AddServerContract/>}/>
        <Route exact path="/AddDisk" element={<AddDisk/>}/>
        <Route exact path="/CreateDiskPartition" element={<CreateDiskPartition/>}/>
        <Route exact path="/ManageServerPartitionDisks" element={<ManageServerPartitionDisks/>}/>
        <Route exact path="/ManageDiskPartitions" element={<ManageDiskParitions/>}/>
        <Route exact path="/EditDisk" element={<EditDisk/>}/>
        <Route exact path="/EditDiskPartition" element={<EditDiskPartition/>}/>
        <Route exact path="/AddDiskProvider" element={<AddDiskProvider/>}/>
        <Route exact path="/AddServerPartition" element={<AddServerPartition/>}/>
        <Route exact path="/EditSrvrContract" element={<EditSrvrContract/>}/>
        <Route exact path="/ManageLogicalVolume" element={<ManageLogicalVolume/>}/>
       <Route exact path="/AddVL" element={<ADDVL/>}/>
       <Route exact path="/" element={<Home/>}/>
       <Route exact path="/UnauthorizedAccess" element={<UnAuth/>}/>
        </Routes>
      
    </Router>
  );
}


export default App;

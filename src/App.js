

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

import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
       
        <Route exact path="/Dev" component={DevPage}/>
        <Route exact path="/ManagePartitionContracts" component={ManagePartitionContracts}/>
        <Route exact path="/ManageServerContracts" component={ManageServerContracts}/>
        <Route exact path="/SignIn" component={SignIn}/>
        <Route exact path="/SignUp" component={SignUp}/>
        <Route exact path="/ManagePartitionDisks" component={ManagePartitionDisks}/>
        
        <Route exact path="/ManageClientContracts" component={ManageClientContracts}/>
        <Route exact path="/ManageClients" component={ManageClients}/>
        <Route exact path="/ManageServers" component={ManageServers}/>
        <Route exact path="/ManageProfile" component={ManageProfile}/>
        <Route exact path="/EditServer" component={EditServer}/>
        <Route exact path="/AddClient" component={AddClient}/>
        <Route exact path="/AddServer" component={AddServer}/>
        <Route exact path="/AddVirtualMachine" component={AddVirtualMachine}/>
        <Route exact path="/AddPartitionContract" component={AddPartitionContract}/>
        <Route exact path="/EditContract" component={EditContract}/>
        <Route exact path="/AddOS" component={AddOS}/>
        <Route exact path="/AddVMCompany" component={AddVMCompany}/>
        <Route exact path="/AddOSCompany" component={AddOSCompany}/>
        <Route exact path="/AddServiceProvider" component={AddServiceProvider}/>
        <Route exact path="/ManageServerPartitions" component={ManageServerPartitions}/>
        <Route exact path="/ManageServersContracts" component={ManageServersContracts}/>
        <Route exact path="/EditClient" component={EditClient}/>
        <Route exact path="/EditPartition" component={EditPartition}/>
        <Route exact path="/AddServerContract" component={AddServerContract}/>
        <Route exact path="/AddDisk" component={AddDisk}/>
        <Route exact path="/CreateDiskPartition" component={CreateDiskPartition}/>
        <Route exact path="/ManageServerPartitionDisks" component={ManageServerPartitionDisks}/>
        <Route exact path="/ManageDiskPartitions" component={ManageDiskParitions}/>
        <Route exact path="/EditDisk" component={EditDisk}/>
        <Route exact path="/EditDiskPartition" component={EditDiskPartition}/>
        <Route exact path="/AddDiskProvider" component={AddDiskProvider}/>
        <Route exact path="/AddServerPartition" component={AddServerPartition}/>
        <Route exact path="/EditSrvrContract" component={EditSrvrContract}/>
        
        <Route exact path="/" component={Home}/>
        </Switch>
      
    </Router>
  );
}


export default App;

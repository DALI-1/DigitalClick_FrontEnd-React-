

import ManageServers from './WebPages/ManageServers_WebPage.jsx';
import Image from './components/images/BackgroundImage_Default.jpg';
import NotificationBell from './components/Notification.jsx';
import AddServer from './WebPages/AddServer_WebPage.jsx';
import AddVirtualMachine from './WebPages/AddVirtualMachine_WebPage.jsx';
import AddClient from './WebPages/AddClient_WebPage.jsx';

import Home from './WebPages/Home_WebPage.jsx';
import ManageClients from './WebPages/ManageClients_WebPage.jsx';
import ManageContracts from './WebPages/ManageContracts_WebPage.jsx';
import DevPage from './WebPages/Dev_WebPage.jsx';
import AddContract from './WebPages/AddContract_WebPage.jsx';
import EditContract from './WebPages/EditContract_WebPage.jsx';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
       
        <Route exact path="/Dev" component={DevPage}/>
        <Route exact path="/ManageContracts" component={ManageContracts}/>
        <Route exact path="/ManageClients" component={ManageClients}/>
        <Route exact path="/ManageServers" component={ManageServers}/>
        <Route exact path="/AddClient" component={AddClient}/>
        <Route exact path="/AddServer" component={AddServer}/>
        <Route exact path="/AddVirtualMachine" component={AddVirtualMachine}/>
        <Route exact path="/AddContract" component={AddContract}/>
        <Route exact path="/EditContract" component={EditContract}/>
        <Route exact path="/" component={Home}/>
        </Switch>
      
    </Router>
  );
}


export default App;

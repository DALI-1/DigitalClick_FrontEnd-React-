import React,{Component} from 'react';
import './ManageServer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
class MangeServer extends Component {
    state = {  } 
    render() { 
        return (


<div class="container mt-10" >


<div class="d-flex justify-content-center mb-4">
              <div class="shadow  p-1  mb-1  bg-light rounded">
              <div class="shadow  p-1  mb-1  bg-light rounded" >
              <ButtonGroup disableElevation variant="contained" style={{backgroundColor:"white",opacity: 0.7 }} >
             
              <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true" style={{width:"200px",margin:"30px" }}>Edit Server</a>
              <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true" style={{width:"200px",margin:"30px" }}>Remove Server</a>
  
</ButtonGroup>
 
</div>
</div>

              </div>
                          
                                    <div class="row">
               <div class="col-md-4 col-sm-6">
                 <div class="card mb-30"><a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img"><img src={require('./images/Default_Company_icon.png')} alt="Category"/></div>
                       <div class="thumblist"><img src={require('./images/Server_Default_icon.png')} alt="Category"/><img src={require('./images/Tunisia_Flag.png')} alt="Category"/></div>
                     </div></a>
                   <div class="card-body text-center">
                     <h4 class="card-title" style={{color:'black'}}> #102391</h4>
                     <p class="text-muted"> Server: IBM System x3650 </p>
                     <p class="text-muted"> IP:192.4.8.14</p>
                     <p class="text-muted"> MAC:D1-1E-D0-0A-C9-C6</p>
                     <p class="text-muted"> System:Ubuntu</p><a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Virtual Machines</a>
                     <br></br>
                     <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Contracts</a>


                       <Form>
                      <Form.Check 
                    type="switch"
                    id="custom-switch"
                      label="Check this switch"
                                      />
  
                              </Form>




                   </div>
                 </div>
               </div>
               <div class="col-md-4 col-sm-6">
                 <div class="card mb-30"><a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img"><img src={require('./images/Default_Company_icon.png')} alt="Category"/></div>
                       <div class="thumblist"><img src={require('./images/Server_Default_icon.png')} alt="Category"/><img src={require('./images/Tunisia_Flag.png')} alt="Category"/></div>
                     </div></a>
                   <div class="card-body text-center">
                     <h4 class="card-title" style={{color:'black'}}> #102391</h4>
                     <p class="text-muted"> Server: IBM System x3650 </p>
                     <p class="text-muted"> IP:192.4.8.14</p>
                     <p class="text-muted"> MAC:D1-1E-D0-0A-C9-C6</p>
                     <p class="text-muted"> System:Ubuntu</p><a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Virtual Machines</a>
                     <br></br>
                     <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Contracts</a>
                     <Form>
                      <Form.Check 
                    type="switch"
                    id="custom-switch"
                      label="Check this switch"
                                      />
  
                              </Form>

                   </div>
                 </div>
               </div>
               <div class="col-md-4 col-sm-6">
                 <div class="card mb-30"><a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img"><img src={require('./images/Default_Company_icon.png')} alt="Category"/></div>
                       <div class="thumblist"><img src={require('./images/Server_Default_icon.png')} alt="Category"/><img src={require('./images/Tunisia_Flag.png')} alt="Category"/></div>
                     </div></a>
                   <div class="card-body text-center">
                     <h4 class="card-title" style={{color:'black'}}> #102391</h4>
                     <p class="text-muted"> Server: IBM System x3650 </p>
                     <p class="text-muted"> IP:192.4.8.14</p>
                     <p class="text-muted"> MAC:D1-1E-D0-0A-C9-C6</p>
                     <p class="text-muted"> System:Ubuntu</p><a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Virtual Machines</a>
                     <br></br>
                     <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Contracts</a>
                     <Form>
                      <Form.Check 
                    type="switch"
                    id="custom-switch"
                      label="Check this switch"
                                      />
  
                              </Form>

                   </div>
                 </div>
               </div>
             </div>
             </div>

        );
    }
}
 
export default MangeServer;
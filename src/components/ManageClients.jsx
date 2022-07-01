
import React,{Component} from 'react';
import './ManageClients.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBDropdownMenu,MDBDropdownItem,MDBDropdownToggle,MDBDropdown } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';

class ManageClients extends Component {
    state = {  } 
    render() { 
        return (


            <div class="container mt-1"  >
              <div class="d-flex justify-content-center mb-4">
              <div class="shadow  p-1  mb-1  bg-light rounded">
              <div class="shadow  p-1  mb-1  bg-light rounded" >
              <ButtonGroup disableElevation variant="contained" style={{backgroundColor:"white",opacity: 0.7 }} >
                <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true" style={{width:"200px",margin:"30px" }}>Edit Client</a>
                <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true" style={{width:"200px",margin:"30px" }}>Remove Client</a>
  
</ButtonGroup>
 
</div>
</div>

              </div>



  
                            		

                            	
                               
                                    <div class="row">
               <div class="col-md-4 col-sm-6">
                 <div class="card mb-30"><a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img"><img src={require('./images/Delice_Logo.jpg')} alt="Category"/></div>
                       <div class="thumblist"><img src={require('./images/Client_Default_Picture.png')} alt="Category"/><img src={require('./images/French_Flag.png')} alt="Category"/></div>
                     </div></a>
                   <div class="card-body text-center">
                     <h4 class="card-title" style={{color:'black'}}> #1</h4>
                     <p class="text-muted"> FirstName: Sarah </p>
                     <p class="text-muted"> LastName: Gargouri</p>
                     <p class="text-muted"> Company Name: Tec-Dev</p>
                     <p class="text-muted"> Company Nationality: Tunisia</p>
                     <p class="text-muted"> Company City: Sfax</p> 
                     <p class="text-muted"> Company Address: Route Lafrane 5.5km</p>
                     
                     <div class="container">
  <div class="row">
    <div class="col-md">
    <DropdownButton id="dropdown-basic-button" title="Numbers List"style={{margin:"10px"}} >
    <Dropdown.Item >56705203</Dropdown.Item>
  <Dropdown.Item >200408188</Dropdown.Item>
  <Dropdown.Item >97705230</Dropdown.Item>
</DropdownButton>
      
    </div>
    <div class="col-md">
     
       
<DropdownButton id="dropdown-basic-button" title="E-mails List" style={{margin:"10px"}}>
  <Dropdown.Item >Ahmed@gmail.com</Dropdown.Item>
  <Dropdown.Item >Melek@Yahoo.fr</Dropdown.Item>
  <Dropdown.Item >gb@Outlock.com</Dropdown.Item>
</DropdownButton>
    </div>
    
  </div>
</div>

                     <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Contracts</a>


                       <Form>
                      <Form.Check 
                    type="switch"
                    id="custom-switch"
                      
                                      />
  
                              </Form>




                   </div>
                 </div>
               </div>
               <div class="col-md-4 col-sm-6">
                 <div class="card mb-30"><a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img"><img src={require('./images/Delice_Logo.jpg')} alt="Category"/></div>
                       <div class="thumblist"><img src={require('./images/Client_Default_Picture.png')} alt="Category"/><img src={require('./images/Tunisia_Flag.png')} alt="Category"/></div>
                     </div></a>
                   <div class="card-body text-center">
                     <h4 class="card-title" style={{color:'black'}}> #2</h4>
                     <p class="text-muted"> FirstName: Sarah </p>
                     <p class="text-muted"> LastName: Gargouri</p>
                     <p class="text-muted"> Company Name: EXIST</p>
                     <p class="text-muted"> Company Nationality: Tunisia</p>
                     <p class="text-muted"> Company City: Sfax</p> 
                     <p class="text-muted"> Company Address: Route Lafrane 5.5km</p>
                     
                     <div class="container">
  <div class="row">
    <div class="col-md">
    <DropdownButton id="dropdown-basic-button" title="Numbers List"style={{margin:"10px"}} >
    <Dropdown.Item >56705203</Dropdown.Item>
  <Dropdown.Item >200408188</Dropdown.Item>
  <Dropdown.Item >97705230</Dropdown.Item>
</DropdownButton>
      
    </div>
    <div class="col-md">
     
       
<DropdownButton id="dropdown-basic-button" title="E-mails List" style={{margin:"10px"}}>
  <Dropdown.Item >Ahmed@gmail.com</Dropdown.Item>
  <Dropdown.Item >Melek@Yahoo.fr</Dropdown.Item>
  <Dropdown.Item >gb@Outlock.com</Dropdown.Item>
</DropdownButton>
    </div>
    
  </div>
</div>

                     <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Contracts</a>


                       <Form>
                      <Form.Check 
                    type="switch"
                    id="custom-switch"
                      
                                      />
  
                              </Form>




                   </div>
                 </div>
               </div>


               <div class="col-md-4 col-sm-6">
                 <div class="card mb-30"><a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img"><img src={require('./images/Delice_Logo.jpg')} alt="Category"/></div>
                       <div class="thumblist"><img src={require('./images/Client_Default_Picture.png')} alt="Category"/><img src={require('./images/Tunisia_Flag.png')} alt="Category"/></div>
                     </div></a>
                   <div class="card-body text-center">
                     <h4 class="card-title" style={{color:'black'}}> #2</h4>
                     <p class="text-muted"> FirstName: Sarah </p>
                     <p class="text-muted"> LastName: Gargouri</p>
                     <p class="text-muted"> Company Name: EXIST</p>
                     <p class="text-muted"> Company Nationality: Tunisia</p>
                     <p class="text-muted"> Company City: Sfax</p> 
                     <p class="text-muted"> Company Address: Route Lafrane 5.5km</p>
                     
                     <div class="container">
  <div class="row">
    <div class="col-md">
    <DropdownButton id="dropdown-basic-button" title="Numbers List"style={{margin:"10px"}} >
    <Dropdown.Item >56705203</Dropdown.Item>
  <Dropdown.Item >200408188</Dropdown.Item>
  <Dropdown.Item >97705230</Dropdown.Item>
</DropdownButton>
      
    </div>
    <div class="col-md">
     
       
<DropdownButton id="dropdown-basic-button" title="E-mails List" style={{margin:"10px"}}>
  <Dropdown.Item >Ahmed@gmail.com</Dropdown.Item>
  <Dropdown.Item >Melek@Yahoo.fr</Dropdown.Item>
  <Dropdown.Item >gb@Outlock.com</Dropdown.Item>
</DropdownButton>
    </div>
    
  </div>
</div>

                     <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Contracts</a>


                       <Form>
                      <Form.Check 
                    type="switch"
                    id="custom-switch"
                     
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
 
export default ManageClients;
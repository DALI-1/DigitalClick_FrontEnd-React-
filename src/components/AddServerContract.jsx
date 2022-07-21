import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UploadDragDrop from './UploadDragDrop';
import Image from 'react-bootstrap/Image'
import Cookies from 'universal-cookie';
import LoadingSpinner from './LoadingSpinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class addContract extends Component {
  state = { modalShow:false,Servers:[],Partitions:[],isLoading: true,ServerIDDefault:[],PartitionID:[],Clients:[],ClientID:""} 

  constructor()
  {
       super()
  }



  handlesubmit=(props)=>
  {
    props.preventDefault();
    let PropsString=""
    let i=0
    let url="http://127.0.0.1:8000/api/createServer_Contract"
    for(i=0;i<6;i++)
    {
     if(i==0)
     {
       PropsString='?'+props.target[i].name+'='+this.state.ServerIDDefault
     }
     else
     {
      
       if(props.target[i].name=="Client_ID")
      {
        
        PropsString=PropsString+"&"+props.target[i].name+"="+this.state.ClientID
      }
      else
      {
        PropsString=PropsString+"&"+props.target[i].name+"="+props.target[i].value
      }
       
     }
     
    }
   
    this.CallServerListAPI(url+PropsString)


  }

  
 CallServerListAPI = async (url) => {
  try {
    const response = await fetch(url,{
      method: "GET",
      headers: {
        "access-control-allow-origin" : "*",
        "Content-type": "application/json; charset=UTF-8"
      }});
    const json = await response.json();
    
    return(json)
  } catch (error) {
    console.log("error", error);
    return("Error:Yes");
  }
};
onChangeHandler = (e) => {
  const index = e.target.selectedIndex;   
    const el = e.target.childNodes[index]     
    const option =  el.getAttribute('id');
  let Json=[];
    this.state.ServerIDDefault=option;  
    let url2 ="http://localhost:8000/api/GetServerPartitions?ServerID="+option
    Json= this.CallServerListAPI(url2)   
   Json.then((result)=>{
      let Partitions_List=[]   
     result.map((server,index)=>{
      Partitions_List.push(server) 
     }
     )     
     this.setState({Partitions:Partitions_List}) 
    }
    );
   
}



onChangeHandler2 = (e) => {
  const index = e.target.selectedIndex;   
    const el = e.target.childNodes[index]     
    const option =  el.getAttribute('id');
 this.setState({PartitionID:option},()=>
 {
  
 })
   
}


onChangeHandler3 = (e) => {
  const index = e.target.selectedIndex;   
    const el = e.target.childNodes[index]     
    const option =  el.getAttribute('id');
    this.state.ClientID=option;   
}
CheckIdentification= ()=>
{
var CryptoJS = require("crypto-js");
const cookies = new Cookies();
let Username=cookies.get("Username")
  let Password_ciphered=cookies.get("Password")
   if(Username || Password)
   {
    var bytes = CryptoJS.AES.decrypt(Password_ciphered, 'DigitalClick');
    var Password = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const url = "http://localhost:8000/api/SignIn?Username="+Username+"&Password="+Password
    const CallSignInAPI = async (url) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        
        return(json)
      } catch (error) {
        console.log("error", error);
        return("Error:Yes");
      }
    };
  let Json=CallSignInAPI(url)
  let LoggedIn=0
  Json.then((result)=>{
    for( var property in result)
    {
      if(property==="UserValidated" && result[property]==="Yes")
      {

                  LoggedIn=1;  
      }
    }
    if(LoggedIn===0)
    {
      window.location.replace('/SignIn')
     
    }
    

   }
   );
 
   }
   else
   {
    window.location.replace('/SignIn')
    
   } 
}
TurnoffLoadingScreen=()=>{
setTimeout(function () {
}, 1000);

this.setState({isLoading: false})
}
componentDidMount(){
this.CheckIdentification(); 
const cookies = new Cookies();
var CryptoJS = require("crypto-js");
let Username=cookies.get("Username")
let Password_ciphered=cookies.get("Password")
var bytes = CryptoJS.AES.decrypt(Password_ciphered, 'DigitalClick');
  var Password = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
let url ="http://localhost:8000/api/GetAllServers?Username="+Username+"&Password="+Password
let Json= this.CallServerListAPI(url)
let ServerDefault=[]
Json.then((result)=>{
 let Server_List=[]

result.map((server,index)=>{
if(index==0)
{

ServerDefault=server.Server_ID
}
  Server_List.push(server) 
}
)

this.setState({Servers:Server_List,ServerIDDefault:ServerDefault}, () => {
  this.TurnoffLoadingScreen();
  let url2 ="http://localhost:8000/api/GetServerPartitions?ServerID="+this.state.ServerIDDefault
   Json= this.CallServerListAPI(url2)   
  Json.then((result)=>{
     let Partitions_List=[]   
    result.map((server,index)=>{

      if(index==0)
      {
       
        this.setState({PartitionID:server.ServerVMPartition_ID})
      }
     Partitions_List.push(server) 
    }
    )     
    this.setState({Partitions:Partitions_List}) 
   }
   );
}) 
}
);
let url3 ="http://localhost:8000/api/GetAllClients"
Json= this.CallServerListAPI(url3)   
Json.then((result)=>{
 let Clients_List=[]   
result.map((server,index)=>{

  if(index==0)
  {
   
    this.setState({ClientID:server.Client_ID})
  }
 Clients_List.push(server) 
}
)     
this.setState({Clients:Clients_List}) 
}
);





}
  render() { 

    if(this.state.isLoading)
    {
      return (
        <div class="d-flex justify-content-center" style={{margin:"10px"}}>
        <LoadingSpinner id="Spinner"/>         
    </div>
      )
     
    }
    else
    {
      return (
        <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
              <div class="shadow  p-1  mb-1  bg-light rounded">
              <div class="d-flex justify-content-center mb-4">
              <Image roundedCircle={true} style={{width: '150px',height:'150px'}} src={require('./images/Contract_Logo.gif')}/>
              
              </div>
              </div>
              
              
<Form onSubmit={this.handlesubmit}>



<Container fluid style={{marginTop:"30px"}}>
    <Row>
      <Col><Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label
      style={{color: 'black'}}
      > Server name:</Form.Label>
      <Form.Select required onChange={this.onChangeHandler} name="Server_ID">
        {
          this.state.Servers.map((Server)=>{
            return(
<option id={Server.Server_ID}>{Server.Server_Name}</option>
            )
            
          })
        }      
      </Form.Select> 
      <Form.Text className="text-muted">      
      </Form.Text>
    </Form.Group></Col>

  
    </Row>
    <Row>
      <Col><Form.Group className="mb-3" controlId="formBasicEmail" name="Client_ID">
      <Form.Label
      style={{color: 'black'}}
      >Client:</Form.Label>
      <Form.Select required name="Client_ID" onChange={this.onChangeHandler3}>
      {
          this.state.Clients.map((Client)=>{
            return(
<option id={Client.Client_ID}>{Client.First_Name+' '+Client.Last_Name}</option>
            )
            
          })
        }
      </Form.Select>
     
      <Form.Text className="text-muted">
        
      </Form.Text>
    </Form.Group></Col>
      
    </Row>
    <Row>
      <Col> <Form.Group className="mb-3" controlId="formBasicEmail" name="Payment_Type">
      <Form.Label
      style={{color: 'black'}}
      >Payment Type: </Form.Label>
      <Form.Select required name="Payment_Type">
        <option>Monthly</option>
        <option>Yearly</option>  
      </Form.Select>
     
      <Form.Text className="text-muted">
        
      </Form.Text>
    </Form.Group></Col>
      <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label
      style={{color: 'black'}}
      >Set SSL Ending Date</Form.Label>
      <Form.Control    type="Date" name="SSL_Ending_Date"   />
      <Form.Text className="text-muted">
        
      </Form.Text>
    </Form.Group></Col>
    </Row>
    <Row>
      <Col><Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label
      style={{color: 'black'}}
      >Price</Form.Label>
      <Form.Control required  type="number" min="0.00" max="10000.00" step="0.01" placeholder="Enter the price" name="Rent_price"/>
      <Form.Text className="text-muted">
        
      </Form.Text>
    </Form.Group></Col>
      <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label
      style={{color: 'black'}}
      >Access Status Temppass</Form.Label>
      <Form.Control   type="text"  placeholder="Enter Access Status Temppass" name="Access_status_Temppass" />
      <Form.Text className="text-muted">       
      </Form.Text>
    </Form.Group></Col>
    </Row>
    <Row><button type="submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Create Partition Contract</button></Row>
  </Container>
</Form> 
  </div>
</div>
      );
    }
  } 
}
 
export default addContract;
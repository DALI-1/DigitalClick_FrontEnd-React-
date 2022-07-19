import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LoadingSpinner from './LoadingSpinner';
import Col from 'react-bootstrap/Col';
import Cities from './tn.json';
class AddServer extends Component {
  state = { OSs:null, isLoading:true,countries:null,ServiceProviders:null }
  
  

  constructor()
  {
    super()
    this.SelectedOSID=1
    this.ServiceProviderID=1
    this.Cities=Cities  
  }
  onChangeHandler = (e) => {
    const index = e.target.selectedIndex;   
      const el = e.target.childNodes[index]     
      const option =  el.getAttribute('id');
      this.SelectedOSID=option;  
     
  }
  onChangeHandler2 = (e) => {
    const index = e.target.selectedIndex;   
      const el = e.target.childNodes[index]     
      const option =  el.getAttribute('id');
      this.ServiceProviderID=option;  
   
  }
  handlesubmit=(props)=>
  {
    props.preventDefault();
    let PropsString=""
    let i=0
    let url="http://127.0.0.1:8000/api/AddServer"
    for(i=0;i<16;i++)
    {
     if(i==0)
     {
       PropsString='?'+props.target[i].name+'='+props.target[i].value
     }
     else
     {
      if(props.target[i].name=="Server_OperatingSystem_ID")
      {
        
        PropsString=PropsString+"&"+props.target[i].name+"="+this.SelectedOSID
        
      }
      else if(props.target[i].name=="Service_Provider_ID")
      {
        
        PropsString=PropsString+"&"+props.target[i].name+"="+this.ServiceProviderID
      }
      else
      {
        PropsString=PropsString+"&"+props.target[i].name+"="+props.target[i].value
      }
       
     }
     
    }
    PropsString=PropsString+"&Backup=Disabled"
    this.SERVERAPICALL(url+PropsString)


  }
  SERVERAPICALL = async (url) => {
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

  TurnoffLoadingScreen=()=>{

    this.setState({isLoading: false})
  }

componentDidMount =()=>
{
let Json=null 
let url="http://127.0.0.1:8000/api/GetAllOSs"
let url2="https://restcountries.com/v3.1/all"
let url3="http://127.0.0.1:8000/api/GetAllServiceProviders"
Json=this.SERVERAPICALL(url)
Json.then((result)=>{
let OSs_List=[]
result.map((server)=>{
OSs_List.push(server) 
}
)

this.setState({OSs:OSs_List})
}
);

Json=this.SERVERAPICALL(url3)
Json.then((result)=>{
let ServiceProviders_List=[]
result.map((server)=>{
ServiceProviders_List.push(server) 
}
)

this.setState({ServiceProviders:ServiceProviders_List})
}
);

Json=this.SERVERAPICALL(url2)
Json.then((result)=>{
let Countries_List=[]
result.map((Country)=>{
Countries_List.push(Country) 
}
)

this.setState({countries:Countries_List}, () => {
this.TurnoffLoadingScreen();
})

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
                <Image  style={{width: '150px',height:'150px'}} src={require('./images/Server_Logo.gif')}/>
                
                </div>
                </div>
                <MDBContainer style={{marginTop:"30px"}}>
                  

<Form onSubmit={this.handlesubmit}>
<Container>
      <Row>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Server name:</Form.Label>
        <Form.Control required type="text" placeholder="Enter Server name"
        name="Server_Name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col>  <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Server IP Adress:</Form.Label>
        <Form.Control required type="text" minlength="7" maxlength="15" size="15" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" placeholder="Enter Server IP " 
        name="Server_IP_Adress" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Server MAC Adress:</Form.Label>
        <Form.Control required type="text"  pattern="^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$" placeholder="Enter Server MAC address " 
        name="Server_MAC_Adress"/>
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Server Country:</Form.Label>
        <Form.Select required
        name="Server_Country"
        >
        {
        this.state.countries.map((Country)=>{
          
          return(
            <option>{Country.name.common } </option>
          )
        })
       } 
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
      </Row>
      <Row>
        <Col>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Server City:</Form.Label>
        <Form.Control required type="text" placeholder="Enter Server name"
        name="Server_Location" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Operating System:</Form.Label>
        <Form.Select required
        name="Server_OperatingSystem_ID"  onChange={this.onChangeHandler}>
          
        {
        this.state.OSs.map((OS)=>{
          
          return(
            <option id={OS.OperatingSystem_ID}>{OS.OperatingSystem_Company_Name +" "+OS.OperatingSystem_Name } </option>
          )
        })
       } 
       
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Number of Sockets:</Form.Label>
        <Form.Control type="number"  placeholder="Enter Number of Sockets "
        name="Nb_Sockets" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Number of Virtual Cores </Form.Label>
        <Form.Control type="number"  placeholder="Enter Number of VCores per CPU "
        name="Nb_Cores" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
      </Row>

      <Row>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >BIOS : </Form.Label>
        <Form.Control type="text"  placeholder="Enter BIOS  " 
        name="BIOS" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >RAM:</Form.Label>
        <Form.Control type="number"  placeholder="Enter RAM size"
        name="RAM" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Server Type:</Form.Label>
        <Form.Select required
        name="Server_Type">
          <option>Real Machine</option>
          <option>Virtual Machine</option>
        </Form.Select>
        
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Service Provider:</Form.Label>
        <Form.Select required
        name="Service_Provider_ID" onChange={this.onChangeHandler2}>
        {
        this.state.ServiceProviders.map((SV)=>{
          
          return(
            <option id={SV.Service_Provider_ID}>{SV.service_Provider_Company_Name} </option>
          )
        })
       } 
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
      </Row>
      <Row>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Bought Date: </Form.Label>
        <Form.Control type="date" 
        name="Bought_Date" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Payment Type:</Form.Label>
        <Form.Select required name="PaymentType">
          <option>Per Month</option>
          <option>Per Semester</option>
          <option>Per Year</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Next Facturation Date : </Form.Label>
        <Form.Control type="date" name="NextFacturationDate" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        
      </Row>
      <Row>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Description:</Form.Label>
        <Form.Control type="text"  placeholder="Enter Server description " name="Description" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </Row>
  
    </Container>
     

      <div class="row justify-content-center">
      <button type="Submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Add Server</button>
</div>
      
    </Form>
    </MDBContainer>




    </div>

     </div>   

        );
      }
    }
}
 
export default AddServer;
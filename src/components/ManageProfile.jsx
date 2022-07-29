import React,{Component,useState} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Edit';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from './LoadingSpinner';
import './ManageProfile.css'
import UploadDragDrop from './UploadDragDrop';
import Cookies from 'universal-cookie';
class ManageProfile extends Component {
    state = {Profile:[],isLoading: true,PFP:"",Status:false,PFPLocal:"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"  } 
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


      handlesubmit=(props)=>
    {
      props.preventDefault();
      this.setState({Status:true})
      let i=0
      
    let url="http://127.0.0.1:8000/api/EditUser"
    let PropsString=""

    for(i=0;i<8;i++)
    {
     if(i==0 &&props.target[i].value!="")
     {
       PropsString='?'+props.target[i].name+'='+props.target[i].value
     }
     else if(props.target[i].value!="")
     {    
          if(props.target[i].name=="PFP_URL")  
          {
              
          } 
          
          else
          {
            PropsString=PropsString+"&"+props.target[i].name+"="+props.target[i].value 
          }    
        
     }
     
    }

   const formData = new FormData();
   formData.append('UserPFP', this.state.PFP);

   const optionADDCLIENT = {
        
    method: 'POST',
    body: formData,
    // If you add this, upload won't work
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // }
  };

  console.log(url+PropsString)
   //fetch(url+PropsString,optionADDCLIENT );  
   
   //setTimeout(() => {window.location.replace('/ManageClients')}, 2000);
      
    }



      componentDidMount(){
        
        const cookies = new Cookies();
        
        let Username=cookies.get("Username")
       
        let url ="http://localhost:8000/api/GetUserbyusername?Username="+Username
      let Json= this.CallServerListAPI(url)
       
      Json.then((result)=>{
         let Profile_List=[]
        
        result.map((Profile1)=>{
            Profile_List.push(Profile1) 
        }
        )
        
        this.setState({Profile:Profile_List}, () => {
          this.TurnoffLoadingScreen();
      })
        
       }
       );
      
    }

    TurnoffLoadingScreen=()=>{
        setTimeout(function () {
      }, 1000);
        this.setState({isLoading: false})
      }

      handleUpload = (e) =>{


        let Data=e.target.files[0]
        this.setState({PFP:Data})
        this.setState({PFPLocal:URL.createObjectURL(e.target.files[0])})

        
       
       
      }
    render() { 
              
        if(this.state.isLoading)
        {
          return (
            <div className="d-flex justify-content-center" style={{margin:"10px"}}>
            <LoadingSpinner id="Spinner"/>         
        </div>
          )
        }
        else
        {
        return (
            <div class="container rounded bg-white mt-5 mb-5 shadow-lg" >
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="200px" src={this.state.PFPLocal}/><span class="font-weight-bold">{this.state.Profile[0].Username}</span><span class="text-black-50"> </span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
            <form onSubmit={this.handlesubmit}>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                    
                </div>
                <div class="row mt-6">
                <div class="col-md-6"><label class="labels">UserName</label><input required type="text" class="form-control" placeholder="first name" name='Username' defaultValue={this.state.Profile[0].Username}/></div>
                    <div class="col-md-6"><label class="labels">First Name</label><input required type="text" class="form-control" placeholder="first name" name='First_Name' defaultValue={this.state.Profile[0].First_Name} /></div>
                    <div class="col-md-6"><label class="labels">Last Name</label><input required type="text" class="form-control"  placeholder="surname" name='Last_Name'defaultValue={this.state.Profile[0].Last_Name} /></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Role</label><input required type="text" class="form-control" placeholder="Role" name='Role' value={(this.state.Profile[0].Role=="Normal_User")? "User":"Admin"} /></div>
                    <div class="col-md-12"><label class="labels">Poste</label><input required type="text" class="form-control" placeholder="Poste" name='Poste' defaultValue={this.state.Profile[0].Poste} /></div>
                   
                </div>
                <div class="row mt-3">
                <div class="col-md-12"><label class="labels"> Profile Picture </label><input  type="file" class="form-control" name='PFP_URL' onChange={this.handleUpload}  /></div>
                    <div class="col-md-12"><label class="labels">Current Password</label><input required type="password" name='Password' class="form-control"   /></div>
                    <div class="col-md-12"><label class="labels">New Password</label><input  type="password" class="form-control" name='NewPassword' /></div>
                </div>

                <div class="mt-5 text-center"><input type="submit" class="btn btn-primary profile-button" placeholder="Poste" /></div>

                </form>
            </div>
            
        </div>
        
    </div>
</div>







        );
        }
    }
}
 
export default ManageProfile;
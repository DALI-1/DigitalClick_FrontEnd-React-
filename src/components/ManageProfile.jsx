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
import './ManageProfile.css'
import UploadDragDrop from './UploadDragDrop';

class ManageProfile extends Component {
    state = {  } 
    render() { 
        return (



            <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span class="font-weight-bold">Dali</span><span class="text-black-50">123@gmail.com</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
            <form action='/' method='POST'>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                    
                </div>
                <div class="row mt-2">
                

                
                <div class="col-md-6"><label class="labels">UserName</label><input required type="text" class="form-control" placeholder="first name" /></div>
                    <div class="col-md-6"><label class="labels">First Name</label><input required type="text" class="form-control" placeholder="first name" /></div>
                    <div class="col-md-6"><label class="labels">Last Name</label><input required type="text" class="form-control"  placeholder="surname"/></div>
                </div>
                <div class="row mt-3">
                    
                    <div class="col-md-12"><label class="labels">Mobile Number</label><input required type="number" class="form-control" placeholder="enter phone number"  /></div>
                    <div class="col-md-12"><label class="labels">E-Mail Address</label><input required  type="text" class="form-control" placeholder="enter address line 1" /></div>
    
                    <div class="col-md-12"><label class="labels">Role</label><input required type="text" class="form-control" placeholder="Role" /></div>
                    <div class="col-md-12"><label class="labels">Poste</label><input required type="text" class="form-control" placeholder="Poste" /></div>
                   
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><label class="labels"> Upload New Profile Picture:</label><UploadDragDrop/></div>
                   
                </div>

                
                <div class="row mt-3">
                    <div class="col-md-6"><label class="labels">Country</label><input required type="text" class="form-control" placeholder="country" /></div>
                    <div class="col-md-6"><label class="labels">City</label><input required type="text" class="form-control"  placeholder="City"/></div>
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
 
export default ManageProfile;
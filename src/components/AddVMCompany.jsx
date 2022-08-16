import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Modal from 'react-bootstrap/Modal';
import NavBar from "./Navbar"
class AddVirtualMachine extends Component {
  state = { Status: false }


  SERVERAPICALL = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const json = await response.json();

      return (json)
    } catch (error) {
      console.log("error", error);
      return ("Error:Yes");
    }
  };

  handlesubmit = (props) => {
    this.setState({ Status: true })
    props.preventDefault();
    let PropsString = ""
    let i = 0
    let url = "http://127.0.0.1:8000/api/CreateVMProvider"
    for (i = 0; i < 1; i++) {
      if (i == 0) {
        PropsString = '?' + props.target[i].name + '=' + props.target[i].value
      }
      else {
        PropsString = PropsString + "&" + props.target[i].name + "=" + props.target[i].value
      }


    }

    this.SERVERAPICALL(url + PropsString)
  }
  render() {
    return (
      <>
      <NavBar/>
      
      <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
        <div class="shadow  p-1  mb-1  bg-light rounded">
          <div class="d-flex justify-content-center mb-4">
            <img src={require('./images/Virtual_Machine_Default_icon.png')} alt="Category" />
          </div>
        </div>



        <MDBContainer style={{ marginTop: "30px" }}>

          <Form onSubmit={this.handlesubmit}>


            <Form.Group className="mb-3" >
              <Form.Label
                style={{ color: 'black' }}
              >Nom du Fournisseur de système d'exploitation du Virtual Machine:</Form.Label>
              <Form.Control type="text" placeholder=""
                name="VMProvider_Company_Name" />
              <Form.Text className="text-muted">

              </Form.Text>
            </Form.Group>




            <div class="row justify-content-center">
              <button type="submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Ajouter Fournisseur de système d'exploitation du Virtual Machine</button>
            </div>

          </Form>
          <Modal
            size="lg"
            show={this.state.Status}
            onHide={() => { this.setState({ Status: false }) }}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">

                Fournisseur de système d'exploitation du Virtual Machine
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Fournisseur de système d'exploitation du Virtual Machine ajouté!</Modal.Body>
          </Modal>
        </MDBContainer>




      </div>


      
          </>
    );
  }
}

export default AddVirtualMachine;
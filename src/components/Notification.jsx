import React,{Component} from 'react';

import { FaRegBell } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Toast from 'react-bootstrap/Toast';
class Notification extends Component {
    state = {  } 
    render() { 
        return (

                <reactElement>
                     
            <NavDropdown title="Notifications" id="navbarScrollingDropdown">
               
            <NavDropdown.Item href="#action3">
            <Toast>
  <Toast.Header>
    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
    <strong className="me-auto">Notification 1</strong>
    <small>11 mins ago</small>
  </Toast.Header>
  <Toast.Body>Hello EXIST's contract fades away in 20min</Toast.Body>
</Toast>



            </NavDropdown.Item>
            <NavDropdown.Item href="#action4">
            <Toast>
  <Toast.Header>
    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
    <strong className="me-auto">Notification 2</strong>
    <small>11 mins ago</small>
  </Toast.Header>
  <Toast.Body>Hello EXIST's contract fades away in 20min</Toast.Body>
</Toast>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            
          </NavDropdown>
          </reactElement>


        );
    }
}
 
export default Notification;
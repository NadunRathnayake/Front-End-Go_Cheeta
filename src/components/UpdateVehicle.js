import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "../Services/axio";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Card } from 'react-bootstrap'
import Header from './Header';
import Slider from './NavBar';
import Footer from './Footer';
import '../css/userEdit.css'
import { BsPersonLinesFill } from "react-icons/bs";
import LogoutModel from './LogoutModel';

function UpdateVehicle() {
  const [data, setdata] = useState({});
  const [role, setRole] = useState([]);
  const params = useParams();

  const [showLogout, setShowLogout] = useState(false);

  const [v_no, setv_no] = useState('');
  const [vmodel, setvmodel] = useState('');
  const [vcat, setvcat] = useState('');
  const [code, setcode] = useState('');
  const [d_id, setd_id] = useState(''); 

   
  const reqBody = {
    id: params.id
  };


  React.useEffect(() => {

      axios.get('/search/vehicle/' + params.id)
      .then(res => {

          console.log(res.data.data);
          setdata(res.data.data)

          console.log("users");
          console.log(data);


      })
      .catch((error) => {
      })

  }, []);



  const handleValidation = (event) => {
    let formIsValid = false;

    

    
    return formIsValid;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    

      const userObject = {
        vehicle_no: v_no !== "" ? v_no : data.vehicle_no,
        vehicle_model: vmodel !== "" ? vmodel : data.vehicle_model,
        vehicle_category: vcat !== "" ? vcat : data.vehicle_category,
        branch_code: code !== "" ? code : data.branch_code,
        driver_id: d_id !== "" ? d_id : data.driver_id,
         
      };

      console.log("obj");
      console.log(userObject);


      axios.put('/update/Vehicle', userObject)
        .then((res) => {
          if (res.data.status === true) {
            toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })

            // history('/view-drivers')

          } else {

            toast.warn(res.data.message, { position: toast.POSITION.TOP_RIGHT })
          }

        }).catch((error) => {
          if (error.response.data.error) {

            if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {

              setShowLogout(true);
            }

          }
        })

    

  }

  return (
    <>
      <Header />
      <Row className="">
        <Slider />
        <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left  p-5">
          <h3 className="dashboard">Update Vehicle</h3>
          <hr></hr>

          <Card className=" p-5 mt-2 ml-2">
            <Card.Body>
              <Form>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Vehicle Number ID<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setv_no(e.target.value)} type="text" defaultValue={data.vehicle_no} placeholder="Enter Vehicle Number" readOnly />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                      <Form.Label >Vehicle Model <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setvmodel(e.target.value)} defaultValue={data.vehicle_model} type="text" placeholder="Enter Vehicle Model" />
                    </Form.Group>
                  </div>
                </div>


                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicLastName" className="">
                      <Form.Label>Vehicle Category <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setvcat(e.target.value)} type="text" defaultValue={data.vehicle_category} placeholder="Enter The Category" />
                    </Form.Group>
                   </div>

                   <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicLastName" className="">
                      <Form.Label>Branch Code <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setcode(e.target.value)} type="text" defaultValue={data.branch_code} placeholder="Enter Branch Code" />
                    </Form.Group>
                   </div>
                </div>


                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicLastName" className="">
                      <Form.Label>Driver ID <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setd_id(e.target.value)} type="text" defaultValue={data.driver_id} placeholder="Enter The Driver ID" />
                    </Form.Group>
                   </div>
                </div>




                <Col className="text-end mt-5">
                  <Link className="edit-link" path="/edit-vehicle"
                    to="/edit-vehicle">
                    <Button className="editBtn" variant="info" >Back</Button>
                  </Link>{' '}
                  <Link className="edit-link" path="/view-vehicle"
                    to="/view-vehicle">
                    <Button className="editBtn" variant="danger" type='clear'> View List</Button>
                  </Link>{' '}
                  <Button onClick={e => handelSubmit(e)} variant="success btn-block" type="submit" className="">
                    Update
                  </Button>
                </Col>
              </Form>

              <ToastContainer />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />

      <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
    </>
  )
}

export default UpdateVehicle
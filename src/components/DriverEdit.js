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

function DriverEdit() {
  const [data, setdata] = useState({});
  const [role, setRole] = useState([]);
  const [passError, setPassError] = useState("");
  const params = useParams();
  const [emailError, setemailError] = useState("");
  const [oldpasswordError, setOldpasswordError] = useState("");
  const [oldPassStatus, setOldPasswordStatus] = useState(false);

  const [showLogout, setShowLogout] = useState(false);
  const [user_id, setuser_id] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [contact, setcontact] = useState('');
  const [code, setcode] = useState('');
  const [vehicle, setvehicle] = useState('');
  const [pass, setpassword] = useState('');
  const [conPass, setConPassword] = useState('');
  const [oldPass, setOldPassword] = useState('');
  const [userRole, setSelectrole] = useState('');

  const reqBody = {
    id: params.id
  };

  let [branch, setbranch] = useState([]);

    React.useEffect(() => {
        axios.get('/view/branch-list')
            .then(res => {

                console.log("res");
                console.log(res.data.data);
                setbranch(res.data.data);
            })
            .catch((error) => {
            })
    }, []);




  let [vehicles, setvehicles] = useState([]);

  React.useEffect(() => {
      axios.get('/view/vehicle-list')
          .then(res => {

              console.log("res");
              console.log(res.data.data);
              setvehicles(res.data.data);
          })
          .catch((error) => {
          })
  }, []);

  React.useEffect(() => {

      axios.get('/search/driver/' + params.id)
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

    if (pass !== "") {

      if (!pass.match(/^[a-zA-Z0-9@#$]{6,12}$/)) {
        setPassError("New Password  length must best min 6 Chracters and Max 12 Chracters");
        formIsValid = false;
      } else {

        if (pass === conPass) {
          setPassError("");
          formIsValid = true;
          
        } else {
          setPassError("Passwords do not match!");
          formIsValid = false;
        }

      }

    } else {
      formIsValid = true;

    }

    return formIsValid;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (handleValidation() === true) {

      const userObject = {
          f_name: fname !== "" ? fname : data.f_name,
          l_name: lname !== "" ? lname : data.l_name,
          driver_id: user_id !== "" ? user_id : data.driver_id,
          branch_code: code !== "" ? code : data.branch_code,
          vehicle_no: vehicle !== "" ? vehicle : data.vehicle_no,
          phone_no: contact !== "" ? contact : data.phone_no,
          password: pass !== "" ? pass : "",
        
      };

      console.log("obj");
      console.log(userObject);


      axios.put('/update/driver', userObject)
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

    } else {
      //toast.warn('not valid', { position: toast.POSITION.TOP_RIGHT })
    }

  }

  return (
    <>
      <Header />
      <Row className="">
        <Slider />
        <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left  p-5">
          <h3 className="dashboard">Update Drivers</h3>
          <hr></hr>

          <Card className=" p-5 mt-2 ml-2">
            <Card.Body>
              <Form>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Driver ID<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setuser_id(e.target.value)} type="text" defaultValue={data.driver_id} placeholder="Driver ID" readOnly />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                      <Form.Label >First Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setfname(e.target.value)} defaultValue={data.f_name} type="text" placeholder="Enter first name" readOnly/>
                    </Form.Group>
                  </div>
                </div>

                <div className='row'>

                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicLastName" className="">
                      <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setlname(e.target.value)} type="text" defaultValue={data.l_name} placeholder="Enter last name"  readOnly/>
                    </Form.Group>
                   </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicNumber" className="mt-3">
                      <Form.Label>Contact Number <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setcontact(e.target.value)} defaultValue={data.phone_no} type="text" placeholder="enter Contact Number" />
                    </Form.Group>
                  </div>
                </div>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Branch Code<span className="text-danger">*</span></Form.Label>
                      <select className='form-control' defaultValue={data.branch_code} onClick={e => setcode(e.target.value)}>
                        {branch.map((option) => (
                          <option value={option.branch_name} defaultValue={data.branch_code} >{option.branch_code}</option>
                        ))}
                      </select>
                    </Form.Group>
                  </div>


                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Vehicle Number<span className="text-danger">*</span></Form.Label>
                      <select className='form-control' defaultValue={data.vehicle_no} onClick={e => setvehicle(e.target.value)}>
                        {vehicles.map((option) => (
                          <option value={option.vehicle_no} defaultValue={data.vehicle_no} >{option.vehicle_no}</option>
                        ))}
                      </select>
                    </Form.Group>
                  </div> 
                </div>

                <div className='pwSection'>

                  <h5>Password</h5>
                  <hr></hr>
                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control onChange={e => setpassword(e.target.value)} type="password" placeholder="New Password" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange={e => setConPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                  </Form.Group>
                  <small id="emailHelp" className="text-danger form-text">
                    {passError}
                  </small>

                </div>

                <Col className="text-end mt-5">
                  <Link className="edit-link" path="/show-all-users"
                    to="/show-all-users">
                    <Button className="editBtn" variant="info" >Back</Button>
                  </Link>{' '}
                  <Link className="edit-link" path="/show-all-users"
                    to="/show-all-users">
                    <Button className="editBtn" variant="danger"> Cancel</Button>
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

export default DriverEdit


import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../Services/axio";
import { Container, Row, Col, Card } from 'react-bootstrap'

import Header from './Header';
import Slider from './NavBar';
import Footer from './Footer';
import LogoutModel from './LogoutModel';
import { BsPersonFill, BsPersonPlusFill, BsPersonLinesFill, BsTextRight, BsPauseFill } from "react-icons/bs";
import '../css/addUser.css'
import Logout from './Logout';

function Register() {

    const [passError, setpassError] = useState("");
    const [logError, setlogError] = useState("");
    const [fnameError, setfnameError] = useState('');
    const [lnameError, setlnameError] = useState('');
    const [user_idError, setuser_idError] = useState('');
    const [contactError, setcontactError] = useState('');
    const [codeError, setcodeError] = useState('');
    const [vehicleError, setvehicleError] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(0);
    const [showLogout, setShowLogout] = useState(false);

    const [user_id, setuser_id] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [contact, setcontact] = useState('');
    const [code, setcode] = useState('');
    const [vehicle, setvehicle] = useState(''); 
    const [pass, setpass] = useState('');
    const [conPass, setConPassword] = useState('');

    let [vehicles, setvehicles] = useState([]);
    let [branch, setbranch] = useState([]);

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
        axios.get('/view/branch-list')
            .then(res => {

                console.log("res");
                console.log(res.data.data);
                setbranch(res.data.data);
            })
            .catch((error) => {
            })
    }, []);


    let history = useNavigate();

    const handleValidation = (event) => {
        let formIsValid1 = true;
        let formIsValid2 = true;
        let formIsValid3 = true;
        let formIsValid4 = true;
        let formIsValid5 = true;
        let formIsValid6 = true;
        let formIsValid7 = true;

        if (user_id === "") {
            setuser_idError("Please Enter Driver's ID");
            formIsValid3 = false;
        } else {
            setuser_idError("");
            formIsValid3= true;

        }


        if (fname === "") {
            setfnameError("Please Enter Driver's First Name");
            formIsValid1 = false;
        } else {
            setfnameError("");
            formIsValid1 = true;

        }

        if (lname === "") {
            setlnameError("Please Enter Driver's Last Name");
            formIsValid2 = false;
        } else {
            setlnameError("");
            formIsValid2 = true;

        }
        

        if (!contact.match(/^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/)) {
            setcontactError("Please Enter Valid Contact Number");
            formIsValid5 = false;

        } else {
            setcontactError("");
            formIsValid5 = true;

        }

        if (code === "") {
            setcodeError("Please Enter Branch Code");
            formIsValid3 = false;
        } else {
            setcodeError("");
            formIsValid3= true;

        }

        if (vehicle === "") {
            setvehicleError("Please Enter Vehicle Number");
            formIsValid3 = false;
        } else {
            setvehicleError("");
            formIsValid3= true;

        }


        if (!pass.match(/^[a-zA-Z0-9@#$]{6,12}$/)) {
            formIsValid7 = false;
            setpassError("Please enter length must best min 6 Chracters and Max 12 Chracters");
            return false;
        } else {
            if (pass === conPass) {
                setpassError("");
                formIsValid7 = true;
            } else {
                setpassError("Passwords do not match!");
                formIsValid7 = false;
            }
        }

        if(formIsValid1===true && formIsValid2===true && formIsValid3===true && formIsValid4===true && formIsValid5===true && formIsValid6===true && formIsValid7===true){
            return true;
        }else{
           return false
        }
       
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        if (handleValidation() === true) {
            var token = sessionStorage.getItem("token");
            setBtnDisabled(1);

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }

            const dataObject = {
                driver_id :user_id,
                f_name : fname,
                l_name : lname,
                phone_no : contact,
                branch_code : code,
                vehicle_no : vehicle,
                password : pass,
            }

            axios.post('/save/driver', dataObject,)
                .then((res) => {

                    console.log(res);

                    if (res.data.code === 200) {

                        toast.success('Driver Registered successfully!', { position: toast.POSITION.TOP_RIGHT })

                        history('/view-drivers');

                    } else if(res.data.code === 500) {

                        toast.warn('Driver Already exist..!')

                    }else{
                        toast.warn('please enter valid Driver details', { position: toast.POSITION.TOP_RIGHT })

                    }

                }
                ).catch((error) => {
                })

        }

    }

    return (
        <>
            <Header />
            <Row className="">
                <Slider />
                <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left p-5">

                    <h3 className="dashboard">Add Driver</h3>
                    <hr></hr>

                    <Card className=" p-5 mt-2 ml-2">
                        {/* <Card.Header>Add User</Card.Header> */}
                        <Card.Body>

                            <Form>

                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicUserName" className="mt-3">
                                            <Form.Label>Driver ID<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setuser_id(e.target.value)} type="text" placeholder="Username" />
                                        </Form.Group>

                                        <small id="emailHelp" className="text-danger form-text">
                                            {user_idError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                                            <Form.Label >First Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setfname(e.target.value)} type="text" placeholder="Enter first name" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {fnameError}
                                        </small>
                                    </div>
                                </div>


                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicLastName">
                                            <Form.Label>Last Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setlname(e.target.value)} type="text" placeholder="Enter last name" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {lnameError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicNumber" className="mt-3">
                                            <Form.Label>Contact Number<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setcontact(e.target.value)} type="text" placeholder="Enter Contact Number" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {contactError}
                                        </small>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                     <Form.Group controlId="formBasicUserName" className="mt-3">
                                        <Form.Label>Branch Name<span className="text-danger">*</span></Form.Label>
                                        <select className='form-control'  onClick={e => setcode(e.target.value)}>
                                        {branch.map((option) => (
                                        <option value={option.branch_code}  >{option.branch_name}</option>
                                        ))}
                                         </select>
                                     </Form.Group>
                                </div>
                            
                                    <div className="col-lg-6 md-6 xs-12">
                                     <Form.Group controlId="formBasicUserName" className="mt-3">
                                        <Form.Label>Vehicle No<span className="text-danger">*</span></Form.Label>
                                        <select className='form-control'  onClick={e => setvehicle(e.target.value)}>
                                        {vehicles.map((option) => (
                                        <option value={option.vehicle_no}  >{option.vehicle_no}</option>
                                        ))}
                                         </select>
                                     </Form.Group>    
                                </div>
                                    



                                </div>


                                <h4 className="dashboard mt-5">Password</h4>
                                <hr></hr>


                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicPassword" className="mt-3">
                                            <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setpass(e.target.value)} type="password" placeholder="Password" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicConfPassword" className="mt-3">
                                            <Form.Label>Confirm Password<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setConPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                                        </Form.Group>
                                    </div>
                                </div>

                                <small id="passerror" className="text-danger form-text">
                                    {passError}
                                </small>

                                <Col className="text-end mt-5">
                                    <Link className="edit-link" path="/show-all-users"
                                        to="/show-all-users">
                                        <Button className="editBtn" variant="info" >Back</Button>
                                    </Link>{' '}
                                    <Link className="edit-link" path="/show-all-users"
                                        to="/show-all-users">
                                        <Button className="editBtn" variant="danger"> Cancel</Button>
                                    </Link>{' '}
                                    <Button onClick={e => handelSubmit(e)} variant="success btn-block" type="submit" className={btnDisabled===1?"disabled":""}>
                                        Save
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
    );
}

export default Register
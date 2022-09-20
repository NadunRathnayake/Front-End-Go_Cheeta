import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../Services/axio";
import { Container, Row, Col, Card } from 'react-bootstrap'
import Header from './Header';
import Footer from './Footer';
import LogoutModel from './LogoutModel';
import '../css/addUser.css'


function Register() {

    const [passError, setpassError] = useState("");
    const [logError, setlogError] = useState("");
    const [fnameError, setfnameError] = useState('');
    const [lnameError, setlnameError] = useState('');
    const [nicError, setnicError] = useState('');
    const [phoneError, setphoneError] = useState('');
    const [codeError, setcodeError] = useState('');
    const [streetError, setstreetError] = useState('');
    const [cityError, setcityError] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(0);
    const [showLogout, setShowLogout] = useState(false);

    const [nic, setnic] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [phone, setphone] = useState('');
    const [street, setstreet] = useState('');
    const [city, setcity] = useState(''); 
    const [code, setcode] = useState(''); 
    const [pass, setpass] = useState('');
    const [conPass, setConPassword] = useState('');



 

    let history = useNavigate();

    const handleValidation = (event) => {
        let formIsValid1 = true;
        let formIsValid2 = true;
        let formIsValid3 = true;
        let formIsValid4 = true;
        let formIsValid5 = true;
        let formIsValid6 = true;
        let formIsValid7 = true;
        let formIsValid8 = true;


        if (nic === "") {
            setnicError("Please Enter NIC");
            formIsValid1 = false;
        } else {
            setnicError("");
            formIsValid1= true;

        }


        if (fname === "") {
            setfnameError("Please Enter First Name");
            formIsValid2 = false;
        } else {
            setfnameError("");
            formIsValid2 = true;

        }

        if (lname === "") {
            setlnameError("Please Enter Last Name");
            formIsValid3 = false;
        } else {
            setlnameError("");
            formIsValid3 = true;

        }
        

        if (!phone.match(/^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/)) {
            setphoneError("Please Enter Valid Contact Number");
            formIsValid4 = false;

        } else {
            setphoneError("");
            formIsValid4 = true;

        }

        if (street === "") {
            setstreetError("Please Enter Street Name");
            formIsValid5 = false;
        } else {
            setstreetError("");
            formIsValid5= true;

        }

        if (city === "") {
            setcityError("Please Enter City");
            formIsValid6 = false;
        } else {
            setcityError("");
            formIsValid6= true;

        }


        if (city === "") {
            setcodeError("Please Enter Street Code");
            formIsValid7 = false;
        } else {
            setcodeError("");
            formIsValid7= true;

        }


        if (!pass.match(/^[a-zA-Z0-9@#$]{6,12}$/)) {
            formIsValid8 = false;
            setpassError("Please enter length must best min 6 Chracters and Max 12 Chracters");
            return false;
        } else {
            if (pass === conPass) {
                setpassError("");
                formIsValid8 = true;
            } else {
                setpassError("Passwords do not match!");
                formIsValid8 = false;
            }
        }

        if(formIsValid1===true && formIsValid2===true && formIsValid3===true && formIsValid4===true && formIsValid5===true && formIsValid6===true && formIsValid7===true && formIsValid8===true){
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
                nic :nic,
                f_name : fname,
                l_name : lname,
                phone_no : phone,
                street : street,
                city : city,
                code : code,
                password : pass,
            }

            axios.post('/save', dataObject,)
                .then((res) => {

                    console.log(res);

                    if (res.data.code === 200) {

                        toast.success('Customer Registered successfully!', { position: toast.POSITION.TOP_RIGHT })

                        history('/home');

                    } else if(res.data.code === 500) {

                        toast.warn('Customer Already exist..!')

                    }else{
                        toast.warn('please enter valid Customer details', { position: toast.POSITION.TOP_RIGHT })

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
                
                <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left p-5">

                    <h3 className="dashboard">Register</h3>
                    <hr></hr>

                    <Card className=" p-5 mt-2 ml-2">
                        {/* <Card.Header>Add User</Card.Header> */}
                        <Card.Body>

                            <Form>

                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicUserName" className="mt-3">
                                            <Form.Label>Customer NIC<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setnic(e.target.value)} type="text" placeholder="NIC" />
                                        </Form.Group>

                                        <small id="emailHelp" className="text-danger form-text">
                                            {nicError}
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
                                            <Form.Control onChange={e => setphone(e.target.value)} type="text" placeholder="Enter Contact Number" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {phoneError}
                                        </small>
                                    </div>
                                </div>

                                <div className='row'>
                                <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicNumber" className="mt-3">
                                            <Form.Label>Street<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setstreet(e.target.value)} type="text" placeholder="Enter street Name" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {streetError}
                                        </small>
                                    </div>
                            
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicNumber" className="mt-3">
                                            <Form.Label>City<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setcity(e.target.value)} type="text" placeholder="Enter City" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {cityError}
                                        </small>
                                    </div>
                                    
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicNumber" className="mt-3">
                                            <Form.Label>Code<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setcode(e.target.value)} type="text" placeholder="Enter Street Code" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {codeError}
                                        </small>
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
                                    <Link className="edit-link" path="/home"
                                        to="/home">
                                        <Button className="editBtn" variant="info" >Back</Button>
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
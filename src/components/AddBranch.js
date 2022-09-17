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

function AddBranch() {

    const [passError, setpassError] = useState("");
    const [logError, setlogError] = useState("");
    const [bnameError, setbnameError] = useState('');
    const [cityError, setcityError] = useState('');
    const [codeError, setcodeError] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(0);
    const [showLogout, setShowLogout] = useState(false);

    const [bname, setbname] = useState('');
    const [city, setcity] = useState('');
    const [code, setcode] = useState('');


    let history = useNavigate();

    const handleValidation = (event) => {
        let formIsValid1 = true;
        let formIsValid2 = true;
        let formIsValid3 = true;

        if (code === "") {
            setcodeError("Please Enter Branch Code");
            formIsValid1 = false;
        } else {
            setcodeError("");
            formIsValid1= true;

        }


        if (bname === "") {
            setbnameError("Please Enter Branch Name");
            formIsValid2 = false;
        } else {
            setbnameError("");
            formIsValid2 = true;

        }

        if (city === "") {
            setcityError("Please Enter City of Branch");
            formIsValid3 = false;
        } else {
            setcityError("");
            formIsValid3 = true;

        }
        

        if(formIsValid1===true && formIsValid2===true && formIsValid3===true){
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
                branch_code :code,
                branch_name : bname,
                city : city,
            }

            axios.post('/branch/save', dataObject,)
                .then((res) => {

                    console.log(res);

                    if (res.data.code === 200) {

                        toast.success('Branch Added successfully!', { position: toast.POSITION.TOP_RIGHT })

                        history('/view-branch');

                    } else if(res.data.code === 500) {

                        toast.warn('Branch Already exist..!')

                    }else{
                        toast.warn('please enter valid Branch details', { position: toast.POSITION.TOP_RIGHT })

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

                    <h3 className="dashboard">Add Branch</h3>
                    <hr></hr>

                    <Card className=" p-5 mt-2 ml-2">
                        {/* <Card.Header>Add User</Card.Header> */}
                        <Card.Body>

                            <Form>

                                <div className='row'>
                                <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicNumber" className="mt-3">
                                            <Form.Label>Branch Code<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setcode(e.target.value)} type="text" placeholder="Enter Branch Code" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {codeError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                                            <Form.Label >Branch Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setbname(e.target.value)} type="text" placeholder="Enter Branch Name" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {bnameError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicLastName">
                                            <Form.Label>City<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setcity(e.target.value)} type="text" placeholder="Enter City" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {cityError}
                                        </small>
                                    </div>

                                </div>

                                <Col className="text-end mt-5">
                                    <Link className="edit-link" path="/dashboard"
                                        to="/dashboard">
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

export default AddBranch
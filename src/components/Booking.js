import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../Services/axio";
import { Container, Row, Col, Card } from 'react-bootstrap'

import Header from './Header';
import LogoutModel from './LogoutModel';
import { BsPersonFill, BsPersonPlusFill, BsPersonLinesFill, BsTextRight, BsPauseFill } from "react-icons/bs";
import '../css/addUser.css'
import Logout from './Logout';
import { pick } from 'lodash';


function Addbooking() {
    
    const [nicError, setnicError] = useState('');
    const [cust_nameError, setcust_nameError] = useState('');
    const [dateError, setdateError] = useState('');
    const [timeError, settimeError] = useState('');
    const [pickupError, setpickupError] = useState('');
    const [destinationError, setdestinationError] = useState('');
    const [phoneError, setphoneError] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(0);
    const [showLogout, setShowLogout] = useState(false);

    const [nic, setnic] = useState('');
    const [cust_name, setcust_name] = useState('');
    const [date, setdate] = useState('');
    const [time, settime] = useState('');
    const [pickup, setpickup] = useState('');
    const [destination, setdestination] = useState('');
    const [phone, setphone] = useState('');


    let [branch, setbranch] = useState([]);
    let [bookingcount, setbookingcount] = useState([]);

    React.useEffect(() => {

        axios.get('/view/branch-list')
            .then(res => {

                console.log("res");
                console.log(res.data.data);
                setbranch(res.data.data);
            })
            .catch((error) => {
            })

            axios.get('/view-booking')
            .then(res => {

                console.log("res");
                console.log(res.data.data);
                setbookingcount(res.data.data.length);
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

        if (nic === "") {
            setnicError("Please Enter NIC");
            formIsValid1 = false;
        } else {
            setnicError("");
            formIsValid1= true;

        }


        if (cust_name === "") {
            setcust_nameError("Please Enter Customer Name");
            formIsValid2 = false;
        } else {
            setcust_nameError("");
            formIsValid2 = true;

        }

        if (date === "") {
            setdateError("Please Enter the Date");
            formIsValid3 = false;
        } else {
            setdateError("");
            formIsValid3 = true;

        }

        if (time === "") {
            settimeError("Please Enter the Time");
            formIsValid4 = false;
        } else {
            settimeError("");
            formIsValid4 = true;

        }

        if (pickup === "") {
            setpickupError("Please Enter the Pickup Location");
            formIsValid5 = false;
        } else {
            setpickupError("");
            formIsValid5 = true;

        }

        if (destination === "") {
            setdestinationError("Please Enter the Destination Location");
            formIsValid6 = false;
        } else {
            setdestinationError("");
            formIsValid6 = true;

        }


        if (!phone.match(/^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/)) {
            setphoneError("Please Enter Valid Contact Number");
            formIsValid7 = false;

        } else {
            setphoneError("");
            formIsValid7 = true;

        }
        
        

        if(formIsValid1===true && formIsValid2===true && formIsValid3===true && formIsValid4===true && formIsValid5===true && 
            formIsValid6===true && formIsValid7===true){
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
                booking_id:"B001"+bookingcount+1,
                cust_id :nic,
                customer_name : cust_name,
                date : date,
                time : time,
                pickup : pickup,
                destination : destination,
                phone_no : phone,
            }
                console.log(dataObject);
            axios.post('/booking/save', dataObject,)
                .then((res) => {

                    console.log(res);

                    if (res.data.code === 200) {

                        toast.success('Booking Added successfully!', { position: toast.POSITION.TOP_RIGHT })

                        history('/view-branch');

                    } else if(res.data.code === 500) {

                        toast.warn('Booking Already exist..!')

                    }else{
                        toast.warn('please enter valid Booking details', { position: toast.POSITION.TOP_RIGHT })

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

                    <h3 className="dashboard">Place a Booking</h3>
                    <hr></hr>

                    <Card className=" p-5 mt-2 ml-2">
                        {/* <Card.Header>Add User</Card.Header> */}
                        <Card.Body>

                            <Form>

                                <div className='row'>
                                <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicNumber" className="mt-3">
                                            <Form.Label>NIC Number<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setnic(e.target.value)} type="text" placeholder="Enter NIC Number" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {nicError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                                            <Form.Label >Customer Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setcust_name(e.target.value)} type="text" placeholder="Enter Customer Name" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {cust_nameError}
                                        </small>
                                    </div>
                                </div>

                                <div className='row'>
                                <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicNumber" className="mt-3">
                                            <Form.Label>Date<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setdate(e.target.value)} type="date" placeholder="Enter Date" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {dateError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                                            <Form.Label >Time<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => settime(e.target.value)} type="time" placeholder="Enter Time" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {timeError}
                                        </small>
                                    </div>
                                </div>

                                <div className='row'>
                                <div className="col-lg-6 md-6 xs-12">
                                     <Form.Group controlId="formBasicUserName" className="mt-3">
                                        <Form.Label>PickUp Location<span className="text-danger">*</span></Form.Label>
                                        <select className='form-control'  onClick={e => setpickup(e.target.value)}>
                                        {branch.map((option) => (
                                        <option value={option.city}  >{option.city}</option>
                                        ))}
                                         </select>
                                     </Form.Group>
                                </div>
                                <div className="col-lg-6 md-6 xs-12">
                                     <Form.Group controlId="formBasicUserName" className="mt-3">
                                        <Form.Label>Destination Location<span className="text-danger">*</span></Form.Label>
                                        <select className='form-control'  onClick={e => setdestination(e.target.value)}>
                                        {branch.map((option) => (
                                        <option value={option.city}  >{option.city}</option>
                                        ))}
                                         </select>
                                     </Form.Group>
                                </div>
                                </div>

                                <div className='row'>
                                <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                                            <Form.Label >Phone Number<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setphone(e.target.value)} type="text" placeholder="Enter Phone Number" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {phoneError}
                                        </small>
                                    </div>


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
            <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
        </>
    );
}

export default Addbooking
import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useRef } from 'react'
import { Col, Row, Table, Container, Card, Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import axios from "../Services/axio";
import Header from './Header';
import Slider from './NavBar';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/userList.css'
import LogoutModel from './LogoutModel';
import { BsPersonFill, BsPersonPlusFill, BsPersonLinesFill } from "react-icons/bs";

var _ = require('lodash');

function EditBooking() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [bkID, setbkID] = useState('');
    const [searchVal, setSearchVal] = useState('');
    const [showLogout, setShowLogout] = useState(false);
    let [booking, setbooking] = useState([]);

    React.useEffect(() => {
        axios.get('/view-booking')
            .then(res => {

                console.log("res");
                console.log(res.data.data);
                setbooking(res.data.data);
            })
            .catch((error) => {
            })
    }, []);

    function handelSubmitDelete(id) {
        setShow(true);
        setbkID(id);

        console.log("id");
        console.log(id);
    }

    function confirmDelete() {
        setShow(false);

        axios.delete('/delete/booking/' + bkID)
            .then(res => {

                if (res.data.code == 200) {
                    toast.success("Deleted Sucessfully!", { position: toast.POSITION.TOP_RIGHT })
                    window.location.reload(false)
                }else{
                    toast.warn('try again', { position: toast.POSITION.TOP_RIGHT })
                }

                console.log(res.data.data);
                setbooking(([res.data.data]));

            })
            .catch((error) => {
            })



    }

    const handelSubmitSearch = (e) => {

        console.log("e");
        console.log(e);
        e.preventDefault();

        axios.get('/booking/' + searchVal)
            .then(res => {

                console.log(res.data.data);
                // setusers(res.data.data);

                setbooking(([res.data.data]));
                // setpageNumArr([]);

                console.log("booking");
                console.log(booking);


            })
            .catch((error) => {
            })

    }

    return (
        <>
            <Header />
            <Row className="">
                <Slider />

                <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left p-5">

                    <h3 className="dashboard">Onging Bookings</h3>
                    <hr></hr>
                    <Row>
                        {/* <Form> */}
                        <Col lg={4} md={4}>
                            <Form.Group controlId="formBasicRole" className="mt-3">
                                <Form.Control type="test" onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" />
                            </Form.Group>
                        </Col>
                        <Col lg={1} md={2} className="mt-3">
                            <Button onClick={e => handelSubmitSearch(e)} variant="success btn-block" type="submit" className="">
                                Search
                            </Button>
                        </Col>
                        <Col lg={1} md={2} className="mt-3">
                            <Button onClick={e => window.location.reload(false)} variant="warning btn-block" type="submit" className="">
                                Clear
                            </Button>
                        </Col>

                    </Row>

                    <br></br>
                    <br></br>
                    <Table striped bordered hover  >
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Customer NIC</th>
                                <th>Driver ID</th>
                                <th>Customer Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Pickup Location</th>
                                <th>Destination</th>
                                <th>Phone Number</th>
                                <th>Price</th>
                                <th>Options (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booking.length > 0 ? booking.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.booking_id}</td>
                                        <td>{item.cust_id}</td>
                                        <td>{item.driver_id}</td>  
                                        <td>{item.customer_name}</td> 
                                        <td>{item.date}</td> 
                                        <td>{item.time}</td> 
                                        <td>{item.pickup}</td> 
                                        <td>{item.destination}</td> 
                                        <td>{item.phone_no}</td>   
                                        <td>{item.price}</td>  
                                        <td>
                                            <Link className="edit-link" path={"/update-booking/:id"}
                                                to={'/update-booking/' + item.booking_id}>
                                                <Button className="editBtn" variant="info" size="md"><i className="fa fa-edit"></i> Confirm</Button>
                                            </Link>
                                            <Button className="editBtn" variant="danger" size="md" onClick={e => handelSubmitDelete(item.booking_id)}><i className="fa fa-trash"></i> Decline</Button>
                                            
                                        </td>


                                    </tr>
                                )
                            }) : <tr className="text-center"><td colSpan={8} >Data Not Found!</td></tr>}
                        </tbody>
                    </Table>
                    <ToastContainer />
                </Col>
            </Row>
            <Footer />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure fot delete this data?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={e => confirmDelete()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>


            <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
        </>

    );
}

export default EditBooking
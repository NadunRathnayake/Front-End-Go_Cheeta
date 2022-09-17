import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useRef } from 'react'
import { Col, Row, Table, Container, Card, Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import axios from "../Services/axio";
import Header from './Header';
import Slider from './NavBar';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/userList.css'
import LogoutModel from './LogoutModel';


var _ = require('lodash');

function ViewBooking() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [code, setcode] = useState('');
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

                    <h3 className="dashboard">Booking History</h3>
                    <hr></hr>
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
                                <th>Price (Rs.)</th>
                                
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
                                    </tr>
                                )
                            }) : <tr className="text-center"><td colSpan={8} >Data Not Found!</td></tr>}
                        </tbody>
                    </Table>
                    <ToastContainer />
                </Col>
            </Row>
            <Footer />



            <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
        </>

    );
}

export default ViewBooking
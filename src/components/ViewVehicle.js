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

function ViewVehicle() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [v_no, setv_no] = useState('');
    const [searchVal, setSearchVal] = useState('');
    const [showLogout, setShowLogout] = useState(false);
    let [vehicle, setvehicle] = useState([]);

    React.useEffect(() => {
        axios.get('/view/vehicle-list')
            .then(res => {

                console.log("res");
                console.log(res.data.data);
                setvehicle(res.data.data);
            })
            .catch((error) => {
            })
    }, []);

    
        const handelSubmitSearch = (e) => {

        console.log("e");
        console.log(e);
        e.preventDefault();

        axios.get('/search/vehicle/' + searchVal)
            .then(res => {

                console.log(res.data.data);
                // setusers(res.data.data);

                setvehicle(([res.data.data]));
                // setpageNumArr([]);

                console.log("vehicle");
                console.log(vehicle);


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

                    <h3 className="dashboard">Vehicles</h3>
                    <hr></hr>
                    <br></br>
                    <br></br>
                    <Table striped bordered hover  >
                        <thead>
                            <tr>
                                <th>Vehicle Number</th>
                                <th>Vehicle Model</th>
                                <th>Vehicle Category</th>
                                <th>Branch Code</th>
                                <th>Driver ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicle.length > 0 ? vehicle.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.vehicle_no}</td>
                                        <td>{item.vehicle_model}</td>
                                        <td>{item.vehicle_category}</td>
                                        <td>{item.branch_code}</td>
                                        <td>{item.driver_id}</td>
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

export default ViewVehicle
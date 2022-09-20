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

function EditCategory() {

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

    function handelSubmitDelete(id) {
        setShow(true);
        setv_no(id);

        console.log("id");
        console.log(id);
    }

    function confirmDelete() {
        setShow(false);

        axios.delete('/delete/vehicle/' + v_no)
            .then(res => {

                if (res.data.code == 200) {
                    toast.success("Deleted Sucessfully!", { position: toast.POSITION.TOP_RIGHT })
                    window.location.reload(false)
                }else{
                    toast.warn('try again', { position: toast.POSITION.TOP_RIGHT })
                }

                console.log(res.data.data);
                setvehicle(([res.data.data]));

            })
            .catch((error) => {
            })



    }

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

                        <Col lg={6} md={4} className="mt-3">
                            <Link to={'/add-vehicle'} >
                                <Button variant="success" className="mr-auto"><BsPersonPlusFill></BsPersonPlusFill> Add New Vehicle</Button>{' '}
                            </Link>
                        </Col>
                    </Row>

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
                                <th>Options</th>
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
                                        <td>
                                            <Link className="edit-link" path={"/update-vehicle/:id"}
                                                to={'/update-vehicle/' + item.vehicle_no}>
                                                <Button className="editBtn" variant="info" size="md"><i className="fa fa-edit"></i> Update</Button>
                                            </Link>
                                            <Button className="editBtn" variant="danger" size="md" onClick={e => handelSubmitDelete(item.vehicle_no)}><i className="fa fa-trash"></i> Delete</Button>
                                            
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

export default EditCategory
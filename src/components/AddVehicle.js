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

function AddVehicle() {

    const [logError, setlogError] = useState("");
    const [vmodelError, setvmodelError] = useState('');
    const [vcatError, setvcatError] = useState('');
    const [v_noError, setv_noError] = useState('');
    const [codeError, setcodeError] = useState('');
    const [d_idError, setd_idError] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(0);
    const [showLogout, setShowLogout] = useState(false);

    const [v_no, setv_no] = useState('');
    const [vmodel, setvmodel] = useState('');
    const [vcat, setvcat] = useState('');
    const [code, setcode] = useState('');
    const [d_id, setd_id] = useState(''); 

    let [category, setcategory] = useState([]);

    React.useEffect(() => {
        axios.get('/view/category-list')
            .then(res => {

                console.log("res");
                console.log(res.data.data);
                setcategory(res.data.data);
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

        if (v_no === "") {
            setv_noError("Please Enter Vehicle ID");
            formIsValid1 = false;
        } else {
            setv_noError("");
            formIsValid1= true;

        }


        if (vmodel === "") {
            setvmodelError("Please Enter Vehicle Model");
            formIsValid2 = false;
        } else {
            setvmodelError("");
            formIsValid2 = true;

        }

        if (vcat === "") {
            setvcatError("Please Enter Vehicle Category");
            formIsValid3 = false;
        } else {
            setvcatError("");
            formIsValid3 = true;

        }
        
        if (code === "") {
            setcodeError("Please Enter Branch Code");
            formIsValid4 = false;
        } else {
            setcodeError("");
            formIsValid4= true;

        }

        if (d_id === "") {
            setd_idError("Please Enter Driver ID ");
            formIsValid5 = false;
        } else {
            setd_idError("");
            formIsValid5= true;

        }



        if(formIsValid1===true && formIsValid2===true && formIsValid3===true && formIsValid4===true && formIsValid5===true){
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
                vehicle_no :v_no,
                vehicle_model : vmodel,
                vehicle_category : vcat,
                branch_code : code,
                driver_id : d_id,
                
            }

            axios.post('/add/vehicle', dataObject,)
                .then((res) => {

                    console.log(res);

                    if (res.data.code === 200) {

                        toast.success('Vehicle Added successfully!', { position: toast.POSITION.TOP_RIGHT })

                        history('/view-drivers');

                    } else if(res.data.code === 500) {

                        toast.warn('Vehicle Already exist..!')

                    }else{
                        toast.warn('please enter valid Vehicle details', { position: toast.POSITION.TOP_RIGHT })

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

                    <h3 className="dashboard">Add Vehicle</h3>
                    <hr></hr>

                    <Card className=" p-5 mt-2 ml-2">
                        {/* <Card.Header>Add User</Card.Header> */}
                        <Card.Body>

                            <Form>

                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicUserName" className="mt-3">
                                            <Form.Label>Vehicle Number<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setv_no(e.target.value)} type="text" placeholder="Vehicle No" />
                                        </Form.Group>

                                        <small id="emailHelp" className="text-danger form-text">
                                            {v_noError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                                            <Form.Label >Vehicle Model<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setvmodel(e.target.value)} type="text" placeholder="Enter Vehicle Model" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {vmodelError}
                                        </small>
                                    </div>
                                </div>


                                <div className='row'>
                                <div className="col-lg-6 md-6 xs-12">
                                     <Form.Group controlId="formBasicUserName" className="mt-3">
                                        <Form.Label>Category<span className="text-danger">*</span></Form.Label>
                                        <select className='form-control'  onClick={e => setvcat(e.target.value)}>
                                        {category.map((option) => (
                                        <option value={option.category_id}  >{option.category_name}</option>
                                        ))}
                                         </select>
                                     </Form.Group>
                                </div>

                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicNumber" className="mt-3">
                                            <Form.Label>Branch Code<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setcode(e.target.value)} type="text" placeholder="Enter Branch Code" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {codeError}
                                        </small>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicUserName" className="mt-3">
                                            <Form.Label>Driver ID<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setd_id(e.target.value)} type="text" placeholder="Enter Driver ID" />
                                        </Form.Group>

                                        <small id="emailHelp" className="text-danger form-text">
                                            {d_idError}
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
            <Footer />

            <LogoutModel show={showLogout} close={() => setShowLogout(false)} />
        </>
    );
}

export default AddVehicle
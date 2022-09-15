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

function AddCategory() {

    const [passError, setpassError] = useState("");
    const [logError, setlogError] = useState("");
    const [cnameError, setcnameError] = useState('');
    const [bnameError, setbnameError] = useState('');
    const [c_idError, setc_idError] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(0);
    const [showLogout, setShowLogout] = useState(false);

    const [cname, setcname] = useState('');
    const [bname, setbname] = useState('');
    const [c_id, setc_id] = useState('');

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


    let history = useNavigate();

    const handleValidation = (event) => {
        let formIsValid1 = true;
        let formIsValid2 = true;
        let formIsValid3 = true;

        if (c_id === "") {
            setc_idError("Please Enter Category ID");
            formIsValid1 = false;
        } else {
            setc_idError("");
            formIsValid1= true;

        }


        if (cname === "") {
            setcnameError("Please Enter Category Name");
            formIsValid2 = false;
        } else {
            setcnameError("");
            formIsValid2 = true;

        }

        if (bname === "") {
            setbnameError("Please Enter Branch Name");
            formIsValid3 = false;
        } else {
            setbnameError("");
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
                category_id :c_id,
                category_name : cname,
                branch_name : bname,
            }

            axios.post('/add/vehicle-category', dataObject,)
                .then((res) => {

                    console.log(res);

                    if (res.data.code === 200) {

                        toast.success('Category Added successfully!', { position: toast.POSITION.TOP_RIGHT })

                        history('/edit-category');

                    } else if(res.data.code === 500) {

                        toast.warn('Category Already exist..!')

                    }else{
                        toast.warn('please enter valid Category details', { position: toast.POSITION.TOP_RIGHT })

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

                    <h3 className="dashboard">Add Category</h3>
                    <hr></hr>

                    <Card className=" p-5 mt-2 ml-2">
                        {/* <Card.Header>Add User</Card.Header> */}
                        <Card.Body>

                            <Form>

                                <div className='row'>
                                <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicNumber" className="mt-3">
                                            <Form.Label>Category ID <span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setc_id(e.target.value)} type="text" placeholder="Enter Category ID" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {c_idError}
                                        </small>
                                    </div>
                                    <div className="col-lg-6 md-6 xs-12">
                                        <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                                            <Form.Label >Category Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control onChange={e => setcname(e.target.value)} type="text" placeholder="Enter Category Name" />
                                        </Form.Group>
                                        <small id="emailHelp" className="text-danger form-text">
                                            {cnameError}
                                        </small>
                                    </div>

                                    <div className="col-lg-6 md-6 xs-12">
                                     <Form.Group controlId="formBasicUserName" className="mt-3">
                                        <Form.Label>Branch Name<span className="text-danger">*</span></Form.Label>
                                        <select className='form-control'  onClick={e => setbname(e.target.value)}>
                                        {branch.map((option) => (
                                        <option value={option.branch_code}  >{option.branch_name}</option>
                                        ))}
                                         </select>
                                     </Form.Group>
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

export default AddCategory
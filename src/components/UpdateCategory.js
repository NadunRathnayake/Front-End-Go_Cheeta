import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "../Services/axio";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Card } from 'react-bootstrap'
import Header from './Header';
import Slider from './NavBar';
import Footer from './Footer';
import '../css/userEdit.css'
import { BsPersonLinesFill } from "react-icons/bs";
import LogoutModel from './LogoutModel';

function UpdateCategory() {
  const [data, setdata] = useState({});
  const [role, setRole] = useState([]);
  const params = useParams();

  const [showLogout, setShowLogout] = useState(false);
  const [c_id, setc_id] = useState('');
  const [cname, setcname] = useState('');
  const [bname, setbname] = useState('');

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


   
  const reqBody = {
    id: params.id
  };


  React.useEffect(() => {

      axios.get('/search/category/' + params.id)
      .then(res => {

          console.log(res.data.data);
          setdata(res.data.data)

          console.log("users");
          console.log(data);


      })
      .catch((error) => {
      })

  }, []);



  const handleValidation = (event) => {
    let formIsValid = false;

    

    
    return formIsValid;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    

      const userObject = {
        category_id: c_id !== "" ? c_id : data.category_id,
        category_name: cname !== "" ? cname : data.category_name,
        branch_name: bname !== "" ? bname : data.branch_name,
         
      };

      console.log("obj");
      console.log(userObject);


      axios.put('/update/category', userObject)
        .then((res) => {
          if (res.data.status === true) {
            toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })

            // history('/view-drivers')

          } else {

            toast.warn(res.data.message, { position: toast.POSITION.TOP_RIGHT })
          }

        }).catch((error) => {
          if (error.response.data.error) {

            if (error.response.data.error.message === "invalid token" || error.response.data.error.message === "jwt expired") {

              setShowLogout(true);
            }

          }
        })

    

  }

  return (
    <>
      <Header />
      <Row className="">
        <Slider />
        <Col lg={10} md={10} sm={10} className="shadow-sm rounded-lg test-left  p-5">
          <h3 className="dashboard">Update Categories</h3>
          <hr></hr>

          <Card className=" p-5 mt-2 ml-2">
            <Card.Body>
              <Form>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Category ID<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setc_id(e.target.value)} type="text" defaultValue={data.category_id} placeholder="Category ID" readOnly />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                      <Form.Label >Category Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setcname(e.target.value)} defaultValue={data.category_name} type="text" placeholder="Enter Category Name" />
                    </Form.Group>
                  </div>
                  
                   <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Branch Name<span className="text-danger">*</span></Form.Label>
                      <select className='form-control' defaultValue={data.branch_name} onClick={e => setbname(e.target.value)}>
                        {branch.map((option) => (
                          <option value={option.branch_name} defaultValue={data.branch_name} >{option.branch_name}</option>
                        ))}
                      </select>
                    </Form.Group>
                  </div>

                </div>

                <Col className="text-end mt-5">
                  <Link className="edit-link" path="/edit-category"
                    to="/edit-category">
                    <Button className="editBtn" variant="info" >Back</Button>
                  </Link>{' '}
                  <Link className="edit-link" path="/show-all-users"
                    to="/show-all-users">
                    <Button className="editBtn" variant="danger" type='clear'> View List</Button>
                  </Link>{' '}
                  <Button onClick={e => handelSubmit(e)} variant="success btn-block" type="submit" className="">
                    Update
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
  )
}

export default UpdateCategory
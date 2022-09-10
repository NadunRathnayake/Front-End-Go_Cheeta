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

function BranchEdit() {
  const [data, setdata] = useState({});
  const [role, setRole] = useState([]);
  const params = useParams();

  const [showLogout, setShowLogout] = useState(false);
  const [code, setcode] = useState('');
  const [bname, setbname] = useState('');
  const [city, setcity] = useState('');

   
  const reqBody = {
    id: params.id
  };


  React.useEffect(() => {

      axios.get('/branch/' + params.id)
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
        branch_code: code !== "" ? code : data.branch_code,
        branch_name: bname !== "" ? bname : data.branch_name,
        city: city !== "" ? city : data.city,
         
      };

      console.log("obj");
      console.log(userObject);


      axios.put('/update/branch', userObject)
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
          <h3 className="dashboard">Update Branches</h3>
          <hr></hr>

          <Card className=" p-5 mt-2 ml-2">
            <Card.Body>
              <Form>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Branch Code<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setcode(e.target.value)} type="text" defaultValue={data.branch_code} placeholder="Branch Code" readOnly />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                      <Form.Label >Branch Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setbname(e.target.value)} defaultValue={data.branch_name} type="text" placeholder="Enter Branch Name" />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicLastName" className="">
                      <Form.Label>City <span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setcity(e.target.value)} type="text" defaultValue={data.city} placeholder="Enter The City" />
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

export default BranchEdit
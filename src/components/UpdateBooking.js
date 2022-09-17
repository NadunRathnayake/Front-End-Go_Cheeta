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
  const [nic, setnic] = useState('');
  const [bkID, setbkID] = useState('');
  const [d_id, setd_id] = useState('');
  const [cust_name, setcust_name] = useState('');
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [pickup, setpickup] = useState('');
  const [destination, setdestination] = useState('');
  const [phone, setphone] = useState('');
  const [price, setprice] = useState('');



  let [driver, setdriver] = useState([]);

    React.useEffect(() => {
        axios.get('/view/driver-list')
            .then(res => {

                console.log("res");
                console.log(res.data.data);
                setdriver(res.data.data);
            })
            .catch((error) => {
            })
    }, []);


   
  const reqBody = {
    id: params.id
  };


  React.useEffect(() => {

      axios.get('/booking/' + params.id)
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
        booking_id: bkID !== "" ? bkID : data.booking_id,
        cust_id: nic !== "" ? nic : data.cust_id,
        driver_id: d_id !== "" ? d_id : data.driver_id,
        customer_name: cust_name !== "" ? cust_name : data.customer_name,
        date: date !== "" ? date : data.date,
        time: time !== "" ? time : data.time,
        pickup: pickup !== "" ? pickup : data.pickup,
        destination: destination !== "" ? destination : data.destination,
        phone_no: phone !== "" ? phone : data.phone_no,
        price: price !== "" ? price : data.price,

         
      };

      console.log("obj");
      console.log(userObject);


      axios.put('/update/booking', userObject)
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
          <h3 className="dashboard">Confirm Booking</h3>
          <hr></hr>

          <Card className=" p-5 mt-2 ml-2">
            <Card.Body>
              <Form>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Customer NIC<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setnic(e.target.value)} type="text" defaultValue={data.cust_id} placeholder="" readOnly />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                      <Form.Label >Booking ID<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setbkID(e.target.value)} defaultValue={data.booking_id} type="text" placeholder="Enter Booking ID" readOnly />
                    </Form.Group>
                  </div>
                </div>

                <div className='row'>
                <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Driver ID<span className="text-danger">*</span></Form.Label>
                      <select className='form-control' defaultValue={data.driver_id} onClick={e => setd_id(e.target.value)}>
                        {driver.map((option) => (
                          <option value={option.driver_id} defaultValue={data.driver_id} >{option.driver_id}</option>
                        ))}
                      </select>
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Customer Name<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setcust_name(e.target.value)} type="text" defaultValue={data.customer_name} placeholder="Name" readOnly />
                    </Form.Group>
                  </div>
                </div>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Date<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setdate(e.target.value)} type="text" defaultValue={data.date} placeholder="Date" readOnly />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                      <Form.Label >Time<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => settime(e.target.value)} defaultValue={data.time} type="text" placeholder="time" readOnly />
                    </Form.Group>
                  </div>
                </div>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>PickUp Location<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setpickup(e.target.value)} type="text" defaultValue={data.pickup} placeholder="Date" readOnly />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                      <Form.Label >Destination<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setdestination(e.target.value)} defaultValue={data.destination} type="text" placeholder="time" readOnly />
                    </Form.Group>
                  </div>
                </div>

                <div className='row'>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicUserName" className="mt-3">
                      <Form.Label>Phone Number<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setphone(e.target.value)} type="text" defaultValue={data.phone_no} placeholder="Phone" readOnly />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6 md-6 xs-12">
                    <Form.Group controlId="formBasicFirstName" className="text-left font-weight-bold">
                      <Form.Label >Price<span className="text-danger">*</span></Form.Label>
                      <Form.Control onChange={e => setprice(e.target.value)} defaultValue={data.price} type="text" placeholder="Enter the Price" />
                    </Form.Group>
                  </div>
                </div>




                <Col className="text-end mt-5">
                  <Link className="edit-link" path="/edit-booking"
                    to="/edit-booking">
                    <Button className="editBtn" variant="info" >Back</Button>
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
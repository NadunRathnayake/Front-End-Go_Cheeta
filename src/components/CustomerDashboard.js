import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Card, Row, Badge, Container } from "react-bootstrap";
import { BsTextRight, BsFillTelephoneInboundFill, BsClock, BsFillTelephoneOutboundFill, BsHeadset } from "react-icons/bs";
import axios from "../Services/axio";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Header from './Header';
import Footer from './Footer';
import logout from './Logout';
import '../css/dashboard.css'




var moment = require('moment');
var dataArr = [
  {
    "id":"1",
    "name":"Car Taxi",
    "image":"https://s3-media1.fl.yelpcdn.com/bphoto/jX49X_ZK2XrQulel5dKSkQ/o.jpg",
  }
]

function Dashboard() {
  
  return (
    <>
      
        <Header/>
        <Container className='mt-5'>
    <Row xs={1} md={2} className="g-4">
      
        <Col>
          <Card>
           <a href ="/booking" > <Card.Img variant="top" src="https://s3-media1.fl.yelpcdn.com/bphoto/jX49X_ZK2XrQulel5dKSkQ/o.jpg "   /></a>
           
            <Card.Body>
              <Card.Title>Place a Booking</Card.Title>

            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
          <a href ="/customer-search" ><Card.Img variant="top" src="https://www.collinsdictionary.com/images/full/bill_641709937_1000.jpg" /></a>
            <Card.Body>
              <Card.Title>Order History</Card.Title>

            </Card.Body>
          </Card>
        </Col>

       


    </Row>
    </Container>
  



      
    </>
  )
}

export default Dashboard
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
import Slider from './NavBar';
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
        <Slider />
        <Container className='mt-5'>
    <Row xs={1} md={2} className="g-4">
      
    <Col>
          <Card>
            <Card.Img variant="top" src="https://s3-media1.fl.yelpcdn.com/bphoto/jX49X_ZK2XrQulel5dKSkQ/o.jpg" />
            <Card.Body>
              <Card.Title>Car</Card.Title>
              <Card.Text>
              A taxi, also known as a taxicab or simply a cab, is a type of vehicle for hire with a driver, used by a single passenger or small group of passengers, often for a non-shared ride. A taxicab conveys passengers between locations of their choice
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Img variant="top" src="https://media.ride.guru/uploads/taxi-jumbo.jpg" />
            <Card.Body>
              <Card.Title>Van</Card.Title>
              <Card.Text>
              A taxi, also known as a taxicab or simply a cab, is a type of vehicle for hire with a driver, used by a single passenger or small group of passengers, often for a non-shared ride. A taxicab conveys passengers between locations of their choice
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Img variant="top" src="https://s1.cdn.autoevolution.com/images/news/honda-france-says-the-gold-wing-is-not-a-taxi-bike-59742_1.jpg" />
            <Card.Body>
              <Card.Title>Bike</Card.Title>
              <Card.Text>
              A taxi, also known as a taxicab or simply a cab, is a type of vehicle for hire with a driver, used by a single passenger or small group of passengers, often for a non-shared ride. A taxicab conveys passengers between locations of their choice
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Img variant="top" src="https://cdn.shopify.com/s/files/1/0508/3480/0804/products/001_c6ca3481-a61e-4c44-9277-42629ac88204_1200x1200.jpg?v=1607530147" />
            <Card.Body>
              <Card.Title>Mini Car</Card.Title>
              <Card.Text>
              A taxi, also known as a taxicab or simply a cab, is a type of vehicle for hire with a driver, used by a single passenger or small group of passengers, often for a non-shared ride. A taxicab conveys passengers between locations of their choice
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>



    </Row>
    </Container>
  



      
    </>
  )
}

export default Dashboard
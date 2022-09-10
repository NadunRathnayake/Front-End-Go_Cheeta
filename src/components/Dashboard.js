import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Card, Row, Badge } from "react-bootstrap";
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

function Dashboard() {
  
  return (
    <>
      <Row className="">
        <Header/>
        <Slider />

       </Row> 
    </>
  )
}

export default Dashboard
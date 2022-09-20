import React, { useState } from 'react'
// import logo from './logo.svg'
import '../css/Index.css';
import '../css/Home.css';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

   const [validated, setValidated] = useState(false);

   const handleSubmit = (event) => {
     const form = event.currentTarget;
     if (form.checkValidity() === false) {
       event.preventDefault();
       event.stopPropagation();
     }
 
     setValidated(true);
   };


  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <a href="index.html" class="navbar-brand">
              GoCheeta
            </a>{' '}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#" class="smoothScroll">
              Home
            </Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="/add-customer" class="smoothScroll">
              Register
            </Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="/login" class="smoothScroll">
              Login
            </Nav.Link>
          </Nav>

         


        </Container>
      </Navbar>
      <div id="home" class="parallax-section">
        <div class="container">
          <div class="row">
            <div class="slide-text">
            </div>
          </div>
        </div>
      </div>

      <h1 className='mt-4'>Welcome to GoCheeta</h1>

      <Container>

      
    </Container>
      <div>
    <footer class="site-footer mt-4">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify"> A taxi, also known as a taxicab or simply a cab, is a type of vehicle for hire with a driver, used by a single passenger or small group of passengers, often for a non-shared ride. A taxicab conveys passengers between locations of their choice. This differs from public transport where the pick-up and drop-off locations are decided by the service provider, not by the customers, although demand responsive transport and share taxis provide a hybrid bus/taxi mode.</p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul class="footer-links">
              <li><a href="#"> Admin</a></li>
              <li><a href="#">Driver</a></li>
              <li><a href="#">Client</a></li>
              <li><a href="#">Our Branches</a></li>
             
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Contribute</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by  
         <a href="#"> GoCheeta</a>.
            </p>
          </div>
        </div>
      </div>
</footer>
        {}
      </div>
    </div>
  )
}

export default App

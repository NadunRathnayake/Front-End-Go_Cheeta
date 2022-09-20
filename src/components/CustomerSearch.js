import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate, Redirect, Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from '../Services/axio'
import '../css/Login.css'
import $ from 'jquery'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function Search() {
  const [nic, setnic] = useState('')
  
  const [logError, setlogError] = useState('')
  const [emailError, setemailError] = useState('')
  const [success, setsuccess] = useState('')
  const [logid, setlogid] = useState('')
  const [logpass, setlogpass] = useState('')



  const loginfail = (event) => {
    setlogError('Please enter valid NIC .')
  }

  const handelSubmit = (e) => {
}

  return (
    <>
      <Container>
        <Row className="mt-5 ">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form id="login" onSubmit={(e) => handelSubmit(e)}>
              <h1 className="text-center"> Enter Your NIC</h1>
              <hr></hr>

              <div className="form-group pt-3 pb-3">
                <label>NIC</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Your NIC"
                  onChange={(event) => setlogpass(event.target.value)}
                />

              </div>

              <div className="form-group form-check pb-3">
                <small id="logerror" className="text-danger form-text">
                  {logError}
                </small>
              </div>
              <div className="form-group text-center">
                <button
                  type="button"
                  className="btn btn-success login w-100"
                  onClick={handelSubmit}
                >
                  Next
                </button>
              </div>
              <br></br>
              {/* <a href='' className='text-center'>Forgot password</a> */}
            </Form>
            <ToastContainer />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Search



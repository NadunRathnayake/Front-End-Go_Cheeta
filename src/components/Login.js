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

function Login() {
  const [nic, setnic] = useState('')
  const [pass, setpassword] = useState('')
  const [type, settype] = useState('')
  const [passwordError, setpasswordError] = useState('')
  const [logError, setlogError] = useState('')
  const [emailError, setemailError] = useState('')
  const [success, setsuccess] = useState('')
  const [logid, setlogid] = useState('')
  const [logpass, setlogpass] = useState('')

  function validateForm() {
    return nic.length > 0 && pass.length > 0
  }

  let history = useNavigate()

  const handleValidation = (event) => {
    let formIsValid = true
    if (nic === '') {
      setemailError('please enter valid NIC number')
      return false
    } else if (!nic.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false
      setemailError('NIC Not Valid')
      return false
    } else {
      setemailError('')
      formIsValid = true
    }

    if (!pass.match(/^[a-zA-Z]{8,12}$/)) {
      formIsValid = false
      setpasswordError(
        'Only Letters and length must best min 8 Chracters and Max 12 Chracters',
      )
      return false
    } else {
      setpasswordError('')
      formIsValid = true
    }

    return formIsValid
  }

  const loginfail = (event) => {
    setlogError('Please enter valid login credentials.')
  }

  const handelSubmit = (e) => {
    try {
      var form = new FormData()
      form.append('username', logid)
      form.append('password', logpass)
      form.append('usertype', type)

      console.log('form')
      console.log(form)

      var settings = {
        url: 'http://localhost:8080/api/v1/go-cheeta/login',
        method: 'POST',
        timeout: 0,
        processData: false,
        mimeType: 'multipart/form-data',
        contentType: false,
        data: form,
      }

      $.ajax(settings).done(function (response) {
        console.log('response')
        console.log(response)
        setsuccess(true)

        if (response == 'true') {
          if (type == 'DRIVER') {
            toast.success('Login Success', {
              position: toast.POSITION.TOP_RIGHT,
            })
            window.location.href = '/driver-dashboard'
          }else if(type == 'ADMIN'){
            window.location.href = '/dashboard'
          }else if(type == 'CUSTOMER'){
            window.location.href = '/customer-dashboard'
          }
        } else {
          toast.warning('Credentials Invalid', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      })

      console.log('success')
      console.log(success)
    } catch (error) {
      console.log(error)
    }
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
              <h1 className="text-center"> Login</h1>
              <hr></hr>
              <div className="col-lg-6 md-6 xs-12">
                <Form.Group controlId="formBasicUserName" className="mt-3">
                  <Form.Label>
                    Select User Type<span className="text-danger">*</span>
                  </Form.Label>
                  <select
                    className="form-control"
                    onClick={(e) => settype(e.target.value)}
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="DRIVER">DRIVER</option>
                  </select>
                </Form.Group>
              </div>

              <div className="form-group">
                <label>ID Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter NIC"
                  onChange={(event) => setlogid(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>

              <div className="form-group pt-3 pb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setlogpass(event.target.value)}
                />
                {/* <small id="passworderror" className="text-danger form-text">
                              {passwordError}
                            </small> */}
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
                  Login
                </button>
              </div>
              <br></br>
              {/* <a href='' className='text-center'>Forgot password</a> */}
            </Form>
            <ToastContainer />
          </Col>
        </Row>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          Copyright © 2021. All Rights Reserved.
        </h6>
      </Container>
    </>
  )
}

export default Login

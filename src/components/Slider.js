import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react'
import { Nav, NavLink, Row, Col, Button, Card, Navbar, NavItem, NavDropdown, Collapse } from 'react-bootstrap'
import { Link ,useLocation} from "react-router-dom";
import '../css/sideNav.css'
import {BsMinecart, BsFillPinMapFill, BsFillRssFill, BsPersonFill, BsPersonPlusFill, BsFillHouseDoorFill,BsFillPenFill,BsArrowDownLeft,BsFillRecordFill, BsFillFileEarmarkTextFill, BsPersonLinesFill, BsTextRight, BsPeople, BsPauseFill, BsFillTelephoneFill, BsFillTelephoneForwardFill } from "react-icons/bs";


function Slider() {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const { pathname } = useLocation()
    return (
        <>
            <Col lg={2} md={3} sm={3} className="shadow-sm rounded-lg test-left slide_w p-1">
                <Nav defaultActiveKey="/dashboard" className="flex-column justify-content-end flex-grow-1 pe-3">
                    {/* <Nav.Link to="/dashboard">Dashboard</Nav.Link> */}
                    <Link className={pathname ==="/dashboard"?"sideNavItemOpen":"sideNavItem"} to={'/dashboard'} >
                        <BsFillHouseDoorFill></BsFillHouseDoorFill>&nbsp;&nbsp;Dashboard
                    </Link  >

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen1(!open1)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open1}
                    >
                        <BsPersonFill></BsPersonFill>&nbsp;&nbsp;Users
                    </Button>
                    <Collapse in={pathname ==="/create-user" || pathname==="/show-user"? () => setOpen1(!open1):open1}>
                        <div id="example-collapse-text">
                            <Link className={pathname ==="/create-user"?"sideNavItemOpen":"sideNavItem"} to={'/create-user'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Add User
                            </Link  ><br></br><br></br>

                            <Link className={pathname ==="/show-users"?"sideNavItemOpen":"sideNavItem"} to={'/show-users'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Users List
                            </Link  >
                        </div>
                    </Collapse>

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        <BsPeople></BsPeople>&nbsp;&nbsp;Customer Management
                    </Button>
                    <Collapse in={pathname ==="/create-user" || pathname==="/show-all-users"? () => setOpen(!open):open}>
                        <div id="example-collapse-text">
                            <Link className={pathname ==="/create-customer"?"sideNavItemOpen":"sideNavItem"} to={'/create-customer'}>
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp;Add Customer
                            </Link  ><br></br><br></br>

                            <Link className={pathname ==="/show-all-users"?"sideNavItemOpen":"sideNavItem"} to={'/show-all-users'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Customer List
                            </Link  >
                        </div>
                    </Collapse>



                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen2(!open2)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open2}
                    >
                        <BsFillRssFill></BsFillRssFill>&nbsp;&nbsp;Branch
                    </Button>
                    <Collapse in={pathname ==="/client" || pathname==="/client-list"? () => setOpen2(!open2):open2}>
                        <div id="example-collapse-text">
                            <Link className={pathname ==="/client-list"?"sideNavItemOpen":"sideNavItem"} to={'/client-list'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Branch List
                            </Link  >
                        </div>
                    </Collapse>

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen3(!open3)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open3}
                    >
                        <BsFillPinMapFill></BsFillPinMapFill>&nbsp;&nbsp;Drivers
                    </Button>
                    <Collapse in={pathname ==="/call-list" || pathname==="/call-log"? () => setOpen3(!open3):open3}>
                        <div id="example-collapse-text">
                            <Link className={pathname ==="/call-list"?"sideNavItemOpen":"sideNavItem"} to={'/call-list'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Outgoing
                            </Link  ><br></br><br></br>

                            <Link className={pathname ==="/call-log"?"sideNavItemOpen":"sideNavItem"} to={'/call-log'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Call Log
                            </Link  >
                        </div>
                    </Collapse>

                    <Button className='btn-menu pt-3'
                        onClick={() => setOpen4(!open4)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open4}
                    >
                        <BsMinecart></BsMinecart>&nbsp;&nbsp;Vehicle
                    </Button>
                    <Collapse in={pathname ==="/report-call-logs" || pathname==="/report-logs" || pathname==="/report-remark"? () => setOpen4(!open4):open4}>
                        <div id="example-collapse-text">
                            <Link className={pathname ==="/report-call-logs"?"sideNavItemOpen":"sideNavItem"} to={'/report-call-logs'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Outgoing
                            </Link  ><br></br><br></br>
                            <Link className={pathname ==="/report-logs"?"sideNavItemOpen":"sideNavItem"} to={'/report-logs'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Call Log
                            </Link  ><br></br><br></br>
                            <Link className={pathname ==="/report-remark"?"sideNavItemOpen":"sideNavItem"} to={'/report-remark'} >
                                <BsFillRecordFill></BsFillRecordFill>&nbsp;&nbsp; Remark
                            </Link  >
                        </div>
                    </Collapse>

                </Nav>
            </Col>

        </>
    )
}

export default Slider
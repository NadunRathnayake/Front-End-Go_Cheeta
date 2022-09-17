import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/nav.css'

function navigationbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="warning" variant="warning" className='text-white'>
      <Container>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto" >
          <Nav.Link href="/show-all-customers">Customers</Nav.Link>
            <NavDropdown title="Drivers" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/create-drivers">Add Drivers</NavDropdown.Item>
              <NavDropdown.Item href="/edit-drivers">Edit Drivers</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>

            <NavDropdown title="Bookings" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/view-booking">View Bookings</NavDropdown.Item>
              <NavDropdown.Item href="/edit-booking">Confirm Bookings</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>

            <NavDropdown title="Branch" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/add-branch">Add Branch</NavDropdown.Item>
              <NavDropdown.Item href="/view-branch">View Branch</NavDropdown.Item>
              <NavDropdown.Item href="/edit-branch-list">Edit Branch</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>

            <NavDropdown title="Vehicle" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/view-vehicle">View Vehicles</NavDropdown.Item>
              <NavDropdown.Item href="/add-vehicle">Add Vehicles</NavDropdown.Item>
              <NavDropdown.Item href="/edit-vehicle">Edit Vehicle</NavDropdown.Item>
              <NavDropdown.Divider />
               <NavDropdown.Item href="/add-category">Add Category</NavDropdown.Item>
              <NavDropdown.Item href="/edit-category">Edit Category</NavDropdown.Item>
            </NavDropdown>
          </Nav>    
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navigationbar;
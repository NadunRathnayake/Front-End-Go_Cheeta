import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Ddashboard from './components/Driverdashboard';
import ShowCustomers from './components/ShowCustomers';
import ViewDrivers from './components/ViewDrivers';
import DriverEdit from './components/DriverEdit';
import CreateDrivers from './components/CreateDrivers';
import DriversList from './components/DriversList';
import ShowAllUsers from './components/ShowAllUsers';
import AddBranch from './components/AddBranch';
import ViewBranch from './components/ViewBranch';
import Logout from './components/Logout';
import BranchEdit from './components/BranchEdit';
import BranchEditList from './components/BranchEditList';
import AddCategory from './components/AddCategory';
import EditCategory from './components/EditCategory';
import UpdateCategory from './components/UpdateCategory';
import AddVehicle from './components/AddVehicle';
import ViewVehicle from './components/ViewVehicle';
import EditVehicle from './components/EditVehicle';
import UpdateVehicle from './components/UpdateVehicle';
import Booking from './components/Booking';
import EditBooking from './components/EditBooking';
import UpdateBooking from './components/UpdateBooking';
import ViewBooking from './components/ViewBooking';
import AddCustomer from './components/AddCustomer';
import Home from './components/Home';
import CustomerDashboard from './components/CustomerDashboard';
import Driverdashboard from './components/Driverdashboard';
import CustomerSearch from './components/CustomerSearch';

function App() {

  var token = sessionStorage.getItem("token");
  var user_id = sessionStorage.getItem("user_id");

  const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/',
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
  };

  return (

    <div className=''>

   
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/driver-dashboard' element={<Ddashboard />} />
            <Route path='/show-all-customers' element={<ShowCustomers />} />
            <Route path='/driver-edit/:id' element={<DriverEdit />} />
            <Route path='/create-drivers' element={<CreateDrivers />} />
            <Route path='/show-users' element={<ShowAllUsers />} />
            <Route path='/edit-drivers' element={<DriversList />} />
            <Route path='/add-branch' element={<AddBranch />} />
            <Route path='/edit-branch/:id' element={<BranchEdit />} />
            <Route path='/edit-branch-list' element={<BranchEditList />} />
            <Route path='/view-branch' element={<ViewBranch />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/view-drivers' element={<ViewDrivers />} />
            <Route path='/add-category' element={<AddCategory />} />
            <Route path='/edit-category' element={<EditCategory />} />
            <Route path='/update-category/:id' element={<UpdateCategory />} />
            <Route path='/add-vehicle' element={<AddVehicle />} />
            <Route path='/view-vehicle' element={<ViewVehicle />} />
            <Route path='/edit-vehicle' element={<EditVehicle />} />
            <Route path='/update-vehicle/:id' element={<UpdateVehicle />} />
            <Route path='/booking' element={<Booking/>} />
            <Route path='/edit-booking' element={<EditBooking/>} />
            <Route path='/update-booking/:id' element={<UpdateBooking/>} />
            <Route path='/view-booking' element={<ViewBooking/>} />
            <Route path='/add-customer' element={<AddCustomer/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/customer-dashboard' element={<CustomerDashboard/>} />
            <Route path='/driver-dashboard' element={<Driverdashboard/>} />
            <Route path='/customer-search' element={<CustomerSearch/>} />


        </Routes>
      </Router>
    </div>
  );

}

export default App;
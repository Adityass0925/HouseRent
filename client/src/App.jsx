import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common
import Home from './modules/common/Home';
import Login from './modules/common/Login';
import Register from './modules/common/Register';
import ForgotPassword from './modules/common/ForgotPassword';

// Dashboards
import AdminHome from './modules/admin/AdminHome';
import OwnerHome from './modules/user/owner/OwnerHome';
import RenterHome from './modules/user/renter/RenterHome';

// Admin Features
import AllUsers from './modules/admin/AllUsers';
import AdminAllProperty from './modules/admin/AllProperty';
import AdminAllBookings from './modules/admin/AllBookings';

// Owner Features
import AddProperty from './modules/user/owner/AddProperty';
import OwnerAllProperties from './modules/user/owner/AllProperties';
import OwnerAllBookings from './modules/user/owner/AllBookings';

// Renter Features
import RenterAllProperties from './modules/user/renter/AllProperties';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/properties" element={<AdminAllProperty />} />
          <Route path="/admin/bookings" element={<AdminAllBookings />} />

          <Route path="/owner" element={<OwnerHome />} />
          <Route path="/owner/add-property" element={<AddProperty />} />
          <Route path="/owner/properties" element={<OwnerAllProperties />} />
          <Route path="/owner/bookings" element={<OwnerAllBookings />} />

          <Route path="/renter" element={<RenterHome />} />
          <Route path="/renter/properties" element={<RenterAllProperties />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
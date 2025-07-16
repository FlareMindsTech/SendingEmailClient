import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar.js';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import EmailForm from './Emailform.js';
import UserModule from './userModule.js';

const Dashboard = ({isAuthenticated,setIsAuthenticated}) => {
    console.log(isAuthenticated);
    
  return (
    <MDBContainer fluid className="dashboard-container">
      <MDBRow className="h-100">
        {/* Sidebar */}
        <MDBCol
          md="3"
          className="p-0 bg-dark text-white d-flex flex-column"
          style={{ height: '100vh', position: 'sticky', top: 0 }}
        >
          <Sidebar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </MDBCol>

        {/* Main Content */}
        <MDBCol md="9" className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
          <Routes>
            <Route path="user-module" element={<UserModule />} />
            <Route path="composemail" element={<EmailForm />} />
            {/* Add more routes inside dashboard */}
          </Routes>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Dashboard;

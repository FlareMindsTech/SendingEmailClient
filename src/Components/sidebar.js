import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const Sidebar = ({ isAuthenticated,setIsAuthenticated }) => {
    const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

    console.log(isAuthenticated);
    
  return (
    <div
  className="d-flex flex-column justify-content-between p-3 text-white"
  style={{ height: '100vh', backgroundColor: '#08478b' }}
>
      <div>
        <h5 className="text-center mb-4">Admin Panel</h5>
        <MDBListGroup flush>
          <MDBListGroupItem tag={Link} to="/dashboard/user-module" className="bg-dark text-white" action>
            📧 User Module
          </MDBListGroupItem>
        </MDBListGroup>       
      </div>

      <div className="text-center mt-auto">
        <MDBIcon
          fas
          icon="sign-out-alt"
          size="lg"
          onClick={handleLogout}
          title="Logout"
          style={{ cursor: 'pointer', color: '#fff' }}
        />
        <p className="text-white mt-2" style={{ fontSize: '14px' }}>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;

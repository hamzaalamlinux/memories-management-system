// Layout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, Nav, Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      {/* <div className="bg-light" style={{ width: '250px', minHeight: '100vh' }}>
        <h4 className="p-3">Dashboard</h4>
        <div className="list-group">
          <Link to="/app/add-memories" className="list-group-item list-group-item-action">Add Memories</Link>
          <Link to="/app/memories" className="list-group-item list-group-item-action">Memories</Link>
          <Link to="/other" className="list-group-item list-group-item-action">Other Page</Link>
        </div>
        <DropdownButton variant="link" id="dropdown-basic-button" title="Account" className="d-block mx-auto mt-5">
          <Dropdown.Item as="button" onClick={() => alert('See Profile')}>See Profile</Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => alert('Logging out')}>Logout</Dropdown.Item>
        </DropdownButton>
      </div> */}

      {/* Main Content */}
      <div className="flex-grow-1">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">React App</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Item>
              <Link to="/" className="nav-link text-white">Home</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/profile" className="nav-link text-white">Profile</Link>
            </Nav.Item>
          </Nav>
        </Navbar>

        <div className="container mt-4">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Layout;

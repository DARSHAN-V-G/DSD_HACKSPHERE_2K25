import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Blockchain Medical Records System</h1>
      <p>Your health, your data, securely stored on the blockchain.</p>
      
      <div className="navigation">
        <h2>Quick Links</h2>
        <ul>
          <li>
            <Link to="/patient/register">Patient Registration</Link>
          </li>
          <li>
            <Link to="/patient/login">Patient Login</Link>
          </li>
          <li>
            <Link to="/patient/records">My Records</Link>
          </li>
          <li>
            <Link to="/doctor/records">Doctor's Records</Link>
          </li>
          <li>
            <Link to="/upload">Upload a Record</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

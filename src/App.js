import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Home from './pages/home';


const Services = () => <h2 style={{ padding: '40px' }}>Our Services</h2>;
const About = () => <h2 style={{ padding: '40px' }}>About Us</h2>;
const Contact = () => <h2 style={{ padding: '40px' }}>Contact Page</h2>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;

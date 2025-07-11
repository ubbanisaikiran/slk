import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Home from './pages/home';
import Search from './components/Search';
import Webscrapping from './components/webscraping';


const Contact = () => <h2 style={{ padding: '40px' }}>Contact Page</h2>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/webscrap" element={<Webscrapping />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Search from '../../components/Search';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      <Header />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Welcome to the Home Page</h1>
        <Search />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Search from '../../components/Search';
import Webscraping from '../../components/webscraping';


const Home = () => {
  const [activeTab, setActiveTab] = useState('search'); // default is search

  const renderContent = () => {
    switch (activeTab) {
      case 'scraping':
        return <Webscraping />;
      case 'search':
      default:
        return <Search />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      <Header setActiveTab={setActiveTab} />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Welcome to WildNet Technologies</h2>
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

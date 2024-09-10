import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Error.css';

const Error = () => {
  return (
    <>
      <Header />
        <div className='error'>
          <h1>Error!</h1>
          <p>Could not find this page!</p>
        </div>
      <Footer />
    </>
  );
};

export default Error;

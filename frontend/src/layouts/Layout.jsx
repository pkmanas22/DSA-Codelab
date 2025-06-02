import React from 'react';
import { Footer, Header } from '../components/common';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <div className="w-screen p-8">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;

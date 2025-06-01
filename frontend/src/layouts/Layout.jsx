import React from 'react';
import { Footer, Header } from '../components/common';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="w-screen min-h-screen p-5">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

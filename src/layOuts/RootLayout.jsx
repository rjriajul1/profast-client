import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/header/Navbar';
import Footer from '../pages/shared/footer/Footer';

const RootLayout = () => {
    return (
      <div className='bg-accent'>
          <div className=' max-w-[1600px] mx-auto px-4'>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-384px)]'>
                <Outlet></Outlet>
            </div>
        </div>
            <Footer></Footer>
      </div>
    );
};

export default RootLayout;
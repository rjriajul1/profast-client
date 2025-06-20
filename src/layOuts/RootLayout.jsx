import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/header/Navbar';

const RootLayout = () => {
    return (
        <div className='bg-accent'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <p>Footer</p>
        </div>
    );
};

export default RootLayout;
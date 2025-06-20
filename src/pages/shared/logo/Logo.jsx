import React from 'react';
import logo from '../../../assets/logo.png'
const Logo = () => {
    return (
        <div>
            <div className='flex items-end '>
                <img src={logo} alt="" />
                <p className='-ml-3 font-extrabold text-3xl'>Profase</p>
            </div>
        </div>
    );
};

export default Logo;
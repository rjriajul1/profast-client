import React from 'react';
import Banner from './banner/Banner';
import HowItWorks from './howItWorks/HowItWorks';
import OurServices from './ourServices/OurServices';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
        </div>
    );
};

export default Home;
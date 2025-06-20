import React from 'react';
import Banner from './banner/Banner';
import HowItWorks from './howItWorks/HowItWorks';
import OurServices from './ourServices/OurServices';
import TrustedBy from './turstedBy/TrustedBy';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <TrustedBy></TrustedBy>
        </div>
    );
};

export default Home;
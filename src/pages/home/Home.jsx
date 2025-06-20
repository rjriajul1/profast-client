import React from 'react';
import Banner from './banner/Banner';
import HowItWorks from './howItWorks/HowItWorks';
import OurServices from './ourServices/OurServices';
import TrustedBy from './turstedBy/TrustedBy';
import WhyChooseUs from './whyChooseUs/WhyChooseus';
import Merchant from './merchant/Merchant';
import FrequentlyAsk from './frequentlyAsk/FrequentlyAsk';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <TrustedBy></TrustedBy>
            <WhyChooseUs></WhyChooseUs>
            <Merchant></Merchant>
            <FrequentlyAsk></FrequentlyAsk>
        </div>
    );
};

export default Home;
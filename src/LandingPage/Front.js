import React from 'react';
import Slide from '@mui/material/Slide';
import { Footer, Header, Container1, Container2, Container3 } from '../Containers/index';
import CTA from './cta/CTA';
import Navbar from './navbar/Navbar';

import '../App.css';
import '../front.css';


const Front = ({user}) => (
  <div className="App">
    <div className="gradient__bg">
    
    <Navbar user={user} isLoggedIn={localStorage.getItem('userToken') !== null?true:false}  />
    <Header  />
   
    </div>
    
    <Container1 />
   
    <Container2 />
    <Container3 />
    <CTA/>
    <Footer />
  </div>
);

export default Front;
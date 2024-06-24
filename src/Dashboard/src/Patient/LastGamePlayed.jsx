import React from 'react';
import Savings from '../components/Savings/Savings'
import Sidebar from '../layout/Sidebar/Sidebar';
import Navbar from '../../../LandingPage/navbar/Navbar';

const LastGamePlayed = ({user}) => {
  return (
    <>
    <div className="black"><Navbar isLoggedIn={true} user={user} /></div>
    <div style={{ display: 'flex' }}>
      <Sidebar  uesr={user} role="Patient" />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="app profile">
        <div style={{ width: '80%', maxWidth: '800px' }}>
          <Savings />
        </div>
      </div>
    </div>
    </>
  );
}

export default LastGamePlayed;

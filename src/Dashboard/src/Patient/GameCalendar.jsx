import React from 'react';
import Subscriptions from '../components/Subscriptions/Subscriptions'
import Sidebar from '../layout/Sidebar/Sidebar';
import Navbar from '../../../LandingPage/navbar/Navbar';

const GameCalendar = ({user}) => {
    return (
      <>
      <div className="black"><Navbar isLoggedIn={true}user={user}/></div>
      <div>
        <Sidebar user={user} role="Patient"  />
        <Subscriptions />
      </div>
      </>
    );
  }
  
  export default GameCalendar;
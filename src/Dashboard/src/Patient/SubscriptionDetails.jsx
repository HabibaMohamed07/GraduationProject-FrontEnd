import React from 'react';
import Cards from '../components/Cards/Cards'
import Sidebar from '../layout/Sidebar/Sidebar';
import Navbar from '../../../LandingPage/navbar/Navbar';
const SubscriptionDetails = ({user}) => {
  return (
    <>
    <div className="black"><Navbar isLoggedIn={true} user={user} /></div>
    <div style={{ display: 'flex' }}>
      <Sidebar user={user} role="Patient" />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="app profile">
        <div style={{ width: '80%', maxWidth: '800px' }}>
          <Cards />
        </div>
      </div>
    </div>
    </>
  );
}

export default SubscriptionDetails;

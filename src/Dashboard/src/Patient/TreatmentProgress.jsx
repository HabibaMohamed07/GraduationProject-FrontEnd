import React from 'react';
import Report from '../components/Report/Report'
import Sidebar from '../layout/Sidebar/Sidebar';
import Navbar from '../../../LandingPage/navbar/Navbar';
const TreatmentProgress = ({user}) => {
  return (
    <>
    <div className="black"><Navbar isLoggedIn={true} user={user} /></div>
    <div style={{ display: 'flex' }}>
      <Sidebar role="Patient" />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="app profile">
        <div style={{ width: '80%', maxWidth: '800px' }}>
          <Report />
        </div>
      </div>
    </div>
    </>
  );
}

export default TreatmentProgress;

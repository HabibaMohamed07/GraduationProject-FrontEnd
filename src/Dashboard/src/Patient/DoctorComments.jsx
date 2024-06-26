
import React from 'react';
import Budget from '../components/Budget/Budget'
import Sidebar from '../layout/Sidebar/Sidebar';
import Navbar from '../../../LandingPage/navbar/Navbar';

const DoctorComments = ({user,role}) => {
  return (
    <>
    <div className="black"><Navbar isLoggedIn={true} user={user} /></div>
    <div style={{ display: 'flex' }}>
    <Sidebar user={user} role="Patient" />
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' } } className="app profile" >
      <div style={{ width: '80%', maxWidth: '800px' }}>
        <Budget user={user} isPatient={false} role={role}  patientId={user['id']}/>
      </div>
    </div>
  </div>
    </>
);
}

export default DoctorComments;

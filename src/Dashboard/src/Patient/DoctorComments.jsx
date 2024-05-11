
import React from 'react';
import Budget from '../components/Budget/Budget'
import Sidebar from '../layout/Sidebar/Sidebar';


const DoctorComments = ({user}) => {
  return (
    <div style={{ display: 'flex' }}>
    <Sidebar user={user} role="Patient" />
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' } } className="app profile" >
      <div style={{ width: '80%', maxWidth: '800px' }}>
        <Budget user={user} />
      </div>
    </div>
  </div>
);
}

export default DoctorComments;

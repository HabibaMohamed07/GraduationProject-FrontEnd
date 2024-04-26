
import React from 'react';
import Budget from '../components/Budget/Budget'
import Sidebar from '../layout/Sidebar/Sidebar';


const DoctorComments = () => {
  return (
    <div style={{ display: 'flex' }}>
    <Sidebar role="Patient" />
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '80%', maxWidth: '800px' }}>
        <Budget />
      </div>
    </div>
  </div>
);
}

export default DoctorComments;

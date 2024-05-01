import React from 'react';
import Savings from '../components/Savings/Savings'
import Sidebar from '../layout/Sidebar/Sidebar';


const LastGamePlayed = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar role="Patient" />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="app profile">
        <div style={{ width: '80%', maxWidth: '800px' }}>
          <Savings />
        </div>
      </div>
    </div>
  );
}

export default LastGamePlayed;

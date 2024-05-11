import React from 'react';
import Loans from '../components/Loans/Loans'
import Sidebar from '../layout/Sidebar/Sidebar';

const Targets = ({user}) => {
    return (
        <div style={{ display: 'flex' }}>
        <Sidebar user={user} role="Patient" />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="app profile">
          <div style={{ width: '80%', maxWidth: '800px' }} >
            <Loans />
          </div>
        </div>
      </div>
    );
  }
  
  export default Targets;
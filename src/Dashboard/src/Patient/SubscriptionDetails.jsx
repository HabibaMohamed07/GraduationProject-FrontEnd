import React from 'react';
import Cards from '../components/Cards/Cards'
import Sidebar from '../layout/Sidebar/Sidebar';

const SubscriptionDetails = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar role="Patient" />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '80%', maxWidth: '800px' }}>
          <Cards />
        </div>
      </div>
    </div>
  );
}

export default SubscriptionDetails;

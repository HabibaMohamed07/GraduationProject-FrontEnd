import React from 'react';
import Report from '../components/Report/Report'
import Sidebar from '../layout/Sidebar/Sidebar';

const TreatmentProgress = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar role="Patient" />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '80%', maxWidth: '800px' }}>
          <Report />
        </div>
      </div>
    </div>
  );
}

export default TreatmentProgress;

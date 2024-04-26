import React from 'react';
import Subscriptions from '../components/Subscriptions/Subscriptions'
import Sidebar from '../layout/Sidebar/Sidebar';


const GameCalendar = () => {
    return (
      <div>
        <Sidebar role="Patient"  />
        <Subscriptions />
      </div>
    );
  }
  
  export default GameCalendar;
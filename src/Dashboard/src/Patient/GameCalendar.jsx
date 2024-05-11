import React from 'react';
import Subscriptions from '../components/Subscriptions/Subscriptions'
import Sidebar from '../layout/Sidebar/Sidebar';


const GameCalendar = ({user}) => {
    return (
      <div>
        <Sidebar user={user} role="Patient"  />
        <Subscriptions />
      </div>
    );
  }
  
  export default GameCalendar;
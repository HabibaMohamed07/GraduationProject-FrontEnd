import React from "react";
import Sidebar from "../layout/Sidebar/Sidebar";
import DoctorListPageContent from "./DoctorListPageContent.tsx";
import Navbar from "../../../LandingPage/navbar/Navbar";
export default function DoctorListPage({user,role})
{
    return (
      <>
   <div className="black"><Navbar isLoggedIn={true} user={user} role={role}/></div>
            <div className="app profile">
              <Sidebar user={user} role={role} />
              <DoctorListPageContent user={user} role={role}/>;
            </div>
</>
);
}
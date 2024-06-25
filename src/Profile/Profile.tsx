import ProfileAdmin from "./profile-admin.tsx";
import ProfilePatient from "./profile-patient.tsx";
import ProfileDoctor from "./profile-doctor.tsx";
import React from "react";
import "./profile.css";
import Sidebar from "../Dashboard/src/layout/Sidebar/Sidebar.jsx";
import Navbar from "../LandingPage/navbar/Navbar.js";
export default function MyProfile({ user, role }) {
  console.log("MyProfile: ",user)
  if (role === "Patient") {
    return (<>
      <div className="black"><Navbar isLoggedIn={true}user={user}/></div>
      <div className="app profile">
        <Sidebar user={user} role={role} />
        <ProfilePatient user={user} role={role} />;
      </div>
      </>
    );
  } else if (role === "Doctor") {
    return (
      <>
      <div className="black"><Navbar isLoggedIn={true}user={user}/></div>
      <div className="app profile">
        <Sidebar user={user} role={role} />
        <ProfileDoctor user={user} role={role} />;
      </div>
      </>
    );
  } else if (role === "Admin") {
    return (
      <>
      <div className="black"><Navbar isLoggedIn={true}user={user}/></div>
      <div className="app profile">
        <Sidebar user={user} role={role} />
        <ProfileAdmin user={user} role={role} />;
      </div>
      </>
    );
  }
}

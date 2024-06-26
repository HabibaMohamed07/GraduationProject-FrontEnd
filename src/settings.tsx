import React from "react";
import Sidebar from "./Dashboard/src/layout/Sidebar/Sidebar";
import { Button } from "@mui/material";
import Navbar from "./LandingPage/navbar/Navbar";
export default function Settings({user,role})
{
    return(
      <>
      <div className="black"><Navbar isLoggedIn={true}user={user} role={role}/></div>
        <div className="app profile">
        <Sidebar user={user} role={role} />
        <h1 style={{color:'white'}}> Settings</h1>
        <Button variant="outlined"  color="error"  style={{width:'10vh',height:'10vh', position:'relative',top:'50vh',left:'50vh'}} >
        Logout
      </Button>
        </div>
      </>
    )
}
import React from "react";
import Sidebar from "../layout/Sidebar/Sidebar";
import DoctorListPageContent from "./DoctorListPageContent.tsx";

export default function DoctorListPage({user})
{
    return (
      
            <div className="app profile">
              <Sidebar user={user} role={'Admin'} />
              <DoctorListPageContent/>;
            </div>
);
}
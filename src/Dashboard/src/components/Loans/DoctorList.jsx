import { iconsImgs } from "../../utils/images";
import "./Loans.css";
import { useState,useEffect } from "react";
import { url } from "../../../../config";
import axios from "axios";
const DoctorList = ({user,role}) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
   
   let geturl=url+"GetAllDoctors";
    console.log(geturl);
    console.log("The Role is : "+role);
    axios.get(geturl)
    .then(function (response) {
  
      const Doctors = response.data.data.map(doctor => doctor['name']);
      console.log("Doctors Available: ", response);
      setDoctors(Doctors);
    })
    .catch(function (error) {
      console.error("Error fetching Doctors:", error);
    });
 
  },[user]);
  
  return (
    <div className="subgrid-two-item grid-common grid-c7 scroll" style={{height:'150rem'}}>
        <div className="grid-c-title">
            <h3 className="grid-c-title-text" style={{textAlign:'center',position:'relative'}}>Doctors List</h3>
           
        </div>
        <div className="grid-c7-content" style={{position:'relative' , display:'grid' , paddingTop:'40px', gap: '25px'}}>
        {doctors.map((doctor, index) => (
          <ul key={index}>Dr. {doctor}</ul>
        ))}    </div>
    </div>
  )
}

export default DoctorList

import { iconsImgs } from "../../utils/images";
import "./Loans.css";
import axios from "axios";
import { useEffect, useState } from 'react';
import { url } from "../../../../config";

const PatientList = ({ user,role,isDoctorDetail,doctorId }) => {
  
  const [patients, setPatients] = useState([]);
  console.log("Users:",user)
  useEffect(() => {
    let geturl="";
   if (role=="Doctor")
   {geturl ="GetDoctorPatients?doctorid="+user['id'];
    geturl=url+geturl;
    console.log(geturl);
    console.log("The Role is : "+role);
  }
  else if(role=="Admin")
  {
    if(!isDoctorDetail){
    geturl="GetAllPatients";
    geturl=url+geturl;
    }
    else {
      geturl="GetDoctorPatients?doctorid="+doctorId;
    geturl=url+geturl;
    console.log(geturl);
    }
  }
  
    axios.get(geturl)
      .then(function (response) {
        
        const patientNames = response.data.data.map(patient => patient['name']);
        console.log(patientNames);
        setPatients(patientNames);
      })
      .catch(function (error) {
        console.error("Error fetching patients:", error);
      });
   
   },
  [user]);

  
  return (

<div className="subgrid-two-item grid-common grid-c7 scroll">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Patients List</h3>
       
      </div>
      <div className="grid-c7-content" style={{ position: 'relative', display: 'grid', paddingTop: '40px', gap: '25px' }}>
        {patients.map((patient, index) => (
          <ul key={index}>{patient}</ul>
        ))}
      </div>
    </div>
  );
        
//   else if(role=="Admin")
//   {
//     return (

//       <div className="subgrid-two-item grid-common grid-c7 scroll">
//             <div className="grid-c-title">
//               <h3 className="grid-c-title-text">Patients List</h3>
//               <button className="grid-c-title-icon">
//                 <img src={iconsImgs.plus} />
//               </button>
//             </div>
//             <div className="grid-c7-content" style={{ position: 'relative', display: 'grid', paddingTop: '40px', gap: '25px' }}>
//             <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//           <ul>Habiba Mohamed</ul>
//             </div>
//           </div>
//         );
//   }
// }}
        }
export default PatientList;

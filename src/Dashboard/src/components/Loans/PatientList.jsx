import { iconsImgs } from "../../utils/images";
import "./Loans.css";
import axios from "axios";
import { useEffect, useState } from 'react';

const PatientList = ({ user,role }) => {
  
  const [patients, setPatients] = useState([]);
  console.log("Users:",user)
  useEffect(() => {
    axios.get("https://localhost:7291/GetDoctorPatients?doctorid=" + user['id'])
      .then(function (response) {
        const patientNames = response.data.data.map(patient => patient['name']);
        setPatients(patientNames);
      })
      .catch(function (error) {
        console.error("Error fetching patients:", error);
      });
  }, [user]);
{
  if(role=="Doctor"){
  return (

<div className="subgrid-two-item grid-common grid-c7 scroll">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Patients List</h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <div className="grid-c7-content" style={{ position: 'relative', display: 'grid', paddingTop: '40px', gap: '25px' }}>
        {patients.map((patient, index) => (
          <ul key={index}>{patient}</ul>
        ))}
      </div>
    </div>
  );
        }
  else if(role=="Admin")
  {
    return (

      <div className="subgrid-two-item grid-common grid-c7 scroll">
            <div className="grid-c-title">
              <h3 className="grid-c-title-text">Patients List</h3>
              <button className="grid-c-title-icon">
                <img src={iconsImgs.plus} />
              </button>
            </div>
            <div className="grid-c7-content" style={{ position: 'relative', display: 'grid', paddingTop: '40px', gap: '25px' }}>
            <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
          <ul>Habiba Mohamed</ul>
            </div>
          </div>
        );
  }
}}

export default PatientList;

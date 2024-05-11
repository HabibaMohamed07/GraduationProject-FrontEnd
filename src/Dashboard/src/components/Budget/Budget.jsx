import "./Budget.css";
import { iconsImgs } from "../../utils/images";
import { budget } from "../../data/dataPatient";
import React,{useState,useEffect} from 'react';
import axios from 'axios';
var comments = [
  "There is a significant progress in the right hand functionality",
  "Excellent progress in the patient's recovery",
  "Patient's condition is stable",
  "Improvement observed in mobility",
  "Recovery is slower than expected",
  "Recovery is slower than expected",
  "Recovery is slower than expected",
  "Recovery is slower than expected",
  "Recovery is slower than expected",
  "Recovery is slower than expected",
  "Recovery is slower than expected",
  "Recovery is slower than expected",
  
];

const Budget = ({user}) => {
  console.log('user',user['id'])
  axios.get("https://localhost:7291/GetAllCommentsByDoctorId?id="+user['id']).then
  (res=>
    {
      if(res.data['data']!=null)
    
      {

        comments=res.data['data']
      }
      else{
        // comments=["No Comments were added by this Doctor"]
      }
    })
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Doctor Comments</h3>
        <button className="grid-c-title-icon">
          <img src={iconsImgs.plus} alt="Plus Icon" />
        </button>
      </div>
      <div className="grid-c4-content bg-jet scroll">
        <div className="grid-items">
          {budget.map((budgetItem, index) => (
            <div className="grid-item" key={budgetItem.id}>
              <div className="grid-item-l">
                <div className="icon">
                  <img src={iconsImgs.check} alt="Check Icon" />
                </div>
                <p className="text text-silver-v1">{comments[index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budget;

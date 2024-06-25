import "./Budget.css";
import { iconsImgs } from "../../utils/images";
import { budget } from "../../data/dataPatient";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from "../../../../config";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Budget = ({ user, isPatient, patientId }) => {
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  console.log('user', user['id']);

  useEffect(() => {
    let geturl = "";
    if (isPatient) {
      geturl = `${url}GetAllCommentsByPatientId?id=${patientId}`;
    } else {
      geturl = `${url}GetAllCommentsByDoctorId?id=${user['id']}`;
    }

    axios.get(geturl).then(res => {
      console.log(res);
      if (res.data['data'] != null) {
        const comments = res.data.data.map(comment => ({
          message: comment.message,
          id: comment.id,
          sender: comment.sender,
      
        }));
        setComments(comments);
      } else {
        setComments([{ message: 'No comments were added by the doctor', id: null }]);
      }
      console.log("Comments by doctor: ", comments);
    });
  }, [user,refresh]);

  function deleteComment(commentId) {
    // Implement the delete functionality here
    let deleteurl=url+"DeleteComment?id="+commentId;

    
    axios.delete(deleteurl).then(response=>{
      console.log(response)
      if(response.data.isSuccess)
      {
        alert("Deleted Comment Successfully");
        setRefresh(prev => !prev);
      }
      else
      {
        alert("Failed to delete comment");
      }
    })

  }

  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Doctor Comments</h3>
    
      </div>
      <div className="grid-c4-content bg-jet scroll">
        <div className="grid-items">
          {comments.map((commentItem, index) => (
            <div className="grid-item" key={index}>
              <div className="grid-item-l">
                <div className="icon">
                  <img src={iconsImgs.check} alt="Check Icon" />
                </div>
                <p className="text text-silver-v1">{commentItem.message}</p>
               
             
    
                {commentItem.id != null && (
        <IconButton aria-label="delete" size="small" sx={{ color: 'red' }} onClick={() => deleteComment(commentItem.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budget;

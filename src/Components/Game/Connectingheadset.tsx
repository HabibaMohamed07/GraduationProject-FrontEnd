import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import '../../App.css';
import Button from '@mui/material/Button';
import './SelectGame.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import ConnectingArmpng from '../../Assets/ConnectingArm.png';
import ConnectingEEGHEADSET from '../../Assets/eegheadsetgif.gif';
import Box from "@mui/joy/Box";
import LinearProgress from '@mui/joy/LinearProgress';
export default function Connectingheadset({onProgressHeadset})
{

    const [headsetsetprogress,setHeadsetProgress]=React.useState(0);
    
    
    useEffect(() => {
        const fetchProgress = async () => {
            try {
               
                const response = await axios.get('http://127.0.01:5000/headsetprogress');
                setHeadsetProgress(response.data.headsetconnection);
                console.log("headsetprogress : " ,  response.data.headsetconnection );
                // setProgress(100);
                if( response.data.headsetconnection===-1)
                {   
                    console.log("alert")
                    SetOpen(true)
                }
              else{
                SetOpen(false)
              }
            } catch (error) {
                console.error('Failed to fetch progress:', error);
            }
        };

        const intervalId = setInterval(fetchProgress, 5000); // Fetch progress every second
        return () => clearInterval(intervalId); // Cleanup interval

    }, []);
    useEffect(() => {
        onProgressHeadset(headsetsetprogress);
    }, [headsetsetprogress, onProgressHeadset]);

    const headsetConnecting = () => {
        axios.post("http://127.0.0.1:5000/headset")
          .then(response => {
            // console.log(progress)
            console.log(response.data);
          })
          .catch(error => {
            // console.log(progress)
            console.error("Error connecting:", error);
          });
      };
    const [open,SetOpen]=React.useState(false);
    return (
  <>
        <Stack sx={{ width: '100%' }} spacing={2} className=" center">
     
        <Button onClick={()=>headsetConnecting()} variant='outlined' sx={{ '&:hover': { backgroundColor: 'green', color:"#ffff" ,borderColor:'green', transition:'background-color 0.4s linear' }, height:'40px' ,width:'400px', position:'relative', top:'270%' , left:'-290px'}}>Connect to Headset</Button>
      
        <div style={{ position:'relative',left:'-30%', top:'80%'}}>
        <ol style={{color:'white' }}>
            <li>Check the arm is connected to the electricity </li>
            <br />
            <li>Check the arm is connected to the electricity</li>
            <br />
            <li>Check the button is connected to the arm</li>
        </ol>

        </div>
  
       
    </Stack>
   
    <img  src={ConnectingEEGHEADSET} className="ImageProp"  />
    <LinearProgress className="Progress" determinate value={headsetsetprogress} />
    <Alert  severity="info" style={{display:open?"":'none'}}>Please make sure to connect your Headset</Alert>
    
    </>
    )
}

import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import '../../App.css';
import Button from '@mui/material/Button';
import './SelectGame.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import ConnectingArmpng from '../../Assets/ConnectingArm.png';
import ConnectingArmgif from '../../Assets/ConnectingArmgif.gif';
import Box from "@mui/joy/Box";
import LinearProgress from '@mui/joy/LinearProgress';
export default function ConnectingArm({onProgress})
{

    const [progress,setProgress]=React.useState(0);
    
    
    useEffect(() => {
        const fetchProgress = async () => {
            try {
               
                const response = await axios.get('http://127.0.01:5000/progress');
                setProgress(response.data.percentage);
                console.log("progress : " ,  response.data.percentage );
              
        
                if( response.data.percentage===-1)
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

        const intervalId = setInterval(fetchProgress, 1000); // Fetch progress every second
        return () => clearInterval(intervalId); // Cleanup interval

    }, []);
    useEffect(() => {
        onProgress(progress);
    }, [progress, onProgress]);

    const handleClick = () => {
        
        axios.post("http://127.0.0.1:5000/connect")
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
     
        <Button onClick={()=>handleClick()} variant='outlined' sx={{ '&:hover': { backgroundColor: 'green', color:"#ffff" ,borderColor:'green', transition:'background-color 0.4s linear' }, height:'40px' ,width:'400px', position:'relative', top:'270%' , left:'-290px'}}>Connect to Arm</Button>
      
        <div style={{ position:'relative',left:'-23%', top:'80%'}}>
        <ol style={{color:'white' }}>
            <li>Verify the robotic arm's connection to a power source </li>
            <br />
            <li>Ensure the power is switched on & turn on the bluetooth on your pc</li>
            <br />
            <li>Connect the gloves to the computer via USB cable</li>
        </ol>

        </div>
  
     
        
    </Stack>
   
    <img  src={ConnectingArmgif} className="ImageStyle"  />
    <LinearProgress className="Progress" determinate value={progress} />
    <Alert  severity="info" style={{display:open?"":'none'}}>Please make sure to connect your Arm</Alert>
    </>
    )
}

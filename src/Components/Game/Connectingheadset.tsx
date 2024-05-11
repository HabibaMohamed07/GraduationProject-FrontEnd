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
import Launch from '@mui/icons-material/Launch';
import Link from '@mui/joy/Link';
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
      
        <div style={{ position:'relative',left:'-15%', top:'60%'}}>
        <ol style={{color:'white' }}>
            <li>Check you have installed 
              <Link href="https://www.emotiv.com/products/emotiv-launcher" target="_blank" rel="noopener noreferrer" startDecorator={<Launch />}>
              EMOTIV Launcher 
              </Link>
               & conncted to it Via Dongle or USB cable

            </li>
            <br />
            <li>Check you have placed the headset in the right    
            <Link 
            href="https://emotiv.gitbook.io/epoc-x-user-manual/introduction/introduction-to-epoc-x/coverage"
            target="_blank"
            rel="noopener noreferrer"
            endDecorator={<Launch/>} 
            sx={{paddingLeft:'5px'}}> placements</Link>  </li>
            <br />
            <li>Check the headset is charged (preferably to be 100%)</li>
          
            
            
        </ol>
       
       
        </div>
  
       
    </Stack>
   
    <img  src={ConnectingEEGHEADSET} className="ImageProp"  />
    <LinearProgress className="Progress" determinate value={headsetsetprogress} />
    <Alert  severity="info" style={{display:open?"":'none'}}>Please make sure to connect your Headset</Alert>
    
    </>
    )
}

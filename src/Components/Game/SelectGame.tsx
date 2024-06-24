import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import '../../App.css';
import Button from '@mui/material/Button';
import './SelectGame.css';
import ConnectingArm from './connectingarm.tsx';
import Box from "@mui/joy/Box";
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';
import Connectingheadset from './Connectingheadset.tsx';
import Choosinggame from './choosinggame.tsx';
import Navbar from '../../LandingPage/navbar/Navbar';
const steps = ['Connecting To Arm', 'Connecting To HeadSet', 'Choosing Game'];
export default function SelectGame() {
    const totalSteps = steps.length;
    const [activeStep, setActiveStep] = React.useState(0); 
   
    const handleNext = () => {
        setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, totalSteps - 1));
      };

      const handleConnectingArmProgress = (progress) => {
        if (progress === 100 &&activeStep==0) {
            handleNext();
        }
    };
      const handleConnectingHeadsetProgress = (headsetprogress) => {
        if (headsetprogress === 100 &&activeStep==1) {
            handleNext();
        }
      
    };
    return (
      <>
      <div className="black"><Navbar isLoggedIn={true}user={user}/></div>
        <div className='black' style={{height:'100%'}}>      
         <Box
            component="main"
            sx={{
                
                backgroundColor:'#030912',
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 1000,
              height:600,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
            
            }}
          >
            {activeStep==0&&(
<ConnectingArm  onProgress={handleConnectingArmProgress}/>
            )}
            {activeStep==1&&(
<Connectingheadset  onProgressHeadset={handleConnectingHeadsetProgress}/>
            )}
            {activeStep==2&&(
            <Choosinggame/>
            )}
        <Stepper sx={{ width: '100%' ,position:"relative"}}>
        {steps.map((step, index) => (
          <Step
          
            key={step}
            indicator={
              <StepIndicator
                variant={activeStep <= index ? 'soft' : 'solid'}
                color={activeStep < index ? 'neutral' : 'primary'}
              >
                {activeStep <= index ? index + 1 : <Check />}
              </StepIndicator>
            }
            sx={{
                
              '&::after': {
                ...(activeStep > index &&
                  index !== totalSteps - 1 && { bgcolor: 'primary.solidBg' }),
              },
            }}
          >
            <StepButton sx={{color:'white'}}>{step}</StepButton>
          </Step>
        ))}
      </Stepper>
        </Box>

        <div>
        {/* Next button */}
        <button onClick={handleNext} disabled={activeStep === totalSteps - 1}>
          Next
        </button>
       
      </div>
        </div>
        </>
    );
}

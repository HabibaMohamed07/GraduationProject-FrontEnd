import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { purple } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { url } from '../../../config';
const primaryLabels = [
  "Patients Work",
  "Heart Disease",
  "Lung Disease",
  "Kidney Disease",
  "AutoImmune Disease",
  "Previous Surgery",
  "Previous Accident",
  "Patient Takes Medications",
  "Patient Smoke",
  "Patient drinks alcohol",
  "Patient able to walk without assistance",
  "Patient has difficulty speaking or understanding language",
  "Patient can reach for and grab objects easily",
  "Patient has problem turning their head or looking in different directions",
  "Patient struggles with part"
];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewHistory({ patient }) {
  const [open, setOpen] = useState(false);
  const [patientHistory, setPatientHistory] = useState([]);

  useEffect(() => {
    // Fetch patient history from API
    fetchPatientHistory();
  }, []); // Runs once on component mount

  const fetchPatientHistory = async() => {
    
    
      let geturl=url+"GetPatientDetails?patientid="+patient.patient.patientid;

      const response = await axios.get(geturl).then(response=>{

        const data = response.data; // Assuming data is in JSON format

      // Split history at '@' and update state
      if (data.data) {
        console.log(data.data)
        const historyItems = data.data.patientAttributes.PatientHistory.split('@');
       
        console.log("History: ",historyItems)
        setPatientHistory(historyItems);
      }
      else {
        console.error('Data or history field is missing from API response');
      }
    })
      };
      
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} startIcon={<AssignmentIcon sx={{ color: purple[50] }} />}>
        View Medical History
      </Button>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', backgroundColor: 'rgb(4,12,24)' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {patient.patient.PatientName}'s Medical History
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={{ backgroundColor: 'grey', p: 4 }}>
          <List>
            {primaryLabels.map((label, index) => (
              <React.Fragment key={index}>
                <ListItemButton>
                  <ListItemText primary={label} secondary={patientHistory[index] || 'Not available'} />
                </ListItemButton>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Dialog>
    </React.Fragment>
  );
}

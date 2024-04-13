import * as React from 'react';
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
import './doctor.css'
import { CssVarsProvider } from '@mui/joy';
import { TransitionProps } from '@mui/material/transitions';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { purple } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewHistory({patient}) {
    
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
   
  
    <React.Fragment>
  
      <Button variant="contained"  onClick={handleClickOpen} startIcon={<AssignmentIcon  sx={{ color: purple[50] }}/>}>
       View Medical History
      </Button>
    
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
   
      >
        
        <AppBar sx={{ position: 'relative' ,backgroundColor:'rgb(4,12,24)'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {patient.patient.PatientName}'s Medical History
            </Typography>
          
          </Toolbar>
        </AppBar>
        <Paper sx={{ backgroundColor: 'grey', p: 4 }}> 
        <List>
          <ListItemButton>
            <ListItemText primary="Patients Work" secondary="Yes" />
            <ListItemText primary="CEO of realstate agency" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Heart Disease" secondary="Yes" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Lung Disease" secondary="Yes" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Kidney Disease" secondary="Yes" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="AutoImmune Disease" secondary="Yes" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Previous Surgery" secondary="Yes" />
            <ListItemText primary="Kidney Transplant" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Previous Accident" secondary="Yes" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Patient Takes Medications" secondary="Yes" />
            <ListItemText primary="Panadol" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Patient Smoke" secondary="Yes" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Patient drinks alcohol" secondary="Yes" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Patient able to walk without assistance" secondary="Yes" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Patient has difficulty speaking or understanding language " secondary="Yes" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Patient can reach for and grab objects easily" secondary="Yes" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="Patient has problem turning their head or looking in different directions" secondary="Yes" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Patient struggles with part"
              secondary="Left"
            />
          </ListItemButton>
        </List>
      </Paper>
      </Dialog>

    </React.Fragment>

  
 );
}
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BlockIcon from '@mui/icons-material/Block';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
export default function Unassign() {
  const [open, setOpen] = React.useState(false);
  const [snackopen,setSnackOpen]= React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirmation =()=>
  {
   console.log("unassigning the patient...");
   setSnackOpen(true);
//    navigate('/PatientList');
   
  }
  return (
    <React.Fragment>
      <Button variant="outlined"  color="error" startIcon={<BlockIcon  sx={{ color: purple[50] }}/>}  onClick={handleClickOpen}>
       Unassign
      </Button>

      <Dialog
    
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
    <div style={{backgroundColor:'rgb(4,12,24)',color:'white'}}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"  sx={{color:'white'}}>
           Once you accept the patient will  be unassigned and can no longer access this patient details.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmation} autoFocus>
            Confirm
          </Button>
        </DialogActions>
    </div>
      </Dialog>

        
<Snackbar
variant="soft"
color="success"
open={snackopen}
onClose={() => {setSnackOpen(false); navigate('/PatientList')}}
anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
endDecorator={
  <Button
    onClick={() => {setSnackOpen(false); navigate('/PatientList');}}
    
    
    color="success"
  >
    Dismiss
  </Button>
}
>
The patient has been unassigned you can no longer access this patient!
</Snackbar>

    

    </React.Fragment>
  );
}
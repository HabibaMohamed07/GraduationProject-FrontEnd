import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DescriptionIcon from '@mui/icons-material/Description';
import { purple } from '@mui/material/colors';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
export default function FileRequest() {
  const [open, setOpen] = React.useState(false);
    const [snackopen,setSnackOpen]= React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined"  sx={{width:"24%",height:"auto",maxwidth:"23%"}} onClick={handleClickOpen}  startIcon={<DescriptionIcon  sx={{ color: purple[50] }}/>} >
        File Request 
      </Button>
      <Dialog
    
        open={open}
        onClose={handleClose}
        PaperProps={{
        
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.request;
            console.log(email);
            setSnackOpen(true);
            handleClose();

          },
        }}
      >
        <div style={{backgroundColor:'rgb(4,12,24)',color:'white'}}>
        <DialogTitle>Requesting a File</DialogTitle>
        <DialogContent sx={{color:'white'}}>
          <DialogContentText sx={{color:'white'}}>
                Request a file from the patient.
          </DialogContentText>
          <TextField 
           
            autoFocus
            required
            margin="dense"
            id="name"
            name="request"
            label="Request File"
            type="text"
            fullWidth
            variant="standard"
            InputLabelProps={{
                sx: { color: 'white' } // Change label color to white
              }}
              InputProps={{
                sx: {
                  color: 'white', // Change input text color to white
                  '&::before': {
                    borderBottomColor: 'white' // Change underline color to white
                  },
                  '&:hover::before': {
                    borderBottomColor: 'white' // Change underline color to white on hover
                  },
                  '&:focus::before': {
                    borderBottomColor: 'white' // Change underline color to white on focus
                  }
                }
              }}
          />
        </DialogContent>
        
        <DialogActions >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" >Request</Button>
        </DialogActions>
        </div>
      </Dialog>

      
<Snackbar
variant="soft"
color="success"
open={snackopen}
onClose={() => setSnackOpen(false)}
anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
endDecorator={
  <Button
    onClick={() => setSnackOpen(false)}
    
    
    color="success"
  >
    Dismiss
  </Button>
}
>
Your file request has been sent !
</Snackbar>
    </React.Fragment>

    
  );
}
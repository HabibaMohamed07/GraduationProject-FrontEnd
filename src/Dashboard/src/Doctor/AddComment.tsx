import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import { IconButton, Stack } from '@mui/joy';
import Snackbar from '@mui/joy/Snackbar';
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Sidebar from '../layout/Sidebar/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChatProps } from './typing';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import Navbar from '../../../LandingPage/navbar/Navbar';
import axios from 'axios';
import { url } from '../../../config';
type MessagesPaneProps = {
    chat: ChatProps;
  };

      
export default function AddingComment({user})
{ const location = useLocation();
    const navigate=useNavigate();
    const [textAreaValue, setTextAreaValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const received = location.state;
    const patientinfo=received.receivedObject;
    return(
        <>
        <div className="black"><Navbar isLoggedIn={true} user={user}/></div>
        <div className="app profile">
        <Sidebar user={user} role={'Doctor'} />
         
      <div className="grid-one-item grid-common grid-c2 " style={{position:'relative',margin:'10vh',height:'100%',width:'100%'}}>
        

        <div className="grid-content ">
          <div className="grid-items">
            {
<>
<ArrowBackIosIcon style={{cursor:'pointer'}} onClick={()=> navigate('/PatientDetails',{ state: { patient: patientinfo.patient } })}>

</ArrowBackIosIcon>
        
<div style={{display:'grid',paddingBottom:'10px' , paddingTop:'10px' }} > 
 <Stack direction="row" spacing={2}>
           
                  <FormLabel>To</FormLabel>
                  <Input size="sm" defaultValue={received.receivedObject.patient.PatientName} disabled />
           
                  
                </Stack>
                
                <Stack direction="row" spacing={2} sx={{paddingTop:'10px'}}>
                <FormLabel>From</FormLabel>
                  <Input size="sm" defaultValue={received.receivedObject.patient.DoctorAssignedTo} disabled />
               
                </Stack>
                </div>

        <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => { 
        console.log("Adding Comment..",textAreaValue)
        let posturl=url+"AddComment";
        console.log(posturl)
        let data={
       
          patientId:received.receivedObject.patient.patientid,
          doctorId:user['id'],
          message:textAreaValue,
          sender:user['name'],
          receiver:received.receivedObject.patient.PatientName,
          date:"2024-06-26T19:36:45.278Z",
        };
      
        console.log(data);
        axios.post(posturl,data).then(function (response) {
          console.log(response);
          if (response.data.isSuccess) {
            setOpen(true);
          } else {
            alert("Couldn't add comment: "+response.data.message);
          }
        });
        } 
        }
        />       
    
    </>
}

   
        
   
        </div>
        </div>
        </div>
        </div>

<Snackbar
variant="soft"
color="success"
open={open}
onClose={() => setOpen(false)}
anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
endDecorator={
  <Button
    onClick={() => setOpen(false)}
    size="sm"
    variant="soft"
    color="success"
  >
    Dismiss
  </Button>
}
>
Added Comment
</Snackbar>
</>
    )
}



type MessageInputProps = {
  textAreaValue: string;
  setTextAreaValue: (value: string) => void;
  onSubmit: () => void;
};
 function MessageInput(props: MessageInputProps) {

  const { textAreaValue, setTextAreaValue, onSubmit } = props;
  const textAreaRef = React.useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (textAreaValue.trim() !== '') {
      onSubmit();
      setTextAreaValue('');
    }
  };
  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <FormControl>
        <Textarea
          placeholder="Type something here…"
          aria-label="Message"
          ref={textAreaRef}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
          value={textAreaValue}
          minRows={3}
          maxRows={10}
          endDecorator={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexGrow={1}
              sx={{
                py: 1,
                pr: 1,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <div>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatBoldRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatItalicRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <StrikethroughSRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatListBulletedRoundedIcon />
                </IconButton>
              </div>
              <Button
                size="sm"
                color="primary"
                sx={{ alignSelf: 'center', borderRadius: 'sm' }}
                endDecorator={<SendRoundedIcon />}
                onClick={handleClick}
              >
                Send
              </Button>
            </Stack>
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              handleClick();
            }
          }}
          sx={{
            '& textarea:first-of-type': {
              minHeight: 72,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}
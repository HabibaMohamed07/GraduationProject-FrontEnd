import { useEffect } from 'react';
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import { Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { url } from '../../../config';


interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  name: HTMLInputElement;
  number: HTMLInputElement;
}
interface AddDoctor extends HTMLFormElement {
  readonly elements: FormElements;
}






export default function AddDoctor() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({
      email:'',
      name:'',
      password:'',
      age:0,
      phoneNumber:'',
      gender:'',
      patientHistory:''
    });
    const handleAddingDoctor = (data: any) => {
      let posturl = url + "AddDoctor";
      console.log(data);
      axios.post(posturl, data)
        .then(function (response) {
          console.log(response);
          if (response.data.isSuccess) {
            setOpen(true);
          } else {
            console.log(response.data.message)
            alert("Couldn't add Doctor: "+response.data.message);
          }
        });
    };
    
    useEffect(() => {
        const timeout = setTimeout(() => {
          setOpen(false); // Set open to false after 5 seconds
        }, 5000);
    
        // Clear the timeout if component unmounts or open changes
        return () => clearTimeout(timeout);
      }, [open]);
  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        mx: 'auto',
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Typography level="title-lg" startDecorator={<InfoOutlined />}>
        Add New Doctor
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >
         <form
                onSubmit={(event: React.FormEvent<AddDoctor>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const data = {
                    email: formElements.email.value,
                    password:formElements.email.value.split("@")[0]+'@'+24,
                    name:formElements.name.value.trim().replace(/\s+/g, ''),
                    age: 0,
                    phoneNumber: formElements.number.value,
                    gender:"male",
                    patientHistory:"String"
                  };
                  alert(JSON.stringify(data, null, 2));
           
                  
                  handleAddingDoctor(data)
                }}
              >
        <FormControl sx={{ gridColumn: '1/-1',width:'200%' }} required>
          <FormLabel>Doctor Name</FormLabel>
          <Input name="name"/>
        </FormControl>
        <br/>
        <FormControl required sx={{width:"200%"}}>
          <FormLabel>Phone Number</FormLabel>
          <Input name="number" />
        </FormControl>
        <br />
        <FormControl required sx={{width:'200%'}}>
          <FormLabel>Email</FormLabel>
          <Input  type="email" name="email" />
        </FormControl>
        <br />
        <Stack sx={{ width: '200%' }} spacing={2}>
     
     <Button variant="solid" color="primary"  type="submit" >
       Add Doctor
     </Button>

     <Alert  severity="success" style={{display:open?"":'none'}}  onClose={() => setOpen(false)}>Added Doctor</Alert>
     </Stack>
        </form>
    
     
      </CardContent>
  
    </Card>

 

    
  );
}
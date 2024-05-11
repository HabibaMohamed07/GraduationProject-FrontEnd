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
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import Stack from '@mui/material/Stack';
import axios from 'axios';


const options=[
  'Dr.Mina', 'Dr.Walaa','Dr.Youssef','Dr.Mai'
]


interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  name: HTMLInputElement;
  number: HTMLInputElement;
}
interface addPatient extends HTMLFormElement {
  readonly elements: FormElements;
}



export default function AddPatient() {
  const [data, setData] = React.useState({
    email:'',
    name:'',
    password:'',
    age:0,
    phoneNumber:'',
    gender:'',
    patientHistory:''
  });

  function handleAddingPatient()
  {
    console.log(data)
   axios.post("https://localhost:7291/RegisterAsync",data)
    .then(function(response)
    {
  console.log(response.data)
  if (response.status === 200){
    setOpen(true)
    setData({
      email: '',
      name: '',
      password: '',
      age: 0,
      phoneNumber: '',
      gender: '',
      patientHistory: ''
    });


  }
    else {
      alert("Couldn't add user")
    }
    })
  }
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<string | null>(options[0]);
    const [inputValue, setInputValue] = React.useState('');
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
        Add New Patient
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
          onSubmit={(event: React.FormEvent<addPatient>) => {
            event.preventDefault();
            const formElements = event.currentTarget.elements;
            const data = {
              email: formElements.email.value,
              password:formElements.email.value.split("@")[0]+'@'+24,
              name: formElements.name.value,
              age: 0,
              phoneNumber: formElements.number.value,
              gender:"male",
              patientHistory:"string"
            };
            alert(JSON.stringify(data, null, 2));
            setData(data)
            
            handleAddingPatient()
          
          }}
        >
        <FormControl sx={{ gridColumn: '1/-1',width:"200%" }}>
          <FormLabel>Patient Name</FormLabel>
          <Input id="name" name="name"/>
        </FormControl>
        <FormControl sx={{width:"200%"}}>
          <FormLabel>Phone Number</FormLabel>
          <Input  id="number" name="number" />
        </FormControl>
        <FormControl sx={{width:"200%"}}>
          <FormLabel>Email</FormLabel>
          <Input id="email" name="email"/>
        </FormControl>
        <FormControl>
        <FormLabel>Assign To</FormLabel>
        <Autocomplete
        variant="soft"
        placeholder="Soft variant"
        options={options}
        sx={{ width: 300 }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        
      />
      </FormControl>
        <CardActions sx={{ gridColumn: '1/-1' ,width:"200%"}}>
        <Stack sx={{ width: '100%' }} spacing={2}>
     
          <Button variant="solid" color="primary" type="submit" >
            Add Patient
          </Button>
          <Alert  severity="success" style={{display:open?"":'none'}}  onClose={() => setOpen(false)}>Added Patient</Alert>
          </Stack>
          
        </CardActions>
        </form>
      </CardContent>
  
    </Card>

 

    
  );
}
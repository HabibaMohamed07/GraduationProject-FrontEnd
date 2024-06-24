import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Autocomplete from '@mui/joy/Autocomplete';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { url } from '../../../config';
import { Alert } from '@mui/material';

const options = ['Dr.Mina', 'Dr.Walaa', 'Dr.Youssef', 'Dr.Mai'];

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  name: HTMLInputElement;
  number: HTMLInputElement;
}

interface addPatient extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function AddPatient() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(options[0]);
  const [inputValue, setInputValue] = useState('');

  const handleAddingPatient = (data: any) => {
    let posturl = url + "RegisterAsync";
    console.log(data);
    axios.post(posturl, data)
      .then(function (response) {
        console.log(response);
        if (response.data.isSuccess) {
          setOpen(true);
        } else {
          alert("Couldn't add user: "+response.data.message);
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
              password: formElements.email.value.split("@")[0] + '@' + 24,
              name: formElements.name.value.trim().replace(/\s+/g, ''),
              age: 0,
              phoneNumber: formElements.number.value,
              gender: "male",
              patientHistory: "string"
            };
            alert(JSON.stringify(data, null, 2));
            handleAddingPatient(data);
          }}
        >
          <FormControl sx={{ gridColumn: '1/-1', width: "200%" }} required>
            <FormLabel>Patient Name</FormLabel>
            <Input id="name" name="name" />
          </FormControl>
          <FormControl sx={{ width: "200%" }} required>
            <FormLabel>Phone Number</FormLabel>
            <Input id="number" name="number" />
          </FormControl>
          <FormControl sx={{ width: "200%" }} required>
            <FormLabel>Email</FormLabel>
            <Input id="email" name="email" />
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
          <CardActions sx={{ gridColumn: '1/-1', width: "200%" }}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Button variant="solid" color="primary" type="submit">
                Add Patient
              </Button>
              <Alert severity="success" style={{ display: open ? "" : 'none' }} onClose={() => setOpen(false)}>Added Patient</Alert>
            </Stack>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}

import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Navbar from '../../../LandingPage/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import axios from 'axios';
import { url } from '../../../config';
import { useEffect } from 'react';
import Sidebar from '../layout/Sidebar/Sidebar';

export default function AssignDoctor({ user }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const location = useLocation();
  const received = location.state;

  useEffect(() => {
    let geturl = url + "GetUnAssignedPatients";
    axios.get(geturl).then(response => {
      const patients = response.data.data.map(patient => ({
        id: patient.id,
        name: patient.name
      }));
      setOptions(patients);
    }).catch(error => {
      console.error("Error fetching patients:", error);
    });
  }, []);

  function handleAssign() {
    if (value) {
      const payload = {
        patientId: value.id,
        doctorId: received.receivedObject.doctor.doctorid
      };
      let posturl = url + "AddDrPatients";
      axios.post(posturl, payload).then(response => {
        console.log('Patient assigned successfully', response);
        setOpen(true);
      }).catch(error => {
        console.error('Error assigning patient:', error);
      });
    } else {
      console.error('No patient selected');
    }
  }

  return (
    <>
      <div className="black"><Navbar isLoggedIn={true} user={user} role={"Admin"}/></div>

      <div className="app profile">
        <Sidebar user={user} role={'Admin'} />

        <div>
          <div className="subgrid-two-item grid-common grid-c7 scroll" style={{ position: 'relative', margin: '30vh', height: 'auto', width: '100%' }}>
            <div className="grid-c-title">
              <h3 className="grid-c-title-text">Select A Patient</h3>
            </div>
            <Typography level="body-sm" sx={{ mb: 1 }}>
              <code>value: </code>
              <Typography variant="soft" sx={{ py: 0.4 }}>
                <code>
                  <strong>{`${value !== null ? `'${value.name}'` : 'null'}`}</strong>
                </code>
              </Typography>
            </Typography>
            <Typography level="body-sm">
              <code>inputValue: </code>
              <Typography variant="soft" sx={{ py: 0.4 }}>
                <code>
                  <strong>{`'${inputValue}'`}</strong>
                </code>
              </Typography>
            </Typography>
            <br />

            <Autocomplete
              variant="soft"
              placeholder="Soft variant"
              options={options}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              )}
            />

            <Button onClick={handleAssign} sx={{ marginTop: '10px' }} color="success">
              Assign to {received.receivedObject.doctor.DoctorName}
            </Button>
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
          Assigned The Patient
        </Snackbar>
      </div>
    </>
  );
}

import React from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from "../layout/Sidebar/Sidebar";
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/material/Button';
import BlockIcon from '@mui/icons-material/Block';
import DescriptionIcon from '@mui/icons-material/Description';
import { purple } from '@mui/material/colors';
import Report from "../components/Report/Report";
import Budget from "../components/Budget/Budget";
import FileRequest from "./FileRequest.tsx";
import Unassign from "./Unassign.tsx";
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import './doctor.css';
// import './DoctorList.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ViewHistory from "./ViewHistory.tsx";
import Navbar from "../../../LandingPage/navbar/Navbar";
import { personsImgs } from "../utils/images";

interface Data {
    id: number;
    File: string;
  }
  
  function createData(
    id: number,
   File:string
  ): Data {
    return { id,File};
  }

const rows = [
    createData(1, 'X-ray'),
    createData(2, 'CBC'),
    createData(3, 'Heart test'),
    createData(4, 'Test34'),
    createData(5, 'Blood Test'),
    createData(6, 'Blood Test'),
  ];
  interface Column {
    id: 'File' | 'Link';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns : readonly Column[]=[
    { id: 'File', label: 'File', minWidth: 170 },
   
   
   
  ];
export default function PatientDetails({user})
{
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
      ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    
    const navigate=useNavigate();
    const location = useLocation();
    const receivedObject = location.state;
    console.log(receivedObject);

    
    const handleClick = () => {
      console.log('Adding Comments...'+receivedObject.patient.PatientName);
      // Navigate to DoctorDetails page and pass rowData as state
      navigate('/AddComment', { state: { receivedObject } });
    };
  
    return (
      <><div className="black"><Navbar isLoggedIn={true} user={user} role={"Doctor"}/></div>
        <div className="app profile">
        <Sidebar user={user} role={'Doctor'} />
    
        <Stack
        spacing={4}
       
      >
      <div className="grid-one-item grid-common grid-c2 " style={{position:'relative',margin:'10vh',height:'auto',width:'100%' ,maxWidth:'1000px'}}>
        

        <div className="grid-content ">
          <div className="grid-items">
            {
              <div className="grid-item">
                <div className="grid-item-l">
                <div className="PersonalInfo" >
                <div className="ImgeandTitle">
                  <div className="avatar img-fit-cover"  style={{ width: '150px', height: '150px' ,maxHeight:'150px',maxWidth:'150px'}}>
                    <img  src={personsImgs.person_two}  alt="" />
                  
                  </div>
                  <h1 style={{marginLeft:'2rem'}}>{receivedObject.patient.PatientName}</h1>
                 
                  </div>
                  <br />
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Personal Info</FormLabel>
               
                 <div style={{display:'flex'}}>
                  <Input size="sm" placeholder="First name" sx={{ flexGrow: 1 }}  defaultValue={receivedObject.patient.PatientName}  disabled/>
                 
                  </div>
                  <Input size="sm" placeholder="Phone Number" sx={{ flexGrow: 1 }}  defaultValue={receivedObject.patient.PhoneNumber} disabled/>
                
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input size="sm" defaultValue="Patient" disabled />
                </FormControl>
                
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="email"
                    defaultValue={receivedObject.patient.Email}
                    sx={{ flexGrow: 1 }}
                    disabled
                  />
                </FormControl>


              </Stack>
              <br />
              <Stack direction="row" spacing={2}>
              <Unassign/>
      <FileRequest/>
      <ViewHistory patient={receivedObject}/>

      </Stack>
     
            </Stack>
            </div>
            </div>



            <div style={{display:'grid',gridColumn:'1',marginLeft:'50px'}}>
            <div className="subgrid-two-item grid-common grid-c7 scroll">
                <Report/>
                
            </div>
            <div className="scroll">
            <Budget user={user} isPatient={true} role={"Doctor"} patientId={receivedObject.patient.patientid} />
            </div>
    <Button onClick={()=>handleClick()} variant="contained" sx={{marginTop:'10px'}} color="success">
        Add
      </Button>
          
         </div>
         </div>
        }   
        
          </div>
                </div>
           

      </div>
      
      <Card sx={{ backgroundColor: 'rgb(4,12,24)', mb: 2 , left:'10vh',maxWidth:'900px'}}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Required Papers</Typography>
            <Typography level="body-sm">
             Uploaded papers for the doctor.
            </Typography>
          </Box>
         
          <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => { 
                return(
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#232933', color: '#FFFF' }}
                >
                  {column.label}
                </TableCell>
              )})}
              
              <TableCell style={{ minWidth: 170, backgroundColor: '#232933', color: '#FFFF' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    {columns.map((column) => {
                     
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{ color: 'white' }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
              })}
                    <TableCell style={{ color: 'white' ,cursor: 'pointer'}}>
                    <MoreHorizIcon onClick={() =>alert("Downloading..")} />
                    </TableCell>
                  </TableRow>
                );
                  
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ backgroundColor: '#232933', color: '#FFFF' }}
      />
           
            
   
        </Card>
    </Stack>

        </div>
        </>
      );
  
}


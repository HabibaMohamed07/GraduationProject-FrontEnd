import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './DoctorList.css';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import { url } from '../../../config';
interface Column {
  id: 'DoctorName' | 'Status' | 'PatientsSupervising'|'PhoneNumber'|'Email';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'DoctorName', label: 'DoctorName', minWidth: 170 },
  { id: 'Status', label: 'Status', minWidth: 100 },
  {
    id: 'PatientsSupervising',
    label: 'Patients Supervising no.',
    minWidth: 170,
    align: 'right',
  },
  {id:'PhoneNumber',label:'PhoneNumber'},
  {id:'Email',label:'Email'},
];

interface Data {
  id: number;
  DoctorName: string;
  Status: string;
  PatientsSupervising: number;
  PhoneNumber:string;
  Email:string
  doctorid:string;
}

function createData(
  id: number,
  DoctorName: string,
  Status: string,
  PatientsSupervising: number,
  PhoneNumber:string,
  Email:string,
  doctorid:string,
): Data {
  return { id, DoctorName, Status, PatientsSupervising,PhoneNumber,Email,doctorid};
}



export default function DoctorListView({role}) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<Data[]>([]);



  useEffect(() => {
    let geturl=url+"GetAllDoctors";
    if(role=="Admin"){
    axios.get(geturl).then((response) => {
      const doctors = response.data.data;
      const newRows = doctors.map((doctor: any, index: number) =>
        createData(
          index + 1,
          'Dr. '+doctor.name,
          'Available',
          doctor.numOfPatients,
          doctor.phonenumber,
          doctor.email,
          doctor.doctorid
        )
      );
      setRows(newRows);
    });
  }
  }, []);



  const handleCellClick = (row: Data) => {
    console.log(row);
    // Navigate to DoctorDetails page and pass rowData as state
    navigate('/DoctorDetails', { state: { doctor: row as Data } });
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'rgb(4,12,24)', color: 'white' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => { if(column.id!='PhoneNumber'&&column.id!='Email'){
                return(
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#232933', color: '#FFFF' }}
                >
                  {column.label}
                </TableCell>
              )}})}
              
              <TableCell style={{ minWidth: 170, backgroundColor: '#232933', color: '#FFFF' }}>View</TableCell>
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
                      if (column.id !== 'PhoneNumber' && column.id !== 'Email') {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{ color: 'white' }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
              }})}
                    <TableCell style={{ color: 'white' ,cursor: 'pointer'}}>
                      <MoreHorizIcon onClick={() => handleCellClick(row)} />
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
    </Paper>
  );
}

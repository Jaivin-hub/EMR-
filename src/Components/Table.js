import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ApiHelper } from '../Helper/Apihelper';
import { API } from '../config/api';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({ List }) {

    // const [patientList, setPatientList] = useState([])

    // useEffect(() => {
    //     console.log('mounting')
    //     ApiHelper.get(API.listPatients).then((response) => {
    //         setPatientList(response.data.patientList)
    //     }).catch((err) => {
    //         console.log('error', err)
    //     })
    // }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell>Patient ID</TableCell> */}
                        <TableCell >Name</TableCell>
                        <TableCell >Qualification</TableCell>
                        <TableCell >Address</TableCell>
                        <TableCell >Specialization</TableCell>
                        <TableCell >Contact No</TableCell>
                        <TableCell >Email ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {List.map((value, index) => (
                        <TableRow
                            key={index}
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {value.doc_name}
                            </TableCell>
                            <TableCell >{value.doc_qualification}</TableCell>
                            <TableCell >{value.doc_address}</TableCell>
                            <TableCell >{value.doc_spec}</TableCell>
                            <TableCell >{value.doc_contact}</TableCell>
                            <TableCell >{value.doc_email}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
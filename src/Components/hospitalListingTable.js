import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ApiHelper } from '../Helper/Apihelper';
import instance, { API } from '../config/api';
import { useHistory } from 'react-router-dom'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'

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

export default function hospitalListingTable({ List, searchTerm }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell>Patient ID</TableCell> */}
                        <TableCell >Hospital Name</TableCell>
                        <TableCell >State</TableCell>
                        <TableCell >City</TableCell>
                        <TableCell >Contact No</TableCell>
                        <TableCell >Phone No</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {List?.filter((val) => {
                        if (searchTerm == "") {
                            return val
                        } else if (val.name?.toLowerCase().includes(searchTerm?.toLowerCase())) {
                            return val
                        } else if (val.contact_1.includes(searchTerm)) {
                            return val
                        }
                    }).map((value, index) => (
                        <TableRow
                            key={index}
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {value.name}
                            </TableCell>
                            <TableCell >{value.state}</TableCell>
                            <TableCell >{value.city}</TableCell>
                            <TableCell >{value.contact_1}</TableCell>
                            <TableCell >{value.contact_2}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


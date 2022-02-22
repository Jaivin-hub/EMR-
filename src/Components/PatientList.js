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

export default function BasicTable({ List }) {
    const navigate = useNavigate();
    // const [patientList, setPatientList] = useState([])
    const HospitalId = localStorage.getItem('HospitalId')
    const [openModal, setOpenModal] = useState(false)
    const [patientId, setPatientId] = useState('')

    console.log('List', List)




    const AppointmentsHandler = (id) => {
        setPatientId(id)
        setOpenModal(true);
        // navigate('/takeAppointment', { state: { patientId: id } });

    }

    return (
        <>
            {openModal ?
                <Modal closeModal={setOpenModal} patientId={patientId} />
                : null}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Patient ID</TableCell> */}
                            <TableCell >Patient name</TableCell>
                            <TableCell >Adhar No</TableCell>
                            <TableCell >Patient DOB</TableCell>
                            <TableCell >City</TableCell>
                            <TableCell >State</TableCell>
                            <TableCell >Patient Phone No</TableCell>
                            <TableCell >Patient Blood Group</TableCell>
                            <TableCell >Address</TableCell>
                            <TableCell >Appointments</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {List.map((patient, index) => (
                            <TableRow
                                key={index}
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {patient.p_name}
                                </TableCell>
                                <TableCell >{patient.aadhar_card_no}</TableCell>
                                <TableCell >{patient.p_dob}</TableCell>
                                <TableCell >{patient.p_city}</TableCell>
                                <TableCell >{patient.p_state}</TableCell>
                                <TableCell >{patient.p_phoneno}</TableCell>
                                <TableCell >{patient.p_bloodgroup}</TableCell>
                                <TableCell >{patient.p_address_1}</TableCell>
                                <TableCell ><Button variant="outlined" onClick={() => { AppointmentsHandler(patient._id) }}>Take Appointment</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}
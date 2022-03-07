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
import { IoArrowForwardOutline } from 'react-icons/io5'
import { AiFillPlusCircle } from 'react-icons/ai'
import AddAppointmentsModal from './Modals/AddAppointmentsModal'



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

export default function BasicTable({ List, searchTerm,setAppointmentPatientId ,setAppointmentsModalOpen}) {
    const navigate = useNavigate();
    const HospitalId = localStorage.getItem('HospitalId')
    const [openModal, setOpenModal] = useState(false)
    const [patientId, setPatientId] = useState('')


    const AppointmentsHandler = (id) => {
        setPatientId(id)
        setOpenModal(true);
    }
    const primaryAnalysisHandler = (id) => {
        navigate('/PrimaryAnalysis', { state: id });

    }

    const appointmentModalHandler = (id) => {
        setPatientId(id)
        setAppointmentsModalOpen(true)
        setAppointmentPatientId(id)
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
                            <TableCell >Patient Name</TableCell>
                            <TableCell >Last Name</TableCell>
                            <TableCell >Adhar No</TableCell>
                            <TableCell >Patient DOB</TableCell>
                            <TableCell >City</TableCell>
                            <TableCell >State</TableCell>
                            <TableCell >Patient Phone No</TableCell>
                            <TableCell >Patient Blood Group</TableCell>
                            <TableCell >Address</TableCell>
                            {/* <TableCell >Take Appointments</TableCell> */}
                            <TableCell >Primary Analysis</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {List?.filter((val) => {
                            if (searchTerm == '') {
                                return val
                            } else if (val.p_firstname?.toLowerCase().includes(searchTerm?.toLowerCase())) {
                                return val
                            } else if (val.p_phoneno?.includes(searchTerm)) {
                                return val
                            } else if (val.aadhar_card_no?.includes(searchTerm)) {
                                return val
                            }
                        }).map((patient, index) => (
                            <TableRow
                                key={index}
                            >
                                <TableCell component="th" scope="row">
                                    {patient.p_firstname}
                                </TableCell>
                                <TableCell >{patient.p_lastname}</TableCell>
                                <TableCell >{patient.aadhar_card_no}</TableCell>
                                <TableCell >{patient.p_dob}</TableCell>
                                <TableCell >{patient.p_city}</TableCell>
                                <TableCell >{patient.p_state}</TableCell>
                                <TableCell >{patient.p_phoneno}</TableCell>
                                <TableCell >{patient.p_bloodgroup}</TableCell>
                                <TableCell >{patient.p_address_1}</TableCell>

                                {/* <TableCell className="text-center">
                                    <AiFillPlusCircle
                                        onClick={() => { appointmentModalHandler(patient._id) }}
                                        cursor="pointer"
                                    />
                                </TableCell> */}
                                <TableCell className="text-center">
                                    <IoArrowForwardOutline
                                        onClick={() => { primaryAnalysisHandler(patient._id) }}
                                        cursor="pointer"
                                    />
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            

        </>
    );
}
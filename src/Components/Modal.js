import React, { useEffect, useState } from 'react'
import '../assets/css/modal.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import instance from '../config/api';
import { Button } from '@mui/material'
import { SiAddthis } from 'react-icons/si'


function Modal({ closeModal, patientId }) {
    const HospitalId = localStorage.getItem('HospitalId')
    const [doctorList, setDoctorList] = useState([])
    console.log('patientId', patientId)


    useEffect(() => {
        const obj = {
            _hos_id: HospitalId
        }
        console.log('mounting')
        instance.post('/list_doctors', obj).then((response) => {
            console.log('list response', response.data.doctorList)
            const doctorData = response.data.doctorList
            setDoctorList(doctorData)
        }).catch((err) => {
            console.log('error', err)
        })
    }, [])

    const appointmentHandler = (id) => {
        console.log('clicked')
        const obj = {
            _hos_id: HospitalId,
            _doc_id: id,
            _pat_id: patientId,
            app_date: 'Monday',
            app_time: '10:20PM'
        }
        instance.post('/patient_appointment', obj).then((response) => {
            console.log('appoinment response---', response);
            if (response.data.msg == 'Patient Appointment created successfully') {
                alert(response.data.msg)
            }
        })
    }

    return (
        <div className="">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => { closeModal(false) }}>x</button>
                    <div className="" style={{ overflowY: 'scroll', height: '25em' }}>
                        <TableContainer component={Paper}>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Doctor Name</TableCell>
                                        <TableCell >Appointment</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {doctorList.map((value, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {value.doc_name}
                                            </TableCell>
                                            <TableCell >
                                                <SiAddthis onClick={() => { appointmentHandler(value._id) }} style={{ cursor: 'pointer' }} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="body">
                        {/* <p>By the way the next page is awesome!</p> */}
                    </div>
                    {/* <div className="footer d-flex justify-content-end">
                        <button id="cancelBtn">Cancel</button>
                        <button>Continue</button>
                    </div> */}
                </div>
            </div>
        </div>
    )

}

export default Modal
import React, { useState, useEffect } from 'react'
import Header from './Header'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import instance from '../config/api'
import { useLocation } from 'react-router-dom'



function PatientHistory() {
    const hospitalId = localStorage.getItem('HospitalId')
    const [prescriptionHistoryList, setPrescriptionHistoryList] = useState([])
    const state = useLocation()
    const patientId = state?.state
    console.log('patientId', patientId)
    const navigate = useNavigate();
    const backButtonHandler = () => {
        navigate('/taskDashboard')
    }

    const fetchPatientHistory = () => {
        const obj = {
            _hos_id: hospitalId,
            _pat_id: patientId
        }
        // console.log('now', obj)
        instance.post('/list_patient_prescription', obj).then((res) => {
            // console.log('history response', res?.data.prescription[0]._id)
            let resValue = []
            for (let i = 0; i < res?.data.prescription.length; i++) {
                // console.log('here is the data---', res?.data.prescription[i]._id)
                const patientHistoryDetails = {
                    _pat_presc_id: res?.data.prescription[i]._id
                }
                instance.post('/list_patient_prescription_dosage', patientHistoryDetails).then((response) => {
                    console.log('second response', response.data.dosage[0]._med_id.med_name);
                    resValue.push(response?.data.dosage[0])
                })
            }
            setPrescriptionHistoryList(resValue)
        })
    }

    console.log('prescriptionHistoryList', prescriptionHistoryList)



    useEffect(() => {
        fetchPatientHistory()
    }, [])


    return (
        <div >
            <Header />
            <div className="row m-3">
                <div className="col-md-12">
                    <IoMdArrowRoundBack onClick={backButtonHandler} size={20} cursor='pointer' />
                </div>
            </div>
            <div className="navbar-light  m-5 bg-white shadow-md">
                <div className="row">
                    <div className="col-md-12">

                    </div>
                </div>
            </div>
            <div className="navbar-light  m-5 bg-white shadow-md">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >SI No</TableCell>
                                        <TableCell >Medicine Name</TableCell>
                                        <TableCell >Pharmacological Name</TableCell>
                                        <TableCell >Type</TableCell>
                                        <TableCell >Dosage</TableCell>
                                        <TableCell >Duration</TableCell>
                                        <TableCell >Quantity</TableCell>
                                        <TableCell >Comments</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {prescriptionHistoryList?.map((item, i) => {
                                        return (
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    {i + 1}
                                                </TableCell>
                                                {/* <TableCell >{item._med_id.med_name}</TableCell>
                                                <TableCell >{item._med_id.s_med_name}</TableCell>
                                                <TableCell >{item._med_id.med_type}</TableCell>
                                                <TableCell >{item.dosage}</TableCell>
                                                <TableCell >{item.days}</TableCell>
                                                <TableCell >{item.total_quantity}</TableCell> */}
                                            </TableRow>
                                        )
                                    })}

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientHistory
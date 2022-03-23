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
            let resValue = []
            for (let i = 0; i < res?.data.prescription?.length; i++) {
                const patientHistoryDetails = {
                    _pat_presc_id: res?.data.prescription[i]._id
                }
                instance.post('/list_patient_prescription_dosage', patientHistoryDetails).then((response) => {
                    resValue.push(response?.data.dosage)
                    let newData = [...prescriptionHistoryList]
                    newData = response?.data.dosage
                    setPrescriptionHistoryList(newData)
                })
            }
            // setPrescriptionHistoryList(resValue);
        })
    }

    console.log('prescriptionHistoryList', prescriptionHistoryList)



    useEffect(() => {
        let mount = true;
        fetchPatientHistory()
        return mount = false
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
            <div className="navbar-light  m-5 ">
                {prescriptionHistoryList?.map((item, index) => {
                    return (
                        <div className="row mt-3">
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
                                            {/* {item?.map((val, i) => {
                                                
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            {i + 1}
                                                        </TableCell>
                                                        <TableCell >{val._med_id.med_name}</TableCell>
                                                        <TableCell >{val._med_id.s_med_name}</TableCell>
                                                        <TableCell >{val._med_id.med_type}</TableCell>
                                                        <TableCell >{val.dosage}</TableCell>
                                                        <TableCell >{val.days}</TableCell>
                                                        <TableCell >{val.total_quantity}</TableCell>
                                                    </TableRow>
                                                
                                            })} */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PatientHistory
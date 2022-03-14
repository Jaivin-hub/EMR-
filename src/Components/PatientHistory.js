import React from 'react'
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

function PatientHistory() {
    const navigate = useNavigate();
    const backButtonHandler = () => {
        navigate('/taskDashboard')
    }
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
                                    {/* <TableRow>
                                            <TableCell component="th" scope="row">
                                                {patientHeight}
                                            </TableCell>
                                            <TableCell >{patientWeight}</TableCell>
                                            <TableCell >{diabetesChecked}</TableCell>
                                            <TableCell >{patientFasting}</TableCell>
                                            <TableCell >{patientAfterFood}</TableCell>
                                            <TableCell >{bpChecked}</TableCell>
                                            <TableCell >{patientLowerValue}</TableCell>
                                            <TableCell >{patientUpperValue}</TableCell>
                                            <TableCell >{patientAllergicFood}</TableCell>
                                            <TableCell >{patientAllergicMedicine}</TableCell>
                                        </TableRow> */}
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
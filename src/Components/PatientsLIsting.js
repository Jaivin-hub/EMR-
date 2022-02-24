import React, { useEffect, useState } from 'react'
import Header from './Header'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import instance from '../config/api';
import { Button } from '@mui/material'
import { useLocation } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SearchPage from './SearchPage'

function PatientsLIsting() {
    const [hospitalName, setHospitalName] = useState('')
    const [patientList, setPatientList] = useState([])
    const [appoinmentDate, setAppoinmentDate] = useState('Monday')
    const [appointmentTime, setAppointmentTime] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const HospitalId = localStorage.getItem('HospitalId')
    const { state } = useLocation();

    const options = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    ];
    const defaultOption = options[0];
    console.log('searchTerm', searchTerm)

    useEffect(() => {
        console.log('first mounting')
        const Data = localStorage.getItem('HospitalName')
        setHospitalName(Data)
        console.log('Data', Data)
        const obj = {
            _hos_id: HospitalId
        }
        console.log('mounting')
        // http://13.234.177.61/api3/list_patients
        instance.post('/list_patients', obj).then((response) => {
            console.log('list response', response)
            const PatientData = response.data.patientList
            setPatientList(PatientData)
        }).catch((err) => {
            console.log('error', err)
        })
    }, [])

    const dropDownHandler = (e) => {
        console.log(e.value)
        setAppoinmentDate(e.value)

    }

    console.log('appoinmentDate', appoinmentDate, appointmentTime)

    return (
        <div className="div">
            <Header />
            <div className="div" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', height: "60em" }}>
                <div className="row">
                    <div className="hospitalName mt-3">
                        {/* <label htmlFor="">{hospitalName}</label> */}
                    </div>
                </div>
                <div className="mainContainer" style={{ margin: '2%' }}>
                    <h5 className=""><strong>{hospitalName} Hospital</strong></h5>
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <div className="row ">

                                <SearchPage setSearchTerm={setSearchTerm} />

                            </div>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                    <div className="addPatient navbar-light mt-2" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                        <div className="row pt-4" >
                            {/* <div className="col-md-1" style={{ marginLeft: '5%' }} >
                    Doctor List
                </div> */}
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell >aadhar_card_no</TableCell>
                                                <TableCell >Patient Name</TableCell>
                                                <TableCell >Patient Bloodgroup</TableCell>
                                                <TableCell >Patient City</TableCell>
                                                <TableCell >Patient State</TableCell>
                                                <TableCell >Patient Age</TableCell>
                                                <TableCell >Patient Phoneno</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {patientList?.filter((val) => {
                                                if (searchTerm == '') {
                                                    return val
                                                } else if (val.p_firstname.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                    return val
                                                } else if (val.p_phoneno.includes(searchTerm)) {
                                                    return val
                                                } else if (val.aadhar_card_no.includes(searchTerm)) {
                                                    return val
                                                }
                                            }).map((value, index) => (
                                                <TableRow
                                                    key={index}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {value.aadhar_card_no}
                                                    </TableCell>
                                                    <TableCell>{value.p_firstname}</TableCell>
                                                    <TableCell >{value.p_bloodgroup}</TableCell>
                                                    <TableCell >{value.p_city}</TableCell>
                                                    <TableCell >{value.p_state}</TableCell>
                                                    {/* <TableCell >{value.doc_email}</TableCell> */}
                                                    <TableCell >{value.p_dob}</TableCell>
                                                    <TableCell >{value.p_phoneno}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsLIsting
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


function TakeAppoiment() {
    const [hospitalName, setHospitalName] = useState('')
    const [doctorList, setDoctorList] = useState([])
    const [appoinmentDate, setAppoinmentDate] = useState('Monday')
    const [appointmentTime, setAppointmentTime] = useState('')

    const HospitalId = localStorage.getItem('HospitalId')
    const { state } = useLocation();

    const options = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    ];
    const defaultOption = options[0];

    useEffect(() => {
        console.log('first mounting')
        const Data = localStorage.getItem('HospitalName')
        setHospitalName(Data)
        console.log('Data', Data)
        const obj = {
            _hos_id: HospitalId
        }
        console.log('mounting')
        instance.post('/list_doctors', obj).then((response) => {
            console.log('list response', response)
            const doctorData = response.data.doctorList
            setDoctorList(doctorData)
        }).catch((err) => {
            console.log('error', err)
        })
    }, [])

    const dropDownHandler = (e) => {
        console.log(e.value)
        setAppoinmentDate(e.value)

    }

    console.log('appoinmentDate', appoinmentDate, appointmentTime)

    const appointmentsHandler = (id) => {
        console.log('id', id)
        const obj = {
            _hos_id: HospitalId,
            _doc_id: id,
            _pat_id: state.patientId,
            app_date: appoinmentDate,
            app_time: appointmentTime
        }
        instance.post('/patient_appointment', obj).then((response) => {
            console.log('appoinment response---', response);
            if (response.data.msg == 'Patient Appointment created successfully') {
                alert(response.data.msg)
            }
        })
    }

    const dateChangeHandler = (e) => {
        setAppoinmentDate(e.target.value)
    }

    const timeChangeHandler = (e) => {
        setAppointmentTime(e.target.value)
    }


    return (
        <div className="div">
            <Header />
            <div className="div" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', height: "60em" }}>
                <div className="row">
                    <div className="hospitalName mt-3">
                        {/* <label htmlFor="">{hospitalName}</label> */}
                    </div>
                </div>
                <div className="mainContainer " style={{ margin: '2%' }}>
                    <h5 className=""><strong>{hospitalName} Hospital</strong></h5>
                    <div className="addPatient navbar-light mt-5" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                        <div className="row pt-4" >
                            {/* <div className="col-md-1" style={{ marginLeft: '5%' }} >
                            Doctor List
                        </div> */}
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {/* <BasicTable List={doctorList} /> */}
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                {/* <TableCell>Patient ID</TableCell> */}
                                                <TableCell >Name</TableCell>
                                                <TableCell >Qualification</TableCell>
                                                {/* <TableCell >Address</TableCell> */}
                                                <TableCell >Specialization</TableCell>
                                                <TableCell >Contact No</TableCell>
                                                <TableCell >Email ID</TableCell>
                                                {/* <TableCell >Date</TableCell> */}
                                                {/* <TableCell >Time</TableCell> */}
                                                {/* <TableCell >Appointments</TableCell> */}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {doctorList.map((value, index) => (
                                                <TableRow
                                                    key={index}
                                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {value.doc_name}
                                                    </TableCell>
                                                    <TableCell >{value.doc_qualification}</TableCell>
                                                    {/* <TableCell >{value.doc_address}</TableCell> */}
                                                    <TableCell >{value.doc_spec}</TableCell>
                                                    <TableCell >{value.doc_contact}</TableCell>
                                                    <TableCell >{value.doc_email}</TableCell>

                                                    {/* <TableCell ><Dropdown options={options} onChange={(e) => { dropDownHandler(e) }} value={defaultOption} placeholder="Select an option" /></TableCell> */}

                                                    {/* <TableCell ><input onChange={(e) => { dateChangeHandler(e) }} id='app_date' type="date" /></TableCell> */}
                                                    {/* <TableCell ><input onChange={(e) => timeChangeHandler(e)} id="app_time" type="time" /></TableCell> */}
                                                    {/* <TableCell ><Button variant="outlined" onClick={() => { appointmentsHandler(value._id) }}>Appointment</Button></TableCell> */}
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

export default TakeAppoiment
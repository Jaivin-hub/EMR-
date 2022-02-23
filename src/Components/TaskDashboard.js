import React, { useEffect, useState } from 'react'
import PatientView from './PatientView'
import '.././assets/css/dashboard.css'
import DoctorView from './DoctorView'
import Header from './Header'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import HospitalView from './HospitalView'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function TaskDashboard() {

    const [hospitalName, setHospitalName] = useState('')
    const [showPatientView, setShowPatientView] = useState(false)
    const [showDoctorView, setShowDoctorView] = useState(false)
    const [showAppointmentView, setShowAppointmentView] = useState(true)
    const [showHospitalView, setShowHospitalView] = useState(false)

    const options = [
        'Appointments', 'Add Patient', 'Add Doctor'
    ];
    const defaultOption = options[0];

    useEffect(() => {
        console.log('first mounting')
        const Data = localStorage.getItem('HospitalName')
        setHospitalName(Data)
    }, [])

    const dropDownHandler = (e) => {
        console.log('dropDownHandler', e.value)
        if (e.value == 'Add Patient') {
            setShowPatientView(true)
            setShowDoctorView(false)
            setShowAppointmentView(false)
            setShowHospitalView(false)

        } else if (e.value == 'Add Doctor') {
            setShowDoctorView(true)
            setShowPatientView(false)
            setShowAppointmentView(false)
            setShowHospitalView(false)

        } else if (e.value == 'Appointments') {
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowAppointmentView(true)
            setShowHospitalView(false)

        } else if (e.value == 'Add Hospital') {
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowAppointmentView(false)
            setShowHospitalView(true)
        }
    }

    console.log('hospitalName', hospitalName)
    return (
        <div className="div" >
            <Header />
            <div className="div" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', height: "60em" }}>
                <div className="row">
                    <div className="hospitalName mt-3">
                        {/* <label htmlFor="">{hospitalName}</label> */}
                    </div>
                </div>
                <div className="mainContainer " style={{ margin: '2%' }}>
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className=""><strong>{hospitalName} Hospitals</strong></h5>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-4">

                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <input className="form-control" type="text" style={{ width: '100%', height: "3em", borderRadius: "5px" }} readonly="true" Value="Pending Appointments" />
                                        </div>
                                        <div className="col-md-5 mt-1">
                                            <Dropdown options={options} onChange={(e) => { dropDownHandler(e) }} value={defaultOption} placeholder="Select an option" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {showPatientView ?
                        <PatientView />
                        : null}
                    {showDoctorView ?
                        <DoctorView />
                        : null}
                    {showHospitalView ?
                        <HospitalView />
                        : null}

                    {showAppointmentView ?

                        <>
                            <h6 className="pt-5" >Appointment List</h6>
                            <div className="addPatient navbar-light " style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                                <div className="row pt-3" >

                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        {/* <TableCell>Patient ID</TableCell> */}
                                                        <TableCell >Patient name</TableCell>
                                                        <TableCell >Age</TableCell>
                                                        <TableCell >Gender</TableCell>
                                                        <TableCell >Time</TableCell>
                                                        <TableCell >Phone Number</TableCell>
                                                        <TableCell >Doctor Name</TableCell>
                                                        <TableCell >Actions</TableCell>


                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {/* {List.map((value, index) => (
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
                                            ))} */}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>

                                </div>

                            </div>
                        </>
                        : null}

                </div>
            </div>
        </div>
    )
}

export default TaskDashboard
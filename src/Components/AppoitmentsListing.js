import React, { useEffect, useState } from 'react'
import '.././assets/css/dashboard.css'
import 'react-dropdown/style.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import instance from '../config/api'
import moment from 'moment';
import { Tab, Nav, Tabs, Form, Button, Accordion } from 'react-bootstrap';
import '../assets/css/appointments.css'

// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';


function AppoitmentsListing({ setPendingList }) {
    const [appointments, setAppointments] = useState([])
    const hospitalId = localStorage.getItem('HospitalId')
    const [appointmentCurrentDate, setAppointmentCurrentDate] = useState('')
    const [hospitalName, setHospitalName] = useState('')




    const fetchAppointment = () => {

        const obj = {
            _hos_id: hospitalId,
            app_date: appointmentCurrentDate

        }
        console.log('obj---', obj)
        instance.post('/list_appointment', obj).then((res) => {
            setAppointments(res.data.appointment)
            setPendingList(res.data.appointment)
        })
        // }
    }

    const fetchAppointmentWithDate = (dateData) => {
        const obj = {
            _hos_id: hospitalId,
            app_date: dateData

        }
        console.log('obj---', obj)
        instance.post('/list_appointment', obj).then((res) => {
            setAppointments(res.data.appointment)
            setPendingList(res.data.appointment)
        })
    }


    const appointmentsDateHandler = (e) => {
        console.log('clicked')
        console.log(e.target.value)
        const date = e.target.value
        const dateData = moment(date).format('DD-MM-YYYY');
        // setAppointmentCurrentDate(dateData)
        fetchAppointmentWithDate(dateData)
    }

    useEffect(() => {
        console.log('first mounting')
        const Data = localStorage.getItem('HospitalName')
        setHospitalName(Data)
        var today = new Date();
        var dd = today.getDate();
        if (dd < 10) {
            dd = '0' + dd;
        }
        var mm = today.getMonth() + 1;
        if (mm < 10) {
            mm = '0' + mm;
        }
        var year = today.getFullYear();
        const date_format = dd + "-" + mm + "-" + year
        console.log('date_format', date_format)
        setAppointmentCurrentDate(date_format)
        fetchAppointment()
    }, [])

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const actionHandler = () => {

    }


    return (
        <>
            {/* 
            <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                </Nav.Item>
            </Nav> */}
            {/* <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Item One" value="1" />
                        <Tab label="Item Two" value="2" />
                        <Tab label="Item Three" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext> */}
            {/* <div className="row">
                <div className="col-md-6">
                    <Button >
                    </Button>
                    
                    </div>
                    <div className="col-md-6">
                    <Button style={{ backgroundColor: "red" }}>
                    All Appointment List
                    </Button>
                    </div>
                </div> */}

            {/* Todays Appointment List */}
            <div className="addPatient navbar-light mt-4" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                <input className="mt-4" style={{marginLeft:'1%'}} type="date" onChange={appointmentsDateHandler} />
                <div className="row pt-3 " >

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {/* <TableCell>Patient ID</TableCell> */}
                                        <TableCell >Patient Name</TableCell>
                                        <TableCell >Age</TableCell>
                                        <TableCell >Appointment date</TableCell>
                                        <TableCell >Appointment Time</TableCell>
                                        <TableCell >Doctor Name</TableCell>
                                        <TableCell >Specialization</TableCell>
                                        {/* <TableCell >Actions</TableCell> */}


                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {appointments?.map((value, index) => (
                                        <TableRow
                                            key={index}
                                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {value._pat_id.p_firstname}
                                            </TableCell>
                                            <TableCell >{value._pat_id.p_dob}</TableCell>
                                            <TableCell >{value.app_date}</TableCell>
                                            <TableCell >{value.app_time}</TableCell>
                                            <TableCell >{value._doc_id.doc_name}</TableCell>
                                            <TableCell >{value._doc_id.doc_spec}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                </div>

            </div>
        </>
    )
}

export default AppoitmentsListing
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
import { useNavigate } from 'react-router-dom';
import PrimaryAnalysisModal from './Modals/PrimaryAnalysisModal';


// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';


function AppoitmentsListing({ setPendingList, setShowPrimaryAnalysis, reload, appointments, setAppointments, setPatientId }) {
    // const [appointments, setAppointments] = useState([])
    const navigate = useNavigate();
    const hospitalId = localStorage.getItem('HospitalId')
    const [appointmentCurrentDate, setAppointmentCurrentDate] = useState('')
    const [hospitalName, setHospitalName] = useState('')
    // const [patientId, setPatientId] = useState('')

    // const [reload, setReload] = useState(false)


    useEffect(() => {
        // fetchAppointment()
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
        setToday(date)
    }, [])



    // const fetchAppointment = () => {
    //     const Data = localStorage.getItem('HospitalName')
    //     setHospitalName(Data)
    //     var today = new Date();
    //     var dd = today.getDate();
    //     if (dd < 10) {
    //         dd = '0' + dd;
    //     }
    //     var mm = today.getMonth() + 1;
    //     if (mm < 10) {
    //         mm = '0' + mm;
    //     }
    //     var year = today.getFullYear();
    //     const date_format = dd + "-" + mm + "-" + year
    //     setAppointmentCurrentDate(date_format)

    //     const obj = {
    //         _hos_id: hospitalId,
    //         app_date: date_format

    //     }
    //     console.log('obj', obj)

    //     instance.post('/list_appointment', obj).then((res) => {
    //         const arr = res.data.appointment
    //         setAppointments(arr)
    //         setPendingList(arr)


    //     })
    // }

    const fetchAppointmentWithDate = (dateData) => {
        const obj = {
            _hos_id: hospitalId,
            app_date: dateData

        }
        instance.post('/list_appointment', obj).then((res) => {
            setAppointments(res.data.appointment)
            setPendingList(res.data.appointment)
        })
    }


    const appointmentsDateHandler = (e) => {
        const date = e.target.value
        setToday(e.target.value)
        const dateData = moment(date).format('DD-MM-YYYY');
        // setAppointmentCurrentDate(dateData)
        fetchAppointmentWithDate(dateData)
    }

    const [value, setValue] = React.useState('1');
    const [today, setToday] = useState()


    const primaryAnalysisHandler = (id) => {
        setPatientId(id)
        setShowPrimaryAnalysis(true)
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const consultationHandler = (patientId, doctorId, index) => {
        const selectedData = []
        appointments.map((item, i) => {
            if (item._pat_id._id == patientId) {
                selectedData.push(item);
            }
        })
        navigate('/consultation', { state: selectedData })
    }

    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0, 10);
    return (
        <>
            <div className="addPatient navbar-light mt-4" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                <input defaultValue={date} onChange={handleChange} className="mt-4" style={{ marginLeft: '1%' }} type="date" onChange={(e) => {
                    appointmentsDateHandler(e)
                }} />
                <div className="row">
                    <div className="col-md-12">

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Patient Name</TableCell>
                                        <TableCell >Age</TableCell>
                                        <TableCell >Appointment date</TableCell>
                                        <TableCell >Appointment Time</TableCell>
                                        <TableCell >Doctor Name</TableCell>
                                        <TableCell >Specialization</TableCell>
                                        <TableCell >Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {appointments?.map((value, index) => (
                                        <TableRow
                                            key={index}
                                        >
                                            <TableCell component="th" scope="row">
                                                {value._pat_id.p_firstname}
                                            </TableCell>
                                            <TableCell >{value._pat_id.p_dob}</TableCell>
                                            <TableCell >{value.app_date}</TableCell>
                                            <TableCell >{value.app_time}</TableCell>
                                            <TableCell >{value._doc_id.doc_name}</TableCell>
                                            <TableCell >{value._doc_id.doc_spec}</TableCell>
                                            <TableCell >
                                                <div className="d-flex">
                                                    <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#6c757d' }}
                                                        onClick={() => { primaryAnalysisHandler(value._pat_id._id) }}>Primary Analysis</button>
                                                    <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#6c757d' }}
                                                        onClick={() => { consultationHandler(value._pat_id._id, value._doc_id._id, index) }}>consultation</button>
                                                </div>
                                            </TableCell>
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
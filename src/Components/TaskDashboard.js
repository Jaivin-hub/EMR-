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
import instance from '../config/api'
import moment from 'moment';
import AppoitmentsListing from './AppoitmentsListing'




function TaskDashboard() {

    const [hospitalName, setHospitalName] = useState('')
    const [showPatientView, setShowPatientView] = useState(false)
    const [showDoctorView, setShowDoctorView] = useState(false)
    const [showAppointmentView, setShowAppointmentView] = useState(true)
    const [showHospitalView, setShowHospitalView] = useState(false)
    const hospitalId = localStorage.getItem('HospitalId')



    const [appointmentCurrentDate, setAppointmentCurrentDate] = useState('')
    const [appointments, setAppointments] = useState([])


    const options = [
        'Appointments', 'Add Patient', 'Add Doctor'
    ];
    const defaultOption = options[0];

    // const getCurrentDate = () => {
    //     return new Date().getDate();
    // }

    // const currentDate = getCurrentDate()

    // const getCurrentMonth = () => {
    //     return new Date().getMonth();
    // }

    // const currentMonth = getCurrentMonth()
    // const exactMonth = currentMonth + 1

    // const getCurrentYear = () => {
    //     return new Date().getFullYear();
    // }


    // const currentYear = getCurrentYear()

    // const todaysDate = currentDate + "-" + exactMonth + "-" + currentYear

    // const current = new Date();
    // const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;




    // console.log('Current date------------', date_format)

    // useEffect(() => {
    //     console.log('first mounting')
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
    //     console.log('date_format', date_format)
    //     setAppointmentCurrentDate(date_format)
    //     fetchAppointment()
    // }, [])


    // useEffect(() => {
    //     setShowDoctorView(false)
    //     setShowPatientView(false)
    //     setShowAppointmentView(true)
    //     setShowHospitalView(false)
    // }, [appointmentCurrentDate])

    const dropDownHandler = (e) => {
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

    // console.log('appointmentCurrentDate', appointmentCurrentDate)

    // const fetchAppointment = () => {
    //     const obj = {
    //         _hos_id: hospitalId,
    //         app_date: appointmentCurrentDate

    //     }
    //     instance.post('/list_appointment', obj).then((res) => {
    //         setAppointments(res.data.appointment)
    //     })
    const pendingAppointments = appointments?.length
    // }
    console.log('length---', pendingAppointments)
    const [pendingList, setPendingList] = useState()

    console.log('pendingList**********************', pendingList?.length)
    const pendingCount = pendingList?.length

    // const appointmentsDateHandler = (e) => {
    //     console.log('clicked')
    //     console.log(e.target.value)
    //     const date = e.target.value
    //     const dateData = moment(date).format('DD-MM-YYYY');
    //     setAppointmentCurrentDate(dateData)
    //     fetchAppointment()
    // }

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
                                        <div className="col-md-7 d-flex">
                                            {pendingList?.length >= 1 ?
                                                <input className="form-control" type="text" style={{ width: '100%', height: "3em", borderRadius: "5px" }} readonly="true" Value={"pendingAppointments" + " - " + pendingCount} />
                                                : null}
                                            {/* <input type="text" value={pendingAppointments} /> */}
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
                        <AppoitmentsListing setPendingList={setPendingList} />
                        : null}
                </div>
            </div>
        </div>
    )
}

export default TaskDashboard
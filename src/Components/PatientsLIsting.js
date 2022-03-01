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
import { IoArrowForwardOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import Pagenation from './Pagenation';
import AppoitmentsListing from './AppoitmentsListing';
import AddPatientModal from './AddPatientModal';
import AddDoctorModal from './Modals/AddDoctorModal';
import SettingsView from './SettingsView';


function PatientsLIsting() {
    const navigate = useNavigate();
    const [hospitalName, setHospitalName] = useState('')
    const [patientList, setPatientList] = useState([])
    const [appoinmentDate, setAppoinmentDate] = useState('Monday')
    const [appointmentTime, setAppointmentTime] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)
    const [pendingList, setPendingList] = useState([])
    const [showPatientView, setShowPatientView] = useState(false)
    const [showDoctorView, setShowDoctorView] = useState(false)
    const [showAppointmentView, setShowAppointmentView] = useState(true)
    const [showHospitalView, setShowHospitalView] = useState(false)
    const [showSettingsView, setShowSettingsView] = useState(false)
    const [reload, setReload] = useState(false)

    const HospitalId = localStorage.getItem('HospitalId')
    const { state } = useLocation();

    const options = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    ];

    const showOptions = [
        'PatientsListing', 'Add Patient', 'Add Doctor', 'Settings'
    ];
    const defaultOption = showOptions[0];
    console.log('searchTerm', searchTerm)

    const fetchAppointment = () => {
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
        // setAppointmentCurrentDate(date_format)

        const obj = {
            _hos_id: HospitalId,
            app_date: date_format

        }
        console.log('obj', obj)

        instance.post('/list_appointment', obj).then((res) => {
            const arr = res.data.appointment
            // setAppointments(arr)
            setPendingList(arr)

        })
    }

    useEffect(() => {
        const Data = localStorage.getItem('HospitalName')
        setHospitalName(Data)
        console.log('Data', Data)
        const obj = {
            _hos_id: HospitalId
        }
        instance.post('/list_patients', obj).then((response) => {
            const PatientData = response?.data.patientList
            setPatientList(PatientData)
        }).catch((err) => {
            console.log('error', err)
        })
        fetchAppointment()
    }, [])

    const dropDownHandler = (e) => {
        console.log(e.value)
        setAppoinmentDate(e.value)

    }

    const showModalsHandler = (e) => {
        if (e.value == 'Add Patient') {
            setShowPatientView(true)
            setShowDoctorView(false)
            // setShowAppointmentView(false)
            // setShowHospitalView(false)
            // setShowSettingsView(false)
        } else if (e.value == 'Add Doctor') {
            setShowDoctorView(true)
            setShowPatientView(false)
            // setShowAppointmentView(false)
            // setShowHospitalView(false)
            // setShowSettingsView(false)
            // setShowSettingsView(false)
        } else if (e.value == 'PatientsListing') {
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowAppointmentView(true)
            setShowHospitalView(false)
            setShowSettingsView(false)
        }
        else if (e.value == 'Appointments') {
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowAppointmentView(true)
            setShowHospitalView(false)
            setShowSettingsView(false)
        } else if (e.value == 'Settings') {
            setShowSettingsView(true)
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowAppointmentView(false)
            setShowHospitalView(false)
        }
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = patientList.slice(indexOfFirstPost, indexOfLastPost);

    const primaryAnalysisHandler = (id) => {
        console.log('clicked', id)
        navigate('/PrimaryAnalysis', { state: id });

    }
    const paginate = pageNumber => setCurrentPage(pageNumber)
    const pendingCount = pendingList?.length



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
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className=""><strong>{hospitalName} Hospital</strong></h5>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-4">

                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-7 d-flex">
                                            {pendingList?.length >= 1 ?
                                                <input className="form-control" type="text" style={{ width: '100%', height: "3em", borderRadius: "5px" }} readonly="true" Value={"Pending Appointments" + "  " + " " + pendingCount} />
                                                :
                                                <input className="form-control" type="text" style={{ width: '100%', height: "3em", borderRadius: "5px" }} readonly="true" Value={"Pending Appointments" + "  " + " " + '0'} />
                                            }
                                        </div>
                                        <div className="col-md-5 mt-1">
                                            <Dropdown options={showOptions} onChange={(e) => { showModalsHandler(e) }} value={defaultOption} placeholder="Select an option" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-6">
                            <div className="row ">
                                <SearchPage setSearchTerm={setSearchTerm} />
                            </div>
                        </div>
                        <div className="col-md-6">
                        </div>
                    </div>
                    {showAppointmentView ?
                        <div className="addPatient navbar-light mt-2" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>

                            <div className="row">
                                <div className="col-md-12">
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell >Patient First Name</TableCell>
                                                    <TableCell >Last Name</TableCell>
                                                    <TableCell >Aadhar Card No</TableCell>
                                                    <TableCell >Patient Bloodgroup</TableCell>
                                                    <TableCell >Patient City</TableCell>
                                                    <TableCell >Patient State</TableCell>
                                                    <TableCell >Patient Age</TableCell>
                                                    <TableCell >Patient Phoneno</TableCell>
                                                    <TableCell >Actions</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {currentPosts?.filter((val) => {
                                                    if (searchTerm == '') {
                                                        return val
                                                    } else if (val.p_firstname?.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                        return val
                                                    } else if (val.p_phoneno?.includes(searchTerm)) {
                                                        return val
                                                    } else if (val.aadhar_card_no?.includes(searchTerm)) {
                                                        return val
                                                    }
                                                }).map((value, index) => (
                                                    <TableRow
                                                        key={index}
                                                    >
                                                        <TableCell>{value.p_firstname}</TableCell>
                                                        <TableCell>{value.p_lastname}</TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {value.aadhar_card_no}
                                                        </TableCell>
                                                        <TableCell >{value.p_bloodgroup}</TableCell>
                                                        <TableCell >{value.p_city}</TableCell>
                                                        <TableCell >{value.p_state}</TableCell>
                                                        {/* <TableCell >{value.doc_email}</TableCell> */}
                                                        <TableCell >{value.p_dob}</TableCell>
                                                        <TableCell >{value.p_phoneno}</TableCell>
                                                        <TableCell >
                                                            {/* <IoArrowForwardOutline
                                                                onClick={() => { primaryAnalysisHandler(value._id) }}
                                                                cursor="pointer"
                                                            /> */}
                                                            <button className="btn" style={{ borderRadius: '5px', width: '100%', color: 'white', backgroundColor: '#6c757d' }} onClick={() => { primaryAnalysisHandler(value._id) }}>Primary Analysis</button>

                                                            {/* <Button onClick={() => { primaryAnalysisHandler(value._id) }}>Primary Analysis</Button> */}
                                                            {/* <Button>New Appointment</Button> */}
                                                        </TableCell>
                                                        <TableCell >
                                                            <button className="btn" style={{ borderRadius: '5px', width: '100%', color: 'white', backgroundColor: '#6c757d' }} onClick={() => { primaryAnalysisHandler(value._id) }}>New Appointment</button>
                                                            {/* <Button >New Appointment</Button> */}
                                                        </TableCell>

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {patientList?.length >= 10 ?

                                        <Pagenation postsPerPage={postsPerPage} totalPosts={patientList?.length} paginate={paginate} />
                                        : null}
                                </div>
                            </div>

                        </div>
                        : null}
                </div>

                {showSettingsView ?
                    <SettingsView />
                    : null}
                {showPatientView ?
                    <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                        <AddPatientModal setOpenModal={setShowPatientView} setReload={setReload} reload={reload} />
                    </div>
                    : null}
                {showDoctorView ?
                    <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                        <AddDoctorModal setOpenModal={setShowDoctorView} setReload={setReload} reload={reload} />
                    </div>
                    // <DoctorView />
                    : null}
            </div>
        </div>
    )
}

export default PatientsLIsting
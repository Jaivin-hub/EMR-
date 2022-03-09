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
import PrimaryAnalysisModal from './Modals/PrimaryAnalysisModal';
import AppointmentsModal from './Modals/AppointmentsModal';
import AddDetailsModal from './Modals/AddDetailsModal';
import MaterialTable from 'material-table';
import MedicineModal from './Modals/MedicineModal';



function PatientsLIsting() {
    const navigate = useNavigate();
    const [hospitalName, setHospitalName] = useState('')
    const [patientList, setPatientList] = useState([])
    const [appoinmentDate, setAppoinmentDate] = useState('Monday')
    const [appointmentTime, setAppointmentTime] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)
    const [pendingList, setPendingList] = useState([])
    const [showPatientView, setShowPatientView] = useState(false)
    const [showDoctorView, setShowDoctorView] = useState(false)
    const [showAppointmentView, setShowAppointmentView] = useState(true)
    const [showHospitalView, setShowHospitalView] = useState(false)
    const [showSettingsView, setShowSettingsView] = useState(false)
    const [reload, setReload] = useState(false)
    const [showPrimaryAnalysis, setShowPrimaryAnalysis] = useState(false)
    const [patientId, setPatientId] = useState('')
    const [showNewAppointmentsModal, setShowNewAppointmentsModal] = useState(false)
    const [showAddDetailsModal, setShowAddDetailsModal] = useState(false)
    const [showMedicineView, setShowMedicineView] = useState(false)


    const columns = [
        { title: 'Patient First Name', field: 'p_firstname' },
        { title: 'Last Name', field: 'p_lastname' },
        { title: 'Aadhar Card No', field: 'aadhar_card_no' },
        { title: 'Patient Bloodgroup', field: 'p_bloodgroup' },
        { title: 'Patient City', field: 'p_city' },
        { title: 'Patient State', field: 'p_state' },
        { title: 'Patient Age', field: 'p_dob' },
        { title: 'Patient Phoneno', field: 'p_phoneno' },
    ]


    const HospitalId = localStorage.getItem('HospitalId')
    const { state } = useLocation();

    const options = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    ];

    const showOptions = [
        'PatientsListing', 'Add Patient', 'Add Doctor', 'Settings'
    ];
    const defaultOption = showOptions[0];

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
        const obj = {
            _hos_id: HospitalId,
            app_date: date_format

        }
        instance.post('/list_appointment', obj).then((res) => {
            const arr = res.data.appointment
            // setAppointments(arr)
            setPendingList(arr)

        })
    }

    useEffect(() => {
        const Data = localStorage.getItem('HospitalName')
        setHospitalName(Data)
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
    }, [reload])

    const dropDownHandler = (e) => {
        setAppoinmentDate(e.value)

    }

    const changeContentHandler = (value) => {
        if (value == 'Add Patients') {
            setShowPatientView(true)
            setShowDoctorView(false)
        } else if (value == 'Add Doctor') {
            setShowDoctorView(true)
            setShowPatientView(false)
        } else if (value == 'Appointments') {
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowAppointmentView(true)
            setShowHospitalView(false)
            setShowSettingsView(false)
        } else if (value == 'Settings') {
            setShowSettingsView(true)
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowAppointmentView(false)
            setShowHospitalView(false)
        } else if (value == 'Add Medicines') {
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowMedicineView(false)
            setShowMedicineView(true)
        }
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = patientList.slice(indexOfFirstPost, indexOfLastPost);

    const primaryAnalysisHandler = (id) => {
        setPatientId(id)
        setShowPrimaryAnalysis(true)
    }
    const paginate = pageNumber => setCurrentPage(pageNumber)
    const pendingCount = pendingList?.length

    const newAppointmentsHandler = (id) => {
        setPatientId(id)
        setShowNewAppointmentsModal(true)
    }



    return (
        <div className="div w-screen h-screen fixed">
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
                                        <div className="col-md-5 mt-3 d-flex  space-x-3 cursor-pointer" onClick={() => { setShowAddDetailsModal(true) }}>
                                            <button type="button" className="inline-block rounded-sm bg-blue-300 text-white leading-normal uppercase shadow-md hover:bg-blue-400 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out w-7 h-7">+</button>
                                            <h5 className="mt-1  text-gray-700 font-bold">Add New</h5>
                                            {/* <Dropdown options={showOptions} onChange={(e) => { showModalsHandler(e) }} value={defaultOption} placeholder="Select an option" /> */}
                                        </div>
                                    </div>
                                    <div className="ml-20 ">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showAppointmentView ?
                        // <div className="addPatient navbar-light mt-2" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>

                        //     <div className="row">
                        //         <div className="col-md-12">
                        //             <TableContainer component={Paper}>
                        //                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        //                     <TableHead>
                        //                         <TableRow>
                        //                             <TableCell >Patient First Name</TableCell>
                        //                             <TableCell >Last Name</TableCell>
                        //                             <TableCell >Aadhar Card No</TableCell>
                        //                             <TableCell >Patient Bloodgroup</TableCell>
                        //                             <TableCell >Patient City</TableCell>
                        //                             <TableCell >Patient State</TableCell>
                        //                             <TableCell >Patient Age</TableCell>
                        //                             <TableCell >Patient Phoneno</TableCell>
                        //                             <TableCell >Actions</TableCell>

                        //                         </TableRow>
                        //                     </TableHead>
                        //                     <TableBody>
                        //                         {currentPosts?.filter((val) => {
                        //                             if (searchTerm == '') {
                        //                                 return val
                        //                             } else if (val.p_firstname?.toLowerCase().includes(searchTerm.toLowerCase())) {
                        //                                 return val
                        //                             } else if (val.p_phoneno?.includes(searchTerm)) {
                        //                                 return val
                        //                             } else if (val.aadhar_card_no?.includes(searchTerm)) {
                        //                                 return val
                        //                             }
                        //                         }).map((value, index) => (
                        //                             <TableRow
                        //                                 key={index}
                        //                             >
                        //                                 <TableCell>{value.p_firstname}</TableCell>
                        //                                 <TableCell>{value.p_lastname}</TableCell>
                        //                                 <TableCell component="th" scope="row">
                        //                                     {value.aadhar_card_no}
                        //                                 </TableCell>
                        //                                 <TableCell >{value.p_bloodgroup}</TableCell>
                        //                                 <TableCell >{value.p_city}</TableCell>
                        //                                 <TableCell >{value.p_state}</TableCell>
                        //                                 {/* <TableCell >{value.doc_email}</TableCell> */}
                        //                                 <TableCell >{value.p_dob}</TableCell>
                        //                                 <TableCell >{value.p_phoneno}</TableCell>
                        //                                 {/* <TableCell >
                        //                                     <button className="btn" style={{ borderRadius: '5px', width: '100%', color: 'white', backgroundColor: '#6c757d' }} onClick={() => { primaryAnalysisHandler(value._id) }}>Primary Analysis</button>
                        //                                 </TableCell> */}
                        //                                 <TableCell >
                        //                                     <button className="btn" style={{ borderRadius: '5px', width: '100%', color: 'white', backgroundColor: '#6c757d' }} onClick={() => { newAppointmentsHandler(value._id) }}>New Appointment</button>
                        //                                     {/* <Button >New Appointment</Button> */}
                        //                                 </TableCell>

                        //                             </TableRow>
                        //                         ))}
                        //                     </TableBody>
                        //                 </Table>
                        //             </TableContainer>
                        //             {patientList?.length >= 10 ?

                        //                 <Pagenation postsPerPage={postsPerPage} totalPosts={patientList?.length} paginate={paginate} />
                        //                 : null}
                        //         </div>
                        //     </div>

                        // </div>
                        <div className="mt-5">
                            <MaterialTable
                                options={{ searchAutoFocus: true, paginationType: 'stepped', exportButton: true, exportAllData: true, exportFileName: "MEDDBOT", actionsColumnIndex: -1 }}
                                className="mt-5" columns={columns} data={patientList} title='Patient Details'

                                actions={[
                                    {
                                        icon: () => <button className="btn btn-">New Appointment</button>,
                                        tooltip: 'New Appointment',
                                        onClick: (e, data) => { newAppointmentsHandler(data._id) }
                                    }
                                ]}
                            />
                        </div>
                        : null}
                    {showAddDetailsModal ?
                        <div className="d-flex top-0 justify-content-end bg-primary">
                            <AddDetailsModal
                                changeContentHandler={changeContentHandler}
                                setShowAddDetailsModal={setShowAddDetailsModal}
                            />
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
                {showPrimaryAnalysis ?
                    <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                        <PrimaryAnalysisModal patientId={patientId} setShowPrimaryAnalysis={setShowPrimaryAnalysis} setReload={setReload} reload={reload} />
                    </div>
                    : null}
                {showNewAppointmentsModal ?
                    <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                        <AppointmentsModal patientId={patientId} setShowNewAppointmentsModal={setShowNewAppointmentsModal} setReload={setReload} reload={reload} />
                    </div>
                    : null}
                {showMedicineView ?
                    <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                        <MedicineModal setShowMedicineView={setShowMedicineView} />
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default PatientsLIsting
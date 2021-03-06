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
import AddDosage from './Modals/AddDosage';
import Footer from './Footer';



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
    const [showDosageModal, setShowDosageModal] = useState(false)


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
            setPatientList(PatientData.reverse())
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
        } else if (value == 'dosage') {
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowMedicineView(false)
            setShowMedicineView(false)
            setShowDosageModal(true)
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
        <div className="div flex flex-col  w-screen ">
            <Header />
            <div className="div mb-auto h-screen" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', height: "60em" }}>
                
                <div className="mainContainer" >
                <div className="container-fluid padd-2">
                    <div className="row">
                        <div className="col-md-6 left-side">
                            <h5 className=""><strong>{hospitalName} Hospital</strong></h5>
                        </div>
                        <div className="col-md-6 right-side">
                            <div className="">
                                
                                <div className="">
                                    <div className="appoinment-sec">
                                        <div className=" d-flex justify-content-end pending">
                                            {pendingList?.length >= 1 ?
                                                <div className="pending-app">
                                                    Pending Appointments {pendingCount}
                                                </div>
                                                :
                                                <div className="pending-app">
                                                    Pending Appointments 0
                                                </div>
                                            }
                                        </div>
                                        <div className="align-items-center d-flex  space-x-3 cursor-pointer" onClick={() => { setShowPatientView(true) }}>
                                            <button type="button" className="addnew  inline-block rounded-sm bg-blue-300 text-white leading-normal uppercase shadow-md hover:bg-blue-400 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out w-7 h-7">+</button>
                                            <h5 className="text-label  text-gray-700 font-bold">Add New</h5>
                                            {/* <Dropdown options={showOptions} onChange={(e) => { showModalsHandler(e) }} value={defaultOption} placeholder="Select an option" /> */}
                                        </div>
                                    </div>
                                    <div className="ml-20 ">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    {showAppointmentView ?
                        <div className="main-content">
                            <div className='common-content'>
                            <MaterialTable
                                options={{ searchAutoFocus: true, paginationType: 'stepped', exportButton: true, exportAllData: true, exportFileName: "MEDDBOT", actionsColumnIndex: -1 }}
                                className="mt-5" columns={columns} data={patientList} title=''

                                actions={[
                                    {
                                        icon: () => <button className="btn btn-">New Appointment</button>,
                                        tooltip: 'New Appointment',
                                        onClick: (e, data) => { newAppointmentsHandler(data._id) }
                                    }
                                ]}
                            />
                            </div>
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
                {showDosageModal ?
                    <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                        <AddDosage setShowDosageModal={setShowDosageModal} />
                    </div>
                    : null}
            </div>
            <Footer />
        </div>
    )
}

export default PatientsLIsting
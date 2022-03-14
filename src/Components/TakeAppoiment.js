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
import SearchPage from './SearchPage';
import Pagenation from './Pagenation';
import SettingsView from './SettingsView';
import AddPatientModal from './AddPatientModal';
import AddDoctorModal from './Modals/AddDoctorModal';
import AddDetailsModal from './Modals/AddDetailsModal';
import MaterialTable from 'material-table';
import MedicineModal from './Modals/MedicineModal';
import AddDosage from './Modals/AddDosage';



function TakeAppoiment() {
    const [hospitalName, setHospitalName] = useState('')
    const [doctorList, setDoctorList] = useState([])
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
    const [showAddDetailsModal, setShowAddDetailsModal] = useState(false)
    const [showMedicineView, setShowMedicineView] = useState(false)
    const [showDosageModal, setShowDosageModal] = useState(false)

    const columns = [
        { title: 'Name', field: 'doc_name' },
        { title: 'Qualification', field: 'doc_qualification' },
        { title: 'Specialization', field: 'doc_spec' },
        { title: 'Contact No', field: 'doc_contact' },
        { title: 'Email ID', field: 'doc_email' },
    ]


    const HospitalId = localStorage.getItem('HospitalId')
    const { state } = useLocation();

    const options = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    ];

    const showOptions = [
        'DoctorListing', 'Add Patient', 'Add Doctor', 'Settings'
    ];
    const defaultOption = showOptions[0];
    // const defaultOption = options[0];




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
        instance.post('/list_doctors', obj).then((response) => {
            const doctorData = response?.data.doctors
            setDoctorList(doctorData.reverse())
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
        } else if (value == "settings") {
            setShowDoctorView(false)
            setShowAppointmentView(false)
            setShowPatientView(false)
            setShowMedicineView(false)
            setShowMedicineView(false)
            setShowSettingsView(true)
            setShowAddDetailsModal(false)
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
    const currentPosts = doctorList?.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber)
    const pendingCount = pendingList?.length




    return (
        <div className="div w-screen h-screen fixed">
            <Header />
            <div className="div" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
                <div className="row">
                    <div className="hospitalName mt-3">
                        {/* <label htmlFor="">{hospitalName}</label> */}
                    </div>
                </div>
                <div className="mainContainer " style={{ margin: '2%' }}>
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
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-5 ">
                        <MaterialTable
                            options={{ searchAutoFocus: true, paginationType: 'stepped', exportButton: true, exportAllData: true, exportFileName: "Doctor Details", }}
                            className="mt-5" columns={columns} data={doctorList} title='Doctor Details'
                        />
                    </div>
                    {showDoctorView ?
                        <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                            <AddDoctorModal setOpenModal={setShowDoctorView} setReload={setReload} reload={reload} />
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
                    {showDosageModal ?
                        <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                            <AddDosage setShowDosageModal={setShowDosageModal} />
                        </div>
                        : null}
                    {showSettingsView ?
                        <SettingsView />
                        : null}
                    {showPatientView ?
                        <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                            <AddPatientModal setOpenModal={setShowPatientView} setReload={setReload} reload={reload} />
                        </div>
                        : null}
                    {showMedicineView ?
                        <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                            <MedicineModal setShowMedicineView={setShowMedicineView} />
                        </div>
                        : null}
                </div>
            </div>
        </div>

    )
}

export default TakeAppoiment
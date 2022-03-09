import React, { useEffect, useState } from 'react'
import Header from './Header'
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import instance from '../config/api';
import AddDetailsModal from './Modals/AddDetailsModal';
import SearchPage from './SearchPage'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagenation from './Pagenation';
import SettingsView from './SettingsView';
import AddPatientModal from './AddPatientModal';
import AddDoctorModal from './Modals/AddDoctorModal';
import PrimaryAnalysisModal from './Modals/PrimaryAnalysisModal';
import AppointmentsModal from './Modals/AppointmentsModal';
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
import MedicineModal from './Modals/MedicineModal';



function MedicineListing() {
    const hospitalName = localStorage.getItem('HospitalName')
    const [reload, setReload] = useState(false)
    const hospitalId = localStorage.getItem('HospitalId')
    const [medicineList, setMedicineList] = useState([])
    const [pendingList, setPendingList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [showAddDetailsModal, setShowAddDetailsModal] = useState(false)
    const [showPatientView, setShowPatientView] = useState(false)
    const [showDoctorView, setShowDoctorView] = useState(false)
    const [showAppointmentView, setShowAppointmentView] = useState(true)
    const [showHospitalView, setShowHospitalView] = useState(false)
    const [showSettingsView, setShowSettingsView] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [patientList, setPatientList] = useState([])
    const [postsPerPage, setPostsPerPage] = useState(5)
    const [showPrimaryAnalysis, setShowPrimaryAnalysis] = useState(false)
    const [patientId, setPatientId] = useState('')
    const [showNewAppointmentsModal, setShowNewAppointmentsModal] = useState(false)
    const [tableData, setTableData] = useState([])
    const [showMedicineView, setShowMedicineView] = useState(false)


    const columns = [
        { title: 'Medicine name', field: 'med_name' },
        { title: 'Pharmacological name', field: 's_med_name' },
        { title: 'Medicine type', field: 'med_type' },

    ]


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


    const paginate = pageNumber => setCurrentPage(pageNumber)
    const pendingCount = pendingList?.length




    useEffect(() => {
        fetchMedicineList()
    }, [reload])

    const fetchMedicineList = () => {
        const obj = {
            _hos_id: hospitalId,
            isActive: true
        }
        instance.post('/list_medicine', obj).then((res) => {
            setMedicineList(res?.data.medicines)
        }).catch((err) => {
            console.log('error', err)
        })
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
                        <div className="mt-5">
                            <MaterialTable options={{ searchAutoFocus: true, paginationType: 'stepped', exportButton: true, exportAllData: true, exportFileName: "MEDDBOT" }}
                                className="mt-5" columns={columns} data={medicineList} title='Medicine Details' />
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
        </div >
    )
}

export default MedicineListing
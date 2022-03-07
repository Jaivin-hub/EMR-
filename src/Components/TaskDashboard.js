import React, { useEffect, useState } from 'react'
import '.././assets/css/dashboard.css'
import Header from './Header'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import HospitalView from './HospitalView'
import instance from '../config/api'
import AppoitmentsListing from './AppoitmentsListing'
import SettingsView from './SettingsView'
import AddPatientModal from './AddPatientModal'
import AddDoctorModal from './Modals/AddDoctorModal'
import PrimaryAnalysisModal from './Modals/PrimaryAnalysisModal';
import AddDetailsModal from './Modals/AddDetailsModal';
import MedicineModal from './Modals/MedicineModal';




function TaskDashboard() {

    const [showPatientView, setShowPatientView] = useState(false)
    const [showDoctorView, setShowDoctorView] = useState(false)
    const [showAppointmentView, setShowAppointmentView] = useState(true)
    const [showHospitalView, setShowHospitalView] = useState(false)
    const [showSettingsView, setShowSettingsView] = useState(false)
    const hospitalId = localStorage.getItem('HospitalId')
    const hospitalName = localStorage.getItem('HospitalName')
    const [openModal, setOpenModal] = useState(false)
    const [reload, setReload] = useState(false)
    const [patientId, setPatientId] = useState('')
    const [showPrimaryAnalysis, setShowPrimaryAnalysis] = useState(false)
    const [showAddDetailsModal, setShowAddDetailsModal] = useState(false)
    const [showMedicineView, setShowMedicineView] = useState(false)





    const [appointmentCurrentDate, setAppointmentCurrentDate] = useState('')
    const [appointments, setAppointments] = useState([])


    const options = [
        'Appointments', 'Add Patient', 'Add Doctor', 'Settings'
    ];
    const defaultOption = options[0];


    const fetchAppointment = () => {
        const Data = localStorage.getItem('HospitalName')
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
        setAppointmentCurrentDate(date_format)

        const obj = {
            _hos_id: hospitalId,
            app_date: date_format

        }
        console.log('obj', obj)

        instance.post('/list_appointment', obj).then((res) => {
            const arr = res.data.appointment
            setAppointments(arr)
            setPendingList(arr)


        })
    }

    const changeContentHandler = (value) => {
        console.log(value)
        if (value == 'Add Patients') {
            setShowPatientView(true)
            setShowDoctorView(false)
            setShowMedicineView(false)
            setShowMedicineView(false)
        } else if (value == 'Add Doctor') {
            setShowDoctorView(true)
            setShowPatientView(false)
            setShowMedicineView(false)
            setShowMedicineView(false)
        } else if (value == 'Appointments') {
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowAppointmentView(true)
            setShowHospitalView(false)
            setShowSettingsView(false)
            setShowMedicineView(false)
        } else if (value == 'Settings') {
            setShowSettingsView(true)
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowAppointmentView(false)
            setShowHospitalView(false)
            setShowMedicineView(false)
        } else if (value == 'Add Medicines') {
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowMedicineView(false)
            setShowMedicineView(true)
        }
    }



    useEffect(() => {
        fetchAppointment()
    }, [reload])

    const pendingAppointments = appointments?.length
    console.log('length---', pendingAppointments)
    const [pendingList, setPendingList] = useState()

    console.log('pendingList**********************', pendingList?.length)
    const pendingCount = pendingList?.length

    return (
        <div className="div h-screen w-screen fixed" >

            <Header />
            <div className="div" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
                <div className="row">
                    <div className="hospitalName mt-3">
                        {/* <label htmlFor="">{hospitalName}</label> */}
                    </div>
                </div>
                {/* s */}
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

                                            {/* <Dropdown options={options} onChange={(e) => { dropDownHandler(e) }} value={defaultOption} placeholder="Select an option" /> */}
                                        </div>
                                    </div>
                                    <div className="ml-20 ">
                                        {showAddDetailsModal ?
                                            <AddDetailsModal
                                                changeContentHandler={changeContentHandler}
                                                setShowAddDetailsModal={setShowAddDetailsModal}
                                            />
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {showAppointmentView ?
                        <div className="">
                            <AppoitmentsListing
                                setAppointments={setAppointments}
                                appointments={appointments}
                                setShowPrimaryAnalysis={setShowPrimaryAnalysis}
                                setPatientId={setPatientId}
                                setPendingList={setPendingList}
                                reload={reload} />
                        </div>
                        : null}
                    {showDoctorView ?
                        <div className="">
                            <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                                <AddDoctorModal setOpenModal={setShowDoctorView} setReload={setReload} reload={reload} />
                            </div>
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
                    {showHospitalView ?
                        <HospitalView />
                        : null}
                    {showPrimaryAnalysis ?
                        <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                            <PrimaryAnalysisModal patientId={patientId} setShowPrimaryAnalysis={setShowPrimaryAnalysis} />
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

export default TaskDashboard
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
import AddDosage from './Modals/AddDosage';
import Footer from './Footer';
import moment from 'moment';





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
    const [settingsView, setSettingsView] = useState(false)
    const [showDosageModal, setShowDosageModal] = useState(false)







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
        instance.post('/list_appointment', obj).then((res) => {
            const arr = res.data.appointment
            setAppointments(arr)
            setPendingList(arr)
        })
    }

    const changeContentHandler = (value) => {
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
        } else if (value == 'Add Medicines') {
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowMedicineView(false)
            setShowMedicineView(true)
        } else if (value == "settings") {
            setShowDoctorView(false)
            setShowAppointmentView(false)
            setShowPatientView(false)
            setShowMedicineView(false)
            setShowMedicineView(false)
            setShowSettingsView(true)
        } else if (value == 'dosage') {
            setShowDoctorView(false)
            setShowPatientView(false)
            setShowMedicineView(false)
            setShowMedicineView(false)
            setShowDosageModal(true)
        }
    }

    const [value, setValue] = React.useState('1');
    const [today, setToday] = useState()

    const appointmentsDateHandler = (e) => {
        const date = e.target.value
        setToday(e.target.value)
        const dateData = moment(date).format('DD-MM-YYYY');
        // setAppointmentCurrentDate(dateData)
        fetchAppointmentWithDate(dateData)
    }

    const fetchAppointmentWithDate = (dateData) => {
        const obj = {
            _hos_id: hospitalId,
            app_date: dateData

        }
        instance.post('/list_appointment', obj).then((res) => {
            setAppointments(res?.data.appointment)
            setPendingList(res?.data.appointment)

        })
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        fetchAppointment()
    }, [reload])

    const pendingAppointments = appointments?.length
    const [pendingList, setPendingList] = useState()

    const pendingCount = pendingList?.length

    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0, 10);

    return (
        <div className="div flex flex-col  w-screen " >

            <Header />
            <div className="div mb-auto h-screen" >
                {/* <div className="row"> */}
                    {/* <div className="hospitalName mt-3"> */}
                        {/* <label htmlFor="">{hospitalName}</label> */}
                    {/* </div> */}
                {/* </div> */}
                {/* s */}
                <div className="mainContainer">
                    <div className="container-fluid padd-2">
                    <div className="row">
                        <div className="col-md-6">
                           <div className='d-flex main-hos'>
                                <div>
                                    <h5 className=" text-gray-600"><strong>{hospitalName} Hospital</strong></h5>
                                </div>
                                <div className="">
                                        <input defaultValue={date} onChange={handleChange} className=" date-f"  type="date" onChange={(e) => {
                                            appointmentsDateHandler(e)
                                        }} />
                                        {/* <Dropdown className="mt-3 w-42  rounded-lg" options={options} value={defaultOption} placeholder="Select an option" />; */}
                                </div>
                           </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <div className="">
                                    <div className="appoinment-sec">
                                        <div className=" d-flex justify-content-end pending">
                                            {pendingList?.length >= 1 ?
                                                <div className="pending-app">
                                                    Pending Appointments {pendingCount}
                                                </div>
                                                :
                                                <div className="pending-n">
                                                    Pending Appointments 0
                                                </div>
                                            }
                                        </div>
                                        <div className="align-items-center  d-flex  space-x-3 cursor-pointer" onClick={() => { setShowAddDetailsModal(true) }}>
                                            <button type="button" className=" addnew inline-block rounded-sm bg-blue-300 text-white leading-normal uppercase shadow-md hover:bg-blue-400 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out w-7 h-7">+</button>
                                            <h5 className="text-label  text-gray-700 font-bold">Add New</h5>
                                            {/* <Dropdown options={options} onChange={(e) => { dropDownHandler(e) }} value={defaultOption} placeholder="Select an option" /> */}
                                        </div>
                                    </div>
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
                                reload={reload}
                                showAddDetailsModal={showAddDetailsModal}
                                setShowAddDetailsModal={setShowAddDetailsModal}
                                showAddDetailsModal={showAddDetailsModal}
                                changeContentHandler={changeContentHandler}
                            />
                            {/* : showAddDetailsModal ?
                            <div className="centered loginWrapper d-flex justify-content-end align-items-end">
                                <AddDetailsModal
                                    changeContentHandler={changeContentHandler}
                                    setShowAddDetailsModal={setShowAddDetailsModal}
                                />
                            </div> */}
                        </div>
                        : null
                    }

                    {showDoctorView ?
                        <div className="">
                            <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                                <AddDoctorModal setOpenModal={setShowDoctorView} setReload={setReload} reload={reload} />
                            </div>
                        </div>
                        : null}

                    {showSettingsView ?
                        <SettingsView changeContentHandler={changeContentHandler} />
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
                    {showDosageModal ?
                        <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                            <AddDosage setShowDosageModal={setShowDosageModal} />
                        </div>
                        : null}
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default TaskDashboard
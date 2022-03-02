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




    const [appointmentCurrentDate, setAppointmentCurrentDate] = useState('')
    const [appointments, setAppointments] = useState([])


    const options = [
        'Appointments', 'Add Patient', 'Add Doctor', 'Settings'
    ];
    const defaultOption = options[0];
    const dropDownHandler = (e) => {
        if (e.value == 'Add Patient') {
            setShowPatientView(true)
            setShowDoctorView(false)
        } else if (e.value == 'Add Doctor') {
            setShowDoctorView(true)
            setShowPatientView(false)
        } else if (e.value == 'Appointments') {
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
                                        <div className="col-md-5 mt-1">
                                            <Dropdown options={options} onChange={(e) => { dropDownHandler(e) }} value={defaultOption} placeholder="Select an option" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {showAppointmentView ?
                        <div className="">
                            <AppoitmentsListing setAppointments={setAppointments} appointments={appointments} setPendingList={setPendingList} reload={reload} />
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
                    


                </div>

            </div>
        </div>
    )
}

export default TaskDashboard
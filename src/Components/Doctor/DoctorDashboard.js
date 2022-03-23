import React, { useState, useEffect } from 'react'
import instance from '../../config/api'
import AppoitmentsListing from '../AppoitmentsListing'
import Header from '../Header'
import moment from 'moment';
import PrimaryAnalysisModal from '../Modals/PrimaryAnalysisModal';
import DoctorHeader from './DoctorHeader';
import AddPatientModal from '../AddPatientModal';


function DoctorDashboard() {
    const doctorName = localStorage.getItem('doctorName')
    const hospitalName = localStorage.getItem('HospitalName')
    const [pendingList, setPendingList] = useState()
    const [showAddDetailsModal, setShowAddDetailsModal] = useState(false)
    const [showAppointmentView, setShowAppointmentView] = useState(true)
    const [appointments, setAppointments] = useState([])
    const [showPrimaryAnalysis, setShowPrimaryAnalysis] = useState(false)
    const [patientId, setPatientId] = useState('')
    const [reload, setReload] = useState(false)
    const [appointmentCurrentDate, setAppointmentCurrentDate] = useState('')
    const hospitalId = localStorage.getItem('HospitalId')
    const [value, setValue] = React.useState('1');
    const [today, setToday] = useState()
    const [showPatientView, setShowPatientView] = useState(false)





    const changeContentHandler = (value) => {

    }
    const fetchAppointment = () => {
        const doctorId = localStorage.getItem('doctorDetails')
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
        console.log(obj);
        instance.post('/list_appointment', obj).then((res) => {
            console.log(res);
            const arr = res?.data.appointment
            const filteredData = arr.filter((val) => {
                if (val._doc_id._id === doctorId) {
                    console.log('if', val)
                    return val
                } else {
                    console.log('else', val._doc_id._id);
                }
            })
            console.log('arr', filteredData)
            setAppointments(filteredData)
            setPendingList(arr)
        })
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



    useEffect(() => {
        fetchAppointment()
    }, [reload])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const appointmentsDateHandler = (e) => {
        const date = e.target.value
        setToday(e.target.value)
        const dateData = moment(date).format('DD-MM-YYYY');
        // setAppointmentCurrentDate(dateData)
        fetchAppointmentWithDate(dateData)
    }


    const pendingCount = pendingList?.length
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0, 10);
    return (
        <div>
            <div className="div h-screen w-screen fixed " >

                <DoctorHeader />
                <div className="div" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
                    <div className="row">
                        <div className="hospitalName mt-3">
                            {/* <label htmlFor="">{hospitalName}</label> */}
                        </div>
                    </div>
                    {/* s */}
                    <div className="mainContainer " style={{ margin: '2%' }}>
                        <div className="row">
                            <div className="col-md-6 d-flex space-x-5">
                                <div className="d-flex space-x-5">

                                    <h5 className="pt-3 text-gray-600"><strong>{hospitalName} Hospital</strong></h5>
                                    <h5 className="pt-3 text-gray-600"><strong>{doctorName} </strong></h5>

                                </div>
                                <div className="row space-x-5">
                                    <input defaultValue={date} onChange={handleChange} className="mt-1 h-12 shadow-md" style={{ marginLeft: '1%' }} type="date" onChange={(e) => {
                                        appointmentsDateHandler(e)
                                    }} />
                                    {/* <Dropdown className="mt-3 w-42  rounded-lg" options={options} value={defaultOption} placeholder="Select an option" />; */}
                                </div>
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
                                            <div className="col-md-5 mt-3 d-flex  space-x-3 cursor-pointer" onClick={() => { setShowPatientView(true) }}>
                                                <button type="button" className="inline-block rounded-sm bg-blue-300 text-white leading-normal uppercase shadow-md hover:bg-blue-400 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out w-7 h-7">+</button>
                                                <h5 className="mt-1  text-gray-700 font-bold">Add New</h5>
                                                {/* <Dropdown options={options} onChange={(e) => { dropDownHandler(e) }} value={defaultOption} placeholder="Select an option" /> */}
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
                            </div>
                            : null
                        }
                        {showPrimaryAnalysis ?
                            <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                                <PrimaryAnalysisModal patientId={patientId} setShowPrimaryAnalysis={setShowPrimaryAnalysis} />
                            </div>
                            : null}
                        {showPatientView ?
                            <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                                <AddPatientModal setOpenModal={setShowPatientView} setReload={setReload} reload={reload} />
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard
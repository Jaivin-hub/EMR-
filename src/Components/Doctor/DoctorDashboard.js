import React, { useState, useEffect } from 'react'
import instance from '../../config/api'
import AppoitmentsListing from '../AppoitmentsListing'
import Header from '../Header'

function DoctorDashboard() {
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


    const changeContentHandler = (value) => {

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
        instance.post('/list_appointment', obj).then((res) => {
            const arr = res.data.appointment
            setAppointments(arr)
            setPendingList(arr)
        })
    }

    useEffect(() => {
        fetchAppointment()
    }, [reload])


    const pendingCount = pendingList?.length
    return (
        <div>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard
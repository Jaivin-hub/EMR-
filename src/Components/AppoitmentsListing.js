import React, { useEffect, useState } from 'react'
import '.././assets/css/dashboard.css'
import 'react-dropdown/style.css';
import instance from '../config/api'
import moment from 'moment';
import { Tab, Nav, Tabs, Form, Button, Accordion } from 'react-bootstrap';
import '../assets/css/appointments.css'
import { useNavigate } from 'react-router-dom';
import PrimaryAnalysisModal from './Modals/PrimaryAnalysisModal';
import AddDetailsModal from './Modals/AddDetailsModal';
import MaterialTable from 'material-table';
import Dropdown from 'react-dropdown';


// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';


function AppoitmentsListing({ setPendingList, setShowPrimaryAnalysis, reload, appointments, setAppointments, setPatientId, setShowAddDetailsModal, showAddDetailsModal, changeContentHandler }) {
    // const [appointments, setAppointments] = useState([])
    const navigate = useNavigate();
    const hospitalId = localStorage.getItem('HospitalId')
    const [appointmentCurrentDate, setAppointmentCurrentDate] = useState('')
    const [hospitalName, setHospitalName] = useState('')
    // const [patientId, setPatientId] = useState('')

    // const [reload, setReload] = useState(false)

    const options = [
        'PENDING', 'ALL COMPLETED'
    ];
    const defaultOption = options[0];

    const columns = [
        { title: 'Patient Name', field: '_pat_id.p_firstname', sorting: false },
        { title: 'Age', field: '_pat_id.p_dob', sorting: false },
        { title: 'Appointment date', field: 'app_date', sorting: false },
        { title: 'Appointment Time', field: 'app_time', defaultSort: 'asc' },
        { title: 'Doctor Name', field: '_doc_id.doc_name', sorting: false },
        { title: 'Specialization', field: '_doc_id.doc_spec', sorting: false },
    ]


    useEffect(() => {
        // fetchAppointment()
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
        setToday(date)
    }, [])




    // const fetchAppointment = () => {
    //     const Data = localStorage.getItem('HospitalName')
    //     setHospitalName(Data)
    //     var today = new Date();
    //     var dd = today.getDate();
    //     if (dd < 10) {
    //         dd = '0' + dd;
    //     }
    //     var mm = today.getMonth() + 1;
    //     if (mm < 10) {
    //         mm = '0' + mm;
    //     }
    //     var year = today.getFullYear();
    //     const date_format = dd + "-" + mm + "-" + year
    //     setAppointmentCurrentDate(date_format)

    //     const obj = {
    //         _hos_id: hospitalId,
    //         app_date: date_format

    //     }
    //     console.log('obj', obj)

    //     instance.post('/list_appointment', obj).then((res) => {
    //         const arr = res.data.appointment
    //         setAppointments(arr)
    //         setPendingList(arr)


    //     })
    // }






    const [today, setToday] = useState()


    const primaryAnalysisHandler = (id) => {
        console.log(id)
        setPatientId(id)
        setShowPrimaryAnalysis(true)
    }



    const consultationHandler = (patientId, doctorId, index, appId) => {
        const selectedData = []
        appointments.map((item, i) => {
            if (item._pat_id._id == patientId) {
                selectedData.push(item);
            }
        })
        navigate('/consultation', { state: selectedData })
    }


    return (
        <>
            <div className=" addPatient navbar-light rounded-md common-content" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-2 ">
                                <Dropdown className="      items-center" options={options} value={defaultOption} placeholder="Select an option" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-4">
                        <MaterialTable
                            options={{ searchAutoFocus: true, paginationType: 'stepped', exportButton: true, exportAllData: true, exportFileName: "MEDDBOT", actionsColumnIndex: -1 }}
                            className="mt-5" columns={columns} data={appointments} title=''
                            style={{ scroll: 'none' }}
                            actions={[
                                {
                                    icon: () => <button style={{ color: 'white', backgroundColor: '#6c757d' }} className="btn btn- rounded-md">Primary Analysis</button>,
                                    onClick: (e, data) => { primaryAnalysisHandler(data._pat_id._id) }
                                },
                                {
                                    icon: () => <button style={{ color: 'white', backgroundColor: '#6c757d' }} className="btn btn-">consultation</button>,
                                    onClick: (e, data) => { consultationHandler(data._pat_id._id, data._doc_id._id, data._id) }
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
            {showAddDetailsModal ?
                <div className="centered loginWrapper d-flex justify-content-end align-items-end mt-4">
                    <AddDetailsModal
                        changeContentHandler={changeContentHandler}
                        setShowAddDetailsModal={setShowAddDetailsModal}
                    />
                </div>
                : null}

        </>
    )
}

export default AppoitmentsListing
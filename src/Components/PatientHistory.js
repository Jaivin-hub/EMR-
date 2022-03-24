import React, { useState, useEffect } from 'react'
import Header from './Header'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import instance from '../config/api'
import { useLocation } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CollapsibleTable from './MiTable';
import { IoIosArrowForward } from 'react-icons/io'
import HistoryMedicine from './Modals/HistoryMedicine';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




function PatientHistory() {
    const hospitalId = localStorage.getItem('HospitalId')
    const [prescriptionHistoryList, setPrescriptionHistoryList] = useState([])
    const [selectedList, setSelectedList] = useState([])
    const [primaryDetails, setPrimaryDetails] = useState([])
    const [showMedicines, setShowMedicines] = useState(false)
    const state = useLocation()
    const patientId = state?.state
    const navigate = useNavigate();
    const backButtonHandler = () => {
        navigate('/taskDashboard')
    }

    useEffect(() => {
        let mount = true;
        fetchPatientHistory()
        return mount = false
    }, [])


    const fetchPatientHistory = () => {
        const obj = {
            _hos_id: hospitalId,
            _pat_id: patientId
        }
        instance.post('/list_patient_prescription', obj).then((res) => {
            var dummy = []
            let allDetails = []
            for (let i = 0; i < res?.data.prescription?.length; i++) {
                console.log('prs--', res.data.prescription);
                const hId = res.data.prescription[i]._hos_id.name
                const hPhone = res.data.prescription[i]._hos_id.contact_1
                const app_date = res.data.prescription[i]._pat_app_id.app_date
                const app_time = res.data.prescription[i]._pat_app_id.app_time
                const dName = res.data.prescription[i]._refer_doc_id.doc_name
                const dPhone = res.data.prescription[i]._refer_doc_id.doc_contact
                const priscriptionId = res?.data.prescription[i]._id
                const newObj = {
                    hId, hPhone, app_date, app_time, dName, dPhone, priscriptionId
                }
                allDetails.push(newObj)
                const refDoctorName = res.data.prescription[i]._refer_doc_id.doc_name
                const patientHistoryDetails = {
                    _pat_presc_id: res?.data.prescription[i]._id
                }
                instance.post('/list_patient_prescription_dosage', patientHistoryDetails).then((response) => {
                    console.log('response.data.dosage', response.data.dosage);
                    dummy = [...dummy, response.data.dosage]
                    var newArr = [];
                    for (var j = 0; j < dummy.length; j++) {
                        newArr = newArr.concat(dummy[j]);
                        newArr[j].refDoc = refDoctorName
                    }
                    setPrescriptionHistoryList(newArr);
                })
            }
            setPrimaryDetails(allDetails)
        })
    }
    // console.log('prescriptionHistoryList', prescriptionHistoryList);

    const handleClick = (id) => {
        const patientHistoryDetails = {
            _pat_presc_id: id
        }
        console.log(id);
        instance.post('/list_patient_prescription_dosage', patientHistoryDetails).then((response) => {
            // console.log('response.data.dosage', response.data.dosage);
            setSelectedList(response.data.dosage)
            setShowMedicines(true)
        })
    }

    function createData(name, calories, fat, carbs, protein, price) {
        return {
            name,
            calories,
            fat,
            carbs,
            protein,
            price,
            history: [
                {
                    date: '2020-01-05',
                    customerId: '11091700',
                    amount: 3,
                },
                {
                    date: '2020-01-02',
                    customerId: 'Anonymous',
                    amount: 1,
                },
            ],
        };
    }


    return (
        <div >
            <Header />
            <div className="row m-3">
                {/* <div className="col-md-12">
                    <IoMdArrowRoundBack onClick={backButtonHandler} size={20} cursor='pointer' />
                </div> */}
            </div>
            <div className="navbar-light  m-5 bg-white shadow-md">
                <div className="row">
                    <div className="col-md-12">

                    </div>
                </div>
            </div>
            <div className="navbar-light  m-5 ">
                <div className="row mt-3">
                    <div className="col-md-12 d-flex justify-content-center">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >SI No</TableCell>
                                        <TableCell >Hospital</TableCell>
                                        <TableCell >Hospital Phone Number</TableCell>
                                        <TableCell >Doctor Name</TableCell>
                                        <TableCell >Doctor Phone Number</TableCell>
                                        <TableCell >Appointment Date</TableCell>
                                        <TableCell >Appointment Time</TableCell>
                                        <TableCell >Prescription Medicines</TableCell>

                                    </TableRow>
                                </TableHead>
                                {/* // <Accordion style={{ width: '100%' }} className="space-x-5" defaultActiveKey={['0']} > */}
                                {/* // <Accordion.Item eventKey={i} onClick={() => { handleClick(item.priscriptionId) }}> */}

                                {/* // <Accordion.Header className="" > */}

                                {primaryDetails?.map((item, i) => {
                                    return (
                                        <>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        {i + 1}.
                                                    </TableCell>
                                                    <TableCell >{item.hId}</TableCell>
                                                    <TableCell >{item.hPhone}</TableCell>
                                                    <TableCell >{item.dName}</TableCell>
                                                    <TableCell >{item.dPhone}</TableCell>
                                                    <TableCell >{item.app_date}</TableCell>
                                                    <TableCell >{item.app_time}</TableCell>
                                                    <TableCell ><IoIosArrowForward cursor='pointer' onClick={() => { handleClick(item.priscriptionId) }} size={20} /></TableCell>
                                                </TableRow>
                                            </TableBody>
                                            {/* {selectedList?.map((item, index) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell component="th" scope="row">
                                                            {index + 1}.
                                                        </TableCell>
                                                        <TableCell >{item._med_id.med_name}</TableCell>
                                                        <TableCell >{item._med_id.s_med_name}</TableCell>
                                                        <TableCell >{item._med_id.med_type}</TableCell>
                                                        <TableCell >{item.dosage}</TableCell>
                                                        <TableCell >{item.days}</TableCell>
                                                        <TableCell >{item.total_quantity}</TableCell>
                                                    </TableRow>
                                                )
                                            })} */}
                                        </>
                                    )
                                })}
                            </Table>
                        </TableContainer>
                        {/* //  </Accordion.Header> */}
                        {/* //  <Accordion.Body> */}
                        {/* //  </Accordion.Body> */}

                        {/* // </Accordion.Item> */}
                        {/* //  </Accordion> */}
                        {/* <CollapsibleTable primaryDetails={primaryDetails} /> */}
                        {showMedicines ?
                            <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                                <HistoryMedicine setShowMedicines={setShowMedicines} selectedList={selectedList} />
                            </div>
                            : null}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PatientHistory
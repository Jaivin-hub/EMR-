import React, { useState, useEffect } from 'react'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import instance from '../config/api';
import Tabs from './Tabs'

function Consultation() {
    const hospitalId = localStorage.getItem('HospitalId')
    const state = useLocation()
    const patientId = state.state
    const [diabetesChecked, setDiabetesChecked] = useState('')
    const [bpChecked, setBpChecked] = useState('')
    const [patientHeight, setPatientHeight] = useState('')
    const [patientWeight, setPatientWeight] = useState('')
    const [patientFasting, setPatientFasting] = useState('')
    const [patientAfterFood, setPatientAfterFood] = useState('')
    const [patientLowerValue, setPatientLowerValue] = useState('')
    const [patientUpperValue, setPatientUpperValue] = useState('')
    const [patientAllergicFood, setPatientAllergicFood] = useState('')
    const [patientAllergicMedicine, setPatientAllergicMedicine] = useState('')


    const fetchPatientPrimaryAnalysis = () => {
        const obj = {
            _hos_id: hospitalId,
            _pat_id: patientId
        }

        instance.post('list_patient_primary_analysis', obj).then((response) => {
            console.log('res--ponse--', response.data.patientAnalysis[0]);
            const data = response.data.patientAnalysis[0]
            setPatientHeight(data.height)
            setPatientWeight(data.weight)
            if (data.diabetes == true) {
                setDiabetesChecked("Yes")
            } else {
                setDiabetesChecked("No")
            }
            setPatientFasting(data.fasting)
            setPatientAfterFood(data.after_food)
            if (data.bp == true) {
                setBpChecked('Yes')
            } else {
                setBpChecked('No')
            }
            setPatientLowerValue(data.lower_value)
            setPatientUpperValue(data.upper_value)
            setPatientAllergicFood(data.allergic_food)
            setPatientAllergicMedicine(data.allergic_medicine)

        })
    }

    useEffect(() => {
        fetchPatientPrimaryAnalysis()
    }, [])

    return (
        <div>
            <Header />
            <div className="navbar-light  m-5 bg-white shadow-md">
                <div className="row">
                    <div className="col-md-12">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                {/* <TableHead>
                                    <TableRow>
                                        <TableCell >Firstname</TableCell>
                                        <TableCell >Lastname</TableCell>
                                        <TableCell >Adhar No</TableCell>
                                        <TableCell >Age</TableCell>
                                        <TableCell >Blood Group</TableCell>
                                        <TableCell >City</TableCell>
                                        <TableCell >State</TableCell>
                                        <TableCell >Contact No1</TableCell>
                                        <TableCell >Contact No2</TableCell>
                                    </TableRow>
                                </TableHead> */}
                                {/* <TableBody>
                                    {patientDetails?.map((value, index) => (
                                        <TableRow
                                            key={index}
                                        >
                                            <TableCell component="th" scope="row">
                                                {value._pat_id.p_firstname}
                                            </TableCell>
                                            <TableCell >{value._pat_id.p_dob}</TableCell>
                                            <TableCell >{value.app_date}</TableCell>
                                            <TableCell >{value.app_time}</TableCell>
                                            <TableCell >{value._doc_id.doc_name}</TableCell>
                                            <TableCell >{value._doc_id.doc_spec}</TableCell>
                                            
                                        </TableRow>
                                    ))}
                                </TableBody> */}
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <div className="navbar-light  m-5 bg-white shadow-md">
                <div className="row">
                    <div className="col-md-12">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Height</TableCell>
                                        <TableCell >Weight</TableCell>
                                        <TableCell >Diabetes</TableCell>
                                        <TableCell >Fasting</TableCell>
                                        <TableCell >AfterFood</TableCell>
                                        <TableCell >Bp</TableCell>
                                        <TableCell >Lower Value</TableCell>
                                        <TableCell >Upper Value</TableCell>
                                        <TableCell >Allergic Food</TableCell>
                                        <TableCell >Allergic Medicine</TableCell>


                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {patientHeight}
                                        </TableCell>
                                        <TableCell >{patientWeight}</TableCell>
                                        <TableCell >{diabetesChecked}</TableCell>
                                        <TableCell >{patientFasting}</TableCell>
                                        <TableCell >{patientAfterFood}</TableCell>
                                        <TableCell >{bpChecked}</TableCell>
                                        <TableCell >{patientLowerValue}</TableCell>
                                        <TableCell >{patientUpperValue}</TableCell>
                                        <TableCell >{patientAllergicFood}</TableCell>
                                        <TableCell >{patientAllergicMedicine}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <div className="row space-x-3 m-5">
                <textarea className='border-4' placeholder="Comments" name="" id="" cols="50" rows="2"></textarea>
                <input type="text" className='border-4' />
            </div>
            <div className="navbar-light  m-5 bg-white shadow-md">
                <label className="font-bold underline "></label>
                <div className="row">
                    <div className="col-md-12">

                        <Tabs />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Consultation
import React, { useState, useEffect } from 'react'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import { TextField, Button, IconButton, RemoveButton } from '@mui/material'
import { Select, MenuItem, FormControl, InputLabel, makeStyles, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import instance from '../config/api';



function PrimaryAnalysis() {
    const { state } = useLocation();
    const patientId = state
    const hospitalId = localStorage.getItem('HospitalId')
    const hospitalName = localStorage.getItem('HospitalName')
    const [diabetesChecked, setDiabetesChecked] = useState(false)
    const [bpChecked, setBpChecked] = useState(false)
    const [patientHeight, setPatientHeight] = useState('')
    const [patientWeight, setPatientWeight] = useState('')
    const [patientFasting, setPatientFasting] = useState('')
    const [patientAfterFood, setPatientAfterFood] = useState('')
    const [patientLowerValue, setPatientLowerValue] = useState('')
    const [patientUpperValue, setPatientUpperValue] = useState('')
    const [patientAllergicFood, setPatientAllergicFood] = useState('No food allergi')
    const [patientAllergicMedicine, setPatientAllergicMedicine] = useState('No medicine allergi')

    const submitHandler = () => {
        const obj = {
            _hos_id: hospitalId,
            _pat_id: patientId,
            height: patientHeight,
            weight: patientWeight,
            diabetes: diabetesChecked,
            fasting: patientFasting,
            after_food: patientAfterFood,
            bp: bpChecked,
            lower_value: patientLowerValue,
            upper_value: patientUpperValue,
            allergic_food: patientAllergicFood,
            allergic_medicine: patientAllergicMedicine
        }
        instance.post('patient_primary_analysis', obj).then((response) => {
            // console.log('res--ponse--', response);
            if (response) {
                alert(response.data.msg)
            }
        })
    }

    const fetchPatientPrimaryAnalysis = () => {
        const obj = {
            _hos_id: hospitalId,
            _pat_id: patientId
        }

        instance.post('list_patient_primary_analysis', obj).then((response) => {
            console.log('res--ponse--', response.data.patientAnalysis);
            const data = response.data.patientAnalysis[0]
            setPatientHeight(data.height)
            setPatientWeight(data.weight)
            setDiabetesChecked(data.diabetes)
            setPatientFasting(data.fasting)
            setPatientAfterFood(data.after_food)
            setBpChecked(data.bp)
            setPatientLowerValue(data.lower_value)
            setPatientUpperValue(data.upper_value)
            setPatientAllergicFood(data.allergic_food)
            setPatientAllergicMedicine(data.allergic_medicine)

        })
    }
    console.log('patientHeight', patientHeight)


    useEffect(() => {
        fetchPatientPrimaryAnalysis()
    }, [])
    return (
        <div className="div">
            <Header />
            <div className="div" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', height: "60em" }}>
                <div className="row">
                    <div className="hospitalName mt-3">
                    </div>
                </div>
                <div className="mainContainer" style={{ margin: '2%' }}>
                    {/* <h4 htmlFor="">{hospitalName} Hospitals</h4> */}
                    <h5 className=""><strong>{hospitalName} Hospital</strong></h5>
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <div className="row ">

                            </div>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                    <div className="addPatient navbar-light mt-2" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                        <div className="row pt-4" >
                            {/* <div className="col-md-1" style={{ marginLeft: '5%' }} >
                Doctor List
            </div> */}
                            <h4 style={{ marginLeft: '3%' }}><strong>Primary Analysis</strong></h4>
                        </div>

                        <div className="row p-5">
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientHeight'
                                    value={patientHeight}
                                    onChange={(e) => {
                                        setPatientHeight(e.target.value)
                                        // patientLastNameInputChangeHandler(e.target.value, setPatientLastNameErr)
                                    }}
                                    // onBlur={(e) => {
                                    //     patientLastNameInputBlurHandler(e.target.value, setPatientLastNameErr)
                                    // }}
                                    // value={patientLastName}
                                    label="Patient Height"
                                />
                                <label className="mt-4" htmlFor="">cm</label>
                                {/* <p style={{ color: "red" }}>{patientLastNameErr}</p> */}
                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientWeight'
                                    value={patientWeight}
                                    onChange={(e) => {
                                        setPatientWeight(e.target.value)
                                        // patientLastNameInputChangeHandler(e.target.value, setPatientLastNameErr)
                                    }}
                                    // onBlur={(e) => {
                                    //     patientLastNameInputBlurHandler(e.target.value, setPatientLastNameErr)
                                    // }}
                                    // value={patientLastName}
                                    label="Patient Weight"
                                />
                                <label className="mt-4" htmlFor="">kg</label>
                                {/* <p style={{ color: "red" }}>{patientLastNameErr}</p> */}
                            </div>
                            <div className="col-md-3 mt-4">
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox color="primary" checked={diabetesChecked} onChange={() => { setDiabetesChecked(!diabetesChecked) }} />} label="Diabetes" />
                                </FormGroup>
                                {/* <p style={{ color: "red" }}>{patientLastNameErr}</p> */}
                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientName'
                                    value={patientFasting}
                                    onChange={(e) => {
                                        setPatientFasting(e.target.value)
                                        // patientLastNameInputChangeHandler(e.target.value, setPatientLastNameErr)
                                    }}
                                    // onBlur={(e) => {
                                    //     patientLastNameInputBlurHandler(e.target.value, setPatientLastNameErr)
                                    // }}
                                    // value={patientLastName}
                                    label="Fasting"
                                />
                                {/* <p style={{ color: "red" }}>{patientLastNameErr}</p> */}
                            </div>
                        </div>

                        <div className="row p-5">
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientName'
                                    value={patientAfterFood}
                                    onChange={(e) => {
                                        setPatientAfterFood(e.target.value)
                                        // patientLastNameInputChangeHandler(e.target.value, setPatientLastNameErr)
                                    }}
                                    // onBlur={(e) => {
                                    //     patientLastNameInputBlurHandler(e.target.value, setPatientLastNameErr)
                                    // }}
                                    // value={patientLastName}
                                    label="After_food"
                                />
                                {/* <p style={{ color: "red" }}>{patientLastNameErr}</p> */}
                            </div>

                            <div className="col-md-3 mt-3">
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox color="primary" checked={bpChecked} onChange={() => { setBpChecked(!bpChecked) }} />} label="bp" />
                                </FormGroup>
                                {/* <p style={{ color: "red" }}>{patientLastNameErr}</p> */}
                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientLowervalue'
                                    value={patientLowerValue}
                                    onChange={(e) => {
                                        setPatientLowerValue(e.target.value)
                                        // patientLastNameInputChangeHandler(e.target.value, setPatientLastNameErr)
                                    }}
                                    // onBlur={(e) => {
                                    //     patientLastNameInputBlurHandler(e.target.value, setPatientLastNameErr)
                                    // }}
                                    // value={patientLastName}
                                    label="Lower_value"
                                />
                                {/* <p style={{ color: "red" }}>{patientLastNameErr}</p> */}
                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientUpperValue'
                                    value={patientUpperValue}
                                    onChange={(e) => {
                                        setPatientUpperValue(e.target.value)
                                        // patientLastNameInputChangeHandler(e.target.value, setPatientLastNameErr)
                                    }}
                                    // onBlur={(e) => {
                                    //     patientLastNameInputBlurHandler(e.target.value, setPatientLastNameErr)
                                    // }}
                                    // value={patientLastName}
                                    label="Upper_value"
                                />
                                {/* <p style={{ color: "red" }}>{patientLastNameErr}</p> */}
                            </div>
                        </div>

                        <div className="row p-5">

                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientName'
                                    value={patientAllergicFood}
                                    onChange={(e) => {
                                        setPatientAllergicFood(e.target.value)
                                        // patientLastNameInputChangeHandler(e.target.value, setPatientLastNameErr)
                                    }}
                                    // onBlur={(e) => {
                                    //     patientLastNameInputBlurHandler(e.target.value, setPatientLastNameErr)
                                    // }}
                                    // value={patientLastName}
                                    label="Allergic_food"
                                />
                                {/* <p style={{ color: "red" }}>{patientLastNameErr}</p> */}
                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientName'
                                    value={patientAllergicMedicine}
                                    onChange={(e) => {
                                        setPatientAllergicMedicine(e.target.value)
                                        // patientLastNameInputChangeHandler(e.target.value, setPatientLastNameErr)
                                    }}
                                    // onBlur={(e) => {
                                    //     patientLastNameInputBlurHandler(e.target.value, setPatientLastNameErr)
                                    // }}
                                    // value={patientLastName}
                                    label="Allergic_medicine"
                                />
                                {/* <p style={{ color: "red" }}>{patientLastNameErr}</p> */}
                            </div>
                            <div className="col-md-3 mt-2">
                                <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#0298D5' }} onClick={submitHandler}>Add Details</button>
                                {/* <Button variant="outlined" onClick={submitHandler}>Add Details</Button> */}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrimaryAnalysis
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { TextField, Button, IconButton, RemoveButton } from '@mui/material'
import { Select, MenuItem, FormControl, InputLabel, makeStyles, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import instance from '../../config/api';

function PrimaryAnalysisModal({ patientId, setShowPrimaryAnalysis, setReload, reload }) {
    // const { state } = useLocation();
    // const patientId = state
    const hospitalId = localStorage.getItem('HospitalId')
    const hospitalName = localStorage.getItem('HospitalName')
    const [diabetesChecked, setDiabetesChecked] = useState(false)
    const [bpChecked, setBpChecked] = useState(false)
    const [patientHeight, setPatientHeight] = useState("null")
    const [patientWeight, setPatientWeight] = useState("null")
    const [patientFasting, setPatientFasting] = useState("null")
    const [patientAfterFood, setPatientAfterFood] = useState("null")
    const [patientLowerValue, setPatientLowerValue] = useState("null")
    const [patientUpperValue, setPatientUpperValue] = useState("null")
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
        console.log(obj)
        instance.post('patient_primary_analysis', obj).then((response) => {
            console.log('response----', response)
            if (response) {
                setShowPrimaryAnalysis(false)
            }
        })
    }

    const fetchPatientPrimaryAnalysis = () => {
        const obj = {
            _hos_id: hospitalId,
            _pat_id: patientId
        }
        instance.post('list_patient_primary_analysis', obj).then((response) => {
            const data = response.data.patientAnalysis[0]
            console.log('primary analysis data', data)
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
        <div className="Modal_Container bg-white" style={{ maxWidth: '90%' }}>
            <div className="row">
                <div className="col-md-8 ">
                    <h4 className="underline"><strong>Primary Analysis</strong></h4>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => { setShowPrimaryAnalysis(false) }} className="col-md-4  d-flex justify-content-end align-items-end">
                    <h4>x</h4>
                </div>
            </div>
            <div className="row p-5 d-flex space-x-5 " style={{ backgroundColor: "#FFFFFF" }}>
                {/* <div className="col-md-2 mt-3"> */}
                <TextField
                    variant="standard"
                    id='patientHeight'
                    value={patientHeight == 'null' ? "" : patientHeight}
                    onChange={(e) => {
                        setPatientHeight(e.target.value)
                    }}
                    label="Patient Height"
                />
                {/* </div> */}
                {/* <div className="col-md-2 mt-3"> */}
                <TextField
                    variant="standard"
                    id='patientWeight'
                    value={patientWeight == 'null' ? "" : patientWeight}
                    onChange={(e) => {
                        setPatientWeight(e.target.value)
                    }}
                    label="Patient Weight"
                />
                {/* </div> */}
                {/* <div className="col-md-2 mt-4"> */}
                <FormGroup>
                    <FormControlLabel control={<Checkbox color="primary" checked={diabetesChecked} onChange={() => { setDiabetesChecked(!diabetesChecked) }} />} label="Diabetes" />
                </FormGroup>
                {/* </div> */}
                {/* <div className="col-md-2 mt-3"> */}
                <TextField
                    variant="standard"
                    id='patientName'
                    value={patientFasting == 'null' ? "" : patientFasting}
                    onChange={(e) => {
                        setPatientFasting(e.target.value)
                    }}
                    label="Fasting"
                />
                {/* </div> */}
                {/* <div className="col-md-2 mt-3"> */}
                <TextField
                    variant="standard"
                    id='patientName'
                    value={patientAfterFood == 'null' ? "" : patientAfterFood}
                    onChange={(e) => {
                        setPatientAfterFood(e.target.value)
                    }}
                    label="After_food"
                />
                {/* </div> */}
            </div>
            <div className="row p-5 d-flex space-x-5">
                {/* <div className="col-md-2 mt-4"> */}
                <FormGroup>
                    <FormControlLabel control={<Checkbox color="primary" checked={bpChecked} onChange={() => { setBpChecked(!bpChecked) }} />} label="bp" />
                </FormGroup>
                {/* </div> */}
                {/* <div className="col-md-2 mt-3"> */}
                <TextField
                    variant="standard"
                    id='patientLowervalue'
                    value={patientLowerValue == 'null' ? "" : patientLowerValue}
                    onChange={(e) => {
                        setPatientLowerValue(e.target.value)
                    }}
                    label="Lower_value"
                />
                {/* </div> */}
                {/* <div className="col-md-2 mt-3"> */}
                <TextField
                    variant="standard"
                    id='patientUpperValue'
                    value={patientUpperValue == 'null' ? "" : patientUpperValue}
                    onChange={(e) => {
                        setPatientUpperValue(e.target.value)
                    }}
                    label="Upper_value"
                />
                {/* </div> */}
                {/* <div className="col-md-2 mt-3"> */}
                <TextField
                    variant="standard"
                    id='patientName'
                    value={patientAllergicFood == 'null' ? "" : patientAllergicFood}
                    onChange={(e) => {
                        setPatientAllergicFood(e.target.value)
                    }}
                    label="Allergic_food"
                />
                {/* </div> */}
                {/* <div className="col-md-2 mt-3"> */}
                <TextField
                    variant="standard"
                    id='patientName'
                    value={patientAllergicMedicine == 'null' ? "" : patientAllergicMedicine}
                    onChange={(e) => {
                        setPatientAllergicMedicine(e.target.value)
                    }}
                    label="Allergic_medicine"
                />
                {/* </div> */}
            </div>

            <div className="row d-flex justify-content-end align-items-end text-end">
                <div className="col-md-3">
                    <button className="btn" style={{ borderRadius: '5px', width: '100%', color: 'white', backgroundColor: '#6c757d' }} onClick={submitHandler}>Add Details</button>
                </div>
            </div>
        </div>
    )
}

export default PrimaryAnalysisModal
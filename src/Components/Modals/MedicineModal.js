import React, { useState } from 'react'
import { MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import { Select } from '@material-ui/core'
import { TextField, Button, IconButton, Remove } from '@mui/material'
import instance from '../../config/api'



const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 190
    }
}))

function MedicineModal({ setShowMedicineView, setOpenModal, setReload, reload }) {
    const classes = useStyles()
    const hospitalId = localStorage.getItem('HospitalId')
    const medType = ['Tablet', 'Syrap', 'Oilment', 'Tonic', 'Powder']
    const [medicineName, setMedicineName] = useState('')
    const [medicineType, setMedicineType] = useState('')
    const [scientificName, setScientificName] = useState('')

    const submitHandler = (e) => {
        const obj = {
            _hos_id: hospitalId,
            med_name: medicineName,
            s_med_name: scientificName,
            med_type: medicineType,
            IsActive: 'true'
        }
        instance.post('/add_medicine', obj).then((res) => {
            if (res) {
                setShowMedicineView(false)
                setReload(!reload)
            }
        }).catch((err) => {
            console.log('error', err)
        })
    }


    // #################### Validating Name! ###########################

    const [medicineNameErr, setMedicineNameErr] = useState('')


    const medicineNameInputBlurHandler = (medicineName, setMedicineNameErr) => {
        if (medicineName === '') {
            setMedicineNameErr('This field cannot be empty!')
            return false
        } else if (medicineName.slice(-1) === ' ') {
            setMedicineNameErr('should not end with space.')
            return false
        } else {
            setMedicineNameErr('')
            return true
        }
    }


    const medicineNameInputChangeHandler = (medicineName, setMedicineNameErr) => {
        if (medicineName.length === 0) {
            setMedicineNameErr('This field cannot be empty!')
            return false
        } else if (medicineName.charAt(0) === ' ') {
            setMedicineNameErr('should not start with space.')
            return false
        } else if (medicineName.includes('  ')) {
            setMedicineNameErr('should not contain consecutive spaces.')
            return false
        } else if (medicineName === '') {
            setMedicineNameErr('This field cannot be empty!')
            return false
        } else if (medicineName.slice(-1) === ' ') {
            setMedicineNameErr('should not end with space.')
            return false
        } else {
            setMedicineNameErr('')
            return true
        }
    }

    // #################### Validating Name! ###########################

    // #################### Validating ScientificName! ###########################

    const [scientificNameErr, setScientificNameErr] = useState('')


    const scientificNameInputBlurHandler = (scientificName, setScientificNameErr) => {
        if (scientificName === '') {
            setScientificNameErr('This field cannot be empty!')
            return false
        } else if (scientificName.slice(-1) === ' ') {
            setScientificNameErr('should not end with space.')
            return false
        } else {
            setScientificNameErr('')
            return true
        }
    }


    const scientificNameInputChangeHandler = (scientificName, setScientificNameErr) => {
        if (scientificName.length === 0) {
            setScientificNameErr('This field cannot be empty!')
            return false
        } else if (scientificName.charAt(0) === ' ') {
            setScientificNameErr('should not start with space.')
            return false
        } else if (scientificName.includes('  ')) {
            setScientificNameErr('should not contain consecutive spaces.')
            return false
        } else if (scientificName === '') {
            setScientificNameErr('This field cannot be empty!')
            return false
        } else if (scientificName.slice(-1) === ' ') {
            setScientificNameErr('should not end with space.')
            return false
        } else {
            setScientificNameErr('')
            return true
        }
    }

    // #################### Validating ScientificName! ###########################



    const selectMedTypeHandler = (e) => {
        setMedicineType(e.target.value)
    }
    return (
        <div className="Modal_Container bg-white" style={{ maxWidth: '90%' }}>
            <div className="row">
                <div className="col-md-8 ">
                    <h4 className="underline"><strong>Add Medicine</strong></h4>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => { setShowMedicineView(false) }} className="col-md-4  d-flex justify-content-end align-items-end">
                    <h4>x</h4>
                </div>
            </div>
            {/* <div className="row p-5 d-flex space-x-5" style={{ backgroundColor: "#FFFFFF" }}> */}
            <div className="row">
                <div className="col-md-3">
                    <FormControl className={classes.formControl}>
                        <InputLabel>Select Medicine Type</InputLabel>
                        <Select onChange={selectMedTypeHandler}>
                            {medType?.map((item, index) => {
                                return (
                                    <MenuItem value={item} key={index}>{item}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-3">
                    <TextField
                        variant="standard"
                        id=""
                        onChange={(e) => {
                            setMedicineName(e.target.value)
                            medicineNameInputChangeHandler(e.target.value, setMedicineNameErr)
                        }}
                        onBlur={(e) => {
                            medicineNameInputBlurHandler(e.target.value, setMedicineNameErr)
                        }}
                        label="Medicine name"
                    />
                    <p className="" style={{ color: "red" }}>{medicineNameErr}</p>
                </div>
                <div className="col-md-3">
                    <TextField
                        variant="standard"
                        id=""
                        onChange={(e) => {
                            setScientificName(e.target.value)
                            scientificNameInputChangeHandler(e.target.value, setScientificNameErr)
                        }}
                        onBlur={(e) => {
                            scientificNameInputBlurHandler(e.target.value, setScientificNameErr)
                        }}
                        label="Scientific name"
                    />
                    <p className="" style={{ color: "red" }}>{scientificNameErr}</p>
                </div>
                <div className="col-md-3 mt-4">
                    <Button className="btn btn-primary" onClick={submitHandler}>ADD</Button>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default MedicineModal
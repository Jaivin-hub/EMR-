import React,{useState} from 'react'
import instance from '../../config/api'
import { TextField, Button } from '@mui/material'

function AddDosage({setShowDosageModal}) {
    const [dosage, setDosage] = useState('')
    const hospitalId = localStorage.getItem('HospitalId')

    const dosageSubmitHandler = () => {
       
            const obj = {
                _hos_id: hospitalId,
                dosage: dosage,
                isActive: true
            }
            instance.post('/add_dosage', obj).then((res) => {
                console.log(res)
                setShowDosageModal(false)
                // setDosage('')
            })
       

    }
    return (
        <div className="Modal_Container bg-white" style={{ maxWidth: '90%' }}>
            <div className="row">
                <div className="col-md-8 ">
                    <h4 className="underline"><strong>Add Dosage</strong></h4>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => { setShowDosageModal(false) }} className="col-md-4  d-flex justify-content-end align-items-end">
                    <h4>x</h4>
                </div>
            </div>
            {/* <div className="row p-5 d-flex space-x-5" style={{ backgroundColor: "#FFFFFF" }}> */}
            <div className="row">
                <div className="col-md-6">
                    <TextField
                        variant="standard"
                        id=""
                        onChange={(e) => {
                            setDosage(e.target.value)
                            // medicineNameInputChangeHandler(e.target.value, setMedicineNameErr)
                        }}
                        onBlur={(e) => {
                            // medicineNameInputBlurHandler(e.target.value, setMedicineNameErr)
                        }}
                        label="Dosage"
                    />
                    {/* <p className="" style={{ color: "red" }}>{medicineNameErr}</p> */}
                </div>

                <div className="col-md-3 mt-3">
                    <button type="button" className="inline-block px-6 py-2.5 
                    bg-blue-400 text-white font-medium text-xs leading-tight 
                    uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg 
                    focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 
                    active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={dosageSubmitHandler}
                    >Add</button>
                    {/* <Button className="btn btn-primary" onClick={submitHandler}>ADD</Button> */}


                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default AddDosage
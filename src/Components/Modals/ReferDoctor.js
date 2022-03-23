import React, { useEffect, useState } from 'react'
import { TextField, Button, IconButton, RemoveButton } from '@mui/material'
import Select from 'react-select';
import instance from '../../config/api';


function ReferDoctor() {
    const [hospitalList, setHospitalList] = useState([])

    useEffect(() => {
        instance.post('/list_hospital').then((res) => {
            const data = res?.data.hospital
            setHospitalList(data.reverse());
            for (let i = 0; i < data.length; i++) {
                console.log("inside", data[0].name);
            }
        }).catch((err) => {
            console.log('error:', err)
        })
    }, [])
    return (
        <div className="Modal_Container bg-white medium-modal" style={{ maxWidth: '90%' }}>
            <div className="row">
                <div className="col-md-8 ">
                    <h4 className="underline"><strong>Primary Analysis</strong></h4>
                </div>
                <div style={{ cursor: 'pointer' }}
                    // onClick={() => { setShowPrimaryAnalysis(false) }} 
                    className="col-md-4  d-flex justify-content-end align-items-end">
                    <h4><i class="fa fa-window-close" aria-hidden="true"></i></h4>
                </div>
            </div>
            <div className="row Primary-Analysis" style={{ backgroundColor: "#FFFFFF" }}>
                <div className='col-md-6 mt-5'>
                    <label htmlFor="">Select Hospital</label>
                </div>
                <div className='col-md-6'>
                    {/* <input type="text" className='border-2 w-28 h-10' /> */}
                    <Select
                        className="primary w-32"
                        name="singleSelect"
                    // value={value.Dosage == "" ? selectedDosageList[0] : value.Dosage}
                    // value={"" ? { label: value.Dosage, value: value.Dosage } : null}
                    // options={selectedDosageList}
                    // onChange={(value) => dosageChangeHandler(value, index)}
                    />
                </div>
                <div className="col-md-6 mt-3 ">
                    <label htmlFor="">Select Doctor</label>
                </div>
                <div className="col-lg-6">
                    <Select
                        className="primary w-32"
                        name="singleSelect"
                    // value={value.Dosage == "" ? selectedDosageList[0] : value.Dosage}
                    // value={"" ? { label: value.Dosage, value: value.Dosage } : null}
                    // options={selectedDosageList}
                    // onChange={(value) => dosageChangeHandler(value, index)}
                    />
                </div>

            </div>
            <div className="row d-flex justify-content-end align-items-end text-end mt-3">
                <div className="col-md-3">
                    {/* <button className="btn main-btn" onClick={submitHandler}>Add Details</button> */}
                </div>
            </div>
        </div>
    )
}

export default ReferDoctor
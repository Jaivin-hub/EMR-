import React, { useState, useEffect, forwardRef } from 'react'
import { TextField, Button, IconButton, Remove } from '@mui/material'
import uploadImg from '../assets/imgs/image 7.png'
import datePickerImg from '../assets/imgs/image 8.png'
import { AiOutlineClockCircle } from 'react-icons/ai'
import DatePicker from 'react-datepicker';
import { ApiHelper } from '../Helper/Apihelper'
import instance, { API } from '../config/api'
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BasicTable from './Table'
import Header from './Header'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// import TimePicker from 'react-time-picker';


function DoctorView() {

    const HospitalId = localStorage.getItem('HospitalId')

    const [doctorDetails, setDoctorDetails] = useState({})
    const [date, setDate] = useState({})
    const [value, onChange] = useState('10:00');
    const [doctorList, setDoctorList] = useState([])
    const [reload, setReload] = useState(false)
    const [hospitalName, setHospitalName] = useState('')
    const [availableDay, setAvailableDay] = useState('')
    const [inputDateFields, setInputDateFields] = useState([
        { doc_avail_day: '', doc_from_time: '', doc_to_time: '' },
    ])
   
    const handleAddFields = () => {
        setInputDateFields([...inputDateFields, { doc_avail_day: '' }])
    }

    const options = [
        'Select', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    ];
    const defaultOption = options[0];

    const dropDownHandler = (e, index) => {
        if(e.value){
            const newData = [...inputDateFields]
            newData[index]['doc_avail_day'] = e.value 
            setInputDateFields(newData)
        }else{
            const newData = [...inputDateFields]
            newData[index][e.target.id] = e.target.value 
            setInputDateFields(newData)
        }
    }


    console.log('inputDateFields', inputDateFields)



    const inputHandler = (e) => {
        const newData = { ...doctorDetails }
        newData[e.target.id] = e.target.value
        setDoctorDetails(newData)
    }

    const handleTimeSchedule = (e, index) => {
        console.log(e.target.id)
        console.log(index)
        const newData = { ...inputDateFields }
        newData[index][e.target.id] = e.target.value
        console.log(newData)
        setInputDateFields(newData)
    }



    useEffect(() => {
        const obj = {
            _hos_id: HospitalId
        }
        console.log('mounting')
        instance.post('/list_doctors', obj).then((response) => {
            console.log('list response', response.data.doctorList)
            const doctorData = response.data.doctorList
            setDoctorList(doctorData)
        }).catch((err) => {
            console.log('error', err)
        })
    }, [reload])



    useEffect(() => {
        console.log('first mounting')
        const Data = localStorage.getItem('HospitalName')
        setHospitalName(Data)
    }, [])







    const submitHandler = () => {
        // const availability = []
        // for (let i = 0; i < inputDateFields.length; i++) {
        //     const obj = { doc_avail_day: '', doc_from_time: '', doc_to_time: '' }
        //     obj.doc_avail_day = inputDateFields[i].doc_avail_day
        //     obj.doc_from_time = inputFromTime[i].doc_from_time
        //     obj.doc_to_time = inputToTime[i].doc_to_time
        //     availability.push(obj)
        // }
        // console.log('availability', availability)

        const { doc_name, doc_qualification, doc_address, doc_spec, doc_contact, doc_email, doc_password } = doctorDetails

        const obj = {
            doc_name: doc_name,
            doc_qualification: doc_qualification,
            doc_address: doc_address,
            doc_spec: doc_spec,
            doc_contact: doc_contact,
            doc_email: doc_email,
            doc_password: doc_password,
            _hos_id: HospitalId,
            availability: inputDateFields
        }
        instance.post('/add_doctor', obj).then((response) => {
            console.log('response from backend doctor', response)
            if (response) {
                setReload(true)
            }
        })
    }

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <img
            className='example-custom-input'
            src={datePickerImg}
            onClick={onClick}
            ref={ref}
        />
    ));

    // const handleCalendarClose = (index) => {
    //     if (tableData[index].duedate) {
    //         const tableDataCopy = Object.assign([], tableData);
    //         tableDataCopy[index].showDate = !tableDataCopy[index].showDate;
    //         setTableData(tableDataCopy);
    //     }
    // };

    const handleChangeDate = (date) => {
        console.log(date)
    }

    const handleRemoveFields = (index) => {
        const newData = [...inputDateFields]
        newData.splice(index, 1)
        setInputDateFields(newData)
    }




    return (

        <div className="viewPage" >

            <div className="addPatient navbar-light mt-5" style={{ height: "", backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                <div className="row pt-4" >
                    <div className="col-md-1" style={{ marginLeft: '5%' }} >
                        Add Doctor
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-2">
                        <div className="uploadDiv mt-4" style={{ width: '60%', height: "12em", marginLeft: '20%', borderRadius: '5px', border: '1px solid rgba(2, 152, 213, 0.56)' }}>
                            <img width="80%" height="" src={uploadImg} alt="" />
                            <label className="mt-3" style={{ color: '#0298D5' }}>Upload Image</label>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-2">
                                Doctor details
                            </div>
                            <div className="col-md-10">
                                <hr />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-3">
                                <TextField variant="standard" id="doc_name" onChange={(e) => { inputHandler(e) }} label="Doctor Name" />
                            </div>
                            <div className="col-md-3">
                                <TextField variant="standard" id="doc_qualification" onChange={(e) => { inputHandler(e) }} label="Qualification" />
                            </div>
                            <div className="col-md-3">
                                <TextField variant="standard" id="doc_address" onChange={(e) => { inputHandler(e) }} label="Address" />
                            </div>
                            <div className="col-md-3">
                                <TextField variant="standard" id='doc_spec' onChange={(e) => { inputHandler(e) }} label="Specialization" />
                            </div>
                        </div>
                        <div className="row mt-5">

                            <div className="col-md-3">
                                <TextField variant="standard" id="doc_contact" onChange={(e) => { inputHandler(e) }} label="Contact No" />
                            </div>
                            <div className="col-md-3">
                                <TextField variant="standard" id="doc_email" onChange={(e) => { inputHandler(e) }} label="Email ID" />
                            </div>
                            <div className="col-md-3">
                                <TextField variant="standard" id="doc_password" type='password' onChange={(e) => { inputHandler(e) }} label="Password" />
                            </div>
                        </div>
                        {inputDateFields.map((inputDateFields, index) => {
                            return (
                                <div key={index} className="row">
                                    <div className="timeScedulediv mt-4" style={{ width: '90%', marginLeft: "5%", height: '6em', borderRadius: '5px', border: '1px ', backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
                                        <div className="row mt-2">
                                            <div className="col-md-3 " >
                                                <div className="row" style={{ marginLeft: "5%" }}>
                                                    Day
                                                </div>
                                                {/* <input id='doc_avail_day' className="mt-2" onChange={(e) => { dropDownHandler(e,index) }} type="text" style={{ width: "90%", position: 'relative', border: '1px solid #EEEEEE' }} placeholder="Day" /> */}
                                                <Dropdown id='doc_avail_day' options={options} onChange={(e) => { dropDownHandler(e, index) }} value={defaultOption} placeholder="Select an option" />
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row" style={{ marginLeft: "5%" }}>
                                                    Time From
                                                </div>
                                                <input id="doc_from_time" className="" onChange={(e) => { dropDownHandler(e, index) }} type="time" style={{ width: "90%",height:'3em',  position: 'relative', border: '1px solid #EEEEEE' }} placeholder="Time From" />
                                            </div>
                                            <div className="col-md-3">
                                                <div className="row" style={{ marginLeft: "5%" }}>
                                                    Time To
                                                </div>
                                                <input id="doc_to_time" className="" onChange={(e) => { dropDownHandler(e, index) }} type="time" style={{ width: "90%",height:'3em', position: 'relative', border: '1px solid #EEEEEE' }} placeholder="Time To" />
                                            </div>
                                            <div className="col-md-3">


                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row mt-4">
                                                            <div className="col-md-4 mt-2">
                                                                <div className="addBox text-center pt-1" style={{ width: '100%', height: '2em', borderRadius: '5px', backgroundColor: '#0F9D58', opacity: '0.3' }}>
                                                                    <label className="" >+</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8 pt-2 mt-2">
                                                                <h6 htmlFor="" style={{ cursor: 'pointer' }} onClick={handleAddFields}>Add More</h6>
                                                            </div>
                                                        </div>

                                                        {/* <label>Add More</label> */}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row mt-4">
                                                            <div className="col-md-4 mt-2">
                                                                <div className="addBox text-center pt-1" style={{ width: '100%', height: '2em', borderRadius: '5px', backgroundColor: '#0298D5', opacity: '0.3' }}>
                                                                    <label className="" >-</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8 pt-2 mt-2">
                                                                <h6 htmlFor="" style={{ cursor: 'pointer' }} onClick={() => { handleRemoveFields(index) }}>Clear All</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="row mt-1 d-flex justify-content-end">
                            <div className="col-md-3 mt-4" >
                                <Button variant="contained" style={{ marginLeft: '30%' }} onClick={submitHandler}>Add Doctor</Button>
                            </div>
                        </div>
                        <div className="col-md-12 mt-5 d-flex justify-content-center">
                            {/* <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#0298D5' }} onClick={submitHandler}>login now</button> */}
                        </div>
                    </div>

                </div>
            </div>
            {doctorList.length >= 1 ?
                <div className="addPatient navbar-light mt-5" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                    <div className="row pt-4" >
                        {/* <div className="col-md-1" style={{ marginLeft: '5%' }} >
        Doctor List
    </div> */}
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <BasicTable List={doctorList} />
                        </div>

                    </div>

                </div>
                : null}
        </div>

    )
}

export default DoctorView
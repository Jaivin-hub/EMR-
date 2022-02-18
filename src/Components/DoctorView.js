import React, { useState, useEffect, forwardRef } from 'react'
import { TextField, Button } from '@mui/material'
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
// import TimePicker from 'react-time-picker';


function DoctorView() {

    const HospitalId = localStorage.getItem('HospitalId')

    const [doctorDetails, setDoctorDetails] = useState({})
    const [date, setDate] = useState({})
    const [value, onChange] = useState('10:00');
    const [doctorList, setDoctorList] = useState([])
    const [reload, setReload] = useState(false)
    const [hospitalName, setHospitalName] = useState('')



    const inputHandler = (e) => {
        const newData = { ...doctorDetails }
        newData[e.target.id] = e.target.value
        setDoctorDetails(newData)
    }

    const handleTimeSchedule = (e) => {
        console.log(e.target.value)
        const newData = { ...date }
        newData[e.target.id] = e.target.value
        setDate(newData)
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

        const { doc_name, doc_qualification, doc_address, doc_spec, doc_contact, doc_email, doc_password } = doctorDetails
        const { doc_avail_day, doc_from_time, doc_to_time } = date

        const obj = {
            doc_name: doc_name,
            doc_qualification: doc_qualification,
            doc_address: doc_address,
            doc_spec: doc_spec,
            doc_contact: doc_contact,
            doc_email: doc_email,
            doc_password: doc_password,
            _hos_id: HospitalId,
            availability: [
                {
                    doc_avail_day: doc_avail_day,
                    doc_from_time: doc_from_time,
                    doc_to_time: doc_to_time
                }
            ]
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
                            <TextField id="doc_name" onChange={(e) => { inputHandler(e) }} label="Doctor Name" />
                        </div>
                        <div className="col-md-3">
                            <TextField id="doc_qualification" onChange={(e) => { inputHandler(e) }} label="Qualification" />
                        </div>
                        <div className="col-md-3">
                            <TextField id="doc_address" onChange={(e) => { inputHandler(e) }} label="Address" />
                        </div>
                        <div className="col-md-3">
                            <TextField id='doc_spec' onChange={(e) => { inputHandler(e) }} label="Specialization" />
                        </div>
                    </div>
                    <div className="row mt-5">

                        <div className="col-md-3">
                            <TextField id="doc_contact" onChange={(e) => { inputHandler(e) }} label="Contact No" />
                        </div>
                        <div className="col-md-3">
                            <TextField id="doc_email" onChange={(e) => { inputHandler(e) }} label="Email ID" />
                        </div>
                        <div className="col-md-3">
                            <TextField id="doc_password" onChange={(e) => { inputHandler(e) }} label="Password" />
                        </div>
                    </div>
                    <div className="row ">
                        {/* {(addMembersList.length - 1 === index) ?brassimmutreje-2771@yopmail.com
                                (<button type="button" className="add-btn text-light mt-2" onClick={handleMemberAdd}>
                                    <span>+</span>
                                </button>)
                                :
                                (<button type="button" className="add-btn text-light mt-2" onClick={() => { handleMemberRemove(index) }}>
                                    <span>-</span>
                                </button>)} */}
                        <div className="timeScedulediv mt-4" style={{ width: '90%', marginLeft: "5%", height: '4em', borderRadius: '5px', border: '1px ', backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
                            <div className="row mt-3">
                                <div className="col-md-3 " >
                                    <input id='doc_avail_day' onChange={(e) => { handleTimeSchedule(e) }} type="date" style={{ width: "90%", position: 'relative', border: '1px solid #EEEEEE' }} placeholder="Date" />
                                    {/* <img src={datePickerImg} alt="" /> */}

                                    {/* <DatePicker
                        // key={task._id}
                        // ref={(el) => addToRefs(el, idx)}
                        // onCalendarClose={() =>
                        //     handleCalendarClose(idx)
                        // }
                        onChange={(date) => {
                            handleChangeDate(date)
                            // updateTaskFields(
                            //     'duedate',
                            //     moment(date).format('MM-DD-YYYY'),
                            //     '',
                            //     task._id,
                            //     task?.duedate
                            // );
                        }}
                        customInput={
                            <CustomInput />
                        }
                    /> */}
                                </div>
                                <div className="col-md-3">
                                    <input id="doc_from_time" onChange={(e) => { handleTimeSchedule(e) }} type="time" style={{ width: "90%", position: 'relative', border: '1px solid #EEEEEE' }} placeholder="Time From" />
                                    {/* <AiOutlineClockCircle /> */}

                                </div>
                                <div className="col-md-3">
                                    <input id="doc_to_time" onChange={(e) => { handleTimeSchedule(e) }} type="time" style={{ width: "90%", position: 'relative', border: '1px solid #EEEEEE' }} placeholder="Time To" />
                                    {/* <AiOutlineClockCircle /> */}
                                </div>
                                <div className="col-md-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            {/* <div className="row">
                                <div className="col-md-4">
                                    <div className="addBox text-center pt-1" style={{ width: '100%', height: '2em', borderRadius: '5px', backgroundColor: '#0F9D58', opacity: '0.3' }}>
                                        <label className="" >+</label>
                                    </div>
                                </div>
                                <div className="col-md-8 pt-2">
                                    <label htmlFor="">Add More</label>
                                </div>
                            </div> */}

                                            {/* <label>Add More</label> */}
                                        </div>
                                        <div className="col-md-6">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
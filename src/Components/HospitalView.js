import React, { useState } from 'react'
import instance from '../config/api'
import { TextField, Button } from '@mui/material'


function HospitalView() {
    const [hospitalData, setHospitalData] = useState({})

    const addHospitalSubmitHandler = () => {
        console.log('add hospital function')
        const { Hospital_Name, Email_ID, Hospital_Address_1, Hospital_Address_2, Country, State, City, Pin_Code, Contact_No_1, Contact_No_2, Password } = hospitalData
        const obj = {
            name: Hospital_Name,
            email_id: Email_ID,
            password: Password,
            address_1: Hospital_Address_1,
            address_2: Hospital_Address_2,
            city: City,
            state: State,
            country: Country,
            pincode: Pin_Code,
            contact_1: Contact_No_1,
            contact_2: Contact_No_2,
            logo: "logo.png"
        }

        instance.post("/add_hospital", obj).then((response) => {
            console.log('response of hospital', response)
            if (response) {
                
            }
        }).catch((err) => {
            console.log('error', err)
        })
    }

    const inputChangeHandler = (e) => {
        const id = e.target.id
        const value = e.target.value
        const newData = { ...hospitalData }
        newData[id] = value
        setHospitalData(newData)
    }
    return (
        <div className="viewPage" >

            <div className="addPatient navbar-light mt-5" style={{ height: "", backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                <div className="row pt-4" >
                    <div className="col-md-1" style={{ marginLeft: '5%' }} >
                        Add Hospital
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-2">
                        <div className="uploadDiv mt-4" style={{ width: '60%', height: "12em", marginLeft: '20%', borderRadius: '5px', border: '1px solid rgba(2, 152, 213, 0.56)' }}>
                            {/* <img width="80%" height="" src={uploadImg} alt="" /> */}
                            <label className="mt-3" style={{ color: '#0298D5' }}>Upload Image</label>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-2">
                                Hospital details
                            </div>
                            <div className="col-md-10">
                                <hr />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-3">
                                <TextField id='Hospital_Name' onChange={(e) => { inputChangeHandler(e) }} label="Hospital Name" />

                            </div>
                            <div className="col-md-3">
                                <TextField id='Email_ID' onChange={(e) => { inputChangeHandler(e) }} label="Email ID" />

                            </div>
                            <div className="col-md-3">
                                <TextField id='Hospital_Address_1' onChange={(e) => { inputChangeHandler(e) }} label="Hospital Address 1" />

                            </div>
                            <div className="col-md-3">
                                <TextField id='Hospital_Address_2' onChange={(e) => { inputChangeHandler(e) }} label="Hospital Address 2" />

                            </div>
                        </div>
                        <div className="row mt-5">

                            <div className="col-md-3">
                                <TextField id='Country' onChange={(e) => { inputChangeHandler(e) }} label="Country" />

                            </div>
                            <div className="col-md-3">
                                <TextField id='State' onChange={(e) => { inputChangeHandler(e) }} label="State" />

                            </div>
                            <div className="col-md-3">
                                <TextField id='City' onChange={(e) => { inputChangeHandler(e) }} label="City" />

                            </div>
                            <div className="col-md-3">
                                <TextField id='Pin_Code' onChange={(e) => { inputChangeHandler(e) }} label="Pin Code" />


                            </div>
                        </div>
                        <div className="row mt-5">

                            <div className="col-md-3">
                                <TextField id='Contact_No_1' onChange={(e) => { inputChangeHandler(e) }} label="Contact No 1" />


                            </div>
                            <div className="col-md-3">
                                <TextField id='Contact_No_2' onChange={(e) => { inputChangeHandler(e) }} label="Contact No 2" />


                            </div>
                            <div className="col-md-3">
                                <TextField id='Password' onChange={(e) => { inputChangeHandler(e) }} label="Password" />


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
                                        {/* <input id='doc_avail_day' onChange={(e) => { handleTimeSchedule(e) }} type="date" style={{ width: "90%", position: 'relative', border: '1px solid #EEEEEE' }} placeholder="Date" /> */}
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
                                        {/* <input id="doc_from_time" onChange={(e) => { handleTimeSchedule(e) }} type="time" style={{ width: "90%", position: 'relative', border: '1px solid #EEEEEE' }} placeholder="Time From" /> */}
                                        {/* <AiOutlineClockCircle /> */}

                                    </div>
                                    <div className="col-md-3">
                                        {/* <input id="doc_to_time" onChange={(e) => { handleTimeSchedule(e) }} type="time" style={{ width: "90%", position: 'relative', border: '1px solid #EEEEEE' }} placeholder="Time To" /> */}
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
                                <Button variant="contained" style={{ marginLeft: '30%' }} onClick={addHospitalSubmitHandler}>Add Doctor</Button>
                            </div>
                        </div>
                        <div className="col-md-12 mt-5 d-flex justify-content-center">
                            {/* <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#0298D5' }} onClick={submitHandler}>login now</button> */}
                        </div>
                    </div>

                </div>
            </div>
            {/* {doctorList.length >= 1 ?
                <div className="addPatient navbar-light mt-5" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                    <div className="row pt-4" >
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <BasicTable List={doctorList} />
                        </div>

                    </div>

                </div>
                : null} */}
        </div>
    )
}

export default HospitalView
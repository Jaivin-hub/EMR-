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
import { Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))

// import TimePicker from 'react-time-picker';

function DoctorView() {

    const HospitalId = localStorage.getItem('HospitalId')
    const classes = useStyles()
    const [doctorDetails, setDoctorDetails] = useState({})
    const [date, setDate] = useState({})
    const [value, onChange] = useState('10:00');
    const [doctorList, setDoctorList] = useState([])
    const [reload, setReload] = useState(false)
    const [hospitalName, setHospitalName] = useState('')
    const [availableDay, setAvailableDay] = useState('')
    const [mainErr, setMainErr] = useState('')
    const [inputDateFields, setInputDateFields] = useState([
        { doc_avail_day: 'Monday', doc_from_time: '10:00AM', doc_to_time: '02:00PM' },
    ])

    const handleAddFields = () => {
        setInputDateFields([...inputDateFields, { doc_avail_day: '' }])
    }

    const options = [
        'Select', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    ];

    const Specialization = ['Ortho', 'Pediatrician', 'Nephrology', 'Gastrology', 'Gynecologist', 'Neurology', 'Dermatology', 'Ophthalmologist']
    const defaultOption = options[0];

    const dropDownHandler = (e, index) => {
        if (e.value) {
            const newData = [...inputDateFields]
            newData[index]['doc_avail_day'] = e.value
            setInputDateFields(newData)
        } else {
            const newData = [...inputDateFields]
            newData[index][e.target.id] = e.target.value
            setInputDateFields(newData)
        }
    }

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



    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <img
            className='example-custom-input'
            src={datePickerImg}
            onClick={onClick}
            ref={ref}
        />
    ));


    const handleChangeDate = (date) => {
        console.log(date)
    }

    const handleRemoveFields = (index) => {
        const newData = [...inputDateFields]
        newData.splice(index, 1)
        setInputDateFields(newData)
    }

    // #################### Validating Name! ###########################

    const [doctorName, setDoctorName] = useState('')
    const [doctorNameErr, setDoctorNameErr] = useState('')


    const nameInputBlurHandler = (doctorName, setDoctorNameErr) => {
        if (doctorName === '') {
            setDoctorNameErr('This field cannot be empty!')
            return false
        } else if (doctorName.length < 3) {
            setDoctorNameErr('This field should have atleast 3 characters.')
            return false
        } else if (doctorName.slice(-1) === ' ') {
            setDoctorNameErr('should not end with space.')
            return false
        } else {
            setDoctorNameErr('')
            return true
        }
    }


    const nameInputChangeHandler = (doctorName, setDoctorNameErr) => {
        if (doctorName.length === 0) {
            setDoctorNameErr('This field cannot be empty!')
            return false
        } else if (doctorName.charAt(0) === ' ') {
            setDoctorNameErr('should not start with space.')
            return false
        } else if (doctorName.includes('  ')) {
            setDoctorNameErr('should not contain consecutive spaces.')
            return false
        } else if (/\d/.test(doctorName)) {
            setDoctorNameErr('should not contain numbers.')
            return false
        } else if (!doctorName.match(/^[a-zA-Z ]+$/)) {
            setDoctorNameErr('Invalid charecter!')
            return false
        } else if (doctorName === '') {
            setDoctorNameErr('This field cannot be empty!')
            return false
        } else if (doctorName.length < 3) {
            setDoctorNameErr('This field should have atleast 3 characters.')
            return false
        } else if (doctorName.slice(-1) === ' ') {
            setDoctorNameErr('should not end with space.')
            return false
        } else {
            setDoctorNameErr('')
            return true
        }
    }

    // #################### Validating Name! ###########################

    // #################### Validating Qualification! ###########################

    const [qualification, setQualification] = useState('')
    const [qualificationErr, setQualificationErr] = useState('')


    const qualificationInputBlurHandler = (qualification, setQualificationErr) => {
        if (qualification === '') {
            setQualificationErr('This field cannot be empty!')
            return false
        } else if (qualification.length < 4) {
            setQualificationErr('This field should have atleast 4 charecters.')
            return false
        } else if (qualification.slice(-1) === ' ') {
            setQualificationErr('should not end with space.')
            return false
        } else {
            setQualificationErr('')
            return true
        }
    }


    const qualificationInputChangeHandler = (qualification, setQualificationErr) => {
        if (qualification.length === 0) {
            setQualificationErr('This field cannot be empty!')
            return false
        } else if (qualification.charAt(0) === ' ') {
            setQualificationErr('should not start with space.')
            return false
        } else if (qualification.includes('  ')) {
            setQualificationErr('should not contain consecutive spaces.')
            return false
        } else if (/\d/.test(qualification)) {
            setQualificationErr('should not contain numbers.')
            return false
        } else if (!qualification.match(/^[a-zA-Z ]+$/)) {
            setQualificationErr('Invalid charecter!')
            return false
        } else if (qualification === '') {
            setQualificationErr('This field cannot be empty!')
            return false
        } else if (qualification.length < 4) {
            setQualificationErr('This field should have atleast 4 charecters.')
            return false
        } else if (qualification.slice(-1) === ' ') {
            setQualificationErr('should not end with space.')
            return false
        } else {
            setQualificationErr('')
            return true
        }
    }

    // #################### Validating Name! ###########################

    //######################### Validating phone number! ###########################

    const [phone, setPhone] = useState('')
    const [phoneErr, setPhoneErr] = useState('')

    const phoneInputBlurHandler = (phone, setPhoneErr) => {
        if (phone === '') {
            setPhoneErr('This field cannot be empty!')
            return false
        } else if (phone.length < 10) {
            setPhoneErr('Phone number does not have 10 digits')
            return false
        } else if (phone.length > 10) {
            setPhoneErr('Phone number has more than 10 digits')
            return false
        } else {
            setPhoneErr('')
            return true
        }
    }

    const phoneInputChangeHandler = (phone, setPhoneErr) => {
        if (!phone.match(/^[0-9][-\s\./0-9]*$/g)) {
            setPhoneErr("Enter numbers only!");
            return false
        } else if (phone.length > 10) {
            setPhoneErr('Phone number has more than 10 digits')
            return false
        }
        else {
            setPhoneErr('')
            return true
        }
    }

    //######################### Validating phone number! ###########################

    // #################### Validating Email! ###########################

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const emailInputBlurHandler = (email, setEmailError) => {
        if (email === '') {
            setEmailError('This field cannot be empty!')
            return false
        } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setEmailError('This email id is not valid.')
            return false
        } else {
            setEmailError('')
            return true
        }
    }
    const emailInputChangeHandler = (email, setEmailError) => {
        if (email.includes(' ')) {
            setEmailError('Email id should not contain space.')
            return false
        }
        else {
            setEmailError('')
            return true
        }
    }

    // #################### Validating Email! ###########################

    //######################### Validating Password! ###########################

    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState('')


    const passwordInputBlurHandler = (password, setPasswordErr) => {
        if (password === '') {
            setPasswordErr('This field cannot be empty!')
            return false
        } else if (password.length < 3) {
            setPasswordErr('password should have atleast 5 charecters')
            return false
        } else if (password.length > 20) {
            setPasswordErr('password should not exceed 20 characters')
            return false
        } else {
            setPasswordErr('')
            return true
        }
    }

    const passwordInputChangeHandler = (password, setPasswordErr) => {
        if (password.length > 20) {
            setPasswordErr('password should not exceed 20 characters')
            return false
        } else {
            setPasswordErr('')
            return true
        }
    }

    // #################### Validating Password! ###########################

    const [specialization, setSpecialization] = useState('')
    const SpecializationHandler = (e) => {
        setSpecialization(e.target.value)
    }

    const submitHandler = () => {

        const { doc_name, doc_qualification, doc_address, doc_spec, doc_contact, doc_email, doc_password } = doctorDetails

        if (!doctorName == '' && !qualification == "" && !specialization == "" && !phone == "" && !email == "" && !password == "") {
            const obj = {
                doc_name: doctorName,
                doc_qualification: qualification,
                doc_address: doc_address,
                doc_spec: specialization,
                doc_contact: phone,
                doc_email: email,
                doc_password: password,
                _hos_id: HospitalId,
                availability: [
                    {
                        doc_avail_day: "Monday",
                        doc_from_time: "09:30AM",
                        doc_to_time: "11:30AM"
                    }
                ]
            }
            instance.post('/add_doctor', obj).then((response) => {
                console.log('response from backend doctor', response)
                if (response) {
                    setMainErr('')
                    setReload(true)
                }
            })
        } else (
            setMainErr('Check all the fields that you entered!')
        )


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
                        <p style={{ color: 'red' }}>{mainErr}</p>
                        <div className="row mt-3">
                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id="doc_name"
                                    onChange={(e) => {
                                        setDoctorName(e.target.value)
                                        nameInputChangeHandler(e.target.value, setDoctorNameErr)
                                    }}
                                    onBlur={(e) => {
                                        nameInputBlurHandler(e.target.value, setDoctorNameErr)
                                    }}
                                    label="Doctor Name"
                                />
                                <p className="" style={{ color: "red" }}>{doctorNameErr}</p>
                            </div>
                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id="doc_qualification"
                                    onChange={(e) => {
                                        setQualification(e.target.value)
                                        qualificationInputChangeHandler(e.target.value, setQualificationErr)
                                    }}
                                    onBlur={(e) => {
                                        qualificationInputBlurHandler(e.target.value, setQualificationErr)
                                    }}
                                    label="Qualification"
                                />
                                <p className="" style={{ color: "red" }}>{qualificationErr}</p>
                            </div>
                            {/* <div className="col-md-3">
                                <TextField variant="standard" id="doc_address" onChange={(e) => { inputHandler(e) }} label="Address" />
                            </div> */}
                            <div className="col-md-3">
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Specialization</InputLabel>
                                    <Select onChange={SpecializationHandler}>
                                        {Specialization.map((item, index) => {
                                            return (
                                                <MenuItem value={item} key={index}>{item}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                {/* <TextField variant="standard" id='doc_spec' onChange={(e) => { inputHandler(e) }} label="Specialization" /> */}
                            </div>
                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id="doc_contact"
                                    onChange={(e) => {
                                        setPhone(e.target.value)
                                        phoneInputChangeHandler(e.target.value, setPhoneErr)
                                    }}

                                    onBlur={(e) => {
                                        phoneInputBlurHandler(e.target.value, setPhoneErr)
                                    }}
                                    // onChange={(e) => { inputHandler(e) }}
                                    label="Contact No"
                                />
                                <p style={{ color: "red" }}>{phoneErr}</p>
                            </div>
                        </div>
                        <div className="row mt-5">


                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id="doc_email"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        emailInputChangeHandler(e.target.value, setEmailError)
                                    }}
                                    onBlur={(e) => {
                                        emailInputBlurHandler(e.target.value, setEmailError)
                                    }}
                                    // onChange={(e) => { inputHandler(e) }}
                                    label="Email ID"
                                />
                                <p style={{ color: "red" }}>{emailError}</p>
                            </div>
                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id="doc_password"
                                    type='password'
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        passwordInputChangeHandler(e.target.value, setPasswordErr)
                                    }}
                                    onBlur={(e) => {
                                        passwordInputBlurHandler(e.target.value, setPasswordErr)
                                    }}
                                    // onChange={(e) => { inputHandler(e) }}
                                    label="Password"
                                />
                                <p style={{ color: "red" }}>{passwordErr}</p>
                            </div>
                        </div>
                        {/* {inputDateFields.map((inputDateFields, index) => {
                            return (
                                <div key={index} className="row">
                                    <div className="timeScedulediv mt-4" style={{ width: '90%', marginLeft: "5%", height: '6em', borderRadius: '5px', border: '1px ', backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
                                        <div className="row mt-2">
                                            <div className="col-md-3 " >
                                                <div className="row" style={{ marginLeft: "5%" }}>
                                                    Day
                                                </div>
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
                        })} */}

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
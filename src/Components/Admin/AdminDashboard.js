import React, { useEffect, useState, useRef, forwardRef } from 'react'
import PatientView from '.././PatientView'
import '../.././assets/css/dashboard.css'
import DoctorView from '.././DoctorView'
import Header from '.././Header'
import datePickerImg from '../../assets/imgs/image 8.png'
import Dropdown from 'react-dropdown';
import { TextField, Button, IconButton, Remove } from '@mui/material'
import 'react-dropdown/style.css';
import HospitalView from '.././HospitalView'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import uploadImg from '../../assets/imgs/image 7.png'
import instance from '../../config/api'
import { useNavigate } from 'react-router-dom';
import HospitalListingTable from '../hospitalListingTable'

import { Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))



function TaskDashboard() {

    const [hospitalName, setHospitalName] = useState('')
    const [showPatientView, setShowPatientView] = useState(false)
    // const [showDoctorView, setShowDoctorView] = useState(false)
    const [showAppointmentView, setShowAppointmentView] = useState(true)
    const [reload, setReload] = useState(false)

    const [hospitalList, setHospitalList] = useState([])



    const classes = useStyles()
    const navigate = useNavigate();
    const [hospitalData, setHospitalData] = useState({})
    const [country, setCountry] = useState('India')
    const [mainErr, setMainErr] = useState('')
    const upLoadRef = useRef();
    const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
        'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
        'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
        'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']

    // file upload 
    const [pickedFile, setPickedFile] = useState(null)
    const [preview, setPreview] = useState('');
    const [size, setSize] = useState(null)
    const [validateErr, setValidateErr] = useState('')

    const inputChangeHandler = (e) => {
        const id = e.target.id
        const value = e.target.value
        const newData = { ...hospitalData }
        newData[id] = value
        setHospitalData(newData)
    }

    const fileSelectorHandler = (e) => {
        setPickedFile(e.target.files[0]);
        let size = document.getElementById('fileInput').files[0].size;
        setSize(size);
    };

    const fileUploader = async () => {
        const params = new FormData();
        params.append('files', pickedFile);
        console.log(params.file)
        // params.append('id', task._id);

        // await ApiHelper.post(API.uploadDocuments, params)
        //     .then((resData) => {
        //         setPickedFile(null);
        //         // getTaskDetailsById(task._id);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    useEffect(() => {
        if (pickedFile) {
            if (size > 52428800) {
                alert('Sorry the chosen File size exceedes permissible range');
            } else {
                const read = new FileReader();
                read.onloadend = () => {
                    setPreview(read.result);
                };
                read.readAsDataURL(pickedFile);
                fileUploader();
            }
            setPreview(null);
            setPickedFile(null);
        }
    }, [pickedFile]);


    useEffect(() => {
        instance.post('/list_hospital').then((res) => {
            setHospitalList(res.data.hospital)
        }).catch((err) => {
            console.log('error:', err)
        })
    }, [reload])

    // #################### Validating Name! ###########################

    const [firstName, setFirstName] = useState('')
    const [firstNameErr, setFirstNameErr] = useState('')


    const nameInputBlurHandler = (firstName, setFirstNameErr) => {
        if (firstName === '') {
            setFirstNameErr('This field cannot be empty!')
            return false
        } else {
            setFirstNameErr('')
            return true
        }
    }


    const nameInputChangeHandler = (firstName, setFirstNameErr) => {
        if (firstName.length === 0) {
            setFirstNameErr('This field cannot be empty!')
            return false
        } else if (firstName.charAt(0) === ' ') {
            setFirstNameErr('should not start with space.')
            return false
        } else if (firstName.includes('  ')) {
            setFirstNameErr('should not contain consecutive spaces.')
            return false
        } else if (/\d/.test(firstName)) {
            setFirstNameErr('should not contain numbers.')
            return false
        } else if (!firstName.match(/^[a-zA-Z ]+$/)) {
            setFirstNameErr('Invalid charecter!')
            return false
        } else if (firstName === '') {
            setFirstNameErr('This field cannot be empty!')
            return false
        } else {
            setFirstNameErr('')
            return true
        }
    }

    // #################### Validating Name! ###########################

    // #################### Validating Email! ###########################

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const emailInputBlurHandler = (email, setError) => {
        if (email === '') {
            setError('This field cannot be empty!')
            return false
        } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setError('This email id is not valid.')
            return false
        } else {
            setError('')
            return true
        }
    }
    const emailInputChangeHandler = (email, setError) => {
        if (email.includes(' ')) {
            setError('Email id should not contain space.')
            return false
        }
        else {
            setError('')
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
        } else if (password.length < 5) {
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

    //######################### Validating Postal Code! ###########################

    const [postalCode, setPostalCode] = useState('')
    const [postalErr, setPostalErr] = useState('')

    const postalCodeInputChangeHandler = (postalCode, setPostalErr) => {
        if (postalCode === '') {
            setPostalErr('This field cannot be empty!')
        } else if (!postalCode.match(/^[0-9]*$/g) && postalCode !== '') {
            setPostalErr('Enter numbers only!')
        } else if (postalCode.length > 6) {
            setPostalErr('postalCode should not have more than 6 digits')
        } else {
            setPostalErr('')
        }
    }

    const postalCodeInputBlurHandler = (postalCode, setPostalErr) => {
        if (postalCode === '') {
            setPostalErr('This field cannot be empty!')
        } else if (postalCode.length !== 6) {
            setPostalErr('Postal Code should have 6 digits')
        } else {
            setPostalErr('')
        }
    }

    //######################### Validating Postal Code! ###########################

    //######################### Validating secondary number! ###########################

    const [secondaryPhone, setSecondaryPhone] = useState('')
    const [secondaryPhoneErr, setSecondaryPhoneErr] = useState('')

    const secondaryPhoneInputBlurHandler = (secondaryPhone, setSecondaryPhoneErr) => {
        if (secondaryPhone === '') {
            setSecondaryPhoneErr('This field cannot be empty!')
            return false
        } else if (secondaryPhone.length < 10) {
            setSecondaryPhoneErr('Phone number does not have 10 digits')
            return false
        } else if (secondaryPhone.length > 10) {
            setSecondaryPhoneErr('Phone number has more than 10 digits')
            return false
        } else {
            setSecondaryPhoneErr('')
            return true
        }
    }

    const secondaryPhoneInputChangeHandler = (secondaryPhone, setSecondaryPhoneErr) => {
        if (!secondaryPhone.match(/^[0-9][-\s\./0-9]*$/g)) {
            setSecondaryPhoneErr("Enter numbers only!");
            return false
        } else if (secondaryPhone.length > 10) {
            setSecondaryPhoneErr('Phone number has more than 10 digits')
            return false
        }
        else {
            setSecondaryPhoneErr('')
            return true
        }
    }

    //######################### Validating secondary number! ###########################

    // #################### Validating City! ###########################

    const [city, setCity] = useState('')
    const [cityErr, setCityErr] = useState('')


    const cityInputBlurHandler = (city, setCityErr) => {
        if (city === '') {
            setCityErr('This field cannot be empty!')
            return false
        } else {
            setCityErr('')
            return true
        }
    }


    const cityInputChangeHandler = (city, setCityErr) => {
        if (city.length === 0) {
            setCityErr('This field cannot be empty!')
            return false
        } else if (city.charAt(0) === ' ') {
            setCityErr('should not start with space.')
            return false
        } else if (city.includes('  ')) {
            setCityErr('should not contain consecutive spaces.')
            return false
        } else if (/\d/.test(city)) {
            setCityErr('should not contain numbers.')
            return false
        } else if (!city.match(/^[a-zA-Z ]+$/)) {
            setCityErr('Invalid charecter!')
            return false
        } else if (city === '') {
            setCityErr('This field cannot be empty!')
            return false
        } else {
            setCityErr('')
            return true
        }
    }

    // #################### Validating City! ###########################

    // #################### Validating Address1! ###########################

    const [address1, setAddress1] = useState('')
    const [address1Err, setAddress1Err] = useState('')


    const address1InputBlurHandler = (address1, setAddress1Err) => {
        if (address1 === '') {
            setAddress1Err('This field cannot be empty!')
            return false
        } else {
            setAddress1Err('')
            return true
        }
    }


    const address1InputChangeHandler = (address1, setAddress1Err) => {
        if (address1.length === 0) {
            setAddress1Err('This field cannot be empty!')
            return false
        } else if (address1.charAt(0) === ' ') {
            setAddress1Err('should not start with space.')
            return false
        } else if (address1.includes('  ')) {
            setAddress1Err('should not contain consecutive spaces.')
            return false
        } else if (address1 === '') {
            setAddress1Err('This field cannot be empty!')
            return false
        } else {
            setAddress1Err('')
            return true
        }
    }

    // #################### Validating Address1! ###########################

    // #################### Validating Address1! ###########################

    const [address2, setAddress2] = useState('')
    const [address2Err, setAddress2Err] = useState('')


    const address2InputBlurHandler = (address2, setAddress2Err) => {
        if (address2 === '') {
            setAddress2Err('This field cannot be empty!')
            return false
        } else {
            setAddress2Err('')
            return true
        }
    }


    const address2InputChangeHandler = (address2, setAddress2Err) => {
        if (address2.length === 0) {
            setAddress2Err('This field cannot be empty!')
            return false
        } else if (address2.charAt(0) === ' ') {
            setAddress2Err('should not start with space.')
            return false
        } else if (address2.includes('  ')) {
            setAddress2Err('should not contain consecutive spaces.')
            return false
        } else if (address2 === '') {
            setAddress2Err('This field cannot be empty!')
            return false
        } else {
            setAddress2Err('')
            return true
        }
    }

    // #################### Validating Address1! ###########################

    const [state, setState] = useState('')
    const [stateErr, setStateErr] = useState('')

    const dropDownHandler = (e) => {
        setState(e.target.value)
        setStateErr('')
    }

    const addHospitalSubmitHandler = () => {
        if (!firstName == "" && !email == "" && !country == "" && !state == "" && !postalCode == "" && !phone == "" && !secondaryPhone == "" && !password == "" && !city == "" && !address1 == "" && !address2 == "") {
            setMainErr('')
            const obj = {
                name: firstName,
                email_id: email,
                password: password,
                address_1: address1,
                address_2: address2,
                city: city,
                state: state,
                country: country,
                pincode: postalCode,
                contact_1: phone,
                contact_2: secondaryPhone,
                logo: "logo.png"
            }

            instance.post("/add_hospital", obj).then((response) => {
                if (response) {
                    alert(response.data.msg)
                    setReload(!reload)

                }
                // setValidateErr('')
                // console.log('response of hospital', response)
                if (response) {
                    // navigate('/registerSuccess');
                }
            }).catch((err) => {
                console.log('error', err)
            })
        } else {
            if (firstName == "") {
                setFirstNameErr('This field is required')
            }
            if (email == "") {
                setEmailError('This field is required')
            }
            if (state == "") {
                setStateErr('This field is required')
            }
            if (postalCode == "") {
                setPostalErr('This field is required')
            }
            if (phone == "") {
                setPhoneErr('This field is required')
            }
            if (secondaryPhone == "") {
                setSecondaryPhoneErr('This field is required')
            }
            if (password == "") {
                setPasswordErr('This field is required')
            }
            if (city == "") {
                setCityErr('This field is required')
            }
            if (address1 == "") {
                setAddress1Err('This field is required')
            }
            if (address2 == "") {
                setAddress2Err('This field is required')
            }
        }


    }




    return (
        <div className="div">
            <Header />
            <div className="div" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', height: "60em" }}>
                <div className="row">
                    <div className="hospitalName mt-3">
                        {/* <label htmlFor="">{hospitalName}</label> */}
                    </div>
                </div>
                <div className="mainContainer " style={{ margin: '2%' }}>
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className=""><strong>{hospitalName} Hospitals</strong></h5>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-4">

                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-7">
                                            {/* <input className="form-control" type="text" style={{ width: '100%', height: "3em", borderRadius: "5px" }} readonly="true" Value="Pending Appointments" /> */}
                                        </div>
                                        <div className="col-md-5 mt-1">
                                            {/* <Dropdown options={options} onChange={(e) => { dropDownHandler(e) }} value={defaultOption} placeholder="Select an option" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* {showPatientView ?
                        <PatientView />
                        : null}
                    {showDoctorView ?
                        <DoctorView />
                        : null}
                    {showHospitalView ?
                        <HospitalView />
                        : null} */}

                    {showAppointmentView ?

                        <>
                            <div className="addPatient navbar-light mt-5" style={{ height: "", backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                                <div className="row pt-4" >
                                    <div className="col-md-2 d-flex justify-content-center">
                                        Add Hospitals
                                    </div>
                                </div>
                                <div className="row text-center">
                                    <div className="col-md-2">
                                        <div className="uploadDiv mt-4" style={{ width: '60%', height: "12em", marginLeft: '20%', borderRadius: '5px', border: '1px solid rgba(2, 152, 213, 0.56)' }}>
                                            <img width="80%" height="" src='https://cdn5.vectorstock.com/i/thumb-large/49/04/letter-h-home-hospital-plus-medical-symbol-vector-33034904.jpg' alt="" />
                                            <label className="mt-3" style={{ color: '#0298D5' }}>Upload Logo</label>
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
                                        <p style={{ color: 'red' }}>{mainErr}</p>
                                        <div className="row mt-3">
                                            <div className="col-md-3">
                                                <TextField
                                                    variant="standard"
                                                    id='Hospital_Name'
                                                    onChange={(e) => {
                                                        setFirstName(e.target.value)
                                                        nameInputChangeHandler(e.target.value, setFirstNameErr)
                                                    }}
                                                    onBlur={(e) => {
                                                        nameInputBlurHandler(e.target.value, setFirstNameErr)
                                                    }}
                                                    // onChange={(e) => { inputChangeHandler(e) }}
                                                    label="Hospital Name"
                                                />
                                                <p style={{ color: "red" }}>{firstNameErr}</p>
                                            </div>
                                            <div className="col-md-3">
                                                <TextField
                                                    variant="standard"
                                                    id='Email_ID'
                                                    onChange={(e) => {
                                                        setEmail(e.target.value)
                                                        emailInputChangeHandler(e.target.value, setEmailError)
                                                    }}
                                                    onBlur={(e) => {
                                                        emailInputBlurHandler(e.target.value, setEmailError)
                                                    }}
                                                    // onChange={(e) => { inputChangeHandler(e) }}
                                                    label="Email ID"
                                                />
                                                <p style={{ color: "red" }}>{emailError}</p>
                                            </div>

                                            {/* <div className="col-md-3">
                                <TextField variant="standard" id="doc_address" onChange={(e) => { inputHandler(e) }} label="Address" />
                            </div> */}
                                            <div className="col-md-3">
                                                <TextField
                                                    variant="standard"
                                                    id='Hospital_Address_1'
                                                    onChange={(e) => {
                                                        setAddress1(e.target.value)
                                                        address1InputChangeHandler(e.target.value, setAddress1Err)
                                                    }}

                                                    onBlur={(e) => {
                                                        address1InputBlurHandler(e.target.value, setAddress1Err)
                                                    }}
                                                    // onChange={(e) => { inputChangeHandler(e) }}
                                                    label="Hospital Address 1"
                                                />
                                                <p style={{ color: "red" }}>{address1Err}</p>
                                                {/* <TextField variant="standard" id='doc_spec' onChange={(e) => { inputHandler(e) }} label="Specialization" /> */}
                                            </div>
                                            <div className="col-md-3">
                                                <TextField
                                                    variant="standard"
                                                    id='Hospital_Address_2'
                                                    onChange={(e) => {
                                                        setAddress2(e.target.value)
                                                        address2InputChangeHandler(e.target.value, setAddress2Err)
                                                    }}

                                                    onBlur={(e) => {
                                                        address2InputBlurHandler(e.target.value, setAddress2Err)
                                                    }}
                                                    // onChange={(e) => { inputChangeHandler(e) }}
                                                    label="Hospital Address 2"
                                                />

                                                <p style={{ color: "red" }}>{address2Err}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-5">


                                            <div className="col-md-3">
                                                <TextField
                                                    variant="standard"
                                                    id='Country'
                                                    value={country}
                                                    onChange={(e) => { inputChangeHandler(e) }}
                                                    label="Country"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel>State</InputLabel>
                                                    <Select onChange={dropDownHandler}>
                                                        {states.map((item, index) => {
                                                            return (
                                                                <MenuItem value={item} key={index}>{item}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                                <p style={{ color: "red" }}>{stateErr}</p>
                                            </div>
                                            <div className="col-md-3">
                                                <TextField
                                                    variant="standard"
                                                    id='City'
                                                    onChange={(e) => { inputChangeHandler(e) }}
                                                    label="City"
                                                    onChange={(e) => {
                                                        setCity(e.target.value)
                                                        cityInputChangeHandler(e.target.value, setCityErr)
                                                    }}

                                                    onBlur={(e) => {
                                                        cityInputBlurHandler(e.target.value, setCityErr)
                                                    }}
                                                />
                                                <p style={{ color: "red" }}>{cityErr}</p>
                                            </div>
                                            <div className="col-md-3">
                                                <TextField
                                                    variant="standard"
                                                    id='Pin_Code'
                                                    onChange={(e) => {
                                                        setPostalCode(e.target.value)
                                                        postalCodeInputChangeHandler(e.target.value, setPostalErr)
                                                    }}

                                                    onBlur={(e) => {
                                                        postalCodeInputBlurHandler(e.target.value, setPostalErr)
                                                    }}
                                                    // onChange={(e) => { inputChangeHandler(e) }}
                                                    label="Pin Code"
                                                />
                                                <p style={{ color: "red" }}>{postalErr}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-5">


                                            <div className="col-md-3">
                                                <TextField
                                                    variant="standard"
                                                    id='Contact_No_1'
                                                    onChange={(e) => {
                                                        setPhone(e.target.value)
                                                        phoneInputChangeHandler(e.target.value, setPhoneErr)
                                                    }}

                                                    onBlur={(e) => {
                                                        phoneInputBlurHandler(e.target.value, setPhoneErr)
                                                    }}
                                                    // onChange={(e) => { inputChangeHandler(e) }}
                                                    label="Contact No 1"
                                                />
                                                <p style={{ color: "red" }}>{phoneErr}</p>
                                            </div>
                                            <div className="col-md-3">
                                                <TextField
                                                    variant="standard"
                                                    id='Contact_No_2'
                                                    onChange={(e) => {
                                                        setSecondaryPhone(e.target.value)
                                                        secondaryPhoneInputChangeHandler(e.target.value, setSecondaryPhoneErr)
                                                    }}

                                                    onBlur={(e) => {
                                                        secondaryPhoneInputBlurHandler(e.target.value, setSecondaryPhoneErr)
                                                    }}
                                                    // onChange={(e) => { inputChangeHandler(e) }}
                                                    label="Contact No 2"
                                                />
                                                <p style={{ color: "red" }}>{secondaryPhoneErr}</p>
                                            </div>
                                            <div className="col-md-3">
                                                <TextField
                                                    variant="standard"
                                                    id='Password'
                                                    type='password'
                                                    onChange={(e) => {
                                                        setPassword(e.target.value)
                                                        passwordInputChangeHandler(e.target.value, setPasswordErr)
                                                    }}
                                                    onBlur={(e) => {
                                                        passwordInputBlurHandler(e.target.value, setPasswordErr)
                                                    }}
                                                    // onChange={(e) => { inputChangeHandler(e) }}
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
                                                <Button variant="contained" onClick={addHospitalSubmitHandler}>Add Hospital</Button>

                                                {/* <Button variant="contained" style={{ marginLeft: '30%' }} onClick={submitHandler}>Add Doctor</Button> */}
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-5 d-flex justify-content-center">
                                            {/* <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#0298D5' }} onClick={submitHandler}>login now</button> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                        : null}
                    {hospitalList?.length >= 1 ?

                        <div className="addPatient navbar-light mt-2" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                            <div className="row pt-4 " >

                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <HospitalListingTable List={hospitalList} />
                                </div>

                            </div>
                        </div>
                        : null}
                </div>

            </div>

        </div>
    )
}

export default TaskDashboard
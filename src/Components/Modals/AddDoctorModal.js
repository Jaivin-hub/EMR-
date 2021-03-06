import React, { useState, forwardRef } from 'react'
import { MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import datePickerImg from '../../assets/imgs/image 8.png'
import instance from '../../config/api'
import uploadImg from '../../assets/imgs/image 7.png'
import { TextField, Button, IconButton, Remove } from '@mui/material'
import Dropdown from 'react-dropdown';
import Select from 'react-select';
import 'react-dropdown/style.css';


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))

function AddDoctorModal({ setOpenModal, setReload, reload }) {


    const HospitalId = localStorage.getItem('HospitalId')
    const classes = useStyles()
    const [doctorDetails, setDoctorDetails] = useState({})
    const [date, setDate] = useState({})
    const [value, onChange] = useState('10:00');
    const [doctorList, setDoctorList] = useState([])
    const [hospitalName, setHospitalName] = useState('')
    const [availableDay, setAvailableDay] = useState('')
    const [mainErr, setMainErr] = useState('')
    const [specializationErr, setsPecializationErr] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)
    const [inputDateFields, setInputDateFields] = useState([
        { doc_avail_day: 'Monday', doc_from_time: '10:00AM', doc_to_time: '02:00PM' },
    ])

    const handleAddFields = () => {
        setInputDateFields([...inputDateFields, { doc_avail_day: '' }])
    }

    const options = [
        'Select', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    ];


    const Specialization = [{ value: 'Cardiology', label: 'Cardiology' }, { value: 'Cardio Thoracic & Vascular Surgery', label: 'Cardio Thoracic & Vascular Surgery' }, { value: 'Dental & Maxillo Facial Surgery', label: 'Dental & Maxillo Facial Surgery' }, { value: 'Dermatology', label: 'Dermatology' }, { value: 'Endocrinology & Diabetes', label: 'Endocrinology & Diabetes' },
    { value: 'E.N.T', label: 'E.N.T' }, { value: 'Gastroenterology & Hepatology', label: 'Gastroenterology & Hepatology' }, { value: 'General Medicine', label: 'General Medicine' }, { value: 'Obstetrics & Gynecology', label: 'Obstetrics & Gynecology' }, { value: 'Infertility & Laproscopy', label: 'Infertility & Laproscopy' },
    { value: 'Nephrology', label: 'Nephrology' }, { value: 'Neurosurgery', label: 'Neurosurgery' }, { value: 'Neurology', label: 'Neurology' }, { value: 'Ophthalmology', label: 'Ophthalmology' }, { value: 'Orthopaedics', label: 'Orthopaedics' }, { value: 'Paediatrics', label: 'Paediatrics' }, { value: 'Paediatric Surgery', label: 'Paediatric Surgery' }
        , { value: 'Paedeatric Endocrinology', label: 'Paedeatric Endocrinology' }, { value: 'Plastic & Reconstructive Surgery', label: 'Plastic & Reconstructive Surgery' }, { value: 'Psychiatry & Behavioural Sciences', label: 'Psychiatry & Behavioural Sciences' }, { value: 'Pulmonology', label: 'Pulmonology' }, { value: 'Rheumatology', label: 'Rheumatology' }, { value: 'Urology', label: 'Urology' }
        , { value: 'Ayurveda Department', label: 'Ayurveda Department' }, { value: 'Heart Rhythm Disorders', label: 'Heart Rhythm Disorders' }, { value: 'Paedeatric Neurology', label: 'Paedeatric Neurology' }, { value: 'Paedeatric Nephrology', label: 'Paedeatric Nephrology' }, { value: 'Neonatology', label: 'Neonatology' }, { value: 'Oncology', label: 'Oncology' }, { value: 'Cardiac Anesthesia & Cardiac Critical Care', label: 'Cardiac Anesthesia & Cardiac Critical Care' }]

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
        const newData = { ...inputDateFields }
        newData[index][e.target.id] = e.target.value
        setInputDateFields(newData)
    }

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <img
            className='example-custom-input'
            src={datePickerImg}
            onClick={onClick}
            ref={ref}
        />
    ));


    const handleChangeDate = (date) => {
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
        } else if (qualification === '') {
            setQualificationErr('This field cannot be empty!')
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
            setPhoneErr('has more than 10 digits')
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
    const SpecializationHandler = (value) => {
        setSpecialization(value.label)
        setsPecializationErr('')
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
                if (response) {
                    setMainErr('')
                    setReload(!reload)
                    setOpenModal(false)
                }
            })
        } else {
            if (doctorName == "") {
                setDoctorNameErr('This field is required')
            }
            if (qualification == "") {
                setQualificationErr('This field is required')
            }
            if (specialization == "") {
                setsPecializationErr('This field is required')
            }
            if (phone == "") {
                setPhoneErr('This field is required')
            }
            if (email == "") {
                setEmailError('This field is required')
            }
            if (password == "") {
                setPasswordErr('This field is required')
            }
        }
    }
    return (
        <div className="Modal_Container" style={{ maxWidth: '90%' }}>
            <div className="row">
                <div className="col-md-8 ">
                    <h4 className="underline"><strong>Add Doctor</strong></h4>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => { setOpenModal(false) }} className="col-md-4  d-flex justify-content-end align-items-end">
                    <h4>x</h4>
                </div>
            </div>
            <div className="addPatient navbar-light " style={{ height: "", backgroundColor: "#FFFFFF", border: '' }}>
                <div className="row text-center">
                    <div className="col-md-2 item-center">
                        <div className="uploadDiv mt-4" style={{ borderRadius: '5px', border: '1px solid rgba(2, 152, 213, 0.56)' }}>
                            <img width="80%" className="ml-3" height="" src="https://media.istockphoto.com/vectors/doctor-icon-or-avatar-physician-with-stethoscope-medicine-symbol-vector-id1150502263?k=20&m=1150502263&s=612x612&w=0&h=s2_jO-vB7I_Jd5UqFIacb5hpXrTFjOFpOTABRiVg40A=" alt="" />
                            <label className="mt-3" style={{ color: '#0298D5', width: '80%' }}>Upload Image</label>
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
                            <div className="col-md-3">
                                <Select
                                    className="primary mt-2"
                                    name="singleSelect"
                                    placeholder="Specialization"
                                    // value={value.medicineName}
                                    options={Specialization}
                                    onChange={(value) => SpecializationHandler(value)}
                                />
                                <p style={{ color: "red" }}>{specializationErr}</p>
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
                                    label="Password"
                                />
                                <p style={{ color: "red" }}>{passwordErr}</p>
                            </div>
                        </div>
                        <div className="row mt-1 d-flex justify-content-end">
                            <div className="col-md-3 mt-4" >
                                <button type="button" className="inline-block px-6 py-2.5 
                    bg-blue-400 text-white font-medium text-xs leading-tight 
                    uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg 
                    focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 
                    active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={submitHandler}
                                >Add Doctor</button>
                            </div>
                        </div>
                        <div className="col-md-12 mt-5 d-flex justify-content-center">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddDoctorModal
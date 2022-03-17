import React, { useState, useEffect } from 'react'
import Header from './Header'
import { FcManager, FcBusinessman } from 'react-icons/fc'
import { GiMedicines } from 'react-icons/gi'
import { ImLab } from 'react-icons/im'
import { GiLevelEndFlag } from 'react-icons/gi'
import { TextField, Button, IconButton, Remove } from '@mui/material'
import Select from 'react-select';
import instance from '../config/api'
import { useNavigate } from 'react-router-dom';
import { MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import MaterialTable from 'material-table';
import { HiOutlineDatabase } from 'react-icons/hi'


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 190
    }
}))


function Settings() {
    const classes = useStyles()
    const navigate = useNavigate();
    const HospitalId = localStorage.getItem('HospitalId')
    const [specialization, setSpecialization] = useState('')
    const [specializationErr, setsPecializationErr] = useState('')
    const [doctorDetails, setDoctorDetails] = useState({})
    const [mainErr, setMainErr] = useState('')
    const [showDoctorView, setShowDoctorView] = useState(false)
    const [showMedicineView, setShowMedicineView] = useState(false)
    const [medicineType, setMedicineType] = useState('')
    const [showDosage, setShowDosage] = useState(false)
    const [dosage, setDosage] = useState('')
    const [selectedDosageList, setSelectedDosageList] = useState([])
    const [reload, setReload] = useState(false)
    const [showDosageErr, setShowDosageErr] = useState(false)

    const columns = [
        { title: 'Dosage', field: 'dosage' },

    ]


    const medType = [{ value: 'Tablet', label: 'Tablet' }, { value: 'Syrap', label: 'Syrap' }, { value: 'Oilment', label: 'Oilment' },
    { value: 'Tonic', label: 'Tonic' }, { value: 'Powder', label: 'Powder' }]



    const Specialization = [{ value: 'Cardiology', label: 'Cardiology' }, { value: 'Cardio Thoracic & Vascular Surgery', label: 'Cardio Thoracic & Vascular Surgery' }, { value: 'Dental & Maxillo Facial Surgery', label: 'Dental & Maxillo Facial Surgery' }, { value: 'Dermatology', label: 'Dermatology' }, { value: 'Endocrinology & Diabetes', label: 'Endocrinology & Diabetes' },
    { value: 'E.N.T', label: 'E.N.T' }, { value: 'Gastroenterology & Hepatology', label: 'Gastroenterology & Hepatology' }, { value: 'General Medicine', label: 'General Medicine' }, { value: 'Obstetrics & Gynecology', label: 'Obstetrics & Gynecology' }, { value: 'Infertility & Laproscopy', label: 'Infertility & Laproscopy' },
    { value: 'Nephrology', label: 'Nephrology' }, { value: 'Neurosurgery', label: 'Neurosurgery' }, { value: 'Neurology', label: 'Neurology' }, { value: 'Ophthalmology', label: 'Ophthalmology' }, { value: 'Orthopaedics', label: 'Orthopaedics' }, { value: 'Paediatrics', label: 'Paediatrics' }, { value: 'Paediatric Surgery', label: 'Paediatric Surgery' }
        , { value: 'Paedeatric Endocrinology', label: 'Paedeatric Endocrinology' }, { value: 'Plastic & Reconstructive Surgery', label: 'Plastic & Reconstructive Surgery' }, { value: 'Psychiatry & Behavioural Sciences', label: 'Psychiatry & Behavioural Sciences' }, { value: 'Pulmonology', label: 'Pulmonology' }, { value: 'Rheumatology', label: 'Rheumatology' }, { value: 'Urology', label: 'Urology' }
        , { value: 'Ayurveda Department', label: 'Ayurveda Department' }, { value: 'Heart Rhythm Disorders', label: 'Heart Rhythm Disorders' }, { value: 'Paedeatric Neurology', label: 'Paedeatric Neurology' }, { value: 'Paedeatric Nephrology', label: 'Paedeatric Nephrology' }, { value: 'Neonatology', label: 'Neonatology' }, { value: 'Oncology', label: 'Oncology' },
    { value: 'Cardiac Anesthesia & Cardiac Critical Care', label: 'Cardiac Anesthesia & Cardiac Critical Care' }]

    const SpecializationHandler = (value) => {
        setSpecialization(value.label)
        setsPecializationErr('')
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

    // #################### Validating Qualification! ###########################

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

    // #################### Validating Medicine Name! ###########################

    const [medicineNameErr, setMedicineNameErr] = useState('')
    const [medicineName, setMedicineName] = useState('')


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

    // #################### Validating Medicine Name! ###########################

    // #################### Validating ScientificName! ###########################

    const [scientificNameErr, setScientificNameErr] = useState('')
    const [scientificName, setScientificName] = useState('')

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
                    navigate('/hospitallisting')
                    // setReload(!reload)
                    // setOpenModal(false)
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

    const medicineSubmitHandler = (e) => {
        const obj = {
            _hos_id: HospitalId,
            med_name: medicineName,
            s_med_name: scientificName,
            med_type: medicineType,
            IsActive: 'true'
        }
        instance.post('/add_medicine', obj).then((res) => {
            if (res) {
                navigate('/MedicineListing')
                // setShowMedicineView(false)
                // setReload(!reload)
            }
        }).catch((err) => {
            console.log('error', err)
        })
    }

    const selectMedTypeHandler = (value) => {
        setMedicineType(value.label)
    }

    const dosageSubmitHandler = () => {
        let keepValue = []
        selectedDosageList.map((itm, i) => {
            keepValue.push(itm.dosage)
        })
        // console.log('keepValue', keepValue)
        const checkValue = keepValue.includes(dosage)
        if (checkValue == false) {
            const obj = {
                _hos_id: HospitalId,
                dosage: dosage,
                isActive: true
            }
            instance.post('/add_dosage', obj).then((res) => {
                setReload(!reload)
                // setShowDosageModal(false)
                // setDosage('')
            })
        } else {
            setShowDosageErr(true)
            console.log('already in the list')
        }

    }

    const fetchDosageList = () => {
        const obj = {
            _hos_id: HospitalId,
            isActive: true
        }
        instance.post('/list_dosage', obj).then((res) => {
            const dosageList = res?.data.dosage
            // let val = []
            // dosageList?.map((item, i) => {
            //     const data = { value: item.dosage, label: item.dosage }
            //     val.push(data)
            // })
            setSelectedDosageList(dosageList.reverse())
        })
    }

    useEffect(() => {
        fetchDosageList()
    }, [reload])
    return (
        <div className="div w-screen h-screen fixed">
            <Header />
            <div className="div" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', height: "60em" }}>
                <div className="mainContainer" >
                    <div className="navbar-light  ml-5 mr-5 mt-5 bg-white shadow-md">
                        <div className="row ">
                            <div className="col-md-12 h-20">
                                <div className="row">
                                    <div className="col-md-3 inline-block align-middle pt-4 pl-4 font-bold text-2xl">
                                        <span className="inline-block align-middle">Settings</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-light mt-2 ml-5 mr-5 bg-white shadow-md rounded-md">
                        <div className="row ">
                            <hr />
                            <div className="col-md-12 ">
                                <div className="row grid grid-cols-2 divide-x">
                                    <div className="col-md-4">
                                        <div className="col-md-12">
                                            <div className="row d-flex font-bold p-3 text-gray-400 cursor-pointer" onClick={() => { setShowDoctorView(true); setShowDosage(false); setShowMedicineView(false); }}>
                                                <div className="col-md-1">
                                                    <FcBusinessman size={20} />
                                                </div>
                                                <div className="col-md-11">
                                                    ADD DOCTOR
                                                </div>
                                            </div>
                                            <div className="row font-bold p-3 text-gray-400 cursor-pointer" onClick={() => { setShowMedicineView(true); setShowDoctorView(false); setShowDosage(true); }}>
                                                <div className="col-md-1">
                                                    <GiMedicines size={20} />
                                                </div>
                                                <div className="col-md-11">
                                                    ADD MEDICINE
                                                </div>
                                            </div>
                                            <div className="row font-bold p-3 text-gray-400 cursor-pointer" onClick={() => { setShowDosage(true); setShowMedicineView(false); setShowDoctorView(false) }}>
                                                <div className="col-md-1">
                                                    <GiLevelEndFlag size={20} />
                                                </div>
                                                <div className="col-md-11">
                                                    ADD DOSAGE
                                                </div>
                                            </div>
                                            <div className="row font-bold p-3 text-gray-400 cursor-pointer">
                                                <div className="col-md-1">
                                                    <ImLab size={20} />
                                                </div>
                                                <div className="col-md-11">
                                                    ADD LAB PROCEDURES
                                                </div>
                                            </div>
                                            <div className="row font-bold p-3 text-gray-400 cursor-pointer">
                                                <div className="col-md-1">
                                                    <HiOutlineDatabase size={20} />
                                                </div>
                                                <div className="col-md-11">
                                                    ADD DRUG CHOICE
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        {showDoctorView ?
                                            <div className="navbar-light mt-3 ml-5 mr-5  bg-white shadow md:shadow-lg hover:shadow-lg rounded-md">
                                                <div className="row m-3">
                                                    <div className="col-md-4">
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
                                                    <div className="col-md-4">
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
                                                    <div className="col-md-4">
                                                        <Select
                                                            className="primary mt-2 w-48"
                                                            name="singleSelect"
                                                            placeholder="Specialization"
                                                            options={Specialization}
                                                            onChange={(value) => SpecializationHandler(value)}
                                                        />
                                                        <p style={{ color: "red" }}>{specializationErr}</p>
                                                    </div>
                                                </div>
                                                <div className="row ml-3 mr-3 mt-3">
                                                    <div className="col-md-4">
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
                                                    <div className="col-md-4">
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
                                                    <div className="col-md-4">
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
                                                    <div className="col-md-3 mt-4 mb-3" >
                                                        <button type="button" className="inline-block px-6 py-2.5 
                    bg-blue-400 text-white font-medium text-xs leading-tight 
                    uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg 
                    focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 
                    active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                                            onClick={submitHandler}
                                                        >Add Doctor</button>
                                                    </div>
                                                </div>
                                            </div>
                                            : showMedicineView ?
                                                <div className="navbar-light mt-3 ml-5 mr-5  bg-white shadow md:shadow-lg hover:shadow-lg rounded-md">
                                                    <div className="row m-3">
                                                        <div className="col-md-4">
                                                            <Select
                                                                className="primary mt-2 w-48"
                                                                name="singleSelect"
                                                                placeholder="Medicine Type"
                                                                options={medType}
                                                                onChange={(value) => selectMedTypeHandler(value)}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
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
                                                        <div className="col-md-4">
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
                                                                label="Pharmacological Name"
                                                            />
                                                            <p className="" style={{ color: "red" }}>{scientificNameErr}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1 d-flex justify-content-end">
                                                        <div className="col-md-3 mt-4 mb-3" >
                                                            <button type="button" className="inline-block px-6 py-2.5 
                    bg-blue-400 text-white font-medium text-xs leading-tight 
                    uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg 
                    focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 
                    active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                                                onClick={medicineSubmitHandler}
                                                            >ADD</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                : showDosage ?
                                                    <div className="navbar-light mt-3 ml-5 mr-5  bg-white shadow md:shadow-lg hover:shadow-lg rounded-md">
                                                        <div className="row m-3">
                                                            <div className="col-md-6">
                                                                <TextField
                                                                    variant="standard"
                                                                    id=""
                                                                    onChange={(e) => {
                                                                        setShowDosageErr(false);
                                                                        setDosage(e.target.value)
                                                                        // medicineNameInputChangeHandler(e.target.value, setMedicineNameErr)
                                                                    }}
                                                                    onBlur={(e) => {
                                                                        // medicineNameInputBlurHandler(e.target.value, setMedicineNameErr)
                                                                    }}
                                                                    label="Dosage"
                                                                />
                                                                {showDosageErr ?
                                                                    <p className=" text-red-700">Already in the list</p>
                                                                    : null}
                                                                <div className="row mt-1 d-flex justify-content-end">
                                                                    <div className="col-md-3 mt-4 mb-3" >
                                                                        <button type="button" className="inline-block px-6 py-2.5 
                    bg-blue-400 text-white font-medium text-xs leading-tight 
                    uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg 
                    focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 
                    active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                                                            onClick={dosageSubmitHandler}
                                                                        >ADD</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <MaterialTable
                                                                    options={{ searchAutoFocus: true, paginationType: 'stepped', exportButton: true, exportAllData: true, exportFileName: "MEDDBOT", actionsColumnIndex: -1 }}
                                                                    className="mt-5" columns={columns} data={selectedDosageList} title=''
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
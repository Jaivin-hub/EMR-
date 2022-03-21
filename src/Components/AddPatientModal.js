import React, { useState, useRef, useEffect } from 'react'
import { TextField, Button, IconButton, RemoveButton } from '@mui/material'
import { MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import moment from 'moment';
import XMLParser from 'react-xml-parser';
import instance from '../config/api';
import QrReader from 'react-qr-reader'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';





const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))



function AddPatientModal({ setOpenModal, setReload, reload }) {
    const navigate = useNavigate()

    const classes = useStyles()
    const [Phone, setPhone] = useState('')
    const [scanResultWebCam, setScanResultWebCam] = useState('')
    const [openScanner, setOpenScanner] = useState(false)
    const [scanResultFile, setScanResultFile] = useState('')
    const [AdharNo, setAdharNo] = useState('')
    const [patientName, setPatientName] = useState('')
    const [patientLastName, setPatientLastName] = useState('')
    const [patientDOB, setPatientDOB] = useState('')
    const [patientBlood, setPatientBlood] = useState('')
    const [address, setAddress] = useState('')
    const [patientPhone, setPatientPhone] = useState('')
    const [showScan, setShowScan] = useState(true)
    const [patientData, setPatientData] = useState({})
    const [patientList, setPatientList] = useState([])
    const [showUploadFile, setShowUploadFile] = useState(false)
    const [state, setState] = useState('')
    const [district, setDistrict] = useState('')
    const [mainErr, setMainErr] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [appoinmentDate, setAppoinmentDate] = useState('')
    const [appointmentTime, setAppointmentTime] = useState('')
    const [bloodGroupErr, setBloodGroupErr] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)
    const [selectedList, setSelectedList] = useState([])


    const dateChangeHandler = (e) => {
        const date = e.target.value
        const dateData = moment(date).format('DD-MM-YYYY');
        setAppoinmentDate(dateData)
    }

    const [timeX, setTimeX] = useState('')

    const timeChangeHandler = (e) => {
        console.log('e.target.value', e.target.value)
        let time = e.target.value
        setTimeX(time)
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        const newData = time.join(''); // return adjusted time or original string
        setAppointmentTime(newData)
    }



    const bloodGroups = [{ value: 'A-positive (A+)', label: 'A-positive (A+)' }, { value: 'A-negative (A-)', label: 'A-negative (A-)' }, { value: 'B-positive (B+)', label: 'B-positive (B+)' },
    { value: 'B-negative (B-)', label: 'B-negative (B-)' }, { value: 'AB-positive (AB+)', label: 'AB-positive (AB+)' }, { value: 'AB-negative (AB-)', label: 'AB-negative (AB-)' }, { value: 'O-positive (O+)', label: 'O-positive (O+)' },
    { value: 'O-negative (O-)', label: 'O-negative (O-)' }]
    const getYear = () => {
        return new Date().getFullYear();
    }

    const currentYear = getYear()




    const qrRef = useRef(null)

    const HospitalId = localStorage.getItem('HospitalId')


    const handleErrWebCam = (err) => {
        console.log('err', err)
    }

    const handleScanWebCam = (result) => {
        if (result) {
            var xml = new XMLParser().parseFromString(result);
            const adharData = xml.attributes
            const { co, dist, gender, gname, house, name, pc, po, state, street, uid, vtc, yob } = adharData
            setAdharNo(uid)
            setPatientName(name)
            setPatientDOB(yob)
            setAddress(house)
            setDistrict(dist)
            setState(state)
            // dist
            // state
            // var x2js = new X2JS();
            // x2js.xml_str2json()
            // let parser = new DOMParser()
            // let xml = parser.parseFromString(result,'application/xml');
            // document.getElementById()
            // setScanResultFile(result)
        }
        if (result) {
            // setScanResultWebCam(result)
            setOpenScanner(false)
        }
    }

    // // #################### Validating Name! ###########################

    // const [patientNameErr, setPatientNameErr] = useState('')


    // const patientNameInputBlurHandler = (patientName, setPatientNameErr) => {
    //     if (patientName === '') {
    //         setPatientNameErr('This field cannot be empty!')
    //         return false
    //     } else if (patientName.slice(-1) === ' ') {
    //         setPatientNameErr('should not end with space.')
    //         return false
    //     } else {
    //         setPatientNameErr('')
    //         return true
    //     }
    // }


    // const patientNameInputChangeHandler = (patientName, setPatientNameErr) => {
    //     if (patientName.length === 0) {
    //         setPatientNameErr('This field cannot be empty!')
    //         return false
    //     } else if (patientName.charAt(0) === ' ') {
    //         setPatientNameErr('should not start with space.')
    //         return false
    //     } else if (patientName.includes('  ')) {
    //         setPatientNameErr('should not contain consecutive spaces.')
    //         return false
    //     } else if (/\d/.test(patientName)) {
    //         setPatientNameErr('should not contain numbers.')
    //         return false
    //     } else if (!patientName.match(/^[a-zA-Z ]+$/)) {
    //         setPatientNameErr('Invalid charecter!')
    //         return false
    //     } else if (patientName === '') {
    //         setPatientNameErr('This field cannot be empty!')
    //         return false
    //     } else if (patientName.slice(-1) === ' ') {
    //         setPatientNameErr('should not end with space.')
    //         return false
    //     } else {
    //         setPatientNameErr('')
    //         return true
    //     }
    // }

    // // #################### Validating Name! ###########################


    const handleErrFile = (err) => {
        console.log(err)
    }



    const handleScanFile = (result) => {
        if (result) {
            var xml = new XMLParser().parseFromString(result);
            const adharData = xml.attributes
            const { co, dist, gender, gname, house, name, pc, po, state, street, uid, vtc, yob } = adharData
            const patientAge = currentYear - yob
            const [first, middle, last] = name.split(' ');
            // console.log('patietName--------------------------------', first, "----", last)
            setPatientLastName(middle + " " + last)
            setAdharNo(uid)
            setPatientName(first)
            setPatientDOB(patientAge)
            setAddress(house)
            setDistrict(dist)
            setState(state)
            // var x2js = new X2JS();
            // x2js.xml_str2json()
            // let parser = new DOMParser()
            // let xml = parser.parseFromString(result,'application/xml');
            // document.getElementById()
            // setScanResultFile(result)
        }
    }

    const onScanFile = () => {
        qrRef.current.openImageDialog()
    }

    const [doctorList, setDoctorList] = useState([])

    useEffect(() => {
        const obj = {
            _hos_id: HospitalId
        }
        instance.post('/list_doctors', obj).then((res) => {
            setDoctorList(res?.data.doctors)
            console.log('res?.data.doctors', res.data.doctors)
            const doctorSelectedList = []
            res?.data.doctors.map((item, index) => {
                const value = { value: item._id, label: item.doc_name }
                doctorSelectedList.push(value)
            })
            setSelectedList(doctorSelectedList)
        })
    }, [reload])


    const connectionHandler = () => {
        setShowUploadFile(true)
        onScanFile()
    }

    const connectionScanHandler = () => {
        setShowUploadFile(false)

    }

    //######################### Validating phone number! ###########################

    const [patientPhoneErr, setPatientPhoneErr] = useState('')

    const phoneInputBlurHandler = (phone, setPatientPhoneErr) => {
        if (phone === '') {
            setPatientPhoneErr('This field cannot be empty!')
            return false
        } else if (phone.length < 10) {
            setPatientPhoneErr('does not have 10 digits')
            return false
        } else if (phone.length > 10) {
            setPatientPhoneErr('has more than 10 digits')
            return false
        } else {
            setPatientPhoneErr('')
            return true
        }
    }

    const phoneInputChangeHandler = (phone, setPatientPhoneErr) => {
        if (!phone.match(/^[0-9][-\s\./0-9]*$/g)) {
            setPatientPhoneErr("Enter numbers only!");
            return false
        } else if (phone.length > 10) {
            setPatientPhoneErr('has more than 10 digits')
            return false
        }
        else {
            setPatientPhoneErr('')
            return true
        }
    }

    //######################### Validating phone number! ###########################

    //######################### Validating adhar number! ###########################

    const [adharErr, setAdharErr] = useState('')

    const adharInputBlurHandler = (AdharNo, setAdharErr) => {
        if (AdharNo === '') {
            setAdharErr('This field cannot be empty!')
            return false
        } else if (AdharNo.length < 12) {
            setAdharErr('Enter valid adhar no!')
            return false
        } else if (AdharNo.length > 12) {
            setAdharErr('Enter valid adhar no!')
            return false
        }
        else {
            setAdharErr('')
            return true
        }
    }

    const adharInputChangeHandler = (AdharNo, setAdharErr) => {
        if (!AdharNo.match(/^[0-9][-\s\./0-9]*$/g)) {
            setAdharErr("Enter numbers only!");
            return false
        } else if (AdharNo.length > 12) {
            setAdharErr('Enter valid adhar no!')
            return false
        }
        else {
            setAdharErr('')
            return true
        }
    }

    //######################### Validating adhar number! ###########################

    const [patientBloodGroup, setPatientBloodGroup] = useState('')
    const [appointmentDoctor, setAppointmentDoctor] = useState('')
    const bloodGroupHandler = (value) => {
        setPatientBloodGroup(value.label)
        setBloodGroupErr('')
    }

    const selectDoctorHandler = (value) => {
        setAppointmentDoctor(value.value)
    }




    const addPatientHandler = () => {
        const { bloodBloodGroup, patientPhoneNo } = patientData
        if (!AdharNo == "" && !patientName == "" && !patientDOB == "" && !address == "" && !Phone == "" && !patientLastName == "" && !patientBloodGroup == "" && !district == "" && !state == "") {
            const obj = {
                aadhar_card_no: AdharNo,
                p_firstname: patientName,
                p_lastname: patientLastName,
                p_dob: patientDOB,
                p_bloodgroup: patientBloodGroup,
                p_address_1: address,
                p_address_2: "Kazhakoottam",
                p_city: district,
                p_state: state,
                p_pincode: '691541',
                p_phoneno: Phone,
                _hos_id: HospitalId,
                _doc_id: appointmentDoctor,
                app_date: appoinmentDate,
                app_time: appointmentTime
            }


            instance.post('/add_patient', obj).then((response) => {
                setMainErr('')
                if (response) {
                    // appointmentHandler()
                    setOpenModal(false)
                    setReload(true)
                    navigate('/taskDashboard')
                }
            }).catch((err) => {
                console.log('error', err)
            })
        } else {
            if (patientName == '') {
                setPatientNameErr('This field is required')
            }
            if (AdharNo == "") {
                setAdharErr('This field is required')
            }
            if (patientLastName == "") {
                setPatientLastNameErr('This field is required')
            }
            if (patientDOB == "") {
                setPatientDOBErr('This field is required')
            }
            if (address == "") {
                setAddressErr('This field is required')
            }
            if (district == "") {
                setCityErr('This field is required')
            }
            if (state == "") {
                setStateErr('This field is required')
            }
            if (Phone == '') {
                setPatientPhoneErr('This field is required')
            } if (patientBloodGroup == "") {
                setBloodGroupErr('This field is required')
            }
        }

    }

    // #################### Validating Name! ###########################

    const [patientNameErr, setPatientNameErr] = useState('')


    const patientNameInputBlurHandler = (patientName, setPatientNameErr) => {
        if (patientName === '') {
            setPatientNameErr('This field cannot be empty!')
            return false
        } else if (patientName.slice(-1) === ' ') {
            setPatientNameErr('should not end with space.')
            return false
        } else {
            setPatientNameErr('')
            return true
        }
    }


    const patientNameInputChangeHandler = (patientName, setPatientNameErr) => {
        if (patientName.length === 0) {
            setPatientNameErr('This field cannot be empty!')
            return false
        } else if (patientName.charAt(0) === ' ') {
            setPatientNameErr('should not start with space.')
            return false
        } else if (patientName.includes('  ')) {
            setPatientNameErr('should not contain consecutive spaces.')
            return false
        } else if (/\d/.test(patientName)) {
            setPatientNameErr('should not contain numbers.')
            return false
        } else if (!patientName.match(/^[a-zA-Z ]+$/)) {
            setPatientNameErr('Invalid charecter!')
            return false
        } else if (patientName === '') {
            setPatientNameErr('This field cannot be empty!')
            return false
        } else if (patientName.slice(-1) === ' ') {
            setPatientNameErr('should not end with space.')
            return false
        } else {
            setPatientNameErr('')
            return true
        }
    }

    // #################### Validating Name! ###########################

    // #################### Validating Last Name! ###########################

    const [patientLastNameErr, setPatientLastNameErr] = useState('')


    const patientLastNameInputBlurHandler = (patientLastName, setPatientLastNameErr) => {
        if (patientLastName === '') {
            setPatientLastNameErr('This field cannot be empty!')
            return false
        } else if (patientLastName.slice(-1) === ' ') {
            setPatientLastNameErr('should not end with space.')
            return false
        } else {
            setPatientLastNameErr('')
            return true
        }
    }


    const patientLastNameInputChangeHandler = (patientLastName, setPatientLastNameErr) => {
        if (patientLastName.length === 0) {
            setPatientLastNameErr('This field cannot be empty!')
            return false
        } else if (patientLastName.charAt(0) === ' ') {
            setPatientLastNameErr('should not start with space.')
            return false
        } else if (patientLastName.includes('  ')) {
            setPatientLastNameErr('should not contain consecutive spaces.')
            return false
        } else if (/\d/.test(patientLastName)) {
            setPatientLastNameErr('should not contain numbers.')
            return false
        } else if (!patientLastName.match(/^[a-zA-Z ]+$/)) {
            setPatientLastNameErr('Invalid charecter!')
            return false
        } else if (patientLastName === '') {
            setPatientLastNameErr('This field cannot be empty!')
            return false
        } else if (patientLastName.slice(-1) === ' ') {
            setPatientLastNameErr('should not end with space.')
            return false
        } else {
            setPatientLastNameErr('')
            return true
        }
    }

    // #################### Validating Last Name! ###########################

    //######################### Validating DOB! ###########################

    // const [DOB, setDOB] = useState('')
    const [patientDOBErr, setPatientDOBErr] = useState('')

    const patientDOBBlurChangeHandler = (patientDOB, setPatientDOBErr) => {
        if (patientDOB === '') {
            setPatientDOBErr('This field cannot be empty!')
            return false
        } else {
            setPatientDOBErr('')
            return true
        }
    }

    const patientDOBInputChangeHandler = (patientDOB, setPatientDOBErr) => {
        if (!patientDOB.match(/^[0-9][-\s\./0-9]*$/g)) {
            setPatientDOBErr("Enter numbers only!");
            return false
        }
        else {
            setPatientDOBErr('')
            return true
        }
    }

    //######################### Validating DOB! ###########################

    // #################### Validating City! ###########################

    const [cityErr, setCityErr] = useState('')


    const districtInputBlurHandler = (district, setCityErr) => {
        if (district === '') {
            setCityErr('This field cannot be empty!')
            return false
        } else if (district.slice(-1) === ' ') {
            setCityErr('should not end with space.')
            return false
        } else {
            setCityErr('')
            return true
        }
    }


    const districtInputChangeHandler = (district, setCityErr) => {
        if (district.length === 0) {
            setCityErr('This field cannot be empty!')
            return false
        } else if (district.charAt(0) === ' ') {
            setCityErr('should not start with space.')
            return false
        } else if (district.includes('  ')) {
            setCityErr('should not contain consecutive spaces.')
            return false
        } else if (district === '') {
            setCityErr('This field cannot be empty!')
            return false
        } else if (district.slice(-1) === ' ') {
            setCityErr('should not end with space.')
            return false
        } else {
            setCityErr('')
            return true
        }
    }

    // #################### Validating City! ###########################

    // #################### Validating State! ###########################

    const [stateErr, setStateErr] = useState('')


    const stateInputBlurHandler = (district, setStateErr) => {
        if (district === '') {
            setStateErr('This field cannot be empty!')
            return false
        } else if (district.slice(-1) === ' ') {
            setStateErr('should not end with space.')
            return false
        } else {
            setStateErr('')
            return true
        }
    }


    const stateInputChangeHandler = (district, setStateErr) => {
        if (district.length === 0) {
            setStateErr('This field cannot be empty!')
            return false
        } else if (district.charAt(0) === ' ') {
            setStateErr('should not start with space.')
            return false
        } else if (district.includes('  ')) {
            setStateErr('should not contain consecutive spaces.')
            return false
        } else if (district === '') {
            setStateErr('This field cannot be empty!')
            return false
        } else if (district.slice(-1) === ' ') {
            setStateErr('should not end with space.')
            return false
        } else {
            setStateErr('')
            return true
        }
    }

    // #################### Validating State! ###########################

    // #################### Validating Address! ###########################

    const [addressErr, setAddressErr] = useState('')


    const addressInputBlurHandler = (address, setAddressErr) => {
        if (address === '') {
            setAddressErr('This field cannot be empty!')
            return false
        } else if (address.slice(-1) === ' ') {
            setAddressErr('should not end with space.')
            return false
        } else {
            setAddressErr('')
            return true
        }
    }


    const addressInputChangeHandler = (address, setAddressErr) => {
        if (address.length === 0) {
            setAddressErr('This field cannot be empty!')
            return false
        } else if (address.charAt(0) === ' ') {
            setAddressErr('should not start with space.')
            return false
        } else if (address.includes('  ')) {
            setAddressErr('should not contain consecutive spaces.')
            return false
        } else if (address === '') {
            setAddressErr('This field cannot be empty!')
            return false
        } else if (address.slice(-1) === ' ') {
            setAddressErr('should not end with space.')
            return false
        } else {
            setAddressErr('')
            return true
        }
    }

    // #################### Validating Address! ###########################

    //Get current lists

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = patientList.slice(indexOfFirstPost, indexOfLastPost);

    // Change page 

    const paginate = pageNumber => setCurrentPage(pageNumber)

    const addNewPatientHandler = () => {
        setOpenModal(true)
    }


    return (
        <div className="Modal_Container" style={{ maxWidth: '90%' }}>
            <div className="row  mobile-ls">
                <div className="col-md-8 ">
                    <h4 className="underline"><strong>Add Patient</strong></h4>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => { setOpenModal(false) }} className="col-md-4  d-flex justify-content-end align-items-end">
                    <h4><i class="fa fa-window-close" aria-hidden="true"></i></h4>
                </div>
            </div>
            <div className="addPatient navbar-light " style={{ backgroundColor: "#FFFFFF", border: '' }}>
                <div className="row" >
                    <div className="col-md-6 "  >

                    </div>
                    <div className="col-md-2">
                    </div>
                </div>
                <div className="row text-center ">
                    <div className="col-md-3 mt-4">
                        {showUploadFile ?
                            <QrReader
                                ref={qrRef}
                                delay={300}
                                style={{ width: '60%', marginTop: '10%', marginLeft: '20%' }}
                                onError={handleErrFile}
                                onScan={handleScanFile}
                                legacyMode
                            />
                            :
                            openScanner ?
                                <QrReader
                                    delay={300}
                                    style={{ width: '100%' }}
                                    onError={handleErrWebCam}
                                    onScan={handleScanWebCam}
                                />
                                :
                                <div className="div adr-img">

                                    <img className="" onClick={() => { setOpenScanner(!openScanner) }} style={{ cursor: 'pointer' }} src="https://image.winudf.com/v2/image/Y29tLmppZ3MucXJjb2Rlc2Nhbm5lcl9pY29uXzE1MzkxODE2NjVfMDk5/icon.png?w=&fakeurl=1" alt="" />
                                </div>
                        }
                        <div className="row ">
                            <div className="col-md-12 d-flex space-x-2 scanning">
                                <button type="button" className="add-adarfile"
                                    onClick={connectionHandler}
                                >Upload file</button>
                                <button type="button" className="add-adarfile"
                                    onClick={connectionScanHandler}
                                >Scan Qr</button>
                            </div>
                        </div>
                        <h4>{scanResultWebCam}</h4>
                    </div>
                    <div className="col-md-9">
                        <div className="row custom fields">
                            <div className="col-md-2 pl-0 ml-0">
                                <span className='patient-det' >Patient details</span>
                            </div>
                            <div className="col-md-10">
                                <hr />
                            </div>
                        </div>
                        <p style={{ color: 'red' }}>{mainErr}</p>
                        <div className="row">
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='adharCardNo'
                                    onChange={(e) => {
                                        setAdharNo(e.target.value)
                                        adharInputChangeHandler(e.target.value, setAdharErr)
                                    }}
                                    onBlur={(e) => {
                                        adharInputBlurHandler(e.target.value, setAdharErr)
                                    }}
                                    value={AdharNo}
                                    label="Adharcard No"
                                />
                                <p style={{ color: "red" }}>{adharErr}</p>
                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientName'
                                    onChange={(e) => {
                                        setPatientName(e.target.value)
                                        patientNameInputChangeHandler(e.target.value, setPatientNameErr)
                                    }}
                                    onBlur={(e) => {
                                        patientNameInputBlurHandler(e.target.value, setPatientNameErr)
                                    }}
                                    value={patientName}
                                    label="Patient First Name"
                                />
                                <p style={{ color: "red" }}>{patientNameErr}</p>
                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientName'
                                    onChange={(e) => {
                                        setPatientLastName(e.target.value)
                                        patientLastNameInputChangeHandler(e.target.value, setPatientLastNameErr)
                                    }}
                                    onBlur={(e) => {
                                        patientLastNameInputBlurHandler(e.target.value, setPatientLastNameErr)
                                    }}
                                    value={patientLastName}
                                    label="Patient Last Name"
                                />
                                <p style={{ color: "red" }}>{patientLastNameErr}</p>
                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    com variant="standard"
                                    id='patiantDOB'
                                    onChange={(e) => {
                                        setPatientDOB(e.target.value)
                                        patientDOBInputChangeHandler(e.target.value, setPatientDOBErr)
                                    }}
                                    onBlur={(e) => {
                                        patientDOBBlurChangeHandler(e.target.value, setPatientDOBErr)
                                    }}
                                    value={patientDOB}
                                    label="Patient Age"
                                />
                                <p style={{ color: "red" }}>{patientDOBErr}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientAddress'
                                    onChange={(e) => {
                                        setAddress(e.target.value)
                                        addressInputChangeHandler(e.target.value, setAddressErr)
                                    }}
                                    onBlur={(e) => {
                                        addressInputBlurHandler(e.target.value, setAddressErr)
                                    }}
                                    value={address}
                                    label="Patient Address"
                                />
                                <p style={{ color: "red" }}>{addressErr}</p>
                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='city'
                                    onChange={(e) => {
                                        setDistrict(e.target.value)
                                        districtInputChangeHandler(e.target.value, setCityErr)
                                    }}
                                    onBlur={(e) => {
                                        districtInputBlurHandler(e.target.value, setCityErr)
                                    }}
                                    value={district}
                                    label="City"
                                />
                                <p style={{ color: "red" }}>{cityErr}</p>
                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='State'
                                    onChange={(e) => {
                                        setState(e.target.value)
                                        stateInputChangeHandler(e.target.value, setStateErr)
                                    }}
                                    onBlur={(e) => {
                                        stateInputBlurHandler(e.target.value, setStateErr)
                                    }}
                                    value={state}
                                    label="State"
                                />
                                <p style={{ color: "red" }}>{stateErr}</p>
                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientPhoneNo'
                                    onChange={(e) => {
                                        setPhone(e.target.value)
                                        phoneInputChangeHandler(e.target.value, setPatientPhoneErr)
                                    }}
                                    onBlur={(e) => {
                                        phoneInputBlurHandler(e.target.value, setPatientPhoneErr)
                                    }}
                                    label="Patient Phone Number"
                                />
                                <p style={{ color: "red" }}>{patientPhoneErr}</p>

                            </div>
                        </div>
                        <div className="row apoinment-bk">
                            <div className="col-md-3 mt-3 d-flex justify-content-center">
                                <Select
                                    className="primary mt-2 w-52 "
                                    name="singleSelect"
                                    placeholder="Patient Blood Group"
                                    // value={value.medicineName}
                                    options={bloodGroups}
                                    onChange={(value) => bloodGroupHandler(value)}
                                />
                                <p style={{ color: "red" }}>{bloodGroupErr}</p>
                            </div>
                            <div className="col-md-3 mt-3 d-flex justify-content-center">
                                <Select
                                    className="primary mt-2 w-52 "
                                    name="singleSelect"
                                    placeholder="Select Doctor"
                                    // value={value.medicineName}
                                    options={selectedList}
                                    onChange={(value) => selectDoctorHandler(value)}
                                />
                            </div>
                            <div className="col-md-3 mt-3" >
                                <input className='form-control mt-2' type="date" onChange={(e) => { dateChangeHandler(e) }} />
                            </div>
                            <div className="col-md-3 mt-3">
                                <input className='form-control mt-2' type="time" onChange={(e) => timeChangeHandler(e)} />
                            </div>
                            <div className="col-md-3 mt-3">
                            </div>
                        </div>
                        <div className=" mt-3 d-flex justify-content-end">
                            
                                <button type="button" className="add-main"
                                    onClick={addPatientHandler}
                                >ADD</button>
                            
                        </div>
                        <div className="col-md-12 mt-5 d-flex justify-content-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPatientModal
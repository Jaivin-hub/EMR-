import React, { useState, useRef, useEffect } from 'react'
import { TextField, Button, IconButton, RemoveButton } from '@mui/material'
import QrReader from 'react-qr-reader'
import { Table } from 'react-bootstrap'
import XMLParser from 'react-xml-parser';
import instance, { API } from '../config/api';
import { ApiHelper } from '../Helper/Apihelper';
import BasicTable from './PatientList'
import Modal from './Modal'
import { Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import SearchPage from './SearchPage';
import moment from 'moment';



const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))

function PatientView() {
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
    const [reload, setReload] = useState(false)
    const [patientList, setPatientList] = useState([])
    const [showUploadFile, setShowUploadFile] = useState(false)
    const [state, setState] = useState('')
    const [district, setDistrict] = useState('')
    const [mainErr, setMainErr] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [appoinmentDate, setAppoinmentDate] = useState('')
    const [appointmentTime, setAppointmentTime] = useState('')

    const dateChangeHandler = (e) => {
        const date = e.target.value
        const dateData = moment(date).format('DD-MM-YYYY');
        setAppoinmentDate(dateData)
    }

    const timeChangeHandler = (e) => {
        let time = e.target.value
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        const newData = time.join(''); // return adjusted time or original string


        setAppointmentTime(newData)
    }


    const bloodGroups = ['A-positive (A+)', 'A-negative (A-)', 'B-positive (B+)', 'B-negative (B-)', 'AB-positive (AB+)', 'AB-negative (AB-)', 'O-positive (O+)', 'O-negative (O-)']

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
        instance.post('/list_patients', obj).then((response) => {
            const patientList = response.data.patientList
            setPatientList(patientList)

        }).catch((err) => {
            console.log('error', err)
        })

        instance.post('/list_doctors', obj).then((res) => {
            setDoctorList(res.data.doctors)
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
            setPatientPhoneErr('Phone number does not have 10 digits')
            return false
        } else if (phone.length > 10) {
            setPatientPhoneErr('Phone number has more than 10 digits')
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
            setPatientPhoneErr('Phone number has more than 10 digits')
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
    const bloodGroupHandler = (e) => {
        setPatientBloodGroup(e.target.value)
    }

    const selectDoctorHandler = (e) => {
        setAppointmentDoctor(e.target.value)
    }

    const appointmentHandler = () => {
        const obj = {
            _hos_id: HospitalId,
            _doc_id: appointmentDoctor,
            _pat_id: "614ce34cfe3edcd0e3c6413t",
            app_date: appoinmentDate,
            app_time: appointmentTime
        }
        instance.post('/patient_appointment', obj).then((response) => {
            if (response.data.msg == 'Patient Appointment created successfully') {
                alert(response.data.msg)
            }
        })
    }


    const addPatientHandler = () => {
        const { bloodBloodGroup, patientPhoneNo } = patientData
        if (!AdharNo == "" && !patientName == "" && !patientDOB == "" && !address == "" && !Phone == "") {
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
                    setReload(true)
                }
            }).catch((err) => {
                console.log('error', err)
            })
        } else {
            setMainErr('Check all the fields that you entered!')
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


    return (
        // <div className="addPatient row mt-5 bg-primary navbar-light bg-light" style={{ height: '20em' }}>
        //     <div className=" bg-primary">
        //         ks
        //     </div>
        // </div>
        <div className="viewPage" >
            <h4>{scanResultFile}</h4>
            <div className="addPatient navbar-light mt-5" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                <div className="row pt-4" >
                    <div className="col-md-2 "  >
                        <label htmlFor="" style={{ paddingLeft: '40%' }}>Add Patient</label>
                        <div className="row ">
                            {/* <div className="col-md-6  d-flex justify-content-end">
                                <button variant="contained" onClick={() => { }}>Scan Qr</button>

                            </div>
                            <div className="col-md-6">
                                <button variant="contained" onClick={addPatientHandler}>UploadFile</button>

                            </div> */}
                            <div className="col-md-12 d-flex justify-content-center">
                                <Button variant="outlined" onClick={connectionHandler}>upload file</Button>
                                <Button variant="outlined" onClick={connectionScanHandler} style={{ marginLeft: "2%" }}>Scan Qr</Button>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-2">
                        {/* {showScan?
                        :
                        } */}
                        {/* {openScanner ?
                            <QrReader
                                delay={300}
                                style={{ width: '100%' }}
                                onError={handleErrWebCam}
                                onScan={handleScanWebCam}
                            />
                            :
                            <img onClick={() => { setOpenScanner(!openScanner) }} style={{ cursor: 'pointer', marginTop: '5%' }} src="https://static.thenounproject.com/png/59262-200.png" alt="" />
                        } */}
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
                                <img onClick={() => { setOpenScanner(!openScanner) }} style={{ cursor: 'pointer', marginTop: '10%' }} src="https://static.thenounproject.com/png/59262-200.png" alt="" />
                        }
                        <h4>{scanResultWebCam}</h4>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-2">
                                Patient details
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
                                    // onChange={(e) => { inputHandler(e) }}
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
                                    // onChange={(e) => { inputHandler(e) }}
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
                                    // onChange={(e) => { inputHandler(e) }}
                                    value={patientLastName}
                                    label="Patient Last Name"
                                />
                                <p style={{ color: "red" }}>{patientLastNameErr}</p>

                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
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

                                    // value={phone}
                                    // onChange={(e) => { inputHandler(e) }}
                                    label="Patient Phone Number"
                                />
                                <p style={{ color: "red" }}>{patientPhoneErr}</p>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mt-3">
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Patient Blood Group</InputLabel>
                                    <Select onChange={bloodGroupHandler}>
                                        {bloodGroups?.map((item, index) => {
                                            return (
                                                <MenuItem value={item} key={index}>{item}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="col-md-3 mt-3">
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Select Doctor</InputLabel>
                                    <Select onChange={selectDoctorHandler}>
                                        {doctorList?.map((item, index) => {
                                            return (
                                                <MenuItem id={item._id} name={item._id} value={item._id} key={index}>{item.doc_name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-3 mt-1" >
                                <input type="date" onChange={(e) => { dateChangeHandler(e) }} />
                                {/* <p style={{ color: "red" }}>{cityErr}</p> */}
                            </div>
                            <div className="col-md-3 mt-1">
                                <input type="time" onChange={(e) => timeChangeHandler(e)} />
                                {/* <p style={{ color: "red" }}>{stateErr}</p> */}
                            </div>
                            <div className="col-md-3 mt-3">

                                {/* <p style={{ color: "red" }}>{patientPhoneErr}</p> */}

                            </div>
                        </div>
                        <div className="row mt-1 d-flex justify-content-end">
                            <div className="col-md-3">
                                <Button variant="contained" style={{ width: "50%" }} onClick={addPatientHandler}>ADD</Button>
                            </div>
                        </div>
                        <div className="col-md-12 mt-5 d-flex justify-content-center">

                            {/* <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#0298D5' }} onClick={submitHandler}>login now</button> */}
                        </div>
                    </div>

                </div>

            </div>
            <div className="row mt-5">
                <div className="col-md-6">
                    <div className="row ">

                        <SearchPage setSearchTerm={setSearchTerm} />

                    </div>
                </div>
                <div className="col-md-6">

                </div>
            </div>
            {patientList?.length >= 1 ?

                <div className="addPatient navbar-light mt-2" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                    {/* <label htmlFor="" style={{marginLeft:'4%'}}></label> */}

                    <div className="row pt-4 " >
                        {/* <div className="col-md-1" style={{ marginLeft: '5%' }} >
                        Patient List

                    </div> */}

                        <div className="col-md-3" style={{ marginLeft: '3%' }}>
                            {/* <Button variant="contained" onClick={onScanFile}>upload file</Button>

                        <QrReader
                            ref={qrRef}
                            delay={300}
                            style={{ width: '50%', marginTop: '5%' }}
                            onError={handleErrFile}
                            onScan={handleScanFile}
                            legacyMode
                        /> */}
                        </div>
                        {/* <div className="col-md-2">
                    <Button variant="contained" onClick={onScanFile}>upload file</Button>
                </div> */}
                    </div>
                    {/* <div className="col-md-12 mt-4" style={{ marginLeft: '5%', marginRight: '3%', width: '90%', borderRadius: '5px', borderColor: '1px solid black' }}> */}

                    <BasicTable searchTerm={searchTerm} List={patientList} />

                    {/* <Table size="sm">
                        <>
                            <tr>
                                <th>Patient ID</th>
                                <th>Patient Name</th>
                                <th>Adhar No</th>
                                <th>Patient DOB</th>
                                <th>Patient Phone No</th>
                                <th>Patient Blood Group</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>

                        </tbody>
                    </Table> */}
                    {/* </div> */}
                </div>
                : null}
        </div>
    )
}

export default PatientView
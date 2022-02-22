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


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))

function PatientView() {
    const classes = useStyles()
    const [scanResultWebCam, setScanResultWebCam] = useState('')
    const [openScanner, setOpenScanner] = useState(false)
    const [scanResultFile, setScanResultFile] = useState('')
    const [AdharNo, setAdharNo] = useState('')
    const [patientName, setPatientName] = useState('')
    const [patientDOB, setPatientDOB] = useState('')
    const [patientBlood, setPatientBlood] = useState('')
    const [address, setAddress] = useState('')
    const [patientPhone, setPatientPhone] = useState('')
    const [showScan, setShowScan] = useState(true)
    const [patientData, setPatientData] = useState({})
    const [reload, setReload] = useState(false)
    const [patientList, setPatientList] = useState([])
    const [showUploadFile, setShowUploadFile] = useState(false)

    const bloodGroups = ['A-positive (A+)', 'A-negative (A-)', 'B-positive (B+)', 'B-negative (B-)', 'AB-positive (AB+)', 'AB-negative (AB-)', 'O-positive (O+)', 'O-negative (O-)']



    const qrRef = useRef(null)

    const HospitalId = localStorage.getItem('HospitalId')

    console.log('HospitalId', HospitalId)

    const handleErrWebCam = (err) => {
        console.log('err function')
        console.log('err', err)
    }

    const handleScanWebCam = (result) => {
        console.log('success')
        console.log('result', result)
        if (result) {
            var xml = new XMLParser().parseFromString(result);
            const adharData = xml.attributes
            console.log(adharData)
            const { co, dist, gender, gname, house, name, pc, po, state, street, uid, vtc, yob } = adharData
            setAdharNo(uid)
            setPatientName(name)
            setPatientDOB(yob)
            setAddress(house)
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



    console.log('patientData', patientData)

    const handleErrFile = (err) => {
        console.log(err)
    }

    const handleScanFile = (result) => {
        if (result) {
            var xml = new XMLParser().parseFromString(result);
            const adharData = xml.attributes
            console.log(adharData)
            const { co, dist, gender, gname, house, name, pc, po, state, street, uid, vtc, yob } = adharData
            setAdharNo(uid)
            setPatientName(name)
            setPatientDOB(yob)
            setAddress(house)
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



    const inputHandler = (e) => {
        const id = e.target.id
        const value = e.target.value
        const newData = { ...patientData }
        if (id == 'adharCardNo') {
            newData[id] = value
            setPatientData(newData)
        } else if (id == 'patientName') {
            newData[id] = value
            setPatientData(newData)
        } else if (id == 'patiantDOB') {
            newData[id] = value
            setPatientData(newData)
        } else if (id == 'bloodBloodGroup') {
            newData[id] = value
            setPatientData(newData)
        } else if (id == 'patientAddress') {
            newData[id] = value
            setPatientData(newData)
        } else if (id == 'patientPhoneNo') {
            newData[id] = value
            setPatientData(newData)
        }
    }

    useEffect(() => {
        const obj = {
            _hos_id: HospitalId
        }
        console.log('mounting')
        instance.post('/list_patients', obj).then((response) => {
            console.log('data fetching fine', response)
            const patientList = response.data.patientList
            setPatientList(patientList)

        }).catch((err) => {
            console.log('error', err)
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

    const [Phone, setPhone] = useState('')
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

    //######################### Validating phone number! ###########################

    // const [adhar, setPhone] = useState('')
    const [adharErr, setAdharErr] = useState('')

    const adharInputBlurHandler = (AdharNo, setAdharErr) => {
        if (AdharNo === '') {
            setAdharErr('This field cannot be empty!')
            return false
        } else {
            setAdharErr('')
            return true
        }
    }

    const adharInputChangeHandler = (AdharNo, setAdharErr) => {
        if (!AdharNo.match(/^[0-9][-\s\./0-9]*$/g)) {
            setAdharErr("Enter numbers only!");
            return false
        }
        else {
            setAdharErr('')
            return true
        }
    }

    //######################### Validating phone number! ###########################

    const [patientBloodGroup, setPatientBloodGroup] = useState('')
    const bloodGroupHandler = (e) => {
        setPatientBloodGroup(e.target.value)
    }

    const addPatientHandler = () => {
        const { bloodBloodGroup, patientPhoneNo } = patientData
        if (!AdharNo == "" && !patientName == "" && !patientDOB == "" && !address == "" && !Phone == "") {
            const obj = {
                aadhar_card_no: AdharNo,
                p_name: patientName,
                p_dob: patientDOB,
                p_bloodgroup: patientBloodGroup,
                p_address: address,
                p_phoneno: Phone,
                _hos_id: HospitalId
            }

            instance.post('/add_patient', obj).then((response) => {
                console.log('response from backend', response)
                if (response) {
                    setReload(true)
                }
            }).catch((err) => {
                console.log('error', err)
            })
        } else {
            console.log('all fields are required')
        }

    }


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
                                <img onClick={() => { setOpenScanner(!openScanner) }} style={{ cursor: 'pointer', marginTop: '5%' }} src="https://static.thenounproject.com/png/59262-200.png" alt="" />
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
                                    onChange={(e) => { inputHandler(e) }}
                                    value={patientName}
                                    label="Patient Name"
                                />
                            </div>
                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patiantDOB'
                                    onChange={(e) => { inputHandler(e) }}
                                    value={patientDOB}
                                    label="Patient DOB" />
                            </div>
                            <div className="col-md-3 mt-3">
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Patient Blood Group</InputLabel>
                                    <Select onChange={bloodGroupHandler}>
                                        {bloodGroups.map((item, index) => {
                                            return (
                                                <MenuItem value={item} key={index}>{item}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                {/* <TextField variant="standard" id='bloodBloodGroup' onChange={(e) => { inputHandler(e) }} label="Patient Blood Group" /> */}
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-3 mt-3">
                                <TextField
                                    variant="standard"
                                    id='patientAddress'
                                    onChange={(e) => { inputHandler(e) }}
                                    value={address}
                                    label="Patient Address"
                                />
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
                        <div className="row mt-1 d-flex justify-content-end">
                            <div className="col-md-3">
                                <Button variant="contained" onClick={addPatientHandler}>Add Patient</Button>
                            </div>
                        </div>
                        <div className="col-md-12 mt-5 d-flex justify-content-center">
                            {/* <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#0298D5' }} onClick={submitHandler}>login now</button> */}
                        </div>
                    </div>

                </div>
            </div>
            {patientList.length >= 1 ?

                <div className="addPatient navbar-light mt-5" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
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

                    <BasicTable List={patientList} />

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
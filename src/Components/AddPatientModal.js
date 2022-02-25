import React from 'react'

function AddPatientModal() {
    return (
        <div>
            <div className="addPatient navbar-light mt-5" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                <div className="row pt-4" >
                    <div className="col-md-2 "  >
                        <label htmlFor="" style={{ paddingLeft: '40%' }}>Add Patient</label>
                        <div className="row ">
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
                                <p style={{ color: "red" }}>{bloodGroupErr}</p>
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
                            </div>
                            <div className="col-md-3 mt-1">
                                <input type="time" onChange={(e) => timeChangeHandler(e)} />
                            </div>
                            <div className="col-md-3 mt-3">
                            </div>
                        </div>
                        <div className="row mt-1 d-flex justify-content-end">
                            <div className="col-md-3">
                                <Button variant="contained" style={{ width: "50%" }} onClick={addPatientHandler}>ADD</Button>
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

export default AddPatientModal
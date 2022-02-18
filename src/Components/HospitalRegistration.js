import React, { useState, useRef, useEffect } from 'react'
import '../assets/css/mainbackground.css'
import { TextField, Button } from '@mui/material'
import instance, { API } from '../config/api'
import { ApiHelper } from '../Helper/Apihelper'
import Upload from '../assets/imgs/upload.png';



function HospitalRegistration() {

    const [hospitalData, setHospitalData] = useState({})
    const upLoadRef = useRef();

    // file upload 
    const [pickedFile, setPickedFile] = useState(null)
    const [preview, setPreview] = useState('');
    const [size, setSize] = useState(null)

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
        console.log('pickedFile', pickedFile)
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

    console.log('pickedFile', pickedFile)

    const addHospitalSubmitHandler = () => {
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

        instance.post("add_hospital", obj).then((response) => {
            console.log('response of hospital', response)
        }).catch((err) => {
            console.log('error', err)
        })
    }

    return (
        <div className='centered loginWrapper d-flex justify-content-center' style={{ height: '60em' }}>
            <div className="login_container" style={{ marginTop: "10em", width: '60%' }}>
                <div className="card">
                    <div className="d-flex loginBoxs">
                        <div className="col-md-12">
                            <div className="row d-flex justify-content-center">
                                <h4 className='mt-5' style={{ fontFamily: "Roboto" }}><strong>Register Here</strong></h4>
                            </div>
                            <div className="row">
                                {/* ========== */}
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-4">
                                    <div>
                                        {/* <h6 style={{ fontFamily: 'serif', marginBottom: '10px' }}>
                                            Upload Files
                                        </h6> */}
                                        {/* <div style={{ display: 'flex' }}>
                                            <div
                                                onClick={() => {
                                                    upLoadRef.current.click();
                                                }}
                                                style={{ cursor: 'pointer' }}>
                                                <img
                                                    src={Upload}
                                                    style={{ height: '50px', width: '50px', marginRight: '10px' }}
                                                    alt=''
                                                />

                                            </div>
                                            <div>
                                                {pickedFile !== null ? (
                                                    <img
                                                        style={{ height: '50px', width: '50px' }}
                                                        src={preview}
                                                        alt=''
                                                    />
                                                ) : null}
                                            </div>
                                        </div> */}
                                        <div style={{ display: 'flex', fontFamily: 'serif' }}>
                                            <input
                                                id='fileInput'
                                                ref={upLoadRef}
                                                type='file'
                                                onChange={fileSelectorHandler}
                                                className='form-control'
                                                style={{ fontFamily: 'serif', display: 'none' }}
                                            />
                                            {/* <button
              onClick={(e) =>{
                e.preventDefault();
                fileUploader()
              }}
              style={{ fontFamily: 'serif' }}
              className='btn btn-secondary'>
              Upload
            </button> */}
                                        </div>
                                        {/* <label style={{ color: 'grey', fontSize: '10px' }}>
                                            Upload files upto size 50mb
                                        </label> */}
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6 mt-3">
                                            <TextField id='Hospital_Name' onChange={(e) => { inputChangeHandler(e) }} label="Hospital Name" />
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            {/* <TextField id='Hospital_Name' onChange={(e) => { inputChangeHandler(e) }} label="Hospital Name" /> */}
                                            <TextField id='Email_ID' onChange={(e) => { inputChangeHandler(e) }} label="Email ID" />
                                        </div>

                                    </div>
                                    <div className="row ">
                                        <div className="col-md-6 mt-3">
                                            <TextField id='Hospital_Address_1' onChange={(e) => { inputChangeHandler(e) }} label="Hospital Address 1" />
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <TextField id='Hospital_Address_2' onChange={(e) => { inputChangeHandler(e) }} label="Hospital Address 2" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mt-3">
                                            <TextField id='Country' onChange={(e) => { inputChangeHandler(e) }} label="Country" />
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <TextField id='State' onChange={(e) => { inputChangeHandler(e) }} label="State" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mt-3">
                                            <TextField id='City' onChange={(e) => { inputChangeHandler(e) }} label="City" />
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <TextField id='Pin_Code' onChange={(e) => { inputChangeHandler(e) }} label="Pin Code" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mt-3">
                                            <TextField id='Contact_No_1' onChange={(e) => { inputChangeHandler(e) }} label="Contact No 1" />
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <TextField id='Contact_No_2' onChange={(e) => { inputChangeHandler(e) }} label="Contact No 2" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mt-3">
                                            <TextField id='Password' onChange={(e) => { inputChangeHandler(e) }} label="Password" />
                                        </div>

                                    </div>
                                    <div className="row mt-4 d-flex justify-content-end">
                                        <div className="button">
                                            <Button variant="outlined" onClick={addHospitalSubmitHandler}>Cancel</Button>
                                        </div>
                                        <div className="button">
                                            <Button variant="contained" onClick={addHospitalSubmitHandler}>Register</Button>
                                        </div>
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

export default HospitalRegistration
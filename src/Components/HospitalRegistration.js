import React, { useState, useRef, useEffect } from 'react'
import '../assets/css/mainbackground.css'
import { TextField, Button } from '@mui/material'
import instance, { API } from '../config/api'
import { ApiHelper } from '../Helper/Apihelper'
import Upload from '../assets/imgs/upload.png';
import { useNavigate } from 'react-router-dom';



function HospitalRegistration() {
    const navigate = useNavigate();
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
                navigate('/registerSuccess');
            }
        }).catch((err) => {
            console.log('error', err)
        })
    }

    return (
        <div className='centered loginWrapper d-flex justify-content-center' style={{ height: '60em' ,background:'linear-gradient(180deg, #02BCB1 0%, #0298D5 100%)'}}>
            <div className="login_container" style={{ marginTop: "8em", width: '60%' }}>
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
                                <div className="col-md-4 mt-3 d-flex justify-content-center">
                                    <div>
                                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAADLCAMAAAB04a46AAAAZlBMVEX///9ZYnFcZXRTXWyWm6RMVmdpcn9OWGjX2dzS1NjIys5udYJLVWefpKtIU2SLkZt/hZC+wcZ1fIjl5ui6vcOFi5WxtbuqrrWYnaWKkJq1uL7f4eOkqK9hanj4+fns7e42Q1dBTF
                                        /PEYhUAAAGPUlEQVR4nO3d2WLiIBQGYCNi1LZxq0urxpn3f8lR69QsHCCBAwfCf9s25CsmhiUwGgWew9r3GfjJoSgGKT8XWTZE+Zln2RDlP+7hye+f8yHKP3iWDVFedQ9JXncPR950D0Xedg9DfhS4hyAXu+OXTwD3Tf7p+9wwA9V37HK4vuP+tMvd8db5JJe7Y61ztTtO+VLxOY9VrueOT77U+JzHKP/
                                        Sdscl7+KO6Vtt18kdT513dcci7+6O49Pexx2DvJ87fHlfd+jyVW932HITd8hyM3e4clN3qHJzd5hyG+4Q5Xbc4ck3ltxqeXmaucxc4Wa23HL59ngpuNP8ceaWyLebwmpBWifjzg3KP7lzthxu2w3IX9NoXEYCt+8Wyj+9uCVwDPetvO9GMVc/bhiO427LscpRnodjd1M+0xyfsH8aYvcbYj3U5EtPFQ7AM
                                        d23MvevkjDLkZ+Ee3dVfvJ0axPD8e83v/K1taZA51NwX9+PYp/ys69LXAB34f6VH8nAyylnGpEeU+cA7O/hXtyEDHx//NCJ7HzZTusQkxMpuGZkjx35Qv84wcHfJYdM8ARP8ARP8AR3nQQfGvwvWfj0DTUXqvB81u/MkOMArhjV85QET/AET3CdJHiCJ3iCk0qCJ3iCO4ZvF+v14tRP0SNE4LNVxnmec852
                                        HQo1CQl4dUIk42Mn1wYF+GdjHmgxMRFphgD80JpFkq+MTFrxD98LZs/kOzOVRrzDZ8JZQ/xg6FLGO3ws/qtiawhTxTf8G5gtxbAvc99wsHDsKvcMh2fAsrOxTRrP8AM8ANNzhEQ3nuErGN5zMFA3nuFTuHTki9wz/AKXznFbaoThUde4ZL5tcTXGyeIZLhlWz41to9FpD/7IMxye5m7l0W3MSuhHnuEl+ADDL
                                        Sy5s2I52Njx/cj6Bf6dftlQ9rf/KljlvuFb4F2WvPk+X/c8Hodz6MnXN3z0IbzK2Zt+0UDKnyMVQJV7h4vfGMrNv8uex2Uf4h/7h5fT9p9aeGr7vzNCxsX/Q//wUblp3NpZZv7QNv+9d7Cj8BcIwG+337xyobNiAn75audaOR1xlReS94sKZyMp5Znx/FEmL5Y2ntGrNw4m7KbfrOBsOgxpGI+dnfbnyXJysDO
                                        Kcqx9VaA2cNFHS+cdDrOoPxwwzF56bPi84NrHuTYfDQrEpj0y/F6H2rec1vcjZl81Lnz9+OxqLhUqWEu7wJtBjQr/fl6zBdy8fmUt+IZmG+NzgIIJfw0rvquH1LbChq7+DaJrEOHVYWQufgyr5CI8Ebwqx4PXt6/hikkDO+A80KocDd7c1kM+dL4He3SmRmcBBwveXgZeNl3iBL8VzpEmFSHBRcvnwtdrCQy2Pz
                                        I2OA1JcODi5RbZFGi+SUbi7PReCoICh5ZbZBdhS/MgX5IFp8ox4PAyNmwskM8Va/DkKKts2oeLuqRectZqapaqlzzZlylSFOtwqft+2GaLS7nMEVuaM9uxDb+OVY5Gw0PcTR0c/Jqp305+r34zL9SLbIUAvyqWJPpJ5Zmk1fcQJvyk+TL6a8VMxQ0hELj+Koj/G+g6+3jRh887rP5YPMYE11qr6FGHL2RjHK3cG+
                                        hbvUX0iMM1bs/1wy+BvofA4Hqf2ppH45uPPvwbcc3LOpzMENIjorcVkOA0Bg2fab+dggcnMUz8jGhXbIshC1ftHmsaqnDdXTV7hyi8/65cuqEJt7WLiyQk4fZ2cYFDEF46WS2ZHlzVvWYp5OClZiPDNNTg6m5FSyEG1+lWtBNa8K1Wt6KVkIJvHa5xSQl+crnzAiG4201l6MBVw5uWQwbetVvRNFTg3bsVDUME7n5
                                        3NBpw1G5FcUjAcbsVxaEAP/vYHI0AvDlb0U38w7G7U4F4h3952gTQN3zna/PD+nQv5/DlZeopl9pcd9/tcW9J8ARP8ATXSYIneIInOKkkOB6c5iZQDjZsHZOMxB3IRm8ISfAET/AET/AEjyA
                                        JnuAJnuCDhx+HCj/HBOcduhDgZbMDTJel3aE1lENMt/WPJZsChBbeacEYaG+fANNxhxZpL1ZIKTp2CzuekosWDizPDecchVy1RGCkcsZ1FgJtZZ6FfYdj/K3nmr3lfszdvV1jNYzlxcpktGu2X04DvMFfVh+LHtsX/AORLan2u2WZTwAAAABJRU5ErkJggg==' alt="" />
                                        
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
                                        <label htmlFor="" style={{marginLeft:"25%"}} className="mt-3">Upload logo</label>
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
                                            <TextField id='Password' type='password' onChange={(e) => { inputChangeHandler(e) }} label="Password" />
                                        </div>

                                    </div>
                                    <div className="row mt-4 d-flex justify-content-end">
                                        <div className="button">
                                            {/* <Button variant="outlined" onClick={addHospitalSubmitHandler}>Cancel</Button> */}
                                        </div>
                                        <div className="button" style={{width: '40%', height: ''}}>
                                            <Button variant="contained" onClick={addHospitalSubmitHandler}>Register</Button>
                                        </div>
                                        <div className="col-md-12 mt-5 d-flex justify-content-center">
                                            {/* <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#0298D5' }} onClick={submitHandler}>login now</button> */}
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
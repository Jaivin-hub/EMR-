import React, { useState } from 'react'
import '../assets/css/login.css';
import '../assets/css/mainbackground.css'
import hospitalImg from '../assets/imgs/88327_hospital_icon 1.png'
import { TextField, Button } from '@mui/material'
import { API } from '../config/api';
import { ApiHelper } from '../Helper/Apihelper';
import { useNavigate } from 'react-router-dom';
import instance from '../config/api'
import backGroundImage from '../assets/imgs/Rectangle 55.png'


function SignIn() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({})
    const [errMsg, setErrMsg] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')

    const inputHandler = (e) => {
        const id = e.target.id
        const value = e.target.value
        const newData = { ...loginData }
        newData[id] = value
        setLoginData(newData)
    }

    // console.log(loginData)

    const submitHandler = () => {
        const { email_id, password } = loginData
        // const obj = {

        // }
        if (!email_id == "", !password == "") {
            const data = loginData
            console.log('loginData', loginData)
            instance.post('/login_hospital', data).then((response) => {
                console.log('added hospital response...', response)
                if (response.data.msg == 'Success') {
                    const Data = response.data.hospital[0].name
                    const id = response.data.hospital[0]._id
                    localStorage.setItem('HospitalName', Data)
                    localStorage.setItem('HospitalId', id)
                    navigate('/taskDashboard');
                } else if (response.data.msg == 'Email or Password is invalid') {
                    setErrMsg('Email or Password is invalid')
                }
                // if (response) {

                // }
                // if (response) {
                //     setReload(!reload)
                // }
            })
        } else {
            setEmailErr('This field is required')
            setPasswordErr('This field is required')
        }

    }
    return (
        <div className='centered loginWrapper d-flex justify-content-center' style={{ backgroundImage: { backGroundImage }, height: '60em', background: 'linear-gradient(180deg, #02BCB1 0%, #0298D5 100%)' }}>
            <div className="login_container" style={{ marginTop: "10em", width: '40%' }}>
                <div className="card">
                    <div className="d-flex loginBoxs">
                        <div className="col-md-12">
                            <div className="row d-flex justify-content-center">
                                <h4 className='mt-5' style={{ fontFamily: "Roboto" }}><strong>login here</strong></h4>
                            </div>
                            <div className="row pt-3 d-flex justify-content-center">
                                {/* --- */}
                                <p className='text-danger'>{errMsg}</p>
                            </div>
                            <div className="row ">
                                <div className="col-md-12 mt-5 d-flex justify-content-center">
                                    {/* <TextField onChange={(e) => { inputHandler(e) }} id='email_id' label="email id" /> */}
                                    {/* <FormControl
                                        disabled
                                        type="text"
                                        placeholder="Enter text"
                                        onChange={this.handleChange}
                                    /> */}
                                    <input className="form-control" id='email_id' type="text" onChange={(e) => { inputHandler(e) }} placeholder=" email id" style={{ width: '80%', height: "3em", borderRadius: '5px' }} />
                                </div>
                                <div className="col-md-12">
                                    <p className="text-danger" style={{ marginLeft: '10%' }}>{emailErr}</p>
                                </div>
                                <div className="col-md-12 mt-5 d-flex justify-content-center">
                                    {/* <TextField onChange={(e) => { inputHandler(e) }} id='password' label="password" /> */}
                                    <input className="form-control" id='password' type="text" onChange={(e) => { inputHandler(e) }} placeholder="  password" style={{ width: '80%', height: "3em", borderRadius: '5px' }} />
                                </div>
                                <div className="col-md-12">
                                    <p className="text-danger" style={{ marginLeft: '10%' }}>{passwordErr}</p>
                                </div>
                                <div className="col-md-12 pt-3">
                                    <a href="" className="" style={{ marginLeft: '10%' }}>Forget password?</a>
                                </div>
                                <div className="col-md-12 mt-5 d-flex justify-content-center">
                                    <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#0298D5' }} onClick={submitHandler}>login now</button>
                                </div>
                                <div className="col-md-12 mt-5 d-flex justify-content-center" style={{ display: 'flex' }}>
                                    {/* <div className="row"> */}
                                    <label htmlFor="">Not a member? <a href="/login">Sign up</a></label>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
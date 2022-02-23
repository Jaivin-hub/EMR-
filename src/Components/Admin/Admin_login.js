import React, { useState } from 'react'
import '../../assets/css/login.css';
import '../../assets/css/mainbackground.css'
import hospitalImg from '../../assets/imgs/88327_hospital_icon 1.png'
import { TextField, Button } from '@mui/material'
import { API } from '../../config/api';
import { ApiHelper } from '../../Helper/Apihelper';
import { useNavigate } from 'react-router-dom';
import instance from '../../config/api'
import backGroundImage from '../../assets/imgs/Rectangle 55.png'
import { SiGmail } from 'react-icons/si';
function Admin_login() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({})
    const [mainErr, setMainErr] = useState('')

    //######################### Email validation! ###########################

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

    //######################### Email validation! ###########################


    //######################### Validating Password! ###########################

    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState('')


    const passwordInputBlurHandler = (password, setPasswordErr) => {
        if (password === '') {
            setPasswordErr('This field cannot be empty!')
            return false
        } else if (password.length < 4) {
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

    console.log('email', email)
    console.log('password', password)

    // #################### Validating Password! ###########################


    // const inputHandler = (e) => {
    //     const id = e.target.id
    //     const value = e.target.value
    //     const newData = { ...loginData }
    //     newData[id] = value
    //     setLoginData(newData)
    // }

    // // console.log(loginData)

    const submitHandler = () => {
        const obj = {
            email_id: email,
            password: password
        }
        const adminEmail = "admin@gmail.com"
        const adminPassword = '123456'
        if (emailError == "" && passwordErr == "") {
            if (!email == "", !password == "") {
                if (email == adminEmail) {
                    if (adminPassword == password) {

                        setMainErr('')
                        navigate('/adminDashboard')
                    } else {
                        setMainErr('Password is incorrect')
                    }
                } else {
                    setMainErr('Email is incorrect')
                }
                // instance.post('/login_hospital', obj).then((response) => {
                //     console.log('response login hospital ---', response)
                //     if (response.data.msg == 'Success') {
                //         const Data = response.data.hospital[0].name
                //         const id = response.data.hospital[0]._id
                //         localStorage.setItem('HospitalName', Data)
                //         localStorage.setItem('HospitalId', id)
                //         navigate('/taskDashboard');
                //     } else if (response.data.msg == 'Email or Password is invalid') {
                //         setMainErr(response.data.msg)
                //         console.log('invalid username or password')
                //     }
                // }).catch((err) => {
                //     console.log('Error from login : ', err)
                // })
            } else {
                console.log('the way')
                setMainErr('All fields are required!')
            }
        } else {
            console.log('on the right way')
            setMainErr('Check the fields you entered!')
        }
        // const { email_id, password } = loginData
        // if (!email_id == "", !password == "") {
        //     const data = loginData
        //     console.log('loginData', loginData)
        //     instance.post('/login_hospital', data).then((response) => {
        //         console.log('added hospital response...', response)
        //         if (response.data.msg == 'Success') {
        //             const Data = response.data.hospital[0].name
        //             const id = response.data.hospital[0]._id
        //             localStorage.setItem('HospitalName', Data)
        //             localStorage.setItem('HospitalId', id)
        //             navigate('/taskDashboard');
        //         } else if (response.data.msg == 'Email or Password is invalid') {
        //             // setErrMsg('Email or Password is invalid')
        //         }
        //     })
        // } else {
        //     // setEmailErr('This field is required')
        //     // setPasswordErr('This field is required')
        // }

    }

    const signUpchangeHandler = () => {
        navigate('/login');
    }
    return (
        <div className='centered loginWrapper d-flex justify-content-center' style={{ height: '60em', background: 'linear-gradient(180deg, #02BCB1 0%, #0298D5 100%)' }}>
            <div className="login_container" style={{ marginTop: "10em", width: '40%' }}>
                <div className="card">
                    <div className="d-flex loginBoxs">
                        <div className="col-md-12">
                            <div className="row d-flex justify-content-center">
                                <h4 className='mt-5' style={{ fontFamily: "Roboto" }}><strong>Welcome Admin</strong></h4>
                            </div>
                            <div className="row pt-3 d-flex justify-content-center">
                                {/* --- */}
                                <p className='text-danger'>{mainErr}</p>
                            </div>
                            <div className="row ">
                                <div className="col-md-12 mt-5 d-flex justify-content-center">
                                    <input
                                        className="form-control"
                                        id='email_id'
                                        type="email"
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            emailInputChangeHandler(e.target.value, setEmailError)
                                        }}
                                        onBlur={(e) => {
                                            emailInputBlurHandler(e.target.value, setEmailError)
                                        }}
                                        placeholder=" email id"
                                        style={{ width: '80%', height: "3em", borderRadius: '5px' }}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <p className="text-danger" style={{ marginLeft: '10%' }}>{emailError}</p>
                                </div>
                                <div className="col-md-12 mt-5 d-flex justify-content-center">
                                    <input
                                        className="form-control"
                                        id='password'
                                        type="password"
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            passwordInputChangeHandler(e.target.value, setPasswordErr)
                                        }}
                                        onBlur={(e) => {
                                            passwordInputBlurHandler(e.target.value, setPasswordErr)
                                        }}
                                        placeholder="  password"
                                        style={{ width: '80%', height: "3em", borderRadius: '5px' }} />
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
                                    {/* <label >Not a member? <a style={{ cursor: 'pointer', color: "" }} onClick={signUpchangeHandler}>Contact- 9072442200</a></label> */}
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

export default Admin_login
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
import Footer from './Footer';
import loginbg from '../assets/imgs/login-bg.png';

function SignIn() {
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
        console.log('clicked')
        const obj = {
            email_id: email,
            password: password
        }
        if (emailError == "" && passwordErr == "") {
            if (!email == "", !password == "") {
                instance.post('/login_hospital', obj).then((response) => {
                    console.log('response login hospital ---', response)
                    if (response.data.msg == 'Success') {
                        const Data = response.data.hospital[0].name
                        const id = response.data.hospital[0]._id
                        localStorage.setItem('HospitalName', Data)
                        localStorage.setItem('HospitalId', id)
                        localStorage.setItem('handleLogin', true)
                        navigate('/taskDashboard');
                    } else if (response.data.msg == 'Email or Password is invalid') {
                        setMainErr(response.data.msg)
                        console.log('invalid username or password')
                    }
                }).catch((err) => {
                    console.log('Error from login : ', err)
                })
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
    const [passwordType, setPasswordType] = useState('password')
    const [showEyeIcon, setShowEyeIcon] = useState(true)

    const changePasswordTypeHandler = (value) => {
        if (value == 'Text') {
            setPasswordType('Text')
            setShowEyeIcon(false)
        } else {
            setPasswordType('password')
            setShowEyeIcon(true)
        }
    }

    const signUpchangeHandler = () => {
        // navigate('/login');
    }
    const selectedStateCites = () => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "API_KEY");

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };
        // https://api.countrystatecity.in/v1/countries/[ciso]/states/[siso]/cities
        fetch("https://api.countrystatecity.in/v1/countries/IN/states/MH/cities", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    return (
        <>
            <div className='centered loginWrapper d-flex justify-content-center align-items-center login-background'>
                <div className="login_container login-box-custom">
                    <div className="card mt-5">
                        <div className="d-flex loginBoxs">
                            <div className="col-md-12">
                                <div className="row d-flex justify-content-center">
                                    <h4 className='' style={{ fontFamily: "Roboto" }}><strong>Login</strong></h4>
                                </div>
                                <div className="row  d-flex justify-content-center">
                                    {/* --- */}
                                    <p className='text-danger'>{mainErr}</p>
                                </div>
                                <div className="row ">
                                    <div className="col-md-12  d-flex justify-content-center px-0 login-field">
                                        <i class="fa fa-envelope" aria-hidden="true"></i>
                                        <input
                                            className="form-control "
                                            id='email_id'
                                            type="email"
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                emailInputChangeHandler(e.target.value, setEmailError)
                                            }}
                                            onBlur={(e) => {
                                                emailInputBlurHandler(e.target.value, setEmailError)
                                            }}
                                            placeholder="Email id"

                                        />
                                    </div>
                                    <div className="col-md-12 px-0">
                                        <p className="text-danger">{emailError}</p>
                                    </div>
                                    <div className="col-md-12  d-flex justify-content-center px-0 login-field">
                                        <i class="fa fa-lock" aria-hidden="true"></i>
                                        <input
                                            className="form-control "
                                            id='password'
                                            type={passwordType}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                                passwordInputChangeHandler(e.target.value, setPasswordErr)
                                            }}
                                            onBlur={(e) => {
                                                passwordInputBlurHandler(e.target.value, setPasswordErr)
                                            }}
                                            placeholder="Password"
                                        />
                                        {showEyeIcon ?
                                            <button onClick={()=>{changePasswordTypeHandler('Text')}} className="pass-eye" >
                                                <i class="fa fa-eye" aria-hidden="true"></i>
                                                {/* <i class="fa fa-eye-slash" aria-hidden="true"></i> */}
                                            </button>
                                            :
                                            <button onClick={()=>{changePasswordTypeHandler('password')}} className="pass-eye" >
                                                {/* <i class="fa fa-eye" aria-hidden="true"></i> */}
                                                <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                            </button>
                                        }
                                    </div>
                                    <div className="col-md-12 px-0">
                                        <p className="text-danger" >{passwordErr}</p>
                                    </div>
                                    <div className="col-md-12 px-0">
                                        <a href="" className="links-main" >Forget password?</a>
                                    </div>
                                    <div className="col-md-12 mt-3 d-flex justify-content-center px-0">
                                        <button className="btn main-btn" onClick={submitHandler}>login now</button>
                                    </div>
                                    <div className="col-md-12 mt-5 d-flex justify-content-center px-0" style={{ display: 'flex' }}>
                                        {/* <div className="row"> */}
                                        <label >Not a member? <a style={{ cursor: 'pointer', }} onClick={signUpchangeHandler}>Contact- <a className="links-main">9072442200</a> </a></label>
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default SignIn
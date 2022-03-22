import React, { useState } from 'react'
import '../../assets/css/login.css';
import '../../assets/css/mainbackground.css'
import { useNavigate } from 'react-router-dom';
import instance from '../../config/api'

function DoctorLogin() {
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
        console.log('inside function')
        const obj = {
            doc_email: email,
            doc_password: password
        }
        console.log('obj', obj)
        if (emailError == "" && passwordErr == "") {
            if (!email == "", !password == "") {
                instance.post('/login_doctor', obj).then((response) => {
                    console.log('if', response)
                    if (response?.data.msg == "Success") {
                        setMainErr('')
                        console.log('here')
                        localStorage.setItem('doctorDetails', response?.data.doctor[0]._id);
                        navigate('/doctorDashboard');

                        // localStorage.setItem('doctorDetails', response?.data.doctor[0])
                        // response.data.doctor
                    } else {
                        console.log('else')
                        setMainErr(response?.data.msg)
                    }
                    //     if (response.data.msg == 'Success') {
                    //         const Data = response.data.hospital[0].name
                    //         const id = response.data.hospital[0]._id
                    //         localStorage.setItem('HospitalName', Data)
                    //         localStorage.setItem('HospitalId', id)
                    //         localStorage.setItem('handleLogin', true)
                    //         navigate('/taskDashboard');
                    //     } else if (response.data.msg == 'Email or Password is invalid') {
                    //         setMainErr(response.data.msg)
                    //     }
                }).catch((err) => {
                    console.log('Error from login : ', err)
                })
                // navigate('/doctordashboard');
            } else {
                setMainErr('All fields are required!')
            }
        } else {
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





    return (
        <div>
            <div className='centered loginWrapper d-flex justify-content-center align-items-center' style={{ minHeight: "100vh", background: 'linear-gradient(180deg, #02BCB1 0%, #0298D5 100%)' }}>
                <div className="login_container" style={{ maxWidth: '30%' }}>
                    <div className="card mt-5">
                        <div className="d-flex loginBoxs">
                            <div className="col-md-12">
                                <div className="row d-flex justify-content-center">
                                    <h4 className='mt-5' style={{ fontFamily: "Roboto" }}><strong>Welcome Doctor</strong></h4>
                                </div>
                                <div className="row pt-3 d-flex justify-content-center">
                                    {/* --- */}
                                    <p className='text-danger'>{mainErr}</p>
                                </div>
                                <div className="row ">
                                    <div className="col-md-12 mt-2 d-flex justify-content-center">
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
                                            placeholder=" Email id"
                                            style={{ width: '80%', height: "3em", borderRadius: '5px' }}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <p className="text-danger" style={{ marginLeft: '10%' }}>{emailError}</p>
                                    </div>
                                    <div className="col-md-12 mt-3 d-flex justify-content-center">
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
                                            placeholder="  Password"
                                            style={{ width: '80%', height: "3em", borderRadius: '5px' }} />
                                    </div>
                                    <div className="col-md-12">
                                        <p className="text-danger" style={{ marginLeft: '10%' }}>{passwordErr}</p>
                                    </div>
                                    <div className="col-md-12">
                                        <a href="" className="" style={{ marginLeft: '10%' }}>Forget password?</a>
                                    </div>
                                    <div className="col-md-12 mt-3 d-flex justify-content-center">
                                        <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#0298D5' }} onClick={submitHandler}>login now</button>
                                    </div>
                                    <div className="col-md-12 mt-5 d-flex justify-content-center" style={{ display: 'flex' }}>
                                        {/* <div className="row"> */}
                                        <label >Not a member? <a style={{ cursor: 'pointer', }} >Contact- <a style={{ color: "#007bff" }}>9072442200</a> </a></label>
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default DoctorLogin
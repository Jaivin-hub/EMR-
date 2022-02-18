import React from 'react'
import successImg from '../assets/imgs/Vector (2).png'
import { useNavigate } from 'react-router-dom';


function RegisterSuccess() {
    const navigate = useNavigate();

    const navigateHandler = () => {
        console.log('navigate function')
        navigate('/');

    }
    return (
        <div className='centered loginWrapper d-flex justify-content-center' style={{ height: '60em',  background: 'linear-gradient(180deg, #02BCB1 0%, #0298D5 100%)' }}>
            <div className="login_container" style={{ marginTop: "15em", width: '30%' }}>
                <div className="card">
                    <div className="d-flex loginBoxs">
                        <div className="col-md-12">
                            <div className="row d-flex justify-content-center">
                                <h4 className='mt-5' style={{ fontFamily: "Roboto" }}><strong>Register Here</strong></h4>
                            </div>

                            <div className="row ">
                                <div className="col-md-12 mt-5 d-flex justify-content-center">
                                    <img src={successImg} alt="" />
                                    <h3 htmlFor="" className="mt-2" style={{ marginLeft: '5%', color: '#028FBC' }}>Success!</h3>
                                </div>
                                <div className="col-md-12 mt-5 text-center ">
                                    <strong>Congratulations</strong>, Your account has been successfully created
                                </div>
                                <div className="col-md-12 mt-2 text-center">
                                    Your <label htmlFor="" style={{ color: "#028FBC" }}>username</label> & <label htmlFor="" style={{ color: "#028FBC" }}>password</label> have been sent to the
                                </div>
                                <div className="col-md-12  text-center">
                                    <label htmlFor="" style={{ color: "#028FBC" }}>email address</label> that you entered.
                                    {/* <p className="text-danger" style={{ marginLeft: '10%' }}>{passwordErr}</p> */}
                                </div>
                                <div className="col-md-12 pt-3 d-flex justify-content-end">
                                    <button style={{ backgroundColor: '#0296D5', borderColor: '#0296D5', borderRadius: "5px", color: '#fff' }} onClick={navigateHandler}>Continue</button>
                                    {/* <a href="" className="" style={{ marginLeft: '10%' }}>Forget password?</a> */}
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
    )
}

export default RegisterSuccess
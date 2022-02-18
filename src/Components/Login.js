import React, { useState } from 'react'
import '../assets/css/login.css';
import '../assets/css/mainbackground.css'
import hospitalImg from '../assets/imgs/88327_hospital_icon 1@2x.png'
import doctorImg from '../assets/imgs/image 2@2x.png'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [showCard, setShowCard] = useState(true)
  const [showDoctorCard, setShowDoctorCard] = useState(true)
  const [errMsg, setErrMsg] = useState('')

  const handleNavigate = () => {
    if (showCard == false) {
      navigate('/hospitalregistration');

    } else {
      setErrMsg('Please select')
    }

  }

  const handleChangeHandler = () => {
    setShowCard(false)
    setErrMsg('')
  }

  const handleDoctorChange = () => {
    setShowDoctorCard(false)
  }

  return (
    <div className='centered loginWrapper d-flex justify-content-center' style={{ height: '60em', background: 'linear-gradient(180deg, #02BCB1 0%, #0298D5 100%)' }}>
      <div className="login_container" style={{ marginTop: "10em", width: '60%' }}>
        <div className="card">
          <div className="d-flex loginBoxs">
            <div className="col-md-12">
              <div className="row d-flex justify-content-center">
                <h4 className='mt-5' style={{ fontFamily: "Roboto" }}><strong>Register Here</strong></h4>
              </div>
              <div className="row d-flex justify-content-center">
                <p className='' style={{ fontFamily: "Roboto", color: 'red' }}>{errMsg}</p>
              </div>
              <div className="row">
                {/* --- */}
              </div>
              <div className="row mt-5">
                <div className="col-md-6 d-flex justify-content-center">
                  <div className="row">
                    {showCard ?
                      <Card onClick={handleChangeHandler} classNama="" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={hospitalImg} />
                        <Card.Body className="d-flex justify-content-center">
                          <Card.Title>Hospital</Card.Title>

                        </Card.Body>
                      </Card>
                      :
                      <Card classNama="" style={{ width: '18rem', background: 'linear-gradient(180deg, #02BCB1 0%, #0298D5 100%)' }}>
                        <Card.Img variant="top" src={hospitalImg} />
                        <Card.Body className="d-flex justify-content-center">
                          <Card.Title>Hospital</Card.Title>

                        </Card.Body>
                      </Card>
                    }


                    {/* <img src={hospitalImg} alt="" /> */}
                    <div>
                      {/* <label htmlFor="">Hospital</label> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                  <div className="row">
                    {/* <img src={doctorImg} alt="" /> */}
                    {showDoctorCard ?
                      <Card onClick={handleDoctorChange} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={doctorImg} />
                        <Card.Body className="d-flex justify-content-center">
                          <Card.Title>Doctor</Card.Title>

                        </Card.Body>
                      </Card>
                      :
                      <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={doctorImg} />
                        <Card.Body className="d-flex justify-content-center">
                          <Card.Title>Doctor</Card.Title>

                        </Card.Body>
                      </Card>
                    }
                  </div>

                </div>

              </div>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-end mt-5">

                  <Button onClick={handleNavigate}>Confirm</Button>
                </div>
              </div>
              <div className="col-md-12 mt-5 d-flex justify-content-center">
                {/* <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#0298D5' }} onClick={submitHandler}>login now</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login
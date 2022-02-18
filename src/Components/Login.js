import React from 'react'
import '../assets/css/login.css';
import '../assets/css/mainbackground.css'
import hospitalImg from '../assets/imgs/88327_hospital_icon 1.png'

function Login() {
  return (
    <div className='centered loginWrapper d-flex justify-content-center' style={{ backgroundImage: `url(https://post.healthline.com/wp-content/uploads/2020/08/Doctors_For_Men-732x549-thumbnail-1-732x549.jpg)`,height:'60em' }}>
      <div className="login_container" style={{ marginTop: "15em", width: '60%' }}>
        <div className="card">
          <div className="d-flex loginBoxs">
            <div className="col-md-12">
              <div className="row">
                Register Here
              </div>
              <div className="row">
                ---
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="hospitalImgHolder" style={{ width: '50%', marginLeft: '30%' }}>
                    <div className="row" style={{}}>
                      {/* <div className="ima"> */}
                        <img src={hospitalImg} alt="" style={{ width: '50%' ,marginLeft: '25%',marginTop: '15%'}} />
                      {/* </div> */}

                    </div>
                    <div>
                      <label htmlFor="">Hospital</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
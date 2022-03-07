import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import MainLogo from '../assets/imgs/logo-img 1.png'
import '../assets/css/dashboard.css'
import Notification from '../assets/imgs/Vector (1).png'
import { useNavigate } from 'react-router-dom';



function Header() {
    const navigate = useNavigate();

    const navigateHandler = (value) => {
        if (value == 'doctor') {
            navigate('/hospitallisting')
        } else if (value == 'appointments') {
            navigate('/taskDashboard');
        } else if (value == 'patients') {
            navigate('/patientlisting')
        } else if (value == 'dashboard') {
            console.log('ivide')
            navigate('/taskDashboard');
        } else if (value == 'Medicine') {
            navigate('/MedicineListing')
        }
    }
    // handleLogin

    const handleLogout = () => {
        localStorage.removeItem("handleLogin");
        navigate('/')
    }
    const pathname = window.location.pathname
    // alert(pathname)
    console.log('pathname:::', pathname)
    return (
        <div className="headerNav navbar-light" style={{ height: "4em", backgroundColor: "#FFFFFF", border: '5px', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)', width: '100%' }}>
            <Navbar expand="lg">
                <Navbar.Brand ><img onClick={() => { navigateHandler('dashboard') }} style={{ cursor: 'pointer' }} src={MainLogo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" style={{ marginLeft: "10%" }}>
                        {pathname == '/project/emr/adminDashboard' ?
                            // null
                            <Nav.Link className="navMenu1">Hospitals</Nav.Link>
                            :
                            <>
                                <Nav.Link onClick={() => { navigateHandler('appointments') }} >Appointments</Nav.Link>
                                <Nav.Link className="navMenu2" onClick={() => { navigateHandler('doctor') }}>Doctors</Nav.Link>
                                <Nav.Link onClick={() => { navigateHandler('patients') }} className="navMenu3">Patients</Nav.Link>
                                <Nav.Link onClick={() => { navigateHandler('Medicine') }} className="navMenu3">Medicine</Nav.Link>
                                <Nav.Link href="#link" className="navMenu4">Reports</Nav.Link>
                                {/* <Nav.Link className="   ml-auto" href="#link" className="navMenu4" onClick={handleLogout}>Logout</Nav.Link> */}

                            </>
                        }
                    </Nav>
                    <Nav className="ml-auto" style={{ marginLeft: "10%" }}>
                        {pathname == '/project/emr/adminDashboard' ?
                            null
                            // <Nav.Link className="navMenu1">Hospitals</Nav.Link>
                            :
                            <>

                                <Nav.Link className="ml-auto" href="#link" className="navMenu4" onClick={handleLogout}>Logout</Nav.Link>

                            </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* <div className="row pt-3">
                <div className="col-md-6 ">
                    <div className="row">
                        <div className="col-md-4" style={{ paddingLeft: '5%' }}>
                            <strong>MEDDBOT</strong>
                        </div>
                        <div className="col-md-2">
                            Appointments
                        </div>
                        <div className="col-md-2">
                            Doctors
                        </div>
                        <div className="col-md-2">
                            Patients
                        </div>
                        <div className="col-md-2">
                            Reports
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                </div>
            </div> */}
        </div>
    )
}

export default Header
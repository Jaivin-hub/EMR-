import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import MainLogo from '../assets/imgs/logo-img 1.png'
import '../assets/css/dashboard.css'
import Notification from '../assets/imgs/Vector (1).png'
import { useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5'



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
            navigate('/taskDashboard');
        } else if (value == 'Medicine') {
            navigate('/MedicineListing')
        }
    }

    const adminHandleLogout = () => {
        navigate('/admin/login')
    }
    // handleLogin

    const handleLogout = () => {
        localStorage.removeItem("handleLogin");
        navigate('/')
    }
    const pathname = window.location.pathname

    const handleSettings = () => {
        navigate('/settings')
    }
    // alert(pathname)
    return (
        <div className="headerNav navbar-light sticky-top" style={{ height: "4em", backgroundColor: "#FFFFFF", border: '5px', width: '100%' }}>
            <Navbar expand="lg">
                <Navbar.Brand ><img onClick={() => { navigateHandler('dashboard') }} style={{ cursor: 'pointer' }} src={MainLogo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto menu-list" >
                        {pathname == '/project/emr/adminDashboard' ?
                            <Nav.Link className=" decoration-sky-500 underline decoration-4">Hospitals</Nav.Link>
                            :
                            null
                        }
                        {pathname == '/project/emr/taskDashboard' ?
                            <Nav.Link onClick={() => { navigateHandler('appointments') }} className=" decoration-sky-500 underline decoration-4">Appointments</Nav.Link>
                            : pathname == '/project/emr/adminDashboard' ?
                                null
                                :
                                <Nav.Link onClick={() => { navigateHandler('appointments') }} className="">Appointments</Nav.Link>
                        }
                        {pathname == '/project/emr/hospitallisting' ?
                            <Nav.Link className="navMenu2" onClick={() => { navigateHandler('doctor') }} className=" decoration-sky-500 underline decoration-4">Doctors</Nav.Link>
                            : pathname == '/project/emr/adminDashboard' ?
                                null
                                :
                                <Nav.Link className="navMenu2" onClick={() => { navigateHandler('doctor') }}>Doctors</Nav.Link>
                        }
                        {pathname == '/project/emr/patientlisting' ?
                            <Nav.Link onClick={() => { navigateHandler('patients') }} className=" decoration-sky-500 underline decoration-4">Patients</Nav.Link>
                            : pathname == '/project/emr/adminDashboard' ?
                                null
                                :
                                <Nav.Link onClick={() => { navigateHandler('patients') }} className="navMenu3">Patients</Nav.Link>
                        }
                        {pathname == '/project/emr/MedicineListing' ?
                            <Nav.Link onClick={() => { navigateHandler('Medicine') }} className=" decoration-sky-500 underline decoration-4">Medicine</Nav.Link>
                            : pathname == '/project/emr/adminDashboard' ?
                                null
                                :
                                <Nav.Link onClick={() => { navigateHandler('Medicine') }} className="navMenu3">Medicine</Nav.Link>
                        }
                    </Nav>
                    <Nav className="ml-auto" style={{ marginLeft: "10%" }}>
                        {pathname == '/project/emr/adminDashboard' ?
                            null
                            :
                            <>
                                <Nav.Link className="ml-auto" href="#link" className="navMenu4" onClick={handleSettings}><IoSettingsOutline size={20} /></Nav.Link>
                                <Nav.Link className="ml-auto" href="#link" className="navMenu4" onClick={handleLogout}>Logout</Nav.Link>

                            </>
                        }
                        {pathname == '/project/emr/adminDashboard' ?
                            <Nav.Link className="ml-auto" href="#link" className="navMenu4" onClick={adminHandleLogout}>Logout</Nav.Link>

                            :
                            null
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header
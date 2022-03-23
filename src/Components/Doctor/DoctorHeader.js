import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/imgs/logo-img 1.png'
import { IoSettingsOutline } from 'react-icons/io5'


function DoctorHeader() {

    const navigate = useNavigate();
    const navigateHandler = (value) => {
        if (value == 'appointments') {
            navigate('/doctorDashboard');
        }else if (value == 'Medicine') {
            navigate('/doctorMedicineListing')
        }
    }

    const handleSettings = () => {
        const value = 'Add-Doctor'
        navigate(`/doctorSettings/${value}`)
    }

    const doctorHandleLogout = () => {

    }
    return (
        <div className="headerNav navbar-light sticky-top" style={{ height: "4em", backgroundColor: "#FFFFFF", border: '5px', width: '100%' }}>
            <Navbar expand="lg">
                <Navbar.Brand ><img onClick={() => { navigateHandler('dashboard') }} style={{ cursor: 'pointer' }} src={MainLogo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto menu-list" >
                        <Nav.Link onClick={() => { navigateHandler('appointments') }} className="">Appointments</Nav.Link>
                        <Nav.Link onClick={() => { navigateHandler('Medicine') }} className="navMenu3">Medicine</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto" style={{ marginLeft: "10%" }}>
                        <Nav.Link className="ml-auto" href="#link" className="navMenu4" onClick={handleSettings}><IoSettingsOutline size={20} /></Nav.Link>
                        <Nav.Link className="ml-auto" href="#link" className="navMenu4" onClick={doctorHandleLogout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default DoctorHeader
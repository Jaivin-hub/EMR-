import React from 'react'

function AddAppointmentsModal({ setAppointmentsModalOpen, patientId }) {
    return (
        <div className="Modal_container">
            <div className="row">
                <div style={{ cursor: 'pointer' }} onClick={() => { setAppointmentsModalOpen(false) }} className="col-md-12  d-flex justify-content-end align-items-end">
                    <h1>x</h1>
                </div>
            </div>
            <div className="addPatient navbar-light " style={{ backgroundColor: "#FFFFFF", border: '' }}>
                <div className="row" >
                    <div className="col-md-2  text-center"  >
                        <label htmlFor="" >Add Patient</label>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAppointmentsModal
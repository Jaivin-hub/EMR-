import React, { useState, useEffect } from 'react'
import { Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import instance from '../../config/api'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))

function AppointmentsModal({ patientId, setShowNewAppointmentsModal, setReload, reload }) {
    const HospitalId = localStorage.getItem('HospitalId')
    const classes = useStyles()
    const [appointmentDoctor, setAppointmentDoctor] = useState('')
    const [doctorList, setDoctorList] = useState([])
    const [appoinmentDate, setAppoinmentDate] = useState('')
    const [appointmentTime, setAppointmentTime] = useState('')




    useEffect(() => {
        const obj = {
            _hos_id: HospitalId
        }
        instance.post('/list_doctors', obj).then((res) => {
            setDoctorList(res.data.doctors)
        })
    }, [reload])

    const timeChangeHandler = (e) => {
        let time = e.target.value
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        const newData = time.join(''); // return adjusted time or original string
        setAppointmentTime(newData)
    }


    const selectDoctorHandler = (e) => {
        setAppointmentDoctor(e.target.value)
    }

    const dateChangeHandler = (e) => {
        const date = e.target.value
        const dateData = moment(date).format('DD-MM-YYYY');
        setAppoinmentDate(dateData)
    }
    return (
        <div className="Modal_Container">
            <div className="row">
                <div className="col-md-8">
                    <h4><strong>New appointments</strong></h4>

                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => { setShowNewAppointmentsModal(false) }} className="col-md-4  d-flex justify-content-end align-items-end">
                    <h1>x</h1>
                </div>
                <div className="addPatient navbar-light " style={{ backgroundColor: "#FFFFFF", border: '' }}>
                    <div className="row " >
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <FormControl className={classes.formControl}>
                                <InputLabel>Select Doctor</InputLabel>
                                <Select onChange={selectDoctorHandler}>
                                    {doctorList?.map((item, index) => {
                                        return (
                                            <MenuItem id={item._id} name={item._id} value={item._id} key={index}>{item.doc_name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                            <input type="date" onChange={(e) => { dateChangeHandler(e) }} />
                        </div>
                        <div className="col-md-4">
                            <input type="time" onChange={(e) => timeChangeHandler(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentsModal
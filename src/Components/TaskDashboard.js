import React, { useEffect, useState } from 'react'
import PatientView from './PatientView'
import '.././assets/css/dashboard.css'
import DoctorView from './DoctorView'
import Header from './Header'


function TaskDashboard() {

    const [hospitalName, setHospitalName] = useState('')

    useEffect(() => {
        console.log('first mounting')
        const Data = localStorage.getItem('HospitalName')
        setHospitalName(Data)
    }, [])

    console.log('hospitalName', hospitalName)
    return (
        <div className="div">
            <Header />
            <div className="div" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', height: "60em" }}>
                <div className="row">
                    <div className="hospitalName mt-3">
                        {/* <label htmlFor="">{hospitalName}</label> */}
                    </div>
                </div>
                <div className="mainContainer " style={{ margin: '2%' }}>
                    <h5 className=""><strong>{hospitalName} Hospital</strong></h5>
                    <PatientView />
                    {/* <DoctorView/> */}
                    {/* {hospitalData.map((data, index) => {
                        return (
                            <a href="">{data.name}</a>
                        )
                    })} */}
                    {/* <DoctorView /> */}
                </div>
            </div>
        </div>
    )
}

export default TaskDashboard
import React from 'react'
import Tabs from './Tabs'

function SettingsView() {
    return (
        <div className="viewPage">
            <div className="addPatient navbar-light mt-3" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                <div className="row" >
                   <div className="col-md-12">
                        <Tabs />
                   </div>
                </div>
                <div className="row">
                   
                </div>

            </div>
        </div>
    )
}

export default SettingsView
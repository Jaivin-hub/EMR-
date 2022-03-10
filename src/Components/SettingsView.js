import React from 'react'
import SettingsTabs from './SettingsTabs'
import Tabs from './Tabs'
import { IoArrowBackOutline } from 'react-icons/io5'

function SettingsView({changeContentHandler}) {
    return (
        <div className="viewPage">
            <IoArrowBackOutline onClick={() => { changeContentHandler('Appointments') }} cursor='pointer' size={25} />
            <div className="addPatient navbar-light mt-5" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                <div className="row" >
                    <div className="col-md-12 ">
                        {/* <Tabs /> */}
                        <SettingsTabs />
                    </div>
                </div>
                <div className="row">

                </div>

            </div>
        </div>
    )
}

export default SettingsView
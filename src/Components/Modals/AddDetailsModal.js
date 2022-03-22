import React from 'react'
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import {faCoffee} from "@fontawesome/free"
import { FcManager, FcBusinessman } from 'react-icons/fc'
import { GiMedicines } from 'react-icons/gi'
import { ImLab } from 'react-icons/im'
import { GiLevelEndFlag } from 'react-icons/gi'


function AddDetailsModal({ changeContentHandler, setShowAddDetailsModal }) {
    const pathname = window.location.pathname
    return (
        <div className="absolute top-40 shadow-md p-8 bg-white w-full max-w-xs rounded-md" style={{ zIndex: 10001 }}>
            {pathname == '/project/emr/hospitallisting' ?

                <div className=" cursor-pointer text-gray-500 d-flex " onClick={() => {
                    changeContentHandler('Add Doctor')
                    setShowAddDetailsModal(false)
                }}>
                    <div className="col-md-2 ">
                        <FcBusinessman size={20} />
                    </div>
                    <div className="col-md-7 space-x-2 d-flex font-bold">
                        Add Doctor
                    </div>
                    <div className="col-md-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                : pathname == '/project/emr/MedicineListing' ?
                    <div className="font-bold text-gray-500 cursor-pointer mt-2 d-flex"
                        onClick={() => {
                            changeContentHandler('Add Medicines')
                            setShowAddDetailsModal(false)
                        }}>
                        <div className="col-md-2 ">
                            <GiMedicines size={20} />
                        </div>
                        <div className="col-md-7 d-flex font-bold">
                            Add Medicines
                        </div>
                        <div className="col-md-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    :
                    <div className="font-bold text-gray-500 cursor-pointer mt-2 d-flex"
                        onClick={() => {
                            changeContentHandler('Add Patients')
                            setShowAddDetailsModal(false)
                        }}>
                        <div className="col-md-2 ">
                            <FcManager size={20} />
                        </div>
                        <div className="col-md-7 d-flex font-bold">
                            Add Patients
                        </div>
                        <div className="col-md-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
            }


            {/* <div className="font-bold text-gray-500 cursor-pointer mt-2 d-flex" onClick={() => { changeContentHandler('Add Lab Procedures') }}>
                <div className="col-md-2 ">
                    <ImLab size={20} />
                </div>
                <div className="col-md-7 d-flex font-bold">
                    LabProcedures
                </div>
                <div className="col-md-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div> */}
            {/* <div className="font-bold text-gray-500 cursor-pointer mt-2 d-flex"
                onClick={() => {
                    changeContentHandler('dosage')
                    setShowAddDetailsModal(false)
                }}>
                <div className="col-md-2 ">
                    <GiLevelEndFlag size={20} />
                </div>
                <div className="col-md-7 d-flex font-bold">
                    Add Dosage
                </div>
                <div className="col-md-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div> */}
        </div>
    )
}

export default AddDetailsModal
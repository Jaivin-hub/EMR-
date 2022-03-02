import React from 'react'


function AddDetailsModal({ changeContentHandler, setShowAddDetailsModal }) {

    return (
        <div class="absolute shadow-md p-8 bg-white w-full max-w-xs m-auto flex-col flex">
            <div className=" cursor-pointer text-gray-500 d-flex " onClick={() => {
                changeContentHandler('Add Doctor')
                setShowAddDetailsModal(false)
            }}>
                <div className="col-md-9 font-bold">
                <i className="fa-solid fa-user-doctor"></i>
                    Add Doctor
                </div>
                <div className="col-md-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="font-bold text-gray-500 cursor-pointer mt-2 d-flex"
                onClick={() => {
                    changeContentHandler('Add Patients')
                    setShowAddDetailsModal(false)
                }}>
                <div className="col-md-9 font-bold">
                    Add Patients
                </div>
                <div className="col-md-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="font-bold text-gray-500 cursor-pointer mt-2 d-flex" onClick={() => { changeContentHandler('Add Medicines') }}>
                <div className="col-md-9 font-bold">
                    Add Medicines
                </div>
                <div className="col-md-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="font-bold text-gray-500 cursor-pointer mt-2 d-flex" onClick={() => { changeContentHandler('Add Lab Procedures') }}>
                <div className="col-md-9 font-bold">
                    Add Lab Procedures
                </div>
                <div className="col-md-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default AddDetailsModal
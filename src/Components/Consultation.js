import React, { useState, useEffect, useRef } from 'react'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import instance from '../config/api';
import Tabs from './Tabs'
import { BsFillMicFill, BsFillMicMuteFill, BsArrowRightShort } from 'react-icons/bs'
import PrimaryAnalysisModal from './Modals/PrimaryAnalysisModal';
import { useReactMediaRecorder } from "react-media-recorder";
import { useReactToPrint } from "react-to-print";
import { GrDocumentPdf } from 'react-icons/gr'
import { useVoiceRecorder } from "use-voice-recorder";
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder'
import { MdPauseCircleFilled } from 'react-icons/md'
import { GrResume } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom';
import SuccessModal from './Modals/SuccessModal';
import { IoMdArrowRoundBack } from 'react-icons/io'




function Consultation() {
    const navigate = useNavigate();
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })
    const hospitalId = localStorage.getItem('HospitalId')
    const state = useLocation()
    const referDoctorId = state.state[0]._doc_id._id
    const appointmentId = state.state[0]._id
    const patientFirstName = state.state[0]._pat_id.p_firstname
    const patientLastName = state.state[0]._pat_id.p_lastname
    const patientAdhar = state.state[0]._pat_id.aadhar_card_no
    const patientBloodGroup = state.state[0]._pat_id.p_bloodgroup
    const patientDOB = state.state[0]._pat_id.p_dob
    const patientId = state.state[0]._pat_id._id
    const patientPhone = state.state[0]._pat_id.p_phoneno

    // const patientId = state.state
    const [diabetesChecked, setDiabetesChecked] = useState('')
    const [bpChecked, setBpChecked] = useState('')
    const [patientHeight, setPatientHeight] = useState('')
    const [patientWeight, setPatientWeight] = useState('')
    const [patientFasting, setPatientFasting] = useState('')
    const [patientAfterFood, setPatientAfterFood] = useState('')
    const [patientLowerValue, setPatientLowerValue] = useState('')
    const [patientUpperValue, setPatientUpperValue] = useState('')
    const [patientAllergicFood, setPatientAllergicFood] = useState('')
    const [patientAllergicMedicine, setPatientAllergicMedicine] = useState('')
    const [showPrimaryAnalysisDetails, setShowPrimaryAnalysisDetails] = useState(true)
    const [showPrimaryAnalysis, setShowPrimaryAnalysis] = useState(false)
    const [reload, setReload] = useState(true)
    const [toggleMic, setToggleMic] = useState(true)
    const [showStatus, setShowStatus] = useState(false)
    const [records, updateRecords] = useState([]);
    const [showAddPrimaryAnalysis, setShowAddPrimaryAnalysis] = useState(false)
    const { isRecording, stop, start } = useVoiceRecorder((data) => {
        updateRecords([...records, window.URL.createObjectURL(data)]);
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false)


    const {
        audioResult,
        timer,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        status,
        errorMessage
    } = useAudioRecorder()


    const fetchPatientPrimaryAnalysis = () => {
        const obj = {
            _hos_id: hospitalId,
            _pat_id: patientId
        }

        instance.post('list_patient_primary_analysis', obj).then((response) => {
            console.log('res', response)
            if (response == undefined || response.data.patientAnalysis?.length == 0) {
                setShowPrimaryAnalysisDetails(false)
            } else {
                setShowPrimaryAnalysisDetails(true)
                console.log('else case')
                const data = response?.data.patientAnalysis[0]
                setPatientHeight(data.height)
                setPatientWeight(data.weight)
                if (data.diabetes == true) {
                    setDiabetesChecked("Yes")
                } else {
                    setDiabetesChecked("No")
                }
                setPatientFasting(data.fasting)
                setPatientAfterFood(data.after_food)
                if (data.bp == true) {
                    setBpChecked('Yes')
                } else {
                    setBpChecked('No')
                }
                setPatientLowerValue(data.lower_value)
                setPatientUpperValue(data.upper_value)
                setPatientAllergicFood(data.allergic_food)
                setPatientAllergicMedicine(data.allergic_medicine)
            }
        })
    }

    const primaryAnalysisHandler = () => {
        setShowPrimaryAnalysis(true)
    }

    useEffect(() => {
        console.log('mounting')
        fetchPatientPrimaryAnalysis()
    }, [reload])

    const backButtonHandler = () => {
        navigate('/taskDashboard')
    }

    // const {
    //     status,
    //     startRecording,
    //     stopRecording,
    //     mediaBlobUrl,
    // } = useReactMediaRecorder({ audio: true });

    const handleStartRecording = () => {
        startRecording()
        setToggleMic(false)
        setShowStatus(true)
    }

    const handleStopRecording = () => {
        stopRecording()
        setToggleMic(true)
        setShowStatus(false)
    }

    const navigateHandler = () => {
        navigate('/patientHistory');
    }

    return (
        <div ref={componentRef}>
            <Header />
            <div className="row m-3">
                <div className="col-md-12">
                    <IoMdArrowRoundBack onClick={backButtonHandler} size={20} cursor='pointer' />
                </div>
            </div>
            <div className="navbar-light  m-5 bg-white shadow-md">

                <div className="row ">
                    <div className="col-md-12">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Name : {patientFirstName + " " + patientLastName}</TableCell>
                                        <TableCell >Adhar No : {patientAdhar}</TableCell>
                                        <TableCell >Age : {patientDOB}</TableCell>
                                        <TableCell >Blood Group : {patientBloodGroup}</TableCell>
                                        <TableCell >Contact No1 : {patientPhone}</TableCell>
                                        <TableCell >
                                            <button type="button" className="inline-block px-6 py-2 border-2 
                                          border-gray-800 text-gray-800 font-medium text-xs leading-tight 
                                            uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none 
                                            focus:ring-0 transition duration-150 ease-in-out d-flex"
                                                onClick={navigateHandler} >History<BsArrowRightShort /></button>
                                        </TableCell>
                                        <TableCell >
                                            <button type="button" class="inline-block px-6 py-2 border-2 
                                          border-gray-800 text-gray-800 font-medium text-xs leading-tight 
                                            uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none 
                                            focus:ring-0 transition duration-150 ease-in-out"
                                                onClick={handlePrint}><GrDocumentPdf size={25} /></button>
                                        </TableCell>

                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <div className="navbar-light  m-5 bg-white shadow-md">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                        {showPrimaryAnalysisDetails ?
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >Height</TableCell>
                                            <TableCell >Weight</TableCell>
                                            <TableCell >Diabetes</TableCell>
                                            <TableCell >Fasting</TableCell>
                                            <TableCell >AfterFood</TableCell>
                                            <TableCell >Bp</TableCell>
                                            <TableCell >Lower Value</TableCell>
                                            <TableCell >Upper Value</TableCell>
                                            <TableCell >Allergic Food</TableCell>
                                            <TableCell >Allergic Medicine</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {patientHeight}
                                            </TableCell>
                                            <TableCell >{patientWeight}</TableCell>
                                            <TableCell >{diabetesChecked}</TableCell>
                                            <TableCell >{patientFasting}</TableCell>
                                            <TableCell >{patientAfterFood}</TableCell>
                                            <TableCell >{bpChecked}</TableCell>
                                            <TableCell >{patientLowerValue}</TableCell>
                                            <TableCell >{patientUpperValue}</TableCell>
                                            <TableCell >{patientAllergicFood}</TableCell>
                                            <TableCell >{patientAllergicMedicine}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            :
                            <button type="button" className="inline-block px-6 py-2 
                         border-2 border-blue-400 text-blue-400 font-medium 
                         text-xs leading-tight uppercase rounded hover:bg-black 
                         hover:bg-opacity-5 focus:outline-none focus:ring-0 transition 
                         duration-150 ease-in-out h-16" onClick={primaryAnalysisHandler}>Add Primary Analysis</button>
                        }

                    </div>
                </div>
                {showPrimaryAnalysis ?
                    <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                        <PrimaryAnalysisModal patientId={patientId} setReload={setReload} reload={reload} setShowPrimaryAnalysis={setShowPrimaryAnalysis} />
                    </div>
                    : null}
            </div>
            <div className="row space-x-3 m-5">
                <textarea className='border-2 rounded-md' placeholder="Doctor note..." name="" id="" cols="50" rows="2"></textarea>
                <input type="text" placeholder="" className='border-2 rounded-md' />
                <div>
                    {/* <div>
                        <h3>On air: {isRecording ? 'on' : 'off'}</h3>
                        <button onClick={start}>Start</button>
                        <button onClick={stop}>Stop</button>
                    </div> */}
                    <div>

                    </div>
                </div>
                {status == "idle" ?
                    <BsFillMicFill cursor='pointer' onClick={startRecording} className='mt-3' size={30} />
                    :
                    <>
                        <p className='mt-4'>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>
                        <MdPauseCircleFilled cursor='pointer' onClick={pauseRecording} className='mt-3' size={30} />
                        <GrResume cursor='pointer' onClick={resumeRecording} className='mt-3' size={30} />
                        <BsFillMicMuteFill cursor='pointer' onClick={stopRecording} className='mt-3' size={30} />
                    </>
                }
                {audioResult ?
                    <audio controls src={audioResult} />
                    : null}
                {/* {records.map((data, idx) => (
                    <div key={idx} className='pt-3'>
                        <audio src={data} controls preload={'metadata'} />
                    </div>
                ))} */}
            </div>
            <div className="navbar-light  m-5 bg-white shadow-md">
                <label className="font-bold underline "></label>
                <div className="row">
                    <div className="col-md-12">
                        <Tabs setShowSuccessModal={setShowSuccessModal} patientId={patientId} referDoctorId={referDoctorId} appointmentId={appointmentId} />
                    </div>
                </div>
            </div>
            {showSuccessModal ?
                <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                    <SuccessModal />
                </div>
                : null}
        </div>
    )
}

export default Consultation
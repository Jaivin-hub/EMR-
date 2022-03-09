import React, { useEffect, useState, useRef, forwardRef } from 'react'
import PatientView from '.././PatientView'
import '../.././assets/css/dashboard.css'
import DoctorView from '.././DoctorView'
import Header from '.././Header'
import datePickerImg from '../../assets/imgs/image 8.png'
import Dropdown from 'react-dropdown';
import { TextField, Button, IconButton, Remove } from '@mui/material'
import 'react-dropdown/style.css';
import HospitalView from '.././HospitalView'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import uploadImg from '../../assets/imgs/image 7.png'
import instance from '../../config/api'
import { useNavigate } from 'react-router-dom';
import HospitalListingTable from '../hospitalListingTable'
import AddHospitalModal from './AddHospitalModal'
import MaterialTable from 'material-table';

import { Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import SearchPage from '../SearchPage'
import Pagenation from '../Pagenation'


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))



function TaskDashboard() {

    const [reload, setReload] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)
    const [hospitalList, setHospitalList] = useState([])



    const [hospitalData, setHospitalData] = useState({})
    const [searchTerm, setSearchTerm] = useState('')

    // file upload 
    const [pickedFile, setPickedFile] = useState(null)
    const [preview, setPreview] = useState('');
    const [size, setSize] = useState(null)

    const inputChangeHandler = (e) => {
        const id = e.target.id
        const value = e.target.value
        const newData = { ...hospitalData }
        newData[id] = value
        setHospitalData(newData)
    }
    const columns = [
        { title: 'Hospital Name', field: 'name' },
        { title: 'State', field: 'state' },
        { title: 'City', field: 'city' },
        { title: 'Contact No', field: 'contact_1' },
        { title: 'Contact No2', field: 'contact_2' },
        
    ]

    const fileSelectorHandler = (e) => {
        setPickedFile(e.target.files[0]);
        let size = document.getElementById('fileInput').files[0].size;
        setSize(size);
    };

    const fileUploader = async () => {
        const params = new FormData();
        params.append('files', pickedFile);
        console.log(params.file)
        // params.append('id', task._id);

        // await ApiHelper.post(API.uploadDocuments, params)
        //     .then((resData) => {
        //         setPickedFile(null);
        //         // getTaskDetailsById(task._id);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    useEffect(() => {
        if (pickedFile) {
            if (size > 52428800) {
                alert('Sorry the chosen File size exceedes permissible range');
            } else {
                const read = new FileReader();
                read.onloadend = () => {
                    setPreview(read.result);
                };
                read.readAsDataURL(pickedFile);
                fileUploader();
            }
            setPreview(null);
            setPickedFile(null);
        }
    }, [pickedFile]);


    useEffect(() => {
        instance.post('/list_hospital').then((res) => {
            setHospitalList(res.data.hospital)
        }).catch((err) => {
            console.log('error:', err)
        })
    }, [reload])

    const addHospitalHandler = () => {
        console.log('handle clicked')
        setOpenModal(true)
    }

    //Get current lists

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = hospitalList.slice(indexOfFirstPost, indexOfLastPost);

    // Change page 

    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <div className="div h-screen w-screen fixed">
            <Header />
            <div className="div" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)'}}>
                <div className="row">
                    <div className="hospitalName mt-3">
                    </div>
                </div>
                <div className="mainContainer " style={{ margin: '2%' }}>
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className=""><strong> Hospitals</strong></h5>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6">
                           
                        </div>
                        <div className="col-md-6">
                        <div className="row ">
                                <Button onClick={addHospitalHandler}>Add hospital</Button>
                            </div>
                        </div>
                    </div>
                    {hospitalList?.length >= 1 ?
                             <div className="mt-5">
                             <MaterialTable
                                 options={{ searchAutoFocus: true, paginationType: 'stepped', exportButton: true, exportAllData: true, exportFileName: "MEDDBOT" }}
                                 className="mt-5" columns={columns} data={hospitalList} title='Hospital Details'
                             />
                         </div>

                        // <div className="addPatient navbar-light mt-2" style={{ backgroundColor: "#FFFFFF", border: '', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
                        //     <div className="row pt-4 " >

                        //     </div>
                        //     <div className="row">
                        //         <div className="col-md-12">
                        //             <HospitalListingTable searchTerm={searchTerm} List={currentPosts} />
                        //             <Pagenation postsPerPage={postsPerPage} totalPosts={hospitalList?.length} paginate={paginate} />
                        //         </div>

                        //     </div>
                        // </div>
                        : null}
                    {openModal ?
                        <div className="centered loginWrapper d-flex justify-content-center align-items-center">
                            <AddHospitalModal setOpenModal={setOpenModal} setReload={setReload} reload={reload} />
                        </div>
                        : null}
                </div>

            </div>

        </div>
    )
}

export default TaskDashboard
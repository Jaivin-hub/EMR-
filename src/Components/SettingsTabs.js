import { useState, useEffect, useRef } from "react";
import '../assets/css/tabs.css'
import { MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import { TextField, Button, IconButton, Remove } from '@mui/material'
import instance from "../config/api";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchableDropdown from "./dropdown/SearchableDropdown";
import "../assets/css/searchableDropdown.css"
import Select from 'react-select';
import MaterialTable from "material-table";
// import Select from 'react-dropdown-select';
// import { useReactToPrint } from "react-to-print";


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))


function SettingsTabs({ patientId }) {
    const hospitalId = localStorage.getItem('HospitalId')
    const [toggleState, setToggleState] = useState(1);
    const [dosage, setDosage] = useState('')
    const [dosageErr, setDosageErr] = useState('')
    const [selectedDosageList,setSelectedDosageList] = useState([])

    const columns = [
        { title: 'Dosage', field: 'dosage' },
    ]


    const toggleTab = (index) => {
        setToggleState(index);
    };

    const changeDosageHandler = (e) => {
        setDosage(e.target.value)
    }
    console.log(dosage)

    const dosageSubmitHandler = () => {
        if (!dosage == "") {
            setDosageErr('')
            const obj = {
                _hos_id: hospitalId,
                dosage: dosage,
                isActive: true
            }
            instance.post('/add_dosage', obj).then((res) => {
                console.log(res)
                setDosage('')
            })
        } else {
            setDosageErr('connot be empty!')
        }

    }

    const fetchDosageList = () => {
        const obj = {
            _hos_id: hospitalId,
            isActive: true
        }
        instance.post('/list_dosage', obj).then((res) => {
            const dosageList = res?.data.dosage
            // let val = []
            // dosageList?.map((item, i) => {
            //     const data = { value: item.dosage, label: item.dosage }
            //     val.push(data)
            // })
            setSelectedDosageList(dosageList.reverse())
        })
    }

    useEffect(() => {
        fetchDosageList()
    }, [])

    return (
        <div className="">

            <div className="bloc-tabs ">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    Dosage
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    Investigation
                </button>
                <button
                    className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(4)}
                >
                    Stock
                </button>
            </div>

            <div className="content-tabs" >
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    <h4 className="underline">Add Dosage</h4>
                    <div className=" mt-3 d-flex">
                        <div className="col-md-6">
                            <div className="row  d-flex">

                                <div className="col-md-6 space-x-5 ">
                                    <input onChange={changeDosageHandler} className="border-2 h-10 rounded-md" type="text" />
                                    <button type="button" className="inline-block px-6 py-2.5 
                    bg-blue-400 text-white font-medium text-xs leading-tight 
                    uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg 
                    focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 
                    active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                        onClick={dosageSubmitHandler}
                                    >Add</button>
                                <p className=" text-red-700">{dosageErr}</p>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="">
                                        <MaterialTable options={{ searchAutoFocus: true, paginationType: 'stepped', exportButton: true, exportAllData: true, exportFileName: "MEDDBOT" }}
                                            className="mt-5" columns={columns} data={selectedDosageList} title='Dosage' />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <h2>Content 2</h2>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
                        voluptatum qui adipisci.
                    </p>
                </div>

                <div className={toggleState === 4 ? "content  active-content" : "content"}>

                </div>
                <div className={toggleState === 5 ? "content  active-content" : "content"}>
                    <h2>Content 5</h2>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
                        nostrum rerum laudantium totam unde adipisci incidunt modi alias!
                        Accusamus in quia odit aspernatur provident et ad vel distinctio
                        recusandae totam quidem repudiandae omnis veritatis nostrum
                        laboriosam architecto optio rem, dignissimos voluptatum beatae
                        aperiam voluptatem atque. Beatae rerum dolores sunt.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SettingsTabs;
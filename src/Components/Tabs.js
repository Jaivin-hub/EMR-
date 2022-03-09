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
// import Select from 'react-select';
import Select from 'react-dropdown-select';
// import { useReactToPrint } from "react-to-print";


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))


function Tabs() {
    // const componentRef = useRef()
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    // })
    const classes = useStyles()

    const [toggleState, setToggleState] = useState(1);
    const [medicineName, setMedicineName] = useState('')
    const [scientificName, setScientificName] = useState('')
    const [medicineType, setMedicineType] = useState('')
    const hospitalId = localStorage.getItem('HospitalId')
    const [medicineList, setMedicineList] = useState([])
    const [reload, setreload] = useState(false)
    let [inputFields, setInputFields] = useState([
        { medicineName: '', Sname: '', type: '', Dosage: '', Duration: '', qty: '', comments: '' },
    ])
    const [selectedMedicineName, setSelectedMedicineName] = useState('')
    const [medicineScientificName, setMedicineScientificName] = useState('')
    const [selectedMedicineType, setSelectedMedicineType] = useState('')
    const [selectedList, setSelectedList] = useState([])

    useEffect(() => {
        fetchMedicineList()
    }, [reload])

    const fetchMedicineList = () => {
        const obj = {
            _hos_id: hospitalId,
            isActive: true
        }
        instance.post('/list_medicine', obj).then((res) => {
            setMedicineList(res?.data.medicines)
            const medNameList = []
            res?.data.medicines.map((item, index) => {
                const value = { value: index, label: item.med_name }
                medNameList.push(value)
            })
            setSelectedList(medNameList)
        }).catch((err) => {
            console.log('error', err)
        })
    }


    const toggleTab = (index) => {
        setToggleState(index);
    };

    const medType = ['Tablet', 'Syrap', 'Oilment', 'Tonic', 'Powder']


    const selectMedTypeHandler = (e) => {
        setMedicineType(e.target.value)
    }


    const submitHandler = (e) => {
        const obj = {
            _hos_id: hospitalId,
            med_name: medicineName,
            s_med_name: scientificName,
            med_type: medicineType,
            IsActive: 'true'
        }
        instance.post('/add_medicine', obj).then((res) => {
            if (res) {
                setreload(!reload)
            }
        }).catch((err) => {
            console.log('error', err)
        })
    }

    // #################### Validating Name! ###########################

    const [medicineNameErr, setMedicineNameErr] = useState('')


    const medicineNameInputBlurHandler = (medicineName, setMedicineNameErr) => {
        if (medicineName === '') {
            setMedicineNameErr('This field cannot be empty!')
            return false
        } else if (medicineName.slice(-1) === ' ') {
            setMedicineNameErr('should not end with space.')
            return false
        } else {
            setMedicineNameErr('')
            return true
        }
    }


    const medicineNameInputChangeHandler = (medicineName, setMedicineNameErr) => {
        if (medicineName.length === 0) {
            setMedicineNameErr('This field cannot be empty!')
            return false
        } else if (medicineName.charAt(0) === ' ') {
            setMedicineNameErr('should not start with space.')
            return false
        } else if (medicineName.includes('  ')) {
            setMedicineNameErr('should not contain consecutive spaces.')
            return false
        } else if (medicineName === '') {
            setMedicineNameErr('This field cannot be empty!')
            return false
        } else if (medicineName.slice(-1) === ' ') {
            setMedicineNameErr('should not end with space.')
            return false
        } else {
            setMedicineNameErr('')
            return true
        }
    }

    // #################### Validating Name! ###########################

    // #################### Validating ScientificName! ###########################

    const [scientificNameErr, setScientificNameErr] = useState('')


    const scientificNameInputBlurHandler = (scientificName, setScientificNameErr) => {
        if (scientificName === '') {
            setScientificNameErr('This field cannot be empty!')
            return false
        } else if (scientificName.slice(-1) === ' ') {
            setScientificNameErr('should not end with space.')
            return false
        } else {
            setScientificNameErr('')
            return true
        }
    }


    const scientificNameInputChangeHandler = (scientificName, setScientificNameErr) => {
        if (scientificName.length === 0) {
            setScientificNameErr('This field cannot be empty!')
            return false
        } else if (scientificName.charAt(0) === ' ') {
            setScientificNameErr('should not start with space.')
            return false
        } else if (scientificName.includes('  ')) {
            setScientificNameErr('should not contain consecutive spaces.')
            return false
        } else if (scientificName === '') {
            setScientificNameErr('This field cannot be empty!')
            return false
        } else if (scientificName.slice(-1) === ' ') {
            setScientificNameErr('should not end with space.')
            return false
        } else {
            setScientificNameErr('')
            return true
        }
    }

    // #################### Validating ScientificName! ###########################

    const addInputFieldHandler = () => {
        setInputFields([...inputFields, { medicineName: '', Sname: '', type: '', Dosage: '', Duration: '', qty: '', comments: '' }])
    }

    const removeInputFieldHandler = (index, value) => {
        console.log(value)
        // const newData = [...inputFields]
        // newData[index]['Sname'] = ""
        // newData[index]['type'] = ""
        // newData[index]['medicineName'] = ""
        const newData = [...inputFields]
        newData.splice(index, 1)
        setInputFields(newData)
        setreload(!reload)
    }

    const medNameHandler = (opt, index) => {
        const data = opt[0]?.label

        medicineList?.map((item, i) => {
            if (item.med_name == data) {
                const newData = [...inputFields]
                newData[index]['Sname'] = item.s_med_name
                newData[index]['type'] = item.med_type
                // newData[index]['medicineName'] = item.med_name
                newData[index]['medicineName'] = { value: item.med_name, label: item.med_name }

                setreload(!reload)
                // setSelectedMedicineName(item.med_name)
                // setMedicineScientificName(item.s_med_name)
                // setSelectedMedicineType(item.med_type)
            }
        })
    }

    console.log('inputFields', inputFields)

    return (
        <div className="">

            <div className="bloc-tabs ">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    Prescription
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

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell >SI No</TableCell>
                                    <TableCell >Medicine Name</TableCell>
                                    <TableCell >Pharmacological Name</TableCell>
                                    <TableCell >Type</TableCell>
                                    <TableCell >Dosage</TableCell>
                                    <TableCell >Duration</TableCell>
                                    <TableCell >Oty</TableCell>
                                    <TableCell >Comments</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inputFields.map((value, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="">
                                                <Select
                                                    // multi
                                                    defaultValue="standard"
                                                    options={selectedList}
                                                    onChange={(values) => medNameHandler(values, index)}
                                                />
                                                {/* <Select
                                                    id="medicineName"
                                                    style={{ width: '100%' }}
                                                    defaultInputValue={value.medicineName}
                                                    options={selectedList}
                                                    onChange={(opt) => { medNameHandler(opt, index) }}
                                                /> */}
                                                {/* <SearchableDropdown
                                                    setSelectedMedicineName={setSelectedMedicineName}
                                                    setMedicineScientificName={setMedicineScientificName}
                                                    setSelectedMedicineType={setSelectedMedicineType}
                                                    List={medicineList}
                                                /> */}
                                                {/* <input type="text" className='border-2' /> */}
                                            </TableCell>
                                            <TableCell className='dropdown'>
                                                <input type="text" value={value.Sname} className='border-2 w-40 h-10' />
                                            </TableCell>
                                            <TableCell className=''>
                                                <input type="text" value={value.type} className='border-2 w-40 h-10' />
                                            </TableCell>
                                            <TableCell >
                                                <input type="text" className='border-2 h-10' />
                                            </TableCell>
                                            <TableCell className="space-x-2 ">
                                                <div className="d-flex">
                                                    <input type="text" className='border-2 w-16 h-10' />
                                                    <input type="text" className='border-2 w-32 h-10' />
                                                </div>
                                            </TableCell>
                                            <TableCell >
                                                <input type="text" className='border-2 h-10' />
                                            </TableCell>
                                            <TableCell >
                                                <div className="d-flex">
                                                    <textarea className="border-2" name="" id="" cols="30" rows="2"></textarea>
                                                    {(inputFields.length - 1 === index) ?
                                                        (<button type="button"
                                                            className="inline-block
                                                            rounded-sm bg-blue-300 text-white
                                                            leading-normal uppercase shadow-md hover:bg-blue-400
                                                            hover:shadow-lg focus:bg-blue-400 focus:shadow-lg
                                                            focus:outline-none focus:ring-0 active:bg-blue-600
                                                            active:shadow-lg transition duration-150 ease-in-out w-7 h-7 mt-2 ml-2"
                                                            onClick={addInputFieldHandler}>
                                                            +
                                                        </button>)
                                                        :
                                                        (<button type="button"
                                                            className="inline-block
                                                            rounded-sm bg-red-400 text-white
                                                            leading-normal uppercase shadow-md hover:bg-red-400
                                                            hover:shadow-lg focus:bg-red-400 focus:shadow-lg
                                                            focus:outline-none focus:ring-0 active:bg-red-600
                                                            active:shadow-lg transition duration-150 ease-in-out w-7 h-7 mt-2 ml-2"
                                                            onClick={() => { removeInputFieldHandler(index, value) }}>
                                                            -
                                                        </button>)}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="d-flex mt-3 justify-content-end space-x-5">
                        <button type="button" className="inline-block px-6 py-2.5 
                    bg-red-400 text-white font-medium text-xs leading-tight 
                    uppercase rounded shadow-md hover:bg-red-500 hover:shadow-lg 
                    focus:bg-red-500 focus:shadow-lg focus:outline-none focus:ring-0 
                    active:bg-red-600 active:shadow-lg transition duration-150 ease-in-out">Cancel</button>
                        <button type="button" className="inline-block px-6 py-2.5 
                    bg-blue-400 text-white font-medium text-xs leading-tight 
                    uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg 
                    focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 
                    active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">Save</button>
                    </div>
                </div>
                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    {/* <h2>Content 2</h2>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
                        voluptatum qui adipisci.
                    </p> */}
                </div>

                {/* <div className={toggleState === 3 ? "content  active-content" : "content"} >
                    <h4><strong>Medicine details</strong></h4>
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-3">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel>Select Medicine Type</InputLabel>
                                        <Select onChange={selectMedTypeHandler}>
                                            {medType?.map((item, index) => {
                                                return (
                                                    <MenuItem value={item} key={index}>{item}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-md-3">
                                    <TextField
                                        variant="standard"
                                        id=""
                                        onChange={(e) => {
                                            setMedicineName(e.target.value)
                                            medicineNameInputChangeHandler(e.target.value, setMedicineNameErr)
                                        }}
                                        onBlur={(e) => {
                                            medicineNameInputBlurHandler(e.target.value, setMedicineNameErr)
                                        }}
                                        label="Medicine name"
                                    />
                                    <p className="" style={{ color: "red" }}>{medicineNameErr}</p>
                                </div>
                                <div className="col-md-3">
                                    <TextField
                                        variant="standard"
                                        id=""
                                        onChange={(e) => {
                                            setScientificName(e.target.value)
                                            scientificNameInputChangeHandler(e.target.value, setScientificNameErr)
                                        }}
                                        onBlur={(e) => {
                                            scientificNameInputBlurHandler(e.target.value, setScientificNameErr)
                                        }}
                                        label="Scientific name"
                                    />
                                    <p className="" style={{ color: "red" }}>{scientificNameErr}</p>
                                </div>
                                <div className="col-md-3 mt-4">
                                    <Button className="btn btn-primary" onClick={submitHandler}>ADD</Button>


                                </div>
                            </div>
                        </div>
                        

                    </div>
                </div> */}
                <div className={toggleState === 4 ? "content  active-content" : "content"}>

                </div>
                <div className={toggleState === 5 ? "content  active-content" : "content"}>
                    {/* <h2>Content 5</h2>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
                        nostrum rerum laudantium totam unde adipisci incidunt modi alias!
                        Accusamus in quia odit aspernatur provident et ad vel distinctio
                        recusandae totam quidem repudiandae omnis veritatis nostrum
                        laboriosam architecto optio rem, dignissimos voluptatum beatae
                        aperiam voluptatem atque. Beatae rerum dolores sunt.
                    </p> */}
                </div>
            </div>
        </div>
    );
}

export default Tabs;
import { useState, useEffect } from "react";
import '../assets/css/tabs.css'
import { Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import { TextField, Button, IconButton, Remove } from '@mui/material'
import instance from "../config/api";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))


// {
//     "_hos_id":"620a4845db8b9874e8e7466c",
//     "IsActive":true
// }




function Tabs() {
    const classes = useStyles()

    const [toggleState, setToggleState] = useState(1);
    const [medicineName, setMedicineName] = useState('')
    const [scientificName, setScientificName] = useState('')
    const [medicineType, setMedicineType] = useState('')
    const hospitalId = localStorage.getItem('HospitalId')
    const [medicineList, setMedicineList] = useState([])
    const [reload, setreload] = useState(false)

    useEffect(() => {
        fetchMedicineList()
    }, [reload])

    const fetchMedicineList = () => {
        const obj = {
            _hos_id: hospitalId,
            IsActive: true
        }
        console.log(obj)
        instance.post('/list_medicine', obj).then((res) => {
            console.log('medicine response', res)
            setMedicineList(res?.data.medicines)
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
        console.log('handle clicked')
        instance.post('/add_medicine', obj).then((res) => {
            console.log('add medicine', res)
            if (res) {
                setreload(!reload)
            }
            console.log('response', res)
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



    return (
        <div className="">
            <div className="bloc-tabs">
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
                    Category
                </button>
                <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                >
                    Medicine
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
                    {/* <h2>Content 1</h2>
                    <hr />

                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-3">

                                    <input type="text" placeholder="Whight" />
                                </div>
                                <div className="col-md-9">
                                    <input type="text" placeholder="" />

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">

                                    <input type="text" placeholder="Height" />
                                </div>
                                <div className="col-md-9">
                                    <input type="text" placeholder="" />

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">

                        </div>

                    </div> */}
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    {/* <h2>Content 2</h2>
                    <hr />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
                        voluptatum qui adipisci.
                    </p> */}
                </div>

                <div className={toggleState === 3 ? "content  active-content" : "content"} >
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
                        <div className="col-md-6">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >med_name</TableCell>
                                            <TableCell >s_med_name</TableCell>
                                            <TableCell >med_type</TableCell>
                                            {/* <TableCell >Contact No</TableCell>
                                            <TableCell >Email ID</TableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {medicineList?.map((value, index) => (
                                            <TableRow
                                                key={index}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {value.med_name}
                                                </TableCell>
                                                <TableCell >{value.s_med_name}</TableCell>
                                                <TableCell >{value.med_type}</TableCell>
                                                {/* <TableCell >{value.doc_contact}</TableCell>
                                                <TableCell >{value.doc_email}</TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>

                    </div>
                </div>
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
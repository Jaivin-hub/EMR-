import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function HistoryMedicine({ setShowMedicines, selectedList }) {
    return (
        <div className="Modal_Container large-modal" >
            <div className="row  mobile-ls">
                <div className="col-md-8 ">
                    {/* <h4 className="underline"><strong>Add Patient</strong></h4> */}
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => { setShowMedicines(false) }} className="col-md-4  d-flex justify-content-end align-items-end">
                    <h4><i class="fa fa-window-close" aria-hidden="true"></i></h4>
                </div>
            </div>
            <div className="addPatient navbar-light " style={{ backgroundColor: "#FFFFFF", border: '' }}>
                <div className="row" >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell >SI No</TableCell>
                                    <TableCell >Medicine Name</TableCell>
                                    <TableCell >Pharmacological Name</TableCell>
                                    <TableCell >Medicine Type</TableCell>
                                    <TableCell >Dosage</TableCell>
                                    <TableCell >Duration</TableCell>
                                    <TableCell >Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            {selectedList?.map((item, index) => {
                                return (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {index + 1}.
                                        </TableCell>
                                        <TableCell >{item._med_id.med_name}</TableCell>
                                        <TableCell >{item._med_id.s_med_name}</TableCell>
                                        <TableCell >{item._med_id.med_type}</TableCell>
                                        <TableCell >{item.dosage}</TableCell>
                                        <TableCell >{item.days}</TableCell>
                                        <TableCell >{item.total_quantity}</TableCell>
                                    </TableRow>
                                )
                            })}
                            {/* // <Accordion style={{ width: '100%' }} className="space-x-5" defaultActiveKey={['0']} > */}
                            {/* // <Accordion.Item eventKey={i} onClick={() => { handleClick(item.priscriptionId) }}> */}

                            {/* // <Accordion.Header className="" > */}

                            {/* {primaryDetails?.map((item, i) => {
                                return (
                                    <>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    {i + 1}.
                                                </TableCell>
                                                <TableCell >{item.hId}</TableCell>
                                                <TableCell >{item.hPhone}</TableCell>
                                                <TableCell >{item.dName}</TableCell>
                                                <TableCell >{item.dPhone}</TableCell>
                                                <TableCell >{item.app_date}</TableCell>
                                                <TableCell >{item.app_time}</TableCell>
                                                <TableCell ><IoIosArrowForward /></TableCell>
                                            </TableRow>
                                        </TableBody>
                                        {selectedList?.map((item, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}.
                                                    </TableCell>
                                                    <TableCell >{item._med_id.med_name}</TableCell>
                                                    <TableCell >{item._med_id.s_med_name}</TableCell>
                                                    <TableCell >{item._med_id.med_type}</TableCell>
                                                    <TableCell >{item.dosage}</TableCell>
                                                    <TableCell >{item.days}</TableCell>
                                                    <TableCell >{item.total_quantity}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </>
                                )
                            })} */}
                        </Table>
                    </TableContainer>

                </div>
            </div>
        </div>
    )
}

export default HistoryMedicine
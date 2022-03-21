import React, { useState } from 'react'
import { TextField, Button, IconButton, Remove } from '@mui/material'
import instance from '../../config/api'
import { MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import Select from 'react-select';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';



const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))

function AddHospitalModal({ setOpenModal, setReload, reload }) {
    const classes = useStyles()
    const [country, setCountry] = useState('India')
    const [hospitalData, setHospitalData] = useState({})
    // const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
    //     'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
    //     'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    //     'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    //     'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']

    const states = [{ value: 'Andhra Pradesh', label: 'Andhra Pradesh' }, { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' }, { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' }, { value: 'Chhattisgarh', label: 'Chhattisgarh' }, { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' }, { value: 'Haryana', label: 'Haryana' }, { value: 'Himachal Pradesh', label: 'Himachal Pradesh' }, { value: 'Jharkhand', label: 'Jharkhand' }
        , { value: 'Karnataka', label: 'Karnataka' }, { value: 'Kerala', label: 'Kerala' }, { value: 'Madhya Pradesh', label: 'Madhya Pradesh' }
        , { value: 'Maharashtra', label: 'Maharashtra' }, { value: 'Manipur', label: 'Manipur' }, { value: 'Meghalaya', label: 'Meghalaya' }
        , { value: 'Mizoram', label: 'Mizoram' }, { value: 'Nagaland', label: 'Nagaland' }, { value: 'Odisha', label: 'Odisha' }, { value: 'Punjab', label: 'Punjab' }, { value: 'Rajasthan', label: 'Rajasthan' }
        , { value: 'Sikkim', label: 'Sikkim' }, { value: 'Tamil Nadu', label: 'Tamil Nadu' }, { value: 'Telangana', label: 'Telangana' }, { value: 'Tripura', label: 'Tripura' }, { value: 'Uttar Pradesh', label: 'Uttar Pradesh' }
        , { value: 'Uttarakhand', label: 'Uttarakhand' }, { value: 'West Bengal', label: 'West Bengal' }]
    const inputChangeHandler = (e) => {
        const id = e.target.id
        const value = e.target.value
        const newData = { ...hospitalData }
        newData[id] = value
        setHospitalData(newData)
    }



    // #################### Validating Name! ###########################

    const [firstName, setFirstName] = useState('')
    const [firstNameErr, setFirstNameErr] = useState('')


    const nameInputBlurHandler = (firstName, setFirstNameErr) => {
        if (firstName === '') {
            setFirstNameErr('This field cannot be empty!')
            return false
        } else {
            setFirstNameErr('')
            return true
        }
    }


    const nameInputChangeHandler = (firstName, setFirstNameErr) => {
        if (firstName.length === 0) {
            setFirstNameErr('This field cannot be empty!')
            return false
        } else if (firstName.charAt(0) === ' ') {
            setFirstNameErr('should not start with space.')
            return false
        } else if (firstName.includes('  ')) {
            setFirstNameErr('remove consecutive spaces.')
            return false
        } else if (/\d/.test(firstName)) {
            setFirstNameErr('should not contain numbers.')
            return false
        } else if (!firstName.match(/^[a-zA-Z ]+$/)) {
            setFirstNameErr('Invalid charecter!')
            return false
        } else if (firstName === '') {
            setFirstNameErr('This field cannot be empty!')
            return false
        } else {
            setFirstNameErr('')
            return true
        }
    }

    // #################### Validating Name! ###########################

    // #################### Validating Email! ###########################

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const emailInputBlurHandler = (email, setError) => {
        if (email === '') {
            setError('This field cannot be empty!')
            return false
        } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setError('This email id is not valid.')
            return false
        } else {
            setError('')
            return true
        }
    }
    const emailInputChangeHandler = (email, setError) => {
        if (email.includes(' ')) {
            setError('Email id should not contain space.')
            return false
        }
        else {
            setError('')
            return true
        }
    }

    // #################### Validating Email! ###########################

    //######################### Validating Password! ###########################

    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState('')


    const passwordInputBlurHandler = (password, setPasswordErr) => {
        if (password === '') {
            setPasswordErr('This field cannot be empty!')
            return false
        } else if (password.length < 5) {
            setPasswordErr('password should have atleast 5 charecters')
            return false
        } else if (password.length > 20) {
            setPasswordErr('password should not exceed 20 characters')
            return false
        } else {
            setPasswordErr('')
            return true
        }
    }

    const passwordInputChangeHandler = (password, setPasswordErr) => {
        if (password.length > 20) {
            setPasswordErr('password should not exceed 20 characters')
            return false
        } else {
            setPasswordErr('')
            return true
        }
    }

    // #################### Validating Password! ###########################

    //######################### Validating phone number! ###########################

    const [phone, setPhone] = useState('')
    const [phoneErr, setPhoneErr] = useState('')

    const phoneInputBlurHandler = (phone, setPhoneErr) => {
        if (phone === '') {
            setPhoneErr('This field cannot be empty!')
            return false
        } else if (phone.length < 10) {
            setPhoneErr('Phone number does not have 10 digits')
            return false
        } else if (phone.length > 10) {
            setPhoneErr('Phone number has more than 10 digits')
            return false
        } else {
            setPhoneErr('')
            return true
        }
    }

    const phoneInputChangeHandler = (phone, setPhoneErr) => {
        if (!phone.match(/^[0-9][-\s\./0-9]*$/g)) {
            setPhoneErr("Enter numbers only!");
            return false
        } else if (phone.length > 10) {
            setPhoneErr('Phone number has more than 10 digits')
            return false
        }
        else {
            setPhoneErr('')
            return true
        }
    }

    //######################### Validating phone number! ###########################

    //######################### Validating Postal Code! ###########################

    const [postalCode, setPostalCode] = useState('')
    const [postalErr, setPostalErr] = useState('')

    const postalCodeInputChangeHandler = (postalCode, setPostalErr) => {
        if (postalCode === '') {
            setPostalErr('This field cannot be empty!')
        } else if (!postalCode.match(/^[0-9]*$/g) && postalCode !== '') {
            setPostalErr('Enter numbers only!')
        } else if (postalCode.length > 6) {
            setPostalErr('postalCode should not have more than 6 digits')
        } else {
            setPostalErr('')
        }
    }

    const postalCodeInputBlurHandler = (postalCode, setPostalErr) => {
        if (postalCode === '') {
            setPostalErr('This field cannot be empty!')
        } else if (postalCode.length !== 6) {
            setPostalErr('Postal Code should have 6 digits')
        } else {
            setPostalErr('')
        }
    }

    //######################### Validating Postal Code! ###########################

    //######################### Validating secondary number! ###########################

    const [secondaryPhone, setSecondaryPhone] = useState('')
    const [secondaryPhoneErr, setSecondaryPhoneErr] = useState('')

    const secondaryPhoneInputBlurHandler = (secondaryPhone, setSecondaryPhoneErr) => {
        if (secondaryPhone === '') {
            setSecondaryPhoneErr('This field cannot be empty!')
            return false
        } else if (secondaryPhone.length < 10) {
            setSecondaryPhoneErr('Phone number does not have 10 digits')
            return false
        } else if (secondaryPhone.length > 10) {
            setSecondaryPhoneErr('Phone number has more than 10 digits')
            return false
        } else {
            setSecondaryPhoneErr('')
            return true
        }
    }

    const secondaryPhoneInputChangeHandler = (secondaryPhone, setSecondaryPhoneErr) => {
        if (!secondaryPhone.match(/^[0-9][-\s\./0-9]*$/g)) {
            setSecondaryPhoneErr("Enter numbers only!");
            return false
        } else if (secondaryPhone.length > 10) {
            setSecondaryPhoneErr('Phone number has more than 10 digits')
            return false
        }
        else {
            setSecondaryPhoneErr('')
            return true
        }
    }

    //######################### Validating secondary number! ###########################

    // #################### Validating City! ###########################

    const [city, setCity] = useState('')
    const [cityErr, setCityErr] = useState('')


    const cityInputBlurHandler = (city, setCityErr) => {
        if (city === '') {
            setCityErr('This field cannot be empty!')
            return false
        } else {
            setCityErr('')
            return true
        }
    }


    const cityInputChangeHandler = (city, setCityErr) => {
        if (city.length === 0) {
            setCityErr('This field cannot be empty!')
            return false
        } else if (city.charAt(0) === ' ') {
            setCityErr('should not start with space.')
            return false
        } else if (city.includes('  ')) {
            setCityErr('remove consecutive spaces.')
            return false
        } else if (/\d/.test(city)) {
            setCityErr('should not contain numbers.')
            return false
        } else if (!city.match(/^[a-zA-Z ]+$/)) {
            setCityErr('Invalid charecter!')
            return false
        } else if (city === '') {
            setCityErr('This field cannot be empty!')
            return false
        } else {
            setCityErr('')
            return true
        }
    }

    // #################### Validating City! ###########################

    // #################### Validating Address1! ###########################

    const [address1, setAddress1] = useState('')
    const [address1Err, setAddress1Err] = useState('')


    const address1InputBlurHandler = (address1, setAddress1Err) => {
        if (address1 === '') {
            setAddress1Err('This field cannot be empty!')
            return false
        } else {
            setAddress1Err('')
            return true
        }
    }


    const address1InputChangeHandler = (address1, setAddress1Err) => {
        if (address1.length === 0) {
            setAddress1Err('This field cannot be empty!')
            return false
        } else if (address1.charAt(0) === ' ') {
            setAddress1Err('should not start with space.')
            return false
        } else if (address1.includes('  ')) {
            setAddress1Err('remove consecutive spaces.')
            return false
        } else if (address1 === '') {
            setAddress1Err('This field cannot be empty!')
            return false
        } else {
            setAddress1Err('')
            return true
        }
    }

    // #################### Validating Address1! ###########################

    // #################### Validating Address1! ###########################

    const [address2, setAddress2] = useState('')
    const [address2Err, setAddress2Err] = useState('')


    const address2InputBlurHandler = (address2, setAddress2Err) => {
        if (!address2 === '') {
            setAddress2Err('')
            return true
        }
    }


    const address2InputChangeHandler = (address2, setAddress2Err) => {
        if (address2.charAt(0) === ' ') {
            setAddress2Err('should not start with space.')
            return false
        } else if (address2.includes('  ')) {
            setAddress2Err('remove consecutive spaces.')
            return false
        } else if (address2 === '') {
            setAddress2Err('This field cannot be empty!')
            return false
        } else {
            setAddress2Err('')
            return true
        }
    }

    // #################### Validating Address1! ###########################

    const [state, setState] = useState('')
    const [stateErr, setStateErr] = useState('')

    const dropDownHandler = (e) => {
        setState(e.target.value)
        setStateErr('')
    }

    const addHospitalSubmitHandler = () => {
        if (!firstName == "" && !email == "" && !country == "" && !state == "" && !postalCode == "" && !phone == "" && !secondaryPhone == "" && !password == "" && !city == "" && !address1 == "") {
            const obj = {
                name: firstName,
                email_id: email,
                password: password,
                address_1: address1,
                address_2: address2,
                city: city,
                state: state,
                country: country,
                pincode: postalCode,
                contact_1: phone,
                contact_2: secondaryPhone,
                logo: "logo.png"
            }

            instance.post("/add_hospital", obj).then((response) => {
                if (response) {
                    setOpenModal(false)
                    setReload(!reload)
                }
                // setValidateErr('')
                // console.log('response of hospital', response)
                if (response) {
                    // navigate('/registerSuccess');
                }
            }).catch((err) => {
                console.log('error', err)
            })
        } else {
            if (firstName == "") {
                setFirstNameErr('This field is required')
            }
            if (email == "") {
                setEmailError('This field is required')
            }
            if (state == "") {
                setStateErr('This field is required')
            }
            if (postalCode == "") {
                setPostalErr('This field is required')
            }
            if (phone == "") {
                setPhoneErr('This field is required')
            }
            if (secondaryPhone == "") {
                setSecondaryPhoneErr('This field is required')
            }
            if (password == "") {
                setPasswordErr('This field is required')
            }
            if (city == "") {
                setCityErr('This field is required')
            }
            if (address1 == "") {
                setAddress1Err('This field is required')
            }
            if (address2 == "") {
                setAddress2Err('This field is required')
            }
        }
    }

    const stateDropdownHandler = (value) => {
        console.log(value.label)
        setState(value.label)
        setStateErr('')
    }
    const [passwordType, setPasswordType] = useState('password')
    const [showEyeIcon, setShowEyeIcon] = useState(true)

    const changePasswordTypeHandler = (value) => {
        if (value == 'Text') {
            setPasswordType('Text')
            setShowEyeIcon(false)
        } else {
            setPasswordType('password')
            setShowEyeIcon(true)
        }
    }

    return (
        <div className="Modal_Container" style={{ maxWidth: '90%' }}>
            <div className="row">
                <div className="col-md-8 ">
                    <h4 className="underline"><strong>Add Hospitals</strong></h4>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => { setOpenModal(false) }} className="col-md-4  d-flex justify-content-end align-items-end">
                    <h4>x</h4>
                </div>
            </div>
            <div className="addPatient navbar-light " style={{ backgroundColor: "#FFFFFF", }}>
                <div className="row text-center">
                    <div className="col-md-2">
                        <div className="uploadDiv mt-5" style={{ width: '60%', marginLeft: '20%', borderRadius: '5px', border: '1px solid rgba(2, 152, 213, 0.56)' }}>
                            <img width="100%" height="" src='https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg' alt="" />
                            <label className="mt-3" style={{ color: '#0298D5' }}>Upload Logo</label>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-2">
                                Hospital details
                            </div>
                            <div className="col-md-10">
                                <hr />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id='Hospital_Name'
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                        nameInputChangeHandler(e.target.value, setFirstNameErr)
                                    }}
                                    onBlur={(e) => {
                                        nameInputBlurHandler(e.target.value, setFirstNameErr)
                                    }}
                                    label="Hospital Name"
                                />
                                <div className="row d-flex justify-content-center">
                                    <span style={{ color: "red" }}>{firstNameErr}</span>

                                </div>
                            </div>
                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id='Email_ID'
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        emailInputChangeHandler(e.target.value, setEmailError)
                                    }}
                                    onBlur={(e) => {
                                        emailInputBlurHandler(e.target.value, setEmailError)
                                    }}
                                    label="Email ID"
                                />
                                <div className="row d-flex justify-content-center">
                                    <span style={{ color: "red" }}>{emailError}</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id='Hospital_Address_1'
                                    onChange={(e) => {
                                        setAddress1(e.target.value)
                                        address1InputChangeHandler(e.target.value, setAddress1Err)
                                    }}

                                    onBlur={(e) => {
                                        address1InputBlurHandler(e.target.value, setAddress1Err)
                                    }}
                                    label="Hospital Address 1"
                                />
                                <div className="row d-flex justify-content-center">
                                    <span style={{ color: "red" }}>{address1Err}</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id='Hospital_Address_2'
                                    onChange={(e) => {
                                        setAddress2(e.target.value)
                                        address2InputChangeHandler(e.target.value, setAddress2Err)
                                    }}
                                    onBlur={(e) => {
                                        address2InputBlurHandler(e.target.value, setAddress2Err)
                                    }}
                                    label="Hospital Address 2"
                                />
                                <div className="row d-flex justify-content-center">
                                    <span style={{ color: "red" }}>{address2Err}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id='Country'
                                    value={country}
                                    onChange={(e) => { inputChangeHandler(e) }}
                                    label="Country"
                                />
                            </div>
                            <div className="col-md-3">
                                <Select
                                    className="primary mt-2"
                                    name="singleSelect"
                                    placeholder="State"
                                    // value={value.medicineName}
                                    options={states}
                                    onChange={(value) => stateDropdownHandler(value)}
                                />
                                {/* <FormControl className={classes.formControl}>
                                    <InputLabel>State</InputLabel>
                                    <Select onChange={dropDownHandler}>
                                        {states.map((item, index) => {
                                            return (
                                                <MenuItem value={item} key={index}>{item}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl> */}
                                <div className="row d-flex justify-content-center">
                                    <span style={{ color: "red" }}>{stateErr}</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id='City'
                                    onChange={(e) => { inputChangeHandler(e) }}
                                    label="City"
                                    onChange={(e) => {
                                        setCity(e.target.value)
                                        cityInputChangeHandler(e.target.value, setCityErr)
                                    }}

                                    onBlur={(e) => {
                                        cityInputBlurHandler(e.target.value, setCityErr)
                                    }}
                                />
                                <div className="row d-flex justify-content-center">
                                    <span style={{ color: "red" }}>{cityErr}</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id='Pin_Code'
                                    onChange={(e) => {
                                        setPostalCode(e.target.value)
                                        postalCodeInputChangeHandler(e.target.value, setPostalErr)
                                    }}

                                    onBlur={(e) => {
                                        postalCodeInputBlurHandler(e.target.value, setPostalErr)
                                    }}
                                    label="Pin Code"
                                />
                                <div className="row d-flex justify-content-center">
                                    <span style={{ color: "red" }}>{postalErr}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">


                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id='Contact_No_1'
                                    onChange={(e) => {
                                        setPhone(e.target.value)
                                        phoneInputChangeHandler(e.target.value, setPhoneErr)
                                    }}

                                    onBlur={(e) => {
                                        phoneInputBlurHandler(e.target.value, setPhoneErr)
                                    }}
                                    label="Contact No 1"
                                />
                                <div className="row d-flex justify-content-center">
                                    <span style={{ color: "red" }}>{phoneErr}</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <TextField
                                    variant="standard"
                                    id='Contact_No_2'
                                    onChange={(e) => {
                                        setSecondaryPhone(e.target.value)
                                        secondaryPhoneInputChangeHandler(e.target.value, setSecondaryPhoneErr)
                                    }}

                                    onBlur={(e) => {
                                        secondaryPhoneInputBlurHandler(e.target.value, setSecondaryPhoneErr)
                                    }}
                                    label="Contact No 2"
                                />
                                <div className="row d-flex justify-content-center">
                                    <span style={{ color: "red" }}>{secondaryPhoneErr}</span>
                                </div>
                            </div>
                            <div className="col-md-3 ">
                                <div className="row d-flex ">

                                    <TextField
                                        variant="standard"
                                        id='Password'
                                        type={passwordType}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            passwordInputChangeHandler(e.target.value, setPasswordErr)
                                        }}
                                        onBlur={(e) => {
                                            passwordInputBlurHandler(e.target.value, setPasswordErr)
                                        }}
                                        label="Password"
                                    />
                                    {showEyeIcon ?
                                        <AiOutlineEye onClick={() => { changePasswordTypeHandler('Text') }} cursor="pointer" style={{ marginTop: "10%" }} size={20} />
                                        :
                                        <AiOutlineEyeInvisible onClick={() => { changePasswordTypeHandler('password') }} cursor="pointer" style={{ marginTop: "10%" }} size={20} />
                                    }
                                </div>
                                <div className="row d-flex justify-content-center">
                                    <span style={{ color: "red" }}>{passwordErr}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-1 d-flex justify-content-end">
                            <div className="col-md-3 mt-4" >
                                <button type="button" className="inline-block px-6 py-2.5 
                    bg-blue-400 text-white font-medium text-xs leading-tight 
                    uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg 
                    focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 
                    active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={addHospitalSubmitHandler}
                                >Add Hospital</button>
                            </div>
                        </div>
                        <div className="col-md-12 mt-5 d-flex justify-content-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddHospitalModal
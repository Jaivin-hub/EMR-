import React, { useState, useRef, useEffect } from 'react'
import '../assets/css/mainbackground.css'
import { TextField, Button } from '@mui/material'
import instance, { API } from '../config/api'
import { ApiHelper } from '../Helper/Apihelper'
import Upload from '../assets/imgs/upload.png';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 205
    }
}))

function HospitalRegistration() {
    const classes = useStyles()
    const navigate = useNavigate();
    const [hospitalData, setHospitalData] = useState({})
    const [country, setCountry] = useState('India')
    const [mainErr, setMainErr] = useState('')
    const upLoadRef = useRef();
    const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
        'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
        'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
        'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']

    // file upload 
    const [pickedFile, setPickedFile] = useState(null)
    const [preview, setPreview] = useState('');
    const [size, setSize] = useState(null)
    const [validateErr, setValidateErr] = useState('')

    const inputChangeHandler = (e) => {
        const id = e.target.id
        const value = e.target.value
        const newData = { ...hospitalData }
        newData[id] = value
        setHospitalData(newData)
    }

    const fileSelectorHandler = (e) => {
        setPickedFile(e.target.files[0]);
        let size = document.getElementById('fileInput').files[0].size;
        setSize(size);
    };

    const fileUploader = async () => {
        const params = new FormData();
        console.log('pickedFile', pickedFile)
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

    console.log('pickedFile', pickedFile)

    // #################### Validating Name! ###########################

    const [firstName, setFirstName] = useState('')
    const [firstNameErr, setFirstNameErr] = useState('')


    const nameInputBlurHandler = (firstName, setFirstNameErr) => {
        if (firstName === '') {
            setFirstNameErr('This field cannot be empty!')
            return false
        } else if (firstName.length < 4) {
            setFirstNameErr('This field should have atleast 4 charecters.')
            return false
        } else if (firstName.slice(-1) === ' ') {
            setFirstNameErr('should not end with space.')
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
            setFirstNameErr('should not contain consecutive spaces.')
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
        } else if (firstName.length < 4) {
            setFirstNameErr('This field should have atleast 4 charecters.')
            return false
        } else if (firstName.slice(-1) === ' ') {
            setFirstNameErr('should not end with space.')
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
    console.log(email)

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
        } else if (city.length < 4) {
            setCityErr('This field should have atleast 4 charecters.')
            return false
        } else if (city.slice(-1) === ' ') {
            setCityErr('should not end with space.')
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
            setCityErr('should not contain consecutive spaces.')
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
        } else if (city.length < 4) {
            setCityErr('This field should have atleast 4 charecters.')
            return false
        } else if (city.slice(-1) === ' ') {
            setCityErr('should not end with space.')
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
        } else if (address1.length < 4) {
            setAddress1Err('This field should have atleast 4 charecters.')
            return false
        } else if (address1.slice(-1) === ' ') {
            setAddress1Err('should not end with space.')
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
            setAddress1Err('should not contain consecutive spaces.')
            return false
        } else if (address1 === '') {
            setAddress1Err('This field cannot be empty!')
            return false
        } else if (address1.length < 4) {
            setAddress1Err('This field should have atleast 4 charecters.')
            return false
        } else if (address1.slice(-1) === ' ') {
            setAddress1Err('should not end with space.')
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
        if (address2 === '') {
            setAddress2Err('This field cannot be empty!')
            return false
        } else if (address2.length < 4) {
            setAddress2Err('This field should have atleast 4 charecters.')
            return false
        } else if (address2.slice(-1) === ' ') {
            setAddress2Err('should not end with space.')
            return false
        } else {
            setAddress2Err('')
            return true
        }
    }


    const address2InputChangeHandler = (address2, setAddress2Err) => {
        if (address2.length === 0) {
            setAddress2Err('This field cannot be empty!')
            return false
        } else if (address2.charAt(0) === ' ') {
            setAddress2Err('should not start with space.')
            return false
        } else if (address2.includes('  ')) {
            setAddress2Err('should not contain consecutive spaces.')
            return false
        } else if (address2 === '') {
            setAddress2Err('This field cannot be empty!')
            return false
        } else if (address2.length < 4) {
            setAddress2Err('This field should have atleast 4 charecters.')
            return false
        } else if (address2.slice(-1) === ' ') {
            setAddress2Err('should not end with space.')
            return false
        } else {
            setAddress2Err('')
            return true
        }
    }

    // #################### Validating Address1! ###########################

    const [state, setState] = useState('')

    const dropDownHandler = (e) => {
        console.log('function called')
        console.log('inside function', e.target.value)
        setState(e.target.value)
    }

    const addHospitalSubmitHandler = () => {
        if (!firstName == "" && !email == "" && !country == "" && !state == "" && !postalCode == "" && !phone == "" && !secondaryPhone == "" && !password == "" && !city == "" && !address1 == "" && !address2 == "") {
            console.log('everything working fine')
            setMainErr('')
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
                console.log('response', response);
                // setValidateErr('')
                // console.log('response of hospital', response)
                if (response) {
                    navigate('/registerSuccess');
                }
            }).catch((err) => {
                console.log('error', err)
            })
        } else {
            console.log('something missing')
            setMainErr('Check all the fields that you entered!')
        }
        // const { Hospital_Name, Email_ID, Hospital_Address_1, Hospital_Address_2, Country, State, City, Pin_Code, Contact_No_1, Contact_No_2, Password } = hospitalData
        // const obj = {
        //     name: Hospital_Name,
        //     email_id: Email_ID,
        //     password: Password,
        //     address_1: Hospital_Address_1,
        //     address_2: Hospital_Address_2,
        //     city: City,
        //     state: State,
        //     country: Country,
        //     pincode: Pin_Code,
        //     contact_1: Contact_No_1,
        //     contact_2: Contact_No_2,
        //     logo: "logo.png"
        // }
        // console.log('objects---', obj)
        // if (!Hospital_Name == "" && !Email_ID == "" && !Hospital_Address_1 == "" && !Hospital_Address_2 == "" && !Country == "" && !State == "" && !City == "" && !Pin_Code == "" && !Contact_No_1 == "" && !Contact_No_2 == "" && !Password == "") {
        //     instance.post("/add_hospital", obj).then((response) => {
        //         setValidateErr('')
        //         console.log('response of hospital', response)
        //         if (response) {
        //             navigate('/registerSuccess');
        //         }
        //     }).catch((err) => {
        //         console.log('error', err)
        //     })
        // } else {
        //     setValidateErr('All fields are required')
        //     console.log('else')
        // }

    }





    return (
        <div className='centered loginWrapper d-flex justify-content-center' style={{ height: '60em', background: 'linear-gradient(180deg, #02BCB1 0%, #0298D5 100%)' }}>
            <div className="login_container" style={{ marginTop: "8em", width: '60%' }}>
                <div className="card">
                    <div className="d-flex loginBoxs">
                        <div className="col-md-12">
                            <div className="row d-flex justify-content-center">
                                <h4 className='mt-5' style={{ fontFamily: "Roboto" }}><strong>Register Here</strong></h4>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <p className="text-danger">{mainErr}</p>
                            </div>
                            <div className="row">
                                {/* ========== */}
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-4 mt-3 d-flex justify-content-center">
                                    <div>
                                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPgAAADLCAMAAAB04a46AAAAZlBMVEX///9ZYnFcZXRTXWyWm6RMVmdpcn9OWGjX2dzS1NjIys5udYJLVWefpKtIU2SLkZt/hZC+wcZ1fIjl5ui6vcOFi5WxtbuqrrWYnaWKkJq1uL7f4eOkqK9hanj4+fns7e42Q1dBTF
                                        /PEYhUAAAGPUlEQVR4nO3d2WLiIBQGYCNi1LZxq0urxpn3f8lR69QsHCCBAwfCf9s25CsmhiUwGgWew9r3GfjJoSgGKT8XWTZE+Zln2RDlP+7hye+f8yHKP3iWDVFedQ9JXncPR950D0Xedg9DfhS4hyAXu+OXTwD3Tf7p+9wwA9V37HK4vuP+tMvd8db5JJe7Y61ztTtO+VLxOY9VrueOT77U+JzHKP/
                                        Sdscl7+KO6Vtt18kdT513dcci7+6O49Pexx2DvJ87fHlfd+jyVW932HITd8hyM3e4clN3qHJzd5hyG+4Q5Xbc4ck3ltxqeXmaucxc4Wa23HL59ngpuNP8ceaWyLebwmpBWifjzg3KP7lzthxu2w3IX9NoXEYCt+8Wyj+9uCVwDPetvO9GMVc/bhiO427LscpRnodjd1M+0xyfsH8aYvcbYj3U5EtPFQ7AM
                                        d23MvevkjDLkZ+Ee3dVfvJ0axPD8e83v/K1taZA51NwX9+PYp/ys69LXAB34f6VH8nAyylnGpEeU+cA7O/hXtyEDHx//NCJ7HzZTusQkxMpuGZkjx35Qv84wcHfJYdM8ARP8ARP8AR3nQQfGvwvWfj0DTUXqvB81u/MkOMArhjV85QET/AET3CdJHiCJ3iCk0qCJ3iCO4ZvF+v14tRP0SNE4LNVxnmec852
                                        HQo1CQl4dUIk42Mn1wYF+GdjHmgxMRFphgD80JpFkq+MTFrxD98LZs/kOzOVRrzDZ8JZQ/xg6FLGO3ws/qtiawhTxTf8G5gtxbAvc99wsHDsKvcMh2fAsrOxTRrP8AM8ANNzhEQ3nuErGN5zMFA3nuFTuHTki9wz/AKXznFbaoThUde4ZL5tcTXGyeIZLhlWz41to9FpD/7IMxye5m7l0W3MSuhHnuEl+ADDL
                                        Sy5s2I52Njx/cj6Bf6dftlQ9rf/KljlvuFb4F2WvPk+X/c8Hodz6MnXN3z0IbzK2Zt+0UDKnyMVQJV7h4vfGMrNv8uex2Uf4h/7h5fT9p9aeGr7vzNCxsX/Q//wUblp3NpZZv7QNv+9d7Cj8BcIwG+337xyobNiAn75audaOR1xlReS94sKZyMp5Znx/FEmL5Y2ntGrNw4m7KbfrOBsOgxpGI+dnfbnyXJysDO
                                        Kcqx9VaA2cNFHS+cdDrOoPxwwzF56bPi84NrHuTYfDQrEpj0y/F6H2rec1vcjZl81Lnz9+OxqLhUqWEu7wJtBjQr/fl6zBdy8fmUt+IZmG+NzgIIJfw0rvquH1LbChq7+DaJrEOHVYWQufgyr5CI8Ebwqx4PXt6/hikkDO+A80KocDd7c1kM+dL4He3SmRmcBBwveXgZeNl3iBL8VzpEmFSHBRcvnwtdrCQy2Pz
                                        I2OA1JcODi5RbZFGi+SUbi7PReCoICh5ZbZBdhS/MgX5IFp8ox4PAyNmwskM8Va/DkKKts2oeLuqRectZqapaqlzzZlylSFOtwqft+2GaLS7nMEVuaM9uxDb+OVY5Gw0PcTR0c/Jqp305+r34zL9SLbIUAvyqWJPpJ5Zmk1fcQJvyk+TL6a8VMxQ0hELj+Koj/G+g6+3jRh887rP5YPMYE11qr6FGHL2RjHK3cG+
                                        hbvUX0iMM1bs/1wy+BvofA4Hqf2ppH45uPPvwbcc3LOpzMENIjorcVkOA0Bg2fab+dggcnMUz8jGhXbIshC1ftHmsaqnDdXTV7hyi8/65cuqEJt7WLiyQk4fZ2cYFDEF46WS2ZHlzVvWYp5OClZiPDNNTg6m5FSyEG1+lWtBNa8K1Wt6KVkIJvHa5xSQl+crnzAiG4201l6MBVw5uWQwbetVvRNFTg3bsVDUME7n5
                                        3NBpw1G5FcUjAcbsVxaEAP/vYHI0AvDlb0U38w7G7U4F4h3952gTQN3zna/PD+nQv5/DlZeopl9pcd9/tcW9J8ARP8ATXSYIneIInOKkkOB6c5iZQDjZsHZOMxB3IRm8ISfAET/AET/AEjyA
                                        JnuAJnuCDhx+HCj/HBOcduhDgZbMDTJel3aE1lENMt/WPJZsChBbeacEYaG+fANNxhxZpL1ZIKTp2CzuekosWDizPDecchVy1RGCkcsZ1FgJtZZ6FfYdj/K3nmr3lfszdvV1jNYzlxcpktGu2X04DvMFfVh+LHtsX/AORLan2u2WZTwAAAABJRU5ErkJggg==' alt="" />

                                        {/* <h6 style={{ fontFamily: 'serif', marginBottom: '10px' }}>
                                            Upload Files
                                        </h6> */}
                                        {/* <div style={{ display: 'flex' }}>
                                            <div
                                                onClick={() => {
                                                    upLoadRef.current.click();
                                                }}
                                                style={{ cursor: 'pointer' }}>
                                                <img
                                                    src={Upload}
                                                    style={{ height: '50px', width: '50px', marginRight: '10px' }}
                                                    alt=''
                                                />

                                            </div>
                                            <div>
                                                {pickedFile !== null ? (
                                                    <img
                                                        style={{ height: '50px', width: '50px' }}
                                                        src={preview}
                                                        alt=''
                                                    />
                                                ) : null}
                                            </div>
                                        </div> */}
                                        <div style={{ display: 'flex', fontFamily: 'serif' }}>
                                            <input
                                                id='fileInput'
                                                ref={upLoadRef}
                                                type='file'
                                                onChange={fileSelectorHandler}
                                                className='form-control'
                                                style={{ fontFamily: 'serif', display: 'none' }}
                                            />
                                            {/* <button
              onClick={(e) =>{
                e.preventDefault();
                fileUploader()
              }}
              style={{ fontFamily: 'serif' }}
              className='btn btn-secondary'>
              Upload
            </button> */}
                                        </div>
                                        <label htmlFor="" style={{ marginLeft: "25%" }} className="mt-3">Upload logo</label>
                                        {/* <label style={{ color: 'grey', fontSize: '10px' }}>
                                            Upload files upto size 50mb
                                        </label> */}
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6 mt-3">
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
                                                // onChange={(e) => { inputChangeHandler(e) }}
                                                label="Hospital Name"
                                            />
                                            <p style={{ color: "red" }}>{firstNameErr}</p>
                                        </div>
                                        <div className="col-md-6 mt-3">
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
                                                // onChange={(e) => { inputChangeHandler(e) }}
                                                label="Email ID"
                                            />
                                            <p style={{ color: "red" }}>{emailError}</p>
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col-md-6 mt-3">
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
                                                // onChange={(e) => { inputChangeHandler(e) }}
                                                label="Hospital Address 1"
                                            />
                                            <p style={{ color: "red" }}>{address1Err}</p>
                                        </div>
                                        <div className="col-md-6 mt-3">
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
                                                // onChange={(e) => { inputChangeHandler(e) }}
                                                label="Hospital Address 2"
                                            />

                                            <p style={{ color: "red" }}>{address2Err}</p>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mt-3">
                                            <TextField
                                                variant="standard"
                                                id='Country'
                                                value={country}
                                                onChange={(e) => { inputChangeHandler(e) }}
                                                label="Country"
                                            />
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            {/* <TextField
                                                variant="standard"
                                                id='state'
                                                onChange={(e) => { inputChangeHandler(e) }}
                                                label="State"
                                            /> */}
                                            <FormControl className={classes.formControl}>
                                                <InputLabel>State</InputLabel>
                                                <Select onChange={dropDownHandler}>
                                                    {states.map((item, index) => {
                                                        return (
                                                            <MenuItem value={item} key={index}>{item}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mt-3">
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
                                            <p style={{ color: "red" }}>{cityErr}</p>
                                        </div>
                                        <div className="col-md-6 mt-3">
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
                                                // onChange={(e) => { inputChangeHandler(e) }}
                                                label="Pin Code"
                                            />
                                            <p style={{ color: "red" }}>{postalErr}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mt-3">
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
                                                // onChange={(e) => { inputChangeHandler(e) }}
                                                label="Contact No 1"
                                            />
                                            <p style={{ color: "red" }}>{phoneErr}</p>
                                        </div>
                                        <div className="col-md-6 mt-3">
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
                                                // onChange={(e) => { inputChangeHandler(e) }}
                                                label="Contact No 2"
                                            />
                                            <p style={{ color: "red" }}>{secondaryPhoneErr}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mt-3">
                                            <TextField
                                                variant="standard"
                                                id='Password'
                                                type='password'
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                    passwordInputChangeHandler(e.target.value, setPasswordErr)
                                                }}
                                                onBlur={(e) => {
                                                    passwordInputBlurHandler(e.target.value, setPasswordErr)
                                                }}
                                                // onChange={(e) => { inputChangeHandler(e) }}
                                                label="Password"
                                            />
                                            <p style={{ color: "red" }}>{passwordErr}</p>
                                        </div>

                                    </div>
                                    <div className="row mt-4 d-flex justify-content-end">
                                        <div className="button">
                                            {/* <Button variant="outlined" onClick={addHospitalSubmitHandler}>Cancel</Button> */}
                                        </div>
                                        <div className="button" style={{ width: '40%', height: '' }}>
                                            <Button variant="contained" onClick={addHospitalSubmitHandler}>Register</Button>
                                        </div>
                                        <div className="col-md-12 mt-5 d-flex justify-content-center">
                                            {/* <button className="btn" style={{ borderRadius: '5px', width: '50%', color: 'white', backgroundColor: '#0298D5' }} onClick={submitHandler}>login now</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalRegistration
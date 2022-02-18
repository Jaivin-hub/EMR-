// const BASEURL = 'http://13.234.177.61/api3/'


// export const API = {
//     baseUrl: BASEURL,

//     //Add Doctor API
//     addDoctor: BASEURL + 'add_doctor',
//     addPatient: BASEURL + 'add_patient',
//     addHospital: BASEURL + 'add_hospital',
//     listPatients: BASEURL + 'list_patients',
//     listDoctors: BASEURL + 'list_doctors',
//     loginHospital: BASEURL + 'login_hospital',

// }

import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://13.234.177.61/api3',
//   baseURL: 'http://localhost:5000/users'

  });

 export default instance;

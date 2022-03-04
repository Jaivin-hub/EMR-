import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import './App.css'
import TaskDashboard from "./Components/TaskDashboard";
import DoctorView from "./Components/DoctorView";
import Login from "./Components/Login";
import HospitalRegistration from "./Components/HospitalRegistration";
import SignIn from './Components/SignIn'
import TakeAppoiment from "./Components/TakeAppoiment";
import RegisterSuccess from "./Components/RegisterSuccess";
import PatientsLIsting from './Components/PatientsLIsting'
import Admin_login from "./Components/Admin/Admin_login";
import AdminDashboard from './Components/Admin/AdminDashboard'
import PrimaryAnalysis from './Components/PrimaryAnalysis'
import Consultation from './Components/Consultation'
import DoctorLogin from './Components/Authentications/DoctorLogin'
import './index.css'
function App() {
  const verification = localStorage.getItem('handleLogin')
  return (
    <Router basename={"/project/emr"}>
      <Routes>

        <Route exact path='/' element={<SignIn />} />
        <Route path="/taskDashboard" element={<TaskDashboard />} />
        <Route path='/addDoctor' element={<DoctorView />} />
        <Route path='/login' element={<Login />} />
        <Route path='/hospitalregistration' element={<HospitalRegistration />} />
        <Route path='/hospitallisting' element={<TakeAppoiment />} />
        <Route path='/registerSuccess' element={<RegisterSuccess />} />
        <Route path='/patientlisting' element={<PatientsLIsting />} />
        <Route path='/admin/login' element={<Admin_login />} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/PrimaryAnalysis' element={<PrimaryAnalysis />} />
        <Route path='/consultation' element={<Consultation />} />
        <Route path='/doctor/login' element={<DoctorLogin />} />
      </Routes>
    </Router>
  );
}

export default App;



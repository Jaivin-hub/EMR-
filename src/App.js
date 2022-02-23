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
function App() {
  return (
    <Router basename={"/project/emr"}>
      <Routes>
        <Route exact path='/' element={<SignIn />} />
        <Route path="/taskDashboard" element={<TaskDashboard />} />
        <Route path='/addDoctor' element={<DoctorView />} />
        <Route path='/login' element={<Login />} />
        <Route path='/hospitalregistration' element={<HospitalRegistration />} />
        <Route path='/takeAppointment' element={<TakeAppoiment />} />
        <Route path='/registerSuccess' element={<RegisterSuccess />} />
        <Route path='/patientlisting' element={<PatientsLIsting />} />
        <Route path='/admin/login' element={<Admin_login />} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />

        {/* adminDashboard */}


      </Routes>
    </Router>
  );
}

export default App;



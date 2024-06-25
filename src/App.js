import logo from "./logo.svg";
import "./App.css";
import {React,useEffect, useState} from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import JoySignInSideTemplate from "./SignIn/Signin.tsx";
import Header from './Containers/Header/header';
import Signup from "./SignUp/Signup.tsx";
import Signin from "./SignIn/Signin.tsx";
import Navbar from './LandingPage/navbar/Navbar';
import Front from './LandingPage/Front';
import Dashboard from './Dashboard/src/App.jsx';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePatient from './Profile/profile-patient.tsx';
import ProfileDoctor from './Profile/profile-doctor.tsx';
import ProfileAdmin from './Profile/profile-admin.tsx';
import Profile from './Profile/Profile.tsx';
import SelectGame from './Components/Game/SelectGame.tsx';
import Sidebar from "./Dashboard/src/layout/Sidebar/Sidebar";
import DoctorListPage from './Dashboard/src/Admin/DoctorListPage.tsx'; 
import DoctorDetails from './Dashboard/src/Admin/DoctorDetails.tsx';
import AssignDoctor from "./Dashboard/src/Admin/AssignDoctor.tsx";
import PatientListPageContent from "./Dashboard/src/Admin/PatientListPage.tsx";
import Settings from "./settings.tsx";
import DoctorsPatientListView from "./Dashboard/src/Doctor/PatientsListView.tsx";
import PatientDetails from "./Dashboard/src/Doctor/PatientDetails.tsx";
import AddingComment from "./Dashboard/src/Doctor/AddComment.tsx";
import  Game  from "./3JS/Game.jsx";
import GameCalendar from "./Dashboard/src/Patient/GameCalendar.jsx";
import Targets from "./Dashboard/src/Patient/Targets.jsx";
import TreatmentProgress from "./Dashboard/src/Patient/TreatmentProgress.jsx";
import LastGamePlayed from "./Dashboard/src/Patient/LastGamePlayed.jsx";
import DoctorComments from "./Dashboard/src/Patient/DoctorComments.jsx";
import SubscriptionDetails from "./Dashboard/src/Patient/SubscriptionDetails.jsx";
import Tennis from "./3JS/tennis";
import {jwtDecode}  from 'jwt-decode'
import Connecting from './ConnectBackend/backend.jsx';
import PrivateRoute from './PrivateRoute'; 
import axios from 'axios';
import { url } from "./config";
// function App() {
//   const location = useLocation();

//   useEffect(() => {
//     // Function to be invoked on navigation change
//     console.log("Navigation changed to:", location.pathname);
//     // Add your custom logic here
//   }, [location]);
//   const [open, setOpen] = React.useState(false);
//   return (

//     <Router>
// {/*       
//       <div style={{position:"absolute",top:10}}>
//           <Navbar />
//       </div> */}
  

//       {/* <Header /> */}
//       <Routes>
//         {/* <Route path='/game' element={<Game selectedGame={'Tennis'} />}/> */}
//         <Route path='/game' element={<Tennis />}/>
//         {/* <Route path='/connect' element={<Connecting />}/> */}
//         <Route path="/Signin" element={<><div className="black"> <Navbar/> </div><Signin /></>} />
//         <Route path="/Signup"  element={<><div className="black"> <Navbar/> </div><Signup /></>} />
//         <Route path="/" element={<Front/>}/>
//         <Route path='/Profile-Patient' element={<ProfilePatient/>}/>
        
//         <Route path='/Profile-Admin' element={<ProfileAdmin/>}/>
//         <Route path='/Profile-Doctor' element={<ProfileDoctor/>}/>
//         <Route path='/selectgame' element={<> <div className="black"><Navbar isLoggedIn={true}/></div><SelectGame/></>}/>
//         <Route path='/AssignDoctor' element={<><div className="black"><Navbar isLoggedIn={true}/></div><AssignDoctor/></>}/>
//         <Route path='/DoctorDetails' element={<><div className="black"><Navbar isLoggedIn={true}/></div><DoctorDetails/></>} />
//         <Route path='/PatientDetails' element={<><div className="black"><Navbar isLoggedIn={true}/></div><PatientDetails/></>} />
//         <Route path='/AddComment' element={<><div className="black"><Navbar isLoggedIn={true}/></div><AddingComment/></>} />
//         <Route path='/DoctorsList' element={<><div className="black"><Navbar isLoggedIn={true}/></div><DoctorListPage/></>}/>
//         <Route path='/PatientsList' element={<><div className="black"><Navbar isLoggedIn={true}/></div><PatientListPageContent/></>}/>
//         <Route path='/PatientList' element={<><div className="black"><Navbar isLoggedIn={true}/></div><DoctorsPatientListView/></>}/>
//         <Route path='/Profile' element={<><div className="black"><Navbar isLoggedIn={true}/></div><Profile role={'Patient'}/></>}/>
//         <Route path="/Dashboard" element={<><div className="black"><Navbar isLoggedIn={true}/></div><Dashboard /></>}/>
//         <Route path="/Settings" element={<><div className="black"><Navbar isLoggedIn={true}/></div><Settings role={'Patient'}/></>}/>
//         <Route path='/GameCalendar' element={<><div className="black"><Navbar isLoggedIn={true}/></div><GameCalendar/></>} />
//         <Route path='/Targets' element={<><div className="black"><Navbar isLoggedIn={true}/></div><Targets/></>} />
//         <Route path='/TreatmentProgress' element={<><div className="black"><Navbar isLoggedIn={true}/></div><TreatmentProgress/></>} />
//         <Route path='/LastGamePlayed' element={<><div className="black"><Navbar isLoggedIn={true}/></div><LastGamePlayed/></>} />
//         <Route path='/DoctorComments' element={<><div className="black"><Navbar isLoggedIn={true}/></div><DoctorComments/></>} />
//         <Route path='/SubscriptionDetails' element={<><div className="black"><Navbar isLoggedIn={true}/></div><SubscriptionDetails/></>} />
//       </Routes>
//     </Router>

//   );
// }

function App() {
  // useEffect(() => {
  //   localStorage.removeItem('userToken');
  // });
  return (
    <Router>
      
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [role, setRole] = useState('');
  const [checkrole, setCheckRole] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      const userToken = jwtDecode(storedToken);
      
      const checkrole = userToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      setCheckRole(checkrole);
      const fetchData = async () => {
        try {
          if (checkrole === "Doctor" || checkrole === 'Admin') {
            let geturl = `${url}GetDoctorOrAdminProfile?uid=`;
            const response = await axios.get(geturl + userToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
            setUser(response.data.data);
           
            localStorage.setItem('userData', JSON.stringify(response.data.data));
          } else if (checkrole === "Patient") {
            let geturl = `${url}GetPatientDetails?patientid=`;
            const response = await axios.get(geturl + userToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
          
            setUser(response.data.data);
            localStorage.setItem('userData', JSON.stringify(response.data.data));
          }
          const role = userToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          setRole(role);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
        setLoading(false);
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <Routes>
   

          <Route path="/Signin" element={<><div className="black"> <Navbar/> </div><Signin /></>} />
          <Route path="/Signup"  element={<><div className="black"> <Navbar/> </div><Signup /></>} />
          <Route path="/*" element={<Front user={user} />}/>

          {checkrole=="Admin" &&( <>
         <Route path='/AssignDoctor' element={<PrivateRoute><AssignDoctor user={user}/></PrivateRoute>}/>
         <Route path='/DoctorDetails' element={<PrivateRoute><DoctorDetails user={user}/></PrivateRoute>} />
         <Route path='/DoctorsList' element={<PrivateRoute><DoctorListPage user={user} role={role}/></PrivateRoute>}/>
         <Route path='/PatientsList' element={<PrivateRoute><PatientListPageContent user={user} role={role}/></PrivateRoute>}/>
         <Route path='/Profile' element={<PrivateRoute><Profile user={user} role={role}/></PrivateRoute>}/>
         <Route path="/Dashboard" element={<PrivateRoute><Dashboard user={user} role={role}/></PrivateRoute>}/>
         <Route path="/Settings" element={<PrivateRoute><Settings  user={user} role={role}/></PrivateRoute>}/>
         </>) }
         {checkrole=="Doctor"&&(<>       
           <Route path='/PatientList' element={<PrivateRoute><DoctorsPatientListView user={user} role={role}/></PrivateRoute>}/>
         <Route path='/PatientDetails' element={<PrivateRoute><PatientDetails user={user}/></PrivateRoute>} />
         <Route path='/AddComment' element={<PrivateRoute><AddingComment user={user}/></PrivateRoute>} />
         <Route path="/Dashboard" element={<PrivateRoute><Dashboard user={user} role={role}/></PrivateRoute>}/>
         <Route path='/Profile' element={<PrivateRoute><Profile user={user} role={role}/></PrivateRoute>}/>
         <Route path="/Settings" element={<PrivateRoute><Settings  user={user} role={role}/></PrivateRoute>}/>
         </>)}  
         {checkrole=="Patient" &&(<>
         <Route path="/Settings" element={<PrivateRoute><Settings  user={user} role={role}/></PrivateRoute>}/>
         <Route path='/game' element={<PrivateRoute><Navbar user={user} isLoggedIn={true}/><Tennis user={user} /></PrivateRoute>}/>
         <Route path='/selectgame' element={<PrivateRoute><SelectGame user={user}/></PrivateRoute>}/>
         <Route path='/GameCalendar' element={<PrivateRoute><GameCalendar user={user}/></PrivateRoute>} />
         <Route path='/Profile' element={<PrivateRoute><Profile user={user} role={role}/></PrivateRoute>}/>
         <Route path='/Targets' element={<PrivateRoute><Targets user={user}/></PrivateRoute>} />
         <Route path="/Dashboard" element={<PrivateRoute><Dashboard user={user} role={role}/></PrivateRoute>}/>
         <Route path='/TreatmentProgress' element={<PrivateRoute><TreatmentProgress user={user}/></PrivateRoute>} />
         <Route path='/LastGamePlayed' element={<PrivateRoute> <LastGamePlayed user={user}/></PrivateRoute>} />
         <Route path='/DoctorComments' element={<PrivateRoute> <DoctorComments user={user}/></PrivateRoute>} />
         <Route path='/SubscriptionDetails' element={<PrivateRoute><SubscriptionDetails ueser={user}/></PrivateRoute>} />

         </>)}
    </Routes>
  );
}
{/* <Route path='/Profile-Patient' element={<PrivateRoute><ProfilePatient/></PrivateRoute>}/>
<Route path='/Profile-Doctor' element={<PrivateRoute><ProfileDoctor/></PrivateRoute>}/>
<Route path='/Profile-Admin' element={<PrivateRoute><ProfileAdmin/></PrivateRoute>}/> */}

export default App;
    
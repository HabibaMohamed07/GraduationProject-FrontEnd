import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";


function App() {
  const [open, setOpen] = React.useState(false);
  return (

    <Router>
{/*       
      <div style={{position:"absolute",top:10}}>
          <Navbar />
      </div> */}


      {/* <Header /> */}
      <Routes>
        <Route path="/Signin" element={<><Navbar/> <Signin /></>} />
        <Route path="/Signup" element={<><Navbar/><Signup /></>} />
        <Route path="/" element={<Front/>}/>
      </Routes>
    </Router>

  );
}

export default App;


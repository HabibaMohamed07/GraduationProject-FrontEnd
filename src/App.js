
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
import Header from "./Components/Dummynav.tsx";
import Signup from "./SignUp/Signup.tsx";
import Signin from "./SignIn/Signin.tsx";

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
      <Header />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Front/>
      </Routes>
    </Router>

  );
}

export default App;

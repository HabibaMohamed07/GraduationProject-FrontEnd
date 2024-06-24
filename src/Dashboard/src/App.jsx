import "./dashboard.css";
import Sidebar from "./layout/Sidebar/Sidebar";
import Content from "./layout/Content/Content";
import Navbar from "../../LandingPage/navbar/Navbar";
function App({ user,role }) {
    console.log("Dashboard User : ",user)

    return (
 <>
           <Navbar isLoggedIn={true} user={user}  />
        <div className="app">
          <Sidebar  user ={user} role={role} />
          <Content user={user} role={role} />
        </div>
        </>  
    );
 
 
}

export default App;

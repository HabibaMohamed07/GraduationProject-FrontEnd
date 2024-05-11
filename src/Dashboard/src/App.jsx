import "./dashboard.css";
import Sidebar from "./layout/Sidebar/Sidebar";
import Content from "./layout/Content/Content";

function App({ user,role }) {
    console.log("Dashboard User : ",user)

    return (
 
        <div className="app">
          <Sidebar  user ={user} role={role} />
          <Content user={user} role={role} />
        </div>
     
    );
 
 
}

export default App;

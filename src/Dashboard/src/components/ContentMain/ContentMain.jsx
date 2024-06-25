import "./ContentMain.css";
import Cards from "../Cards/Cards";
import Transactions from "../Transactions/Transactions";
import Report from "../Report/Report";
import Budget from "../Budget/Budget";
import Subscriptions from "../Subscriptions/Subscriptions";
import Savings from "../Savings/Savings";
import Loans from "../Loans/Loans";
import Financial from "../Financial/Financial";
import PatientList from "../Loans/PatientList";
import DoctorList from "../Loans/DoctorList";
const ContentMain = ({user,role}) => {
  console.log("ContentMain: ",role)
  if(role=='Patient')
  {
  return (
    <div className="main-content-holder">
        <div className="content-grid-one">
            <Cards />
            <Transactions  user={user} role={role} />
            <Report />
        </div>
        <div className="content-grid-two">
            <Budget user={user}/>
            <div className="grid-two-item">
              <div className="subgrid-two">
                <Subscriptions role={role}/>
                <Savings />
              </div>
            </div>

            <div className="grid-two-item">
              <div className="subgrid-two">
                <Loans />
                <Financial />
              </div>
            </div>
        </div>
    </div>
  )
  }
  else if (role=='Doctor')
  {
    return (
      <>
      <div style={{display:'grid',width:'100%'}}>
      <Transactions user={user} role={role}/>

      </div>
      
      <div className="main-content-holder ">
          <div className="content-grid-one "  >
         
          </div>
          <div className="content-grid-two">
              <Budget user={user} isPatient={false}/>
              <div className="grid-two-item">
                <div className="subgrid-two">
                  <Subscriptions  role={role} />
       
                </div>
              </div>
  
              <div className="grid-two-item">
                <div className="subgrid-two">
                  <PatientList  user={user} role={role} />

                </div>
              </div>

          </div>



      </div>
    
   </>)
  }
  else if (role=='Admin')
  {
    return (
      <>
      <div style={{display:'grid',width:'100%'}}>
      <Transactions  user={user} role={role}/>

      </div>
      
      <div className="main-content-holder ">
          <div className="content-grid-one "  >
         
          </div>
          <div className="content-grid-two">
          <DoctorList user={user} role={role} />
              <div className="grid-two-item">
                <div className="subgrid-two">
                  <Subscriptions role={role} />
       
                </div>
              </div>
  
              <div className="grid-two-item">
                <div className="subgrid-two">
                  
               
                  <PatientList user={user} role={role}/>
                  </div>
               
              </div>

          </div>



      </div>
    
   </>)
  }
}

export default ContentMain

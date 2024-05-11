import "./Transactions.css";
import { transactions } from "../../data/dataPatient";
import { iconsImgs } from "../../utils/images";
import profilepic from "../../assets/images/person_two.jpg";

const Transactions = ({user,role}) => {
  console.log("user From Transactions:",user['name'])
  if (role == "Patient") {
    return (
      <div className="grid-one-item grid-common grid-c2 " >
        <div className="grid-c-title">
          <h3 className="grid-c-title-text">Profile Details</h3>
          <button className="grid-c-title-icon">
            <img src={iconsImgs.plus} />
          </button>
        </div>

        <div className="grid-content">
          <div className="grid-items">
            {
              <div className="grid-item">
                <div className="grid-item-l">
                  <div className="avatar img-fit-cover">
                    <img src={profilepic} alt="" />
                  </div>
                  <p className="text">
                    {" "}
                    {user['name']}<span> </span>
                  </p>
                </div>
                <div className="grid-item-r">
                  <span className="text-scarlet"> No Medications</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  } else if (role == "Doctor") {
    return (
      <div className="grid-one-item grid-common grid-c2 ">
        <div className="grid-c-title">
          <h3 className="grid-c-title-text">Profile Details</h3>
          <button className="grid-c-title-icon">
            <img src={iconsImgs.plus} />
          </button>
        </div>

        <div className="grid-content ">
          <div className="grid-items">
            {
              <div className="grid-item">
                <div className="grid-item-l">
                  <div className="avatar img-fit-cover">
                    <img  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286" alt="" />
                  </div>
                  <p className="text"> Dr.{user['name']} </p>
                </div>
             
                <div className="grid-item-r">
                  <span className="text-scarlet"> Supervising {user['numOfPatients']} patients</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
   else if (role == "Admin") {
    return (
      <div className="grid-one-item grid-common grid-c2 ">
        <div className="grid-c-title">
          <h3 className="grid-c-title-text">Profile Details</h3>
          <button className="grid-c-title-icon">
            <img src={iconsImgs.plus} />
          </button>
        </div>

        <div className="grid-content ">
          <div className="grid-items">
            {
              <div className="grid-item">
                <div className="grid-item-l">
                  <div className="avatar img-fit-cover">
                    <img  src="https://images.unsplash.com/flagged/photo-1573603867003-89f5fd7a7576?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                  </div>
                  <p className="text"> Dr. Nashaat Amir </p>
                </div>
             
         
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
};

export default Transactions;

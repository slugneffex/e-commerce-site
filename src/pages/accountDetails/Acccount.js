import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./accountDetails.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");

  return (
    <>
      <HomeLayout>
        <section className="section pb-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3 first">
                <Sidebar />
              </div>

              <div className="col-md-9">
                <div className="card">
                  <div className="row">
                    <div className="col-md-3" id="edit-button">
                      <img
                        src="./assets/img/accountImg/Group_2388.png"
                        style={{ width: "200px", height: "200px" }}
                        alt='imgg'
                      />
                    </div>
                    <div className="col-md-6 second">
                      <h5 className="changePassword">{name}</h5>
                      <p>Email: {email}</p>
                      <p>Phone: {phone}</p>
                      <div className="changePassword" id="changePass">
                        <i className="bi bi-lock-fill"></i>
                        <h6>Change Password</h6>
                      </div>
                    </div>
                    <div className="col-md-3 ">
                      <div className=" edits d-flex">
                        <h6>
                          Edit <i className="bi bi-pen"></i>{" "}
                        </h6>
                      </div>
                      <h6 className="edit d-flex">
                        <span className="green">Verified</span>
                        <img
                          src="./assets/img/verified.png"
                          width="25px"
                          height="25px"
                          alt='imgg'
                        />
                      </h6>
                    </div>
                    <div>
                      <button
                        style={{ marginTop: "2rem" }}
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("id");
                          localStorage.removeItem("name");
                          localStorage.removeItem("phone");
                          localStorage.removeItem("email");
                          alert("Logout Successfull");
                          navigate("/");
                        }}
                      >
                        logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </HomeLayout>
    </>
  );
};

export default Account;

import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./accountDetails.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  // const user_id = localStorage.getItem("id");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");

  return (
    <>
      <HomeLayout>
        <section class="section pb-5 pt-5">
          <div class="container">
            <div class="row">
              <div class="col-md-3 first">
                <Sidebar />
              </div>

              <div class="col-md-9">
                <div class="card">
                  <div class="row">
                    <div class="col-md-3">
                      <img
                        src="./assets/img/accountImg/Group_2388.png"
                        style={{ width: "200px", height: "200px" }}
                        alt='imgg'
                      />
                    </div>
                    <div class="col-md-6 second">
                      <h5 class="changePassword">{name}</h5>
                      <p>Email: {email}</p>
                      <p>Phone: {phone}</p>
                      <div class="changePassword" id="changePass">
                        <i className="bi bi-lock-fill"></i>
                        <h6>Change Password</h6>
                      </div>
                    </div>
                    <div class="col-md-3 ">
                      <div class=" edits d-flex">
                        <h6>
                          Edit <i class="bi bi-pen"></i>{" "}
                        </h6>
                      </div>
                      <h6 class="edit d-flex">
                        <span class="green">Verified</span>
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

import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./accountDetails.css";
import Sidebar from "./Sidebar";
import axios from "axios";

const Address = () => {
  const [address, setAddress] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("/getAddress", options);
      setAddress(response.data);
    }
    fetchData();
  }, [token]);
  return (
    <>
      <HomeLayout>
        <section className="section pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3 first">
                <Sidebar />
              </div>
              <div className="col-md-9 ">
                <div className="row" >
                  <div className="col-md-9" id="address-bar">
                    <h4>MY ADDRESSES</h4>
                  </div>
                  <div className="col-md-3">
                    <a href="#/" className="add-address">
                      <h6>+ ADD A NEW ADDRESS</h6>
                    </a>
                  </div>
                </div>
                <div class="row">
                  
                    <div class="col-md-6">
                    <div class="card" id="addresscard">
                      <div class="row">
                        <div class="col-md-10">
                          <h6>Mayank Rawat</h6>
                          <p>ABC Apartment, 1007,
                            Flat No-5,<br /> Sector-21A
                            Faridabad, Haryana, 212001 India
                          </p>
                          <p>Phone Number:000000000</p>
                        </div>
                        <div class="col-md-2 d-flex">
                          <i class="bi bi-pencil-square pencils"></i><i class="bi bi-trash3-fill"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                    <div class="col-md-6">
                    <div class="card" id="addresscard">
                      <div class="row">
                        <div class="col-md-10">
                          <h6>Mayank Rawat</h6>
                          <p>ABC Apartment, 1007,
                            Flat No-5,<br /> Sector-21A
                            Faridabad, Haryana, 212001 India
                          </p>
                          <p>Phone Number:000000000</p>
                        </div>
                        <div class="col-md-2 d-flex">
                          <i class="bi bi-pencil-square pencils"></i><i class="bi bi-trash3-fill"></i>
                        </div>
                      </div>
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

export default Address;

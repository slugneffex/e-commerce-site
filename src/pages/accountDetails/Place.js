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
                <div className="row">
                  <div className="col-md-7">
                    <h4>MY ADDRESSES</h4>
                  </div>
                  <div className="col-md-5">
                    <a href="#/" className="add-address">
                      <h6>+ ADD A NEW ADDRESS</h6>
                    </a>
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-md-6 accountAddress">
                    {address.map((e) => (
                      <div className="card-address accountAddress">
                        <div className="row ">
                          <div className="col-md-10">
                            <h6>{e.user?.name}</h6>
                            <p>
                            {e.address}
                              <br /> 
                            </p>
                            <p>Phone Number:000000000</p>
                          </div>
                          <div className="col-md-2 d-flex">
                            <i className="bi bi-pencil-square pencils"></i>
                            <i className="bi bi-trash3-fill"></i>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* <div className="card-address ">
                      <div className="row">
                        <div className="col-md-10">
                          <h6>Mayank Rawat</h6>
                          <p>
                            ABC Apartment, 1007, Flat No-5,
                            <br /> Sector-21A Faridabad, Haryana, 212001 India
                          </p>
                          <p>Phone Number:000000000</p>
                        </div>
                        <div className="col-md-2 d-flex">
                          <i className="bi bi-pencil-square pencils"></i>
                          <i className="bi bi-trash3-fill"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 accountAddress"> */}
                    <div className="card-address accountAddress">
                      <div className="row">
                        <div className="col-md-10">
                          <h6>Manish Tiwari</h6>
                          <p>
                            ABC Apartment, 1007, Flat No-5,
                            <br /> Sector-21A Faridabad, Haryana, 212001 India
                          </p>
                          <p>Phone Number:000000000</p>
                        </div>
                        <div className="col-md-2 d-flex">
                          <i className="bi bi-pencil-square pencils"></i>
                          <i className="bi bi-trash3-fill"></i>
                        </div>
                      </div>
                    </div>
                    <div className="card-address">
                      <div className="row">
                        <div className="col-md-10">
                          <h6>Sourav Mishra</h6>
                          <p>
                            ABC Apartment, 1007, Flat No-5,
                            <br /> Sector-21A Faridabad, Haryana, 212001 India
                          </p>
                          <p>Phone Number:000000000</p>
                        </div>
                        <div className="col-md-2 d-flex">
                          <i className="bi bi-pencil-square pencils"></i>
                          <i className="bi bi-trash3-fill"></i>
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

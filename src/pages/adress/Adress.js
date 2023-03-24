import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import "./adress.css";
import axios from "axios";

const Adress = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/address");
    }
  });

  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  // get all state
  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      };
      const response = await axios.get("getState", options);
      setState(response.data);
    }
    fetchData();
  }, []);

  // get all city by stateid
  const handleStateChange = (event) => {
    const selectedID = event.target.value;
    setSelectedState(selectedID);

    const url = "/get-city-by-state";

    axios
      .post(
        url,
        {
          state_id: selectedID,
        },
        {
          headers: {
            "X-Authorization":
              "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
          },
        }
      )
      .then((res) => {
        setCities(res.data.cities);
      });
  };

  return (
    <HomeLayout>
      <section className="address">
        <div className="container">
          <div className="row text-center py-5" id="progessbarRow">
            <ul className="" id="progressbarrr">
              <div className="col-md-4 col-sm-4">
                <Link to="/Cart" className="bagLink">
                  <li id="bag">Bag</li>
                </Link>
              </div>
              <div className="col-md-4 col-sm-4">
                <Link to="/payment" className="bagLink">
                  <li id="address">Payment</li>
                </Link>
              </div>
              <div className="col-md-4 col-sm-4">
                <li className="active" id="payment">
                  Address
                </li>
              </div>
            </ul>
          </div>
          <hr />
          <div className="row py-5">
            <div className="col-md-8">
              <h1 className="head-h1">Enter Shipping Address</h1>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <div className="address-card">
                <div className="addressCard-head">
                  <h3 className="heading">Contact Details</h3>
                </div>
                <div className="addressCard-body">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Name*"
                      required
                      className="form-control"
                    />
                    <input
                      type="number"
                      placeholder="Mobile No*"
                      required
                      max="10"
                      min="10"
                      className="form-control"
                    />
                    <input
                      type="email"
                      placeholder="Email*"
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="addressCard-head">
                  <h3 className="heading">Address</h3>
                </div>
                <div className="addressCard-body">
                  <div className="form-group">
                    <input
                      type="number"
                      name="postal-code"
                      required
                      placeholder="Pin Code*"
                      className="form-control"
                    />
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Address (House No, Building Street, Area)*"
                      className="form-control"
                    />
                    <input
                      type="text"
                      name="locality"
                      required
                      placeholder="Locality / Town*"
                      className="form-control"
                    />
                    <div className="row">
                      <div className="col-6">
                        <select
                          name="state_id"
                          required
                          className="form-control"
                          value={selectedState}
                          onChange={handleStateChange}
                        >
                          <option value="null">State</option>
                          {state.map((e) => (
                            <option value={e.id} key={e.id}>
                              {e.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6">
                        <select
                          name="city_id"
                          required
                          className="form-control"
                        >
                          <option value="null">City</option>
                          {cities.map((e) => (
                            <option value="faridabad" key={e.id}>
                              {e.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="addressCard-head">
                  <h3 className="heading">Save Address As</h3>
                </div> */}
                <div className="addressCard-body">
                  {/* <div className="row">
                    <div className="col-4">
                      <div className="form-group">
                        <label for="addres_type" className="form-label">
                          Home
                        </label>
                        <input
                          type="radio"
                          name="addres_type"
                          value="home"
                          className="form-check-input"
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label for="addres_type" className="form-label">
                          Work
                        </label>
                        <input
                          type="radio"
                          name="addres_type"
                          value="work"
                          className="form-check-input"
                        />
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* <div className="addressCard-body">
                  <div className="lastform-sec">
                    <div className="form-group">
                      <input
                        type="checkbox"
                        name=""
                        className="form-check-input"
                        id=""
                      />
                      <label for="" className="form-label">
                        Make this my default address
                      </label>
                    </div>
                    <Link to="/" className="btn-2">
                      Save Address
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-md-4">
              <div className="overview-card">
                <div className="overview-card-head">
                  <h3>Order Summary</h3>
                </div>
                <div className="overview-card-body">
                  <h6>Bill Details (6 Items)</h6>

                  <ul className="price-breakup">
                    <li className="price-type">
                      <p>Total Price (Incl Taxes)</p>
                      <span>₹ 899</span>
                    </li>
                    <li className="price-type">
                      <p>Total Discount</p>
                      <span style={{ color: "#009444" }}>- ₹ 899</span>
                    </li>
                    <li className="price-type">
                      <p>Coupon Discount (COUPON-CODE)</p>
                      <span style={{ color: "#009444" }}>- ₹ 899</span>
                    </li>
                    <li className="price-type">
                      <p>Shipping</p>
                      <span style={{ color: "#009444" }}>₹ 50</span>
                    </li>
                  </ul>
                  <span>
                    Hurray! You Saved <strong>₹ 650</strong> On This Order
                  </span>
                </div>
                <hr />
                <div className="overview-card-footer">
                  <div className="total-sec">
                    <p className="total">Total</p>
                    <span className="total">₹ 650</span>
                  </div>
                  <div className="extras">
                    <p> 3 Item | ₹ 650</p>
                    <Link to="/" className="btn">
                      Place Your Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {/* <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="heading">
                <h1>Your Addresses (3)</h1>
                <Link to="/">+ Add A New Address</Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="userAddress-card active">
                <div className="row">
                  <div className="col-2 text-center">
                    <div className="card-head">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="card-body">
                      <h6>Rohit Manchanda</h6>
                      <p>
                        ABC Apartment, 1007, Flat No-5, Sector-21A Faridabad,
                        Haryana, 121001, India
                      </p>
                      <p>Phone Number :- XXXXX56789</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card-footer">
                      <div className="actions">
                        <i className="bi bi-pencil-square"></i>
                        <i className="bi bi-trash3"></i>
                      </div>
                      <div className="form-group mt-5">
                        <input
                          type="radio"
                          name="default"
                          id=""
                          className="form-checkbox-input"
                        />
                        <label for="">Make Default</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="userAddress-card">
                <div className="row">
                  <div className="col-2 text-center">
                    <div className="card-head">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="card-body">
                      <h6>Rohit Manchanda</h6>
                      <p>
                        ABC Apartment, 1007, Flat No-5, Sector-21A Faridabad,
                        Haryana, 121001, India
                      </p>
                      <p>Phone Number :- XXXXX56789</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card-footer">
                      <div className="actions">
                        <i className="bi bi-pencil-square"></i>
                        <i className="bi bi-trash3"></i>
                      </div>
                      <div className="form-group mt-5">
                        <input
                          type="radio"
                          name="default"
                          id=""
                          className="form-checkbox-input"
                        />
                        <label for="">Make Default</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="userAddress-card">
                <div className="row">
                  <div className="col-2 text-center">
                    <div className="card-head">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="card-body">
                      <h6>Rohit Manchanda</h6>
                      <p>
                        ABC Apartment, 1007, Flat No-5, Sector-21A Faridabad,
                        Haryana, 121001, India
                      </p>
                      <p>Phone Number :- XXXXX56789</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card-footer">
                      <div className="actions">
                        <i className="bi bi-pencil-square"></i>
                        <i className="bi bi-trash3"></i>
                      </div>
                      <div className="form-group mt-5">
                        <input
                          type="radio"
                          name="default"
                          id=""
                          className="form-checkbox-input"
                        />
                        <label for="">Make Default</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="overview-card">
                <div className="overview-card-head">
                  <h3>Order Summary</h3>
                </div>
                <div className="overview-card-body">
                  <h6>Bill Details (6 Items)</h6>

                  <ul className="price-breakup">
                    <li className="price-type">
                      <p>Total Price (Incl Taxes)</p>
                      <span>₹ 899</span>
                    </li>
                    <li className="price-type">
                      <p>Total Discount</p>
                      <span style={{ color: "#009444" }}>- ₹ 899</span>
                    </li>
                    <li className="price-type">
                      <p>Coupon Discount (COUPON-CODE)</p>
                      <span style={{ color: "#009444" }}>- ₹ 899</span>
                    </li>
                    <li className="price-type">
                      <p>Shipping</p>
                      <span style={{ color: "#009444" }}>₹ 50</span>
                    </li>
                  </ul>
                  <span>
                    Hurray! You Saved <strong>₹ 650</strong> On This Order
                  </span>
                </div>
                <hr />
                <div className="overview-card-footer">
                  <div className="total-sec">
                    <p className="total">Total</p>
                    <span className="total">₹ 650</span>
                  </div>
                  <div className="extras">
                    <p> 3 Item | ₹ 650</p>
                    <Link to="/" className="btn">
                      Proceed To Pay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </HomeLayout>
  );
};

export default Adress;

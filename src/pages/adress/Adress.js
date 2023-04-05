import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import "./adress.css";
import axios from "axios";
import { useSelector } from "react-redux";

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

  // card Section
  // Single Product Cart

  const { singletotalCount } = useSelector((statee) => statee.SingleCart);

  const { singlesubAmount, singletotalAmount, singletotalDiscount } =
    useSelector((statee) => statee.SingleCart);

  // Combo Product Cart

  const { totalCount } = useSelector((state) => state.cart);
  const { subAmount, totalAmount, totalDiscount } = useSelector(
    (state) => state.cart
  );

  // Freebies cart section
  const { freebiesCount } = useSelector((state) => state.freebies);
  const { freebiestotalAmount } = useSelector((state) => state.freebies);

  const totalCartCount = totalCount + singletotalCount;

  let discount = 0;
  switch (true) {
    case singlesubAmount >= 1000 && singlesubAmount < 3000:
      discount = (singlesubAmount * 20) / 100;
      break;
    case singlesubAmount >= 3000 && singlesubAmount < 5000:
      discount = (singlesubAmount * 30) / 100;
      break;
    case singlesubAmount >= 5000 && singlesubAmount <= 10000:
      discount = (singlesubAmount * 40) / 100;
      break;
    case singlesubAmount >= 10000 && singlesubAmount <= 15000:
      discount = (singlesubAmount * 50) / 100;
      break;
    case singlesubAmount >= 15000 && singlesubAmount <= 20000:
      discount = (singlesubAmount * 60) / 100;
      break;
    case singlesubAmount >= 20000 && singlesubAmount <= 100000:
      discount = (singlesubAmount * 100) / 100;
      break;
    default:
      discount = 0;
      break;
  }

  // Total Pricing of products
  let ExtraFreebiesAmount = freebiestotalAmount - discount;
  const shippingAmount = 50;

  const totalCartAmount = totalAmount + singletotalAmount;
  const totalCartDiscount = totalDiscount + singletotalDiscount + discount;
  const totalCartSubAmount =
    subAmount + singlesubAmount + ExtraFreebiesAmount + shippingAmount;

  // Extra freebies amount

  let ExtraFreebiesAmountSection = null;
  if (freebiestotalAmount > discount) {
    ExtraFreebiesAmountSection = (
      <li className="price-type">
        <p>Extra Freebie Amount</p>
        <span>₹{parseFloat(ExtraFreebiesAmount).toFixed(0)}</span>
      </li>
    );
  }

  // if discount is 0 then hide the section

  let discountSection = null;
  if (totalCartDiscount > 0) {
    discountSection = (
      <li className="price-type">
        <p>Total Discount</p>
        <span style={{ color: "#009444" }}>
          - ₹{parseFloat(totalCartDiscount).toFixed(0)}
        </span>
      </li>
    );
  }

  // Hurry discount section

  let hurrryDiscountSection = null;
  if (totalCartDiscount > 0) {
    hurrryDiscountSection = (
      <span>
        Hurray! You Saved{" "}
        <strong>₹{parseFloat(totalCartDiscount).toFixed(0)}</strong> On This
        Order
      </span>
    );
  }

  // Shipping amount less than 499

  let shippingAmountSection = null;

  if (totalCartSubAmount < 499) {
    shippingAmountSection = (
      <li className="price-type">
        <p>Shipping</p>
        <span style={{ color: "#009444" }}>₹ {shippingAmount}</span>
      </li>
    );
  }

  

  return (
    <HomeLayout>
      <section className="address">
        <div className="container">
          <div className="row text-center " id="progessbarRow">
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
               
              

              
              </div>
            </div>
            <div className="col-md-4 mt-5">
              <div className="overview-card">
                <div className="overview-card-head">
                  <h3>Order Summary</h3>
                </div>
                <div className="overview-card-body">
                  <h6>
                    Bill Details {totalCartCount} Items ({freebiesCount} Free)
                  </h6>

                  <ul className="price-breakup">
                    <li className="price-type">
                      <p>Total Price (Incl Taxes)</p>
                      <span>₹{parseFloat(totalCartAmount).toFixed(0)}</span>
                    </li>
                    {ExtraFreebiesAmountSection}
                    {discountSection}
                    {shippingAmountSection}
                    <li className="price-type">
                      <p>Subtotal</p>
                      <span>₹{parseFloat(totalCartSubAmount).toFixed(0)}</span>
                    </li>
                  </ul>
                  {hurrryDiscountSection}
                </div>
                <hr />
                <div className="overview-card-footer">
                  <div className="total-sec">
                    <p className="total">Total</p>
                    <span className="total">
                      ₹{parseFloat(totalCartSubAmount).toFixed(0)}
                    </span>
                  </div>
                  <div className="extras">
                    <p>
                      {" "}
                      {totalCartCount} Item ({freebiesCount} Free) | ₹
                      {parseFloat(totalCartSubAmount).toFixed(0)}
                    </p>
                    <Link to="/address" className="btn">
                      Proceed To Pay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        
      </section>
    </HomeLayout>
  );
};

export default Adress;

import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Link } from "react-router-dom";
import './payment.css'

const Payment = () => {
  return (
    <>
      <HomeLayout>
        <section className="payment">
          <div className="container">
          <div className="row text-center py-5" id="progessbarRow">
            <ul className="" id="progressbarr" style={{marginTop:'8rem'}}>
              <div className="col-md-4 col-sm-4" >
                <Link to="/Cart" className="bagLink">
                  <li id="bag">Bag</li>
                </Link>
              </div>
              <div className="col-md-4 col-sm-4">
                <Link to='/payment' className="active" >
                <li  id="address">
                  Payment
                </li>
                </Link>
              </div>
              <div className="col-md-4 col-sm-4">
                <li  id="payment">Address</li>
              </div>
            </ul>
          </div>
            <hr />
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <input
                          type="radio"
                          name="payment_type"
                          id
                          className="form-check-input"
                        />
                        <label htmlFor="payment_type" className="form-label" style={{ marginLeft: "1rem" }}>
                          Online Payment
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4 text-center">
                      <img src="./assets/img/paymentSection/Group_1735.png" alt="paymentOptions" width="60%" style={{ marginLeft: 0 }} />
                    </div>
                    <div className="col-md-4 text-center">
                      <i className="bi bi-arrow-right" />
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          type="radio"
                          name="payment_type"
                          id
                          className="form-check-input"
                        />
                        <label htmlFor="payment_type" className="form-label" style={{ marginLeft: "1rem" }}>
                          Cash On Delivery
                        </label>
                        <br />
                        <span>This order is eligible for COD</span>
                      </div>
                    </div>
                    <div className="col-3 text-center">
                      <i className="bi bi-arrow-right" />
                    </div>
                  </div>
                </div>
                <div className="row my-5">
                  <div className="col-md-6">
                    <div className="go-back">
                      <a href>
                        <i className="bi bi-chevron-left" />
                        Go Back
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <a href className="btn_1">
                      Proceed To Pay
                    </a>
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
                      <Link to='/adress' className="btn">
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
    </>
  );
};

export default Payment;

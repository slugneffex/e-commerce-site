import React from "react";
import HomeLayout from "../../layouts/HomeLayout";

import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <div>
      <div class="container-fluid thanks">
        <div class="row">
          <div class="col-md-6">
            <div class="col-md-10 thank">
              <h3 class="mb-5">Choose your Payment Method</h3>
              <div class=" card">
                <div class="card-body">
                  <div class="col-md-8 d-flex">
                    <div class="col-md-6">
                      <input
                        type="radio"
                        name="payment_method"
                        value="razorpay"
                        id="payment_type"
                        class="form-check-input"
                        required=""
                      />
                      <label for="payment_method">Online Payment</label>
                    </div>

                    <div class="col-md-2 d-flex">
                      <img
                        src="https://www.combonation.in/assets_new/img/online_methods.png"
                        alt="payment-methods"
                        width="161px"
                        height="84px"
                      />
                      <div class="col-md-2">
                        <i class="icon bi bi-arrow-right icons"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-body">
                  <div class="col-md-10 d-flex">
                    <div class="col-md-8">
                      <input
                        type="radio"
                        name="payment_method"
                        value="cod"
                        id="cod"
                        class="form-check-input"
                        required=""
                      />
                      <label for="payment_method">Cash on Delivery</label>
                    </div>
                    <div class="col-md-2">
                      <i class="icon bi bi-arrow-right ic"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>

          <div class="col-md-6 mt-5">
            <div class="overview-card">
              <div class="overview-card-head ">
                <h3>Order Summary</h3>
              </div>

              <div class="overview-card-body">
                <p>Bill Details (1 Items)</p>

                <ul class="price-breakup">
                  <li class="price-type d-flex">
                    <p>Total MRP (Incl Taxes)</p>
                    <span>₹ 1938</span>
                  </li>
                  <li class="price-type d-flex">
                    <p>Subtotal</p>
                    <span style={{ color: "#009444" }}> ₹ 969</span>
                  </li>
                  <li class="price-type d-flex">
                    <p>Total Discount</p>
                    <span style={{ color: "#009444" }}> ₹ 969</span>
                  </li>

                  <li class="price-type d-flex">
                    <p>Shipping</p>
                    <span style={{ color: "#009444" }}>
                      <del>₹ 50</del> Free
                    </span>
                  </li>
                </ul>
                <span>
                  Hurray! You Saved{" "}
                  <strong>
                    {" "}
                    <span style={{ color: "#fe9e2d" }}>₹ 969</span>
                  </strong>{" "}
                  On This Order
                </span>
              </div>
              <hr />
              <div class="overview-card-footer ">
                <div class="total-sec d-flex">
                  <p class="total">Total</p>
                  <span class="total">₹ 969</span>
                </div>
                <div class="extras" id="buttonPlace">
                  <Link to="/adress">Add Delivery Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

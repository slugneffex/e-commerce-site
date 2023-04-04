import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getCartProducts,
  getSubTotal,
  removeCartItem,
  getCartCount,
  calculateTax,
  getTotalAmount,
  getTotalDiscount,
} from "../../components/features/useCartSlice";

import {
  getsingleCartProducts,
  removesingleCartItem,
  getsingleCartCount,
  getsingleTotalDiscount,
  getsingleTotalAmount,
  getsingleSubTotal,
} from "../../components/features/SingleCartSlice";
import { clearCart } from "../../components/features/freebiesCartSlice";

const Cart = () => {
  // Combo Product Cart
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalCount } = useSelector((state) => state.cart);
  const { cartItems, subAmount, totalAmount, totalDiscount } = useSelector(
    (state) => state.cart
  );
  useEffect(() => {
    dispatch(getCartProducts());
    dispatch(getSubTotal());
    dispatch(getCartCount());
    dispatch(getTotalAmount());
    dispatch(getTotalDiscount());
  }, [dispatch]);

  // Single Product Cart

  const { singletotalCount } = useSelector((statee) => statee.SingleCart);

  const {
    singleCartItems,
    singlesubAmount,
    singletotalAmount,
    singletotalDiscount,
  } = useSelector((statee) => statee.SingleCart);

  localStorage.setItem("singleSubAmount", singlesubAmount);

  useEffect(() => {
    dispatch(getsingleCartProducts());
    dispatch(getsingleSubTotal());
    dispatch(getsingleCartCount());
    dispatch(getsingleTotalAmount());
    dispatch(getsingleTotalDiscount());
  }, [dispatch]);

  // If cart is empty
  const totalCartCount = totalCount + singletotalCount;

  if (totalCartCount === 0) {
    navigate("/EmptyCart");
  }

  // ADD TO WISHLIST

  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  function wishlistData(id) {
    const data = {
      user_id: user_id,
      combo_id: id,
    };

    axios
      .post("/add-to-wishlist", data, {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert(res.data.message);
      });
  }

  // Clear freebies array if custom combo below 1000

  // IF comboSection cart ===1 then i have to show the section

  let ComboSection = null;
  if (totalCount >= 1) {
    ComboSection = (
      <div className="cartCard">
        <div className="cart-type">
          <h3>Pre Curated Combo</h3> <span>(Total {totalCount} Items)</span>
        </div>
        <div
          className="cart-card"
          style={{ backgroundColor: "#FFFFFF", padding: "1rem" }}
        >
          <ul className="cart-list">
            {cartItems.map((product, index) => (
              <li className="cart-item" key={product.id}>
                <div className="row">
                  <div className="col-3">
                    <Link to={`/combo/${product.id}`}>
                      <img src={product.image} alt={product.title} />
                    </Link>
                  </div>

                  <div className="col-6">
                    <div className="det">
                      <Link to={`/combo/${product.id}`}>
                        <h6>{product.title}</h6>
                      </Link>

                      <br />
                      <div className="form-group">
                        <select name="" id="">
                          {/* Qty
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option> */}
                        </select>
                        {/* <span>Only 2 Left</span> */}
                      </div>
                      <div className="price-sec">
                        <del className="mrp">₹{product.mrp}</del>
                        <span className="sp">₹{product.price}</span>
                        {/* <div className="youSave">
                                    <span>Total Saving ₹ {product.discount}</span>
                                  </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="actions">
                      <i
                        className="bi bi-trash"
                        onClick={() => {
                          dispatch(removeCartItem(product.id));
                          dispatch(getSubTotal());
                          dispatch(getCartCount());
                          dispatch(calculateTax());
                          dispatch(getTotalAmount());
                          dispatch(getTotalDiscount());
                        }}
                        style={{ cursor: "pointer" }}
                      ></i>
                      <i
                        className="bi bi-heart"
                        onClick={() => wishlistData(product.id)}
                      ></i>
                    </div>
                  </div>
                </div>
              </li>
            ))}

            <hr />
            <div className="pt-3">
              <div className="row">
                <div
                  className="col-md-6"
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span className="term">Precurated Total :-</span>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span>₹ {parseFloat(totalAmount).toFixed(0)}</span>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span className="term">Precurated Discount :-</span>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span>₹ {parseFloat(totalDiscount).toFixed(0)}</span>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span className="term">Payble Amount :-</span>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span>₹ {parseFloat(subAmount).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    );
  }

  // For freebies discount part

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
  const { freebiestotalAmount } = useSelector((state) => state.freebies);
  let ExtraFreebiesAmount = freebiestotalAmount - discount;
  const shippingAmount = 50;

  const totalCartAmount = totalAmount + singletotalAmount;
  const totalCartDiscount = totalDiscount + singletotalDiscount + discount;
  const totalCartSubAmount =
    subAmount + singlesubAmount + ExtraFreebiesAmount + shippingAmount;

  // if custom combo amount is less than 1000 then delete freebies aaray
  useEffect(() => {
    if (singlesubAmount < 1000) {
      dispatch(clearCart());
    }
  }, [singlesubAmount, dispatch]);

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

  //  Freebies Section

  let freebiesDiscountSection = null;

  if (singlesubAmount >= 1000) {
    freebiesDiscountSection = (
      <li className="desktop" style={{ padding: "1rem" }}>
        <div className="signalCart">
          <div className="col-2">
            <img
              src="./assets/img/percent-star.png"
              alt="discountImg"
              width="75px"
              height="75px"
            />
          </div>
          <div className="col-10">
            <h3>
              <strong>Hurray !</strong> You are Eligible To Add Freebies{" "}
              <span>Upto ₹ {parseFloat(discount).toFixed(0)}</span>
            </h3>
            <Link to="/freebies" className="btn_1">
              Add Freebies Now <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </li>
    );
  }

  // If Single cart===1 then i have to show the section

  let freebiesUptoSection = null;

  if (singlesubAmount < 1000) {
    freebiesUptoSection = (
      <li style={{ padding: "1rem" }}>
        <div className="signalCart">
          <div className="col-2">
            <img
              src="./assets/img/percent-star.png"
              alt="discountImg"
              width="75px"
              height="75px"
            />
          </div>
          <div className="col-10">
            <h3>
              <strong>Add More Products For More Savings !</strong> And Get{" "}
              <span>Upto 70% OFF</span>
            </h3>
          </div>
        </div>
      </li>
    );
  }

  let SingleCartSection = null;

  if (singletotalCount >= 1) {
    SingleCartSection = (
      <div className="cartCard py-5">
        <div className="cart-type">
          <h3>Custom Combo</h3> <span>(Total {singletotalCount} Items)</span>
        </div>
        <div className="cart-card" style={{ backgroundColor: "#FFFFFF" }}>
          <ul className="cart-list">
            {singleCartItems.map((products, Singleindex) => (
              <li className="cart-item" key={products.id}>
                <div className="row">
                  <div className="col-3">
                    <img src={products.image} alt="W" />
                  </div>
                  <div className="col-6">
                    <div className="det">
                      <h6>{products.title}</h6>
                      <br />
                      <div className="form-group">
                        <select name="" id="">
                          Qty
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                        {/* <span>Only 2 Left</span> */}
                      </div>
                      <div className="price-sec">
                        {/* <del className="mrp">₹ 899</del> */}
                        <span className="sp">₹ {products.price}</span>
                        {/* <div className="youSave">
                                    <span>Total Saving ₹ 599</span>
                                  </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="actions">
                      <i
                        className="bi bi-trash"
                        onClick={() => {
                          dispatch(removesingleCartItem(products.id));
                          dispatch(getsingleCartCount());
                          dispatch(getsingleTotalAmount());
                          dispatch(getsingleTotalDiscount());
                          dispatch(getsingleSubTotal());
                        }}
                        style={{ cursor: "pointer" }}
                      ></i>
                      <i className="bi bi-heart"></i>
                    </div>
                  </div>
                </div>
              </li>
            ))}

            <hr />

            <div className="pt-3">
              <div className="row">
                <div
                  className="col-md-6"
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span className="term">BYOC Total :-</span>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span>₹ {parseFloat(singletotalAmount).toFixed(0)}</span>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span className="term">BYOC Discount :-</span>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span>₹ {parseFloat(singletotalDiscount).toFixed(0)}</span>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span className="term">Payble Amount :-</span>
                </div>
                <div
                  className="col-md-6"
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span>₹ {parseFloat(singlesubAmount).toFixed(0)}</span>
                </div>
              </div>
            </div>

            <hr />
            <li className="cart-item" >
              <div className="row">
                <div className="col-3">
                  <a href="#" className="cart-item-img">
                    <img className="freebieFreeImg" />
                      <img />
                      </a>
                    </div>
                    <div class="col-6">
                      <div className="det">
                        <a href="https://www.combonation.in/combo/manestream-fenusmooth-frizzy-hair-treatment-&amp;-hair-shine-kit-300-ml">
                          <h6>Manestream Fenusmooth Fri...</h6>
                        </a>
                        <br />

                          <div className="price-sec">
                            <del class="sp">₹ 1045</del>
                            <span class="sp">Free</span>

                          </div>
                      </div>
                    </div>
                    <div class="col-3">
                      <div class="actions">
                        <div class="editFreebie">
                          <a href="/freebies"><i class="bi bi-pencil-square"></i></a>
                        </div>
                      </div>
                    </div>
                </div>
            </li>
          </ul>




          {/* for freebies */}
          {freebiesDiscountSection}

          {/* It is for add more product for more saving and get 70 % OFF */}
          {freebiesUptoSection}
        </div>

      </div>
    );
  }

  return (
    <>
      <HomeLayout>
        <section className="cart" style={{ margin: "0" }}>
          <div className="container">
            <div className="row text-center" id="progessbarRow">
              <ul className="" id="progressbar">
                <div className="col-md-4 col-sm-4">
                  <li className="active" id="bag">
                    Bag
                  </li>
                </div>
                <div className="col-md-4 col-sm-4">
                  <li id="payment">Payment</li>
                </div>
                <div className="col-md-4 col-sm-4">
                  <li id="address">Address</li>
                </div>
              </ul>
            </div>

            <hr />
            <div className="row"></div>

            <div className="row mt-5">
              <div className="col-md-8">
                {ComboSection}
                {SingleCartSection}
              </div>
              <div className="col-md-4 mt-5">
                <div className="overview-card">
                  <div className="overview-card-head">
                    <h3>Order Summary</h3>
                  </div>
                  <div className="overview-card-body">
                    <h6>Bill Details ({totalCartCount} Items)</h6>

                    <ul className="price-breakup">
                      <li className="price-type">
                        <p>Total Price (Incl Taxes)</p>
                        <span>₹{parseFloat(totalCartAmount).toFixed(0)}</span>
                      </li>
                      <li className="price-type">
                        <p>Subtotal</p>
                        <span>
                          ₹{parseFloat(totalCartSubAmount).toFixed(0)}
                        </span>
                      </li>
                      {discountSection}

                      {ExtraFreebiesAmountSection}
                      {shippingAmountSection}
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
                        {totalCartCount} Item | ₹
                        {parseFloat(totalCartSubAmount).toFixed(0)}
                      </p>
                      <Link to="/payment" className="btn">
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

export default Cart;

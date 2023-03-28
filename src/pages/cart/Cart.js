import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
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
} from "../../components/features/SingleCartSlice";

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

  // const { singletotalCount } = useSelector((statee) => statee.SingleCart);

  const { singleCartItems } = useSelector((statee) => statee.SingleCart);

  useEffect(() => {
    dispatch(getsingleCartProducts());
    // dispatch(getSubTotal());
    dispatch(getsingleCartCount());
    // dispatch(getTotalAmount());
    // dispatch(getTotalDiscount());
  }, [dispatch]);

  // const totalCartCount = totalCount + singletotalCount;

  // if (totalCartCount === 0) {
  //   navigate("/EmptyCart");
  // }

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
                  <li id="address">Address</li>
                </div>
                <div className="col-md-4 col-sm-4">
                  <li id="payment">Payment</li>
                </div>
              </ul>
            </div>
            <hr />
            <div className="row"></div>

            <div className="row mt-5">
              <div className="col-md-8">
                <div className="cartCard">
                  <div className="cart-type">
                    <h3>Pre Curated Combo</h3>{" "}
                    <span>(Total {totalCount} Items)</span>
                  </div>
                  <div
                    className="cart-card"
                    style={{ backgroundColor: "#FFFFFF" }}
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
                                  <span>Only 2 Left</span>
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
                                <i className="bi bi-heart"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}

                      <hr />
                    </ul>
                  </div>
                </div>
                <hr />

                <div className="cartCard py-5">
                  <div className="cart-type">
                    <h3>Custom Combo</h3>{" "}
                    <span>(Total Items)</span>
                  </div>
                  <div
                    className="cart-card"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <ul className="cart-list">
                      {singleCartItems.map((products, Singleindex) => (
                        <li className="cart-item" key={products.pid}>
                          <div className="row">
                            <div className="col-3">
                              <img src={products.pimage} alt="W" />
                            </div>
                            <div className="col-6">
                              <div className="det">
                                <h6>{products.ptitle}</h6>
                                <br />
                                <div className="form-group">
                                  <select name="" id="">
                                    Qty
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                  </select>
                                  <span>Only 2 Left</span>
                                </div>
                                <div className="price-sec">
                                  <del className="mrp">₹ 899</del>
                                  <span className="sp">₹ 299</span>
                                  <div className="youSave">
                                    <span>Total Saving ₹ 599</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="actions">
                                <i
                                  className="bi bi-trash"
                                  onClick={() => {
                                    dispatch(removesingleCartItem(products.pid));
                                    dispatch(getsingleCartCount());
                                  }}
                                  style={{ cursor: "pointer" }}
                                ></i>
                                <i className="bi bi-heart"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-5">
                <div className="overview-card">
                  <div className="overview-card-head">
                    <h3>Order Summary</h3>
                  </div>
                  <div className="overview-card-body">
                    <h6>Bill Details ({totalCount} Items)</h6>

                    <ul className="price-breakup">
                      <li className="price-type">
                        <p>Total Price (Incl Taxes)</p>
                        <span>₹{parseFloat(totalAmount).toFixed(2)}</span>
                      </li>
                      <li className="price-type">
                        <p>Subtotal</p>
                        <span>₹{parseFloat(subAmount).toFixed(2)}</span>
                      </li>
                      <li className="price-type">
                        <p>Total Discount</p>
                        <span style={{ color: "#009444" }}>
                          - ₹{parseFloat(totalDiscount).toFixed(2)}
                        </span>
                      </li>
                      {/* <li className="price-type">
                        <p>Shipping</p>
                        <span style={{ color: "#009444" }}>₹ 50</span>
                      </li> */}
                    </ul>
                    <span>
                      Hurray! You Saved{" "}
                      <strong>₹{parseFloat(totalDiscount).toFixed(2)}</strong>{" "}
                      On This Order
                    </span>
                  </div>
                  <hr />
                  <div className="overview-card-footer">
                    <div className="total-sec">
                      <p className="total">Total</p>
                      <span className="total">
                        ₹{parseFloat(subAmount).toFixed(2)}
                      </span>
                    </div>
                    <div className="extras">
                      <p>
                        {" "}
                        {totalCount} Item | ₹{parseFloat(subAmount).toFixed(2)}
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

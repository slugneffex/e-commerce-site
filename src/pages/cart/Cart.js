import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
import {
  getfreebiesCartProducts,
  getfreebiesTotalAmount,
  getfreebiesCartCount,
} from "../../components/features/freebiesCartSlice";

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

  // const currentCartType = useSelector(
  //   (statee) => statee.SingleCart.singleCartItems[index].cartType
  // );

  // console.log(currentCartType);

  const {
    singleCartItems,
    singlesubAmount,
    singletotalAmount,
    singletotalDiscount,
  } = useSelector((statee) => statee.SingleCart);

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

  // free items
  const [cartlevel, setCartlevel] = useState([]);
  const [freeProduct7999, setFreeProduct7999] = useState(null);
  const [freeProduct8999, setFreeProduct8999] = useState(null);
  useEffect(() => {
    if (singlesubAmount >= 7999) {
      freecartAPI();
    }
  }, [singlesubAmount]);

  const freecartAPI = async () => {
    const options = {
      headers: {
        "X-Authorization": `${process.env.REACT_APP_HEADER}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        mode: "cors",
        credentials: "include",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cartlevels`,
        options
      );

      const levels = response.data.levels;

      // Check if total amount is greater than 7999
      if (singlesubAmount > 7999) {
        // Find the cart level with autoadd_amount equal to 7999
        const level7999 = levels.find(
          (level) => level.autoadd_amount === "7999"
        );

        if (level7999) {
          setFreeProduct7999(level7999.product);
          // Show the free product for autoadd_amount equal to 7999
          // showFreeProduct(level7999);
        }
      }

      // Check if total amount is greater than 8999
      if (singlesubAmount > 8999) {
        // Find the cart level with autoadd_amount equal to 8999
        const level8999 = levels.find(
          (level) => level.autoadd_amount === "8999"
        );

        if (level8999) {
          setFreeProduct8999(level8999.product);
          // Show the free product for autoadd_amount equal to 8999
          // showFreeProduct(level8999);
        }
      }

      setCartlevel(response.data);
      console.log(levels);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };



  // const freecartAPI = async () => {
  //   const options = {
  //     headers: {
  //       "X-Authorization": `${process.env.REACT_APP_HEADER}`,
  //       "Cache-Control": "no-cache, no-store, must-revalidate",
  //       mode: "cors",
  //       credentials: "include",
  //     },
  //   };
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/cartlevels`,
  //       options
  //     );

     
  //       setCartlevel(response.data);
  //       console.log(response.data.levels);

  //   } catch (error) {
  //     console.error("API call failed:", error);
  //   }
  // };

  // Freebies cart section
  const { freebiesCount } = useSelector((state) => state.freebies);
  const { freebiestotalAmount, freebiescartItems } = useSelector(
    (state) => state.freebies
  );

  useEffect(() => {
    dispatch(getfreebiesCartProducts());
    dispatch(getfreebiesCartCount());
    dispatch(getfreebiesTotalAmount());
  }, [dispatch]);

  // Total Pricing of products

  const ExtraFreebiesAmount = freebiestotalAmount - discount;

  let ExtraFreebiesAmountt = 0;
  if (ExtraFreebiesAmount > 0) {
    ExtraFreebiesAmountt = ExtraFreebiesAmount;
  } else if (ExtraFreebiesAmount < 0) {
    ExtraFreebiesAmountt = 0;
  }

  let shippingAmount = 50;

  const totalCartAmount = totalAmount + singletotalAmount;
  const totalCartDiscount = totalDiscount + singletotalDiscount;
  let totalCartSubAmount = subAmount + singlesubAmount + ExtraFreebiesAmountt;

  // if custom combo amount is less than 1000 then delete freebies aaray
  useEffect(() => {
    if (singlesubAmount < 1000) {
      dispatch(clearCart());
    }
  }, [singlesubAmount, dispatch]);

  // Shipping amount less than 499

  let shippingAmountSection = null;

  if (totalCartSubAmount < 499) {
    totalCartSubAmount += 50;
    shippingAmountSection = (
      <li className="price-type">
        <p>Shipping</p>
        <span style={{ color: "#009444" }}>₹ {shippingAmount}</span>
      </li>
    );
  } else {
    shippingAmount = 0;
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

  let ExtraFreebiesAmountCustomComboSection = null;

  if (freebiestotalAmount > discount) {
    ExtraFreebiesAmountCustomComboSection = (
      <>
        <div
          className="col-6"
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#30303",
          }}
        >
          <span className="term">Extra Freebie Amount :-</span>
        </div>
        <div
          className="col-6"
          style={{
            textAlign: "right",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#30303",
          }}
        >
          <span>₹ {parseFloat(ExtraFreebiesAmount).toFixed(0)}</span>
        </div>
      </>
    );
  }

  //  Freebies Section

  let freebiesDiscountSection = null;

  if (singlesubAmount >= 1000) {
    freebiesDiscountSection = (
      <li style={{ padding: "1rem" }}>
        {/*  desktop */}
        <div className="desktop">
          <div className="signalCart ">
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
        </div>

        {/*  mobile */}
        <div className="mobile">
          <div className="signalCart">
            <div className="col-2">
              <img
                src="./assets/img/percent-star.png"
                alt="discountImg"
                width="75px"
                height="75px"
              />
            </div>
            <div className="col-2"></div>
            <div className="col-8">
              <h3>
                <strong>Hurray !</strong> You are Eligible To Add Freebies{" "}
                <span>Upto ₹ {parseFloat(discount).toFixed(0)}</span>
              </h3>
              <Link to="/freebies" className="btn_1">
                Add Freebies Now <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
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
        {/* desktop */}
        <div className="desktop">
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
        </div>

        {/*  mobile */}
        <div className="mobile">
          <div className="signalCart">
            <div className="col-2">
              <img
                src="./assets/img/percent-star.png"
                alt="discountImg"
                width="75px"
                height="75px"
              />
            </div>
            <div className="col-2"></div>
            <div className="col-8">
              <h3>
                <strong>Add More Products For More Savings !</strong> And Get{" "}
                <span>Upto 70% OFF</span>
              </h3>
            </div>
          </div>
        </div>
      </li>
    );
  }

  // BYOC discount section

  let BYOCDiscountSection = null;
  if (singletotalDiscount > 0) {
    BYOCDiscountSection = (
      <>
        <div className="row">
          <div
            className="col-6"
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
            className="col-6"
            style={{
              textAlign: "right",
              fontWeight: "bold",
              fontSize: "20px",
              color: "#30303",
            }}
          >
            <span>₹ {parseFloat(singletotalDiscount).toFixed(0)}</span>
          </div>
        </div>
      </>
    );
  }

  // Freebies discount section

  let freebiesAmountSection = null;

  if (discount > 0) {
    freebiesAmountSection = (
      <>
        <div
          className="col-6"
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#30303",
          }}
        >
          <span className="term" style={{ color: "#fe9e2d" }}>
            Freebies Amount :-
          </span>
        </div>
        <div
          className="col-6"
          style={{
            textAlign: "right",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#30303",
          }}
        >
          <span style={{ color: "#fe9e2d" }}>
            ₹ {parseFloat(discount).toFixed(0)}
          </span>
        </div>
      </>
    );
  }

  let FreebiesCartDiscountSection = null;
  if (discount > 0) {
    FreebiesCartDiscountSection = (
      <li className="price-type">
        <p>Freebies Discount</p>
        <span style={{ color: "#009444" }}>
          - ₹{parseFloat(discount).toFixed(0)}
        </span>
      </li>
    );
  }

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
                          Qty
                          <option value="1">{product.quantity}</option>
                          {/* <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option> */}
                        </select>
                        {/* <span>Only 2 Left</span> */}
                      </div>
                      <div className="price-sec">
                        <del className="mrp">₹{product.mrp}</del>
                        <span className="sp">₹{product.price}</span>
                        <div
                          className="dis"
                          style={{
                            backgroundColor: "#fe9e2d",
                            color: "#ffffff",
                            fontSize: "1rem",
                            fontWeight: "normal",
                          }}
                        >
                          <span>{product.discount} % OFF</span>
                        </div>
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
                  className="col-6"
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
                  className="col-6"
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
                  className="col-6"
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span className="term" style={{ color: "#fe9e2d" }}>
                    Precurated Discount :-
                  </span>
                </div>
                <div
                  className="col-6"
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span style={{ color: "#fe9e2d" }}>
                    ₹ {parseFloat(totalDiscount).toFixed(0)}
                  </span>
                </div>
                <div
                  className="col-6"
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
                  className="col-6"
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

  const BYOCSubTotal = singlesubAmount + ExtraFreebiesAmountt;
  // single product cart section

  let SingleCartSection = null;

  if (singletotalCount >= 1) {
    SingleCartSection = (
      <div className="cartCard py-3">
        <div className="cart-type">
          <h3>Custom Combo</h3> <span>(Total {singletotalCount} Items)</span>
        </div>
        {/* for freebies */}
        {freebiesDiscountSection}

        {/* It is for add more product for more saving and get 70 % OFF */}
        {freebiesUptoSection}
        <div className="cart-card" style={{ backgroundColor: "#FFFFFF" }}>
          <ul className="cart-list">
            {singleCartItems.map((products, Singleindex) => (
              <li className="cart-item" key={products.id}>
                <div className="row">
                  <div className="col-3">
                    <Link to={`/product/${products.id}`}>
                      <img src={products.image} alt="W" />
                    </Link>
                  </div>

                  <div className="col-6">
                    <div className="det">
                      <Link to={`/product/${products.id}`}>
                        <h6>{products.title}</h6>
                      </Link>
                      <br />
                      <div className="form-group">
                        <select name="" id="">
                          Qty
                          <option value="1">{products.quantity}</option>
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

            <div className="pt-3 px-3">
              <div className="row">
                <div
                  className="col-6"
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
                  className="col-6"
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span>₹ {parseFloat(singletotalAmount).toFixed(0)}</span>
                </div>
                {BYOCDiscountSection}
                {freebiesAmountSection}

                {ExtraFreebiesAmountCustomComboSection}

                <div
                  className="col-6"
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
                  className="col-6"
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#30303",
                  }}
                >
                  <span>₹ {parseFloat(BYOCSubTotal).toFixed(0)}</span>
                </div>
              </div>
            </div>

            <hr />
            {freebiescartItems.map((e, index) => (
              <li className="cart-item" key={e.id}>
                <div className="row">
                  <div className="col-3">
                    <Link to="/freebies" className="cart-item-img">
                      <img className="freebieFreeImg" alt="freeImg" />
                      <img src={e.image} alt="freebiesImg" />
                    </Link>
                  </div>
                  <div className="col-6">
                    <div className="det">
                      <Link to="/freebies">
                        <h6>{e.title.substring(0, 40)}...</h6>
                      </Link>
                      <br />

                      <div className="price-sec">
                        <del className="sp">₹ {e.price}</del>
                        <span className="sp">Free</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="actions">
                      <div className="editFreebie">
                        <Link to="/freebies">
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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

              <div className="col-md-4 mt-5  overviewMobile">
                <div class="coupon-sec mb-3 text-center">
                  <div
                    class="coupon-card"
                    style={{
                      border: "5px dotted ",
                      width: "100%",
                      display: "flex",
                      borderColor: "#fe9e2d",
                    }}
                  >
                    <div class="card-head">
                      <div class="tag">
                        <i
                          class="bi bi-tag-fill"
                          style={{ fontSize: "30px" }}
                        ></i>
                      </div>
                      <div class="det">
                        <span class="use">Use Code</span>
                        <br />
                        <span>SIGNUP10</span>
                      </div>
                    </div>
                    <div class="vl"></div>
                    <div class="card-body text-center">
                      <div class="terms">
                        <p>SIGNUP10</p>
                      </div>
                      {/* <div class="offer">
                         <div class="form-group">
                        <form action="https://www.combonation.in/apply-coupon" method="POST">
                        <input type="hidden" name="_token" value="SszM7yPk6R7lrPkjriFCbqypf6GA3Y8v0XD5q55J" />  
                            <input type="text" name="code" value="" required="" hidden=""/>*/}
                      <button type="submit">
                        Apply Code <i class="bi bi-arrow-right"></i>
                      </button>
                      {/*</form>
                        </div>

                      </div>*/}
                    </div>
                  </div>
                </div>

                <div className="overview-card mb-3">
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
                      {FreebiesCartDiscountSection}
                      {shippingAmountSection}
                      <li className="price-type">
                        <p>Subtotal</p>
                        <span>
                          ₹{parseFloat(totalCartSubAmount).toFixed(0)}
                        </span>
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

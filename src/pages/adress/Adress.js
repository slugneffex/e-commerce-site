import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import "./adress.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../components/features/freebiesCartSlice";
import { clearSingleCart } from "../../components/features/SingleCartSlice";
import { clearComboCart } from "../../components/features/useCartSlice";

const Adress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/address");
  //   }
  // });

  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  // get all state
  useEffect(() => {
    async function fetchData() {
      setError(null);
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/getState`,
          options
        );
        setState(response.data);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = parseInt(error.response.headers["retry-after"]);
          setTimeout(() => {
            fetchData();
          }, retryAfter * 1000);
        } else {
          setError(error.message);
        }
      }
    }
    fetchData();
  }, []);

  // get all city by stateid
  const handleStateChange = (event) => {
    const selectedID = event.target.value;
    setSelectedState(selectedID);
    localStorage.setItem("state", selectedID);

    const url = `${process.env.REACT_APP_BASE_URL}/get-city-by-state`;

    axios
      .post(
        url,
        {
          state_id: selectedID,
        },
        {
          headers: {
            "X-Authorization": `${process.env.REACT_APP_HEADER}`,
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

  const {
    singlesubAmount,
    singletotalAmount,
    singletotalDiscount,
    singleCartItems,
  } = useSelector((statee) => statee.SingleCart);

  // Combo Product Cart

  const { totalCount } = useSelector((state) => state.cart);
  const { subAmount, totalAmount, totalDiscount, cartItems } = useSelector(
    (state) => state.cart
  );

  // Freebies cart section
  const { freebiesCount } = useSelector((state) => state.freebies);
  const { freebiestotalAmount, freebiescartItems } = useSelector(
    (state) => state.freebies
  );

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

  if (error) {
    console.log(error);
  }

  // place order for non login users
  const totalcartItems = {
    comboItems: [...cartItems],
    customItems: [...singleCartItems],
    freebiesItems: [...freebiescartItems],
  };
  const [formData, setFormData] = useState({
    address: "",
    city_id: "",
    address_id: "",
    email: "",
    name: "",
    postal_code: "",
    phone: "",
  });
  const state_id = localStorage.getItem("state");
  const transaction_id = localStorage.getItem("transaction_id");
  // const email = localStorage.getItem("email");
  // const password = localStorage.getItem("password");
  const payment_type = transaction_id ? "prepaid" : "cod";
  const payment_method = transaction_id ? "prepaid" : "cod";

  const [loading, setLoading] = useState(false)

  const sendOrder = () => {
    setLoading(true)
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/order-validate`,
        {
          city: formData.city_id,
          address: formData.address,
          state: state_id,
          name: formData.name,
          pincode: formData.postal_code,
          transaction_id: transaction_id,
          payment_type: payment_type,
          payment_method: payment_method,
          email: formData.email,

          phone: formData.phone,
          subtotal: `${totalCartSubAmount}`,
          grand_total: `${totalCartSubAmount}`,
          tax: "600",
          lname: "tiwari",
          orderproducts: totalcartItems,
        },
        {
          headers: {
            "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);

        navigate("/thanks");
        dispatch(clearCart());
        dispatch(clearComboCart());
        dispatch(clearSingleCart());
        localStorage.removeItem("transaction_id");
      });
  };

  return (
    <HomeLayout>
      <section className="address">
        {loading && <div id="cover-spin"></div>}
        <div className="container">
          <div className="row text-center pb-5" id="progessbarRow">
            <ul className="mt-5" id="progressbarrr">
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
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Mobile No*"
                      required
                      max="10"
                      min="10"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email*"
                      required
                      className="form-control"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
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
                      value={formData.postal_code}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          postal_code: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Address (House No, Building Street, Area)*"
                      className="form-control"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
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
                          value={formData.value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              city_id: e.target.value,
                            })
                          }
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
            <div className="col-md-4 mt-5 mb-5">
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
                    {FreebiesCartDiscountSection}
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
                    <Link onClick={sendOrder} className="btn">
                      Place Order 
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

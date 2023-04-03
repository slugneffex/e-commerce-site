import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import "./login.css";
import Features from "../../components/inc/Fetures";


const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/Acccount");
    }
  });

  const url = "/login-email";
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function submit(e) {
    e.preventDefault();
    axios
      .post(
        url,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "X-Authorization":
              "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
          },
        }
      )

      .then((res) => {
        if (res.data.status === 401) {
          alert(res.data.message);
          navigate("/Signin");
        } else {
          alert("Login Succesfully");
          localStorage.setItem("name", res.data.user?.name);
          localStorage.setItem("email", res.data.user?.email);
          localStorage.setItem("phone", res.data.user?.phone);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.user?.id);
          navigate("/");
        }
      });
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
   
  }

  return (
    <>
      <HomeLayout>
        {/* login page */}
        <section id="loginBg">
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-3" />
              <div className="col-lg-6">
                <div className="loginCard py-5">
                  <div className="loginCard-head">
                    <div className="row">
                      <div className="col-8">
                        <div className="off-det">
                          <h1>Free Shipping above ₹ 500 Plus Extra 10% OFF</h1>
                          <span>On Your First Order</span>
                        </div>
                        <div className="off-coup">
                          <span>Coupon :</span>
                          <span className="coup-ex">SIGNUP10</span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="img-sec">
                          <img
                            src="https://www.combonation.in/assets_new/img/gift.png"
                            alt="offer-gift"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="loginCard-body py-5">
                    <div className="row text-center">
                      <div className="d-flex">
                        <p>
                          <strong>LogIn</strong> or <strong>SignUp</strong>
                        </p>
                      </div>
                      <form onSubmit={(e) => submit(e)}>
                        <input
                          type="hidden"
                          name="_token"
                          defaultValue="PUyjWFIpnovRlpJnyPhP3Eo3Hu5VJIQZQ5j5HgRC"
                        />
                        <div className="form-group">
                          <div className="input-group mb-3">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter Email*"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              onChange={(e) => handle(e)}
                              id="email"
                              value={data.email}
                            />
                          </div>
                          <div className="form-group mb-3">
                            <input
                              type="password"
                              name="password"
                              placeholder="Enter Your Password"
                              className="form-control"
                              onChange={(e) => handle(e)}
                              id="password"
                              value={data.password}
                            />
                          </div>
                        </div>
                        <div
                          className="form-group mb-2"
                          style={{ textAlign: "left" }}
                        >
                          <input
                            type="checkbox"
                            name="hide"
                            onclick="hideShowPass()"
                          />
                          <label htmlFor="hide">Show Password</label>
                        </div>
                        <button type="submit" className="btn">
                          Proceed To log In
                        </button>
                      </form>
                      <div className="social-login mt-3">
                        <span>or Login Via</span>
                        <div className="d-flex my-5">
                          <div className="col-4">
                            <a
                              href="https://www.combonation.in/login/google"
                              style={{ boxShadow: "none" }}
                            >
                              <img
                                src="https://www.combonation.in/assets_new/img/social/google.png"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="col-4">
                            <a
                              href="https://www.combonation.in/login/facebook"
                              style={{ boxShadow: "none" }}
                            >
                              <img
                                src="https://www.combonation.in/assets_new/img/social/facebook.png"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="col-4">
                            <a
                              href="https://www.combonation.in/login"
                              style={{ boxShadow: "none" }}
                            >
                              <img
                                src="https://www.combonation.in/assets_new/img/social/email.png"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="loginCard-footer text-center">
                    <div className="row">
                      <div className="already">
                        <p>
                          Don't have an Account ?{" "}
                          <Link to="/SignUp">SIGN Up</Link>
                        </p>
                      </div>
                      <div className="consent">
                        <p>By Creating an Account I accept the site's</p>
                        <a href>Terms and Conditions</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3" />
            </div>
          </div>
        </section>
        <Features />
      </HomeLayout>
    </>
  );
};

export default SignIn;

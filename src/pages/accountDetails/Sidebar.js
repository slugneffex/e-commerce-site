import React from "react";
import "./accountDetails.css";

import { NavLink } from "react-router-dom";

const sidebar = () => {

    // const navigate = useNavigate();

  

  return (
    <>
      <section class="section  ">
        <div class="container">
          <div class="row">
            <div class=" first desktop">
              <div class="card">
                <div class="account d-flex">
                  <NavLink to="/Acccount" className={"user"}>
                    My Profile
                  </NavLink>
                  <i class="bi bi-caret-right-fill bii"></i>
                </div>
                <hr class="hr" />
                <div class="account d-flex">
                  <NavLink to="/Place" className={"user"} type="button">
                    My Addresses
                  </NavLink>
                  <i class="bi bi-caret-right-fill bii"></i>
                </div>
                <hr class="hr" />
                <div class="account d-flex">
                  <NavLink to="/Wishlist" className={"user"} type="button">
                    My Wishlist
                  </NavLink>
                  <i class="bi bi-caret-right-fill bii"></i>
                </div>
                <hr class="hr" />
                <div class="account d-flex">
                  <NavLink to="/Orders" className={"user"} type="button">
                    My Orders
                  </NavLink>
                  <i class="bi bi-caret-right-fill bii"></i>
                </div>
                <hr class="hr" />
                <div class="account d-flex">
                  <NavLink to="/Wallet" className={"user"} type="button">
                    Saved Cards/payments
                  </NavLink>
                  <i class="bi bi-caret-right-fill bii"></i>
                </div>
                <hr class="hr" />
                {/* <div class="account d-flex">
                  <button
                    to=" "
                    className={"user"}
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("id");
                      localStorage.removeItem("name");
                      localStorage.removeItem("phone");
                      localStorage.removeItem("email");
                      alert("Logout Successfull");
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                  <i class="bi bi-caret-right-fill bii"></i>
                </div> */}
              </div>
            </div>
          </div>

          {/*<div class="mobile">
            <div id="mySidenav" class="sidenav">
              <Link
                to="javascript:void(0)"
                class="closebtn"
                onclick="closeNav()"
              >
                &times;
              </Link>
              <Link to="#">My Profile</Link>
              <Link to="#">My Address</Link>
              <Link to="#">My whishlist</Link>
              <Link to="#">My Orders</Link>
              <Link to="#">My Wallet</Link>
              <Link to="#">Logout</Link>
            </div>
            <div id="main">
              <span
                style={{ fontSize: "30px;cursor:pointer" }}
                onclick="openNav()"
              >
                &#9776;
              </span>
            </div>
              </div>*/}
        </div>
      </section>
    </>
  );
};

export default sidebar;

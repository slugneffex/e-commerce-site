import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./accountDetails.css";
import Sidebar from "./Sidebar";

const Wishlist = () => {
  return (
    <>
      <HomeLayout>
        <section class="section pt-5 pb-5">
          <div className="container">
            <div class="row">
              <div class="col-md-3 first">
                <Sidebar />
              </div>
              <div class="col-md-9">
                <div class="row">
                  <div class="col-md-7">
                    <h4>MY WISHLIST</h4>
                  </div>
                </div>

                <div class="row">
                  <div class="col-4">
                    <div class="card" style={{ width: "18rem" }}>
                      <img
                        src="./assets/img/wishlist.png"
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body">
                        <h5 class="card-title">Cleanse and Shine Combo</h5>
                        <div class="d-flex">
                          <p
                            class="card-text rupee"
                            style={{ textDecoration: "line-through" }}
                          >
                            ₹530
                            <h5> ₹190</h5>
                          </p>
                        </div>
                        <a href="#" class="btn btn-primary move-to-cart">
                          Move to Cart
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="card" style={{ width: "18rem" }}>
                      <img
                        src="./assets/img/wishlist.png"
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body">
                        <h5 class="card-title">Cleanse and Shine Combo</h5>
                        <div class="d-flex">
                          <p
                            class="card-text rupee"
                            style={{ textDecoration: "line-through" }}
                          >
                            ₹530
                            <h5> ₹190</h5>
                          </p>
                        </div>
                        <a href="#" class="btn btn-primary move-to-cart">
                          Move to Cart
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="card" style={{ width: "18rem" }}>
                      <img
                        src="./assets/img/wishlist.png"
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body">
                        <h5 class="card-title">Cleanse and Shine Combo</h5>
                        <div class="d-flex">
                          <p
                            class="card-text rupee"
                            style={{ textDecoration: "line-through" }}
                          >
                            ₹530
                            <h5> ₹190</h5>
                          </p>
                        </div>
                        <a href="#" class="btn btn-primary move-to-cart">
                          Move to Cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row ">
                  <div class="col-4 pt-2">
                    <div class="card" style={{ width: "18rem" }}>
                      <img
                        src="./assets/img/wishlist.png"
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body">
                        <h5 class="card-title">Cleanse and Shine Combo</h5>
                        <div class="d-flex">
                          <p
                            class="card-text rupee"
                            style={{ textDecoration: "line-through" }}
                          >
                            ₹530
                            <h5> ₹190</h5>
                          </p>
                        </div>
                        <a href="#" class="btn btn-primary move-to-cart">
                          Move to Cart
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-4 pt-2">
                    <div class="card" style={{ width: "18rem" }}>
                      <img
                        src="./assets/img/wishlist.png"
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body">
                        <h5 class="card-title">Cleanse and Shine Combo</h5>
                        <div class="d-flex">
                          <p
                            class="card-text rupee"
                            style={{ textDecoration: "line-through" }}
                          >
                            ₹530
                            <h5> ₹190</h5>
                          </p>
                        </div>
                        <a href="#" class="btn btn-primary move-to-cart">
                          Move to Cart
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-4 pt-2">
                    <div class="card" style={{ width: "18rem" }}>
                      <img
                        src="./assets/img/wishlist.png"
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body" style={{ alignContent: "center" }}>
                        <h5 class="card-title">Cleanse and Shine Combo</h5>
                        <div class="d-flex">
                          <p
                            class="card-text rupee"
                            style={{ textDecoration: "line-through" }}
                          >
                            {" "}
                            ₹530
                            <h5> ₹190</h5>
                          </p>
                        </div>
                        <a href="#" class="btn btn-primary move-to-cart">
                          Move to Cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </HomeLayout>{" "}
    </>
  );
};

export default Wishlist;

import React, { useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./accountDetails.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wishlist = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("login please");
      navigate("/Signin");
    }
  });
  const token = localStorage.getItem("token");

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("/get-wishlists", options);
      setWishlist(response.data.wishlists);
    }
    fetchData();
  }, [token]);

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
                  {wishlist.map((e) => (
                    <div class="col-4" key={e.id}>
                      <div
                        class="card"
                        style={{ width: "18rem", margin: "1rem" }}
                      >
                        {e.product?.thumbnail_img?.original_url ? (
                          <img
                            src={e.product?.thumbnail_img?.original_url}
                            class="card-img-top"
                            alt="..."
                          />
                        ) : (
                          <img
                            src={e.combo?.meta_img?.url}
                            class="card-img-top"
                            alt="..."
                          />
                        )}

                        {e.product?.name.substring(0, 40) ? (
                          <h5 className="card-title">
                            {e.product?.name.substring(0, 40)}
                          </h5>
                        ) : (
                          <h5 class="card-title">{e.combo?.name}</h5>
                        )}

                        <div class="d-flex">
                          {e.product?.mrp ? (
                            <p
                              class="card-text"
                              style={{ textDecoration: "line-through" }}
                            >
                              ₹{e.product?.mrp}{" "}
                            </p>
                          ) : (
                            <p
                              class="card-text"
                              style={{ textDecoration: "line-through" }}
                            >
                              ₹{e.combo?.mrp}{" "}
                            </p>
                          )}

                          {e.product?.selling_price ? (
                            <h5 class="rupee" style={{ marginLeft: 20 }}>
                              {" "}
                              ₹{e.product?.selling_price}
                            </h5>
                          ) : (
                            <h5 class="rupee" style={{ marginLeft: 20 }}>
                              {" "}
                              ₹{e.combo?.selling_price}
                            </h5>
                          )}
                        </div>
                        <a href="#/" class="btn btn-primary move-to-cart">
                          Move to Cart
                        </a>
                      </div>
                    </div>
                  ))}
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

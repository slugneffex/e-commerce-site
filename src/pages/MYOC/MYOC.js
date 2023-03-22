import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import "./myoc.css"

const MYOC = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
        },
      };
      const response = await axios.get(`/view-all-products`, options);
      setProducts(response.data.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <HomeLayout>
        <div className="container my-5">
          <div className="row">
            <div className=" col-md-6" style={{ marginTop: "4rem" }}>
              <h1>Build Your Combo From Products Below</h1>
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="row">
            {products.map((e) => (
              <div className="col-lg-3 col-md-3" key={e.id}>
                <div className="newComboCart">
                  <div className="cart-img-sec">
                    <Link className="addtofavCategory">
                      <li className="bi bi-heart"></li>
                    </Link>
                    <Link to={`/product/${e.id}`}>
                      <img src={e.thumbnail_img?.original_url} alt="img"></img>
                    </Link>
                  </div>

                  <div className="card-det-sec">
                    <div className="headingCard pt-3">
                      <span>{e.name.substring(0, 40)}</span>
                    </div>
                    <div>
                      <span className="packof">(Pack of 2)</span>
                    </div>
                    <div className="price-sec">
                      <div className="col-4" style={{ textAlign: "end" }}>
                        <span className="spSingleProduct">₹{e.selling_price}</span>
                      </div>
                    </div>
                    <div className="card-btn-sec ">
                      <Link className="btnC">
                        <li
                          className="bi bi-cart"
                          id={e.id}
                          style={{ cursor: "pointer" }}
                        >
                          Add to Cart
                        </li>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default MYOC;

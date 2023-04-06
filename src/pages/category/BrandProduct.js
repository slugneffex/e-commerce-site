import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Link, useParams } from "react-router-dom";
import "./category.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import {
  singleaddCartProduct,
  getsingleCartCount,
  getsingleSubTotal,
  getsingleTotalAmount,
  getsingleTotalDiscount,
} from "../../components/features/SingleCartSlice";
import { useDispatch } from "react-redux";

const BrandProduct = () => {
  // Brand products api
  const { brand_id } = useParams();

  const [brandProduct, setBrandProduct] = useState([]);
  const [brandName, setBrandName] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
        },
      };
      const response = await axios.get(`/brand/${brand_id}`, options);
      setBrandProduct(response.data.products.data);
      setBrandName(response.data.brand);
    }
    fetchData();
  }, [brand_id]);

  // total brands
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      const response = await axios.get("/brands", options);
      setBrand(response.data);
    }
    fetchData();
  }, []);

  const filterbrandsApi = brand.filter((e) => e.focused === "on");

  // Add to cart single brand products

  const dispatch = useDispatch();

  let SingleproductObj = {
    id: "",
    title: "",
    price: "",
    image: "",
    mrp: "",
    discount: "",
  };

  const addToSingleCart = (p) => {
    SingleproductObj = {
      id: p.id,
      title: p.name,
      price: p.selling_price,
      image: p.thumbnail_img?.original_url,
      mrp: p.mrp,
      discount: p.discount,
    };

    dispatch(singleaddCartProduct(SingleproductObj));
    dispatch(getsingleCartCount());
    dispatch(getsingleSubTotal());
    dispatch(getsingleTotalAmount());
    dispatch(getsingleTotalDiscount());
  };

  return (
    <div>
      <HomeLayout>
        <div className="container">
          <div className="row">
            <div className="col-md-3 desktop">
              <div className="card">
                <div
                  className="accordion accordion-flush accc"
                  id="accordionFlushExample"
                >
                  {filterbrandsApi.map((e) => (
                    <Link to={`/brand/${e.id}`} key={e.id}>
                      <div className="accordion-item">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseThree"
                          aria-expanded="false"
                          aria-controls="flush-collapseThree"
                        >
                          {e.name}
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link>Brand</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link className="categoriesName">{brandName.name}</Link>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="byoccBrand">
                <img src="/assets/img/byoc.png" alt="byoc-img" />
              </div>
              <div className="row" style={{ marginTop: "3rem" }}>
                <div className="col-md-6">
                  <h4>
                    <strong>Top Trending</strong>
                  </h4>
                </div>
                <div className="col-md-6">
                  <div>
                    <div style={{ textAlign: "end" }}>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant=""
                          id="dropdown-basic"
                          style={{
                            border: "1px solid",
                            marginLeft: "3rem",
                            width: "120px",
                          }}
                        >
                          Sort by
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            Something else
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    {/* <div className="col-md-5">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant=""
                          id="dropdown-basic"
                          style={{
                            border: "1px solid",
                            marginLeft: "2rem",
                            width: "120px",
                          }}
                        >
                          Filter by
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            Action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Another action
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            Something else
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="row" style={{ marginTop: "1rem" }}>
                {brandProduct.map((p) => (
                  <div className="col-md-4 " key={p.id}>
                    <div className="newComboCart">
                      <div
                        className="cart-img-sec"
                        style={{ position: "relative" }}
                      >
                        <Link className="addtofavCategory">
                          <li
                            className="bi bi-heart"
                            style={{
                              position: "absolute",
                              right: "0.8rem",
                              top: "0.5rem",
                            }}
                          ></li>
                        </Link>
                        <Link to={`/product/${p.id}`}>
                          <img
                            src={p.thumbnail_img?.original_url}
                            alt="img"
                          ></img>
                        </Link>
                      </div>

                      <div className="card-det-sec">
                        <div className="headingCard pt-3">
                          <span>{p.name.substring(0, 40)}</span>
                        </div>
                        {/* <div>
                          <span className="packof">(Pack of 2)</span>
                        </div> */}
                        <div className="price-sec">
                          <div className="col-4" style={{ textAlign: "end" }}>
                            <span className="sp">₹{p.selling_price}</span>
                          </div>
                          <div className="col-4">
                            <del className="mrp">₹{p.mrp}</del>
                          </div>
                          <div className="col-4">
                            <span className="discount">{p.discount}% OFF</span>
                          </div>
                        </div>
                        <div className="card-btn-sec ">
                          <div
                            className="btn_atc"
                            onClick={() => {
                              addToSingleCart(p);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <li className="bi bi-cart" id={p.id}>
                              Add to Cart
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default BrandProduct;

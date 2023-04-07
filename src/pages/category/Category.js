import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Link, useParams } from "react-router-dom";
import "./category.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
// import * as ReactBootStrap from 'react-bootstrap'
// const[loading,setLoading]=useState(false)

import {
  addCartProduct,
  getCartCount,
  getSubTotal,
  getTotalAmount,
  getTotalDiscount,
} from "../../components/features/useCartSlice";
import {
  singleaddCartProduct,
  getsingleCartCount,
  getsingleSubTotal,
  getsingleTotalAmount,
  getsingleTotalDiscount,
} from "../../components/features/SingleCartSlice";
import { useDispatch } from "react-redux";

const Category = () => {
  // Categories products combo & single Products
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
        },
      };
      const response = await axios.get(`/category/${id}`, options);
      setBanner(response.data.category);
      setCategory(response.data.data.combos.data);
      setProduct(response.data.data.products.data);
    }
    fetchData();
  }, [id]);


  // Categories
  const [categoris, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
        },
      };
      const response = await axios.get(`/categories`, options);
      setCategories(response.data);
    }
    fetchData();
  }, []);

  // add to cart for combo

  const dispatch = useDispatch();
  let productObj = {
    id: "",
    title: "",
    price: "",
    image: "",
    mrp: "",
    discount: "",
  };
  const addToCart = (e) => {
    productObj = {
      id: e.id,
      title: e.name,
      price: e.selling_price,
      image: e.meta_img?.url,
      mrp: e.mrp,
      discount: e.discount,
    };

    dispatch(addCartProduct(productObj));
    dispatch(getCartCount());
    dispatch(getSubTotal());
    dispatch(getTotalAmount());
    dispatch(getTotalDiscount());
  };

  // add to cart single product

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

  // ADd To wishlist combo
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  function wishlistData(id) {
    const data = {
      user_id: user_id,
      combo_id: id,
    };

    axios
      .post("/addWishlist", data, {
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

  // Add to wishlist For product

  function wishlistProductData(id) {
    const data = {
      user_id: user_id,
      product_id: id,
    };

    axios
      .post("/addWishlist", data, {
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

  // if there is no combo hide the section of combos

  let section = null;
  if (category.length >= 1) {
    section = (
      <>
        {/* section content */}
        <hr />
        <div className="pre">
          <h3>Precurated Combo</h3>
        </div>
        <hr />
        {category.map((e) => (
          <div className="col-md-4 " key={e.id}>

            <div className="newComboCart">
              <div className="cart-img-sec" style={{ position: "relative" }}>
                <Link
                  onClick={() => wishlistData(e.id)}
                  className="addtofavCategory"
                >
                  <li
                    className="bi bi-heart"
                    style={{
                      position: "absolute",
                      right: "1rem",
                      top: ".8rem",
                    }}
                  ></li>
                </Link>
                <Link to={`/combo/${e.id}`}>
                  <img src={e.meta_img?.url} alt="img"></img>
                </Link>
              </div>

              <div className="card-det-sec">
                <div className="headingCard pt-3">
                  <span>{e.name}</span>
                </div>
                <div>
                  <span className="packof">(Pack of 2)</span>
                </div>
                <div className="price-sec">
                  <div className="col-4" style={{ textAlign: "end" }}>
                    <span className="sp">₹{e.selling_price}</span>
                  </div>
                  <div className="col-4">
                    <del className="mrp">₹{e.mrp}</del>
                  </div>
                  <div className="col-4">
                    <span className="discount">{e.discount}% OFF</span>
                  </div>
                </div>
                <div className="card-btn-sec ">
                  <div className="btn_atc">
                    <Link>
                      <li
                        className="bi bi-cart"
                        onClick={() => {
                          addToCart(e);
                        }}
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

          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <HomeLayout>
        <div className="container">
          <div className="row">
            <div className="col-md-3 desktop">
              <div className="card">
                <div
                  className="accordion accordion-flush accc"
                  id="accordionFlushExample"
                >
                  {categoris.map((e) => (
                    <Link to={`/category/${e.id}`} key={e.id}>
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

            <div className="col-md-9 mt-2">
              <div className="banner" key={banner.id}>
                <img src={banner.banner?.url} width="100%" alt="" />
              </div>

              <div className="row">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link>Categories</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link className="categoriesName">{banner.name}</Link>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="row" style={{ marginTop: "3rem" }}>
                <div className="col-md-6">
                  <h4>
                    <strong>Top Trending</strong>
                  </h4>
                </div>
                <div className="col-md-6" style={{ textAlign: "end" }}>
                  <div className="" style={{}}>
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
                        <Dropdown.Item >
                          Low to High
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Another action
                        </Dropdown.Item>
                        {/* <Dropdown.Item href="#/action-3">
                          Something else
                        </Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>

              <div className="row" style={{ marginTop: "1rem" }}>
                {/* Combo products */}
                {section}

                <hr />
                <div className="byocc">
                  <h3>Bulid Your Own Combo</h3>
                  <img src="/assets/img/byoc.png" alt="byoc-img" />
                </div>
                <hr />

                {/* Single Products */}

                {product.map((p) => (
                  <div className="col-md-4" key={p.id}>
                    <div className="newComboCart">
                      <div
                        className="cart-img-sec"
                        style={{ position: "relative" }}
                      >
                        <Link
                          onClick={() => wishlistProductData(p.id)}
                          className="addtofavCategory"
                        >
                          <li
                            className="bi bi-heart"
                            style={{
                              position: "absolute",
                              right: "1rem",
                              top: ".8rem",
                            }}
                          ></li>
                        </Link>
                        <Link to={`/product/${p.id}`}>
                          <img
                            src={p.thumbnail_img?.original_url}
                            alt={p.name}
                          ></img>
                        </Link>
                      </div>

                      <div className="card-det-sec">
                        <div className="headingCard pt-3 ">
                          <span>{p.name.substring(0, 40)}</span>
                        </div>
                        <div>
                          <span className="packof">(Pack of 2)</span>
                        </div>
                        <div className="price-sec">
                          <span className="spSingleProduct">
                            ₹{p.selling_price}
                          </span>

                          {/* <div className="col-4">
                            <del className="mrp">₹{e.mrp}</del>
                          </div> */}
                          {/* <div className="col-4">
                            <span className="discount">{p.discount}% OFF</span>
                          </div> */}
                        </div>
                        <div className="card-btn-sec ">
                          <div className="btn_atc">
                            <Link>
                              <li
                                className="bi bi-cart"
                                onClick={() => {
                                  addToSingleCart(p);
                                }}
                                id={p.id}
                                style={{ cursor: "pointer" }}
                              >
                                Add to Cart
                              </li>
                            </Link>
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
    </>
  );
};

export default Category;

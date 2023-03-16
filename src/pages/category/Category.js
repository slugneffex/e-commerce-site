import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Link, useParams } from "react-router-dom";
import "./category.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import {
  addCartProduct,
  getCartCount,
  getSubTotal,
  getTotalAmount,
  getTotalDiscount,
} from "../../components/features/useCartSlice";
import { useDispatch } from "react-redux";

const Category = () => {
  // Categories products combo & single Products
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
        },
      };
      const response = await axios.get(`/category/${id}`, options);
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

  return (
    <>
      <HomeLayout>
        <div className="container">
          <div className="row" style={{ marginTop: "6rem" }}>
            <div className="col-md-3">
              <div className="card">
                <div
                  className="accordion accordion-flush accc"
                  id="accordionFlushExample"
                >
                  {/* <div className="accordion-item">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        <p>
                          SORT BY: <span className="active">Popularity</span>
                        </p>
                      </button>
                    </div> */}
                  {categoris.map((e) => (
                    <Link to={`/category/${e.id}`} key={e.id}>
                      <div className="accordion-item" >
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
              <div className="banner">
                <img src="njsjhs" width="100%" alt="" />
              </div>
              <Breadcrumb>
                <Breadcrumb.Item active>
                  {" "}
                  <Link to="/">Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Library</Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
              </Breadcrumb>
              <div className="row" style={{ marginTop: "3rem" }}>
                <div className="col-md-6">
                  <h4>
                    <strong>Top Trending</strong>
                  </h4>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-5">
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
                    <div className="col-md-5">
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" style={{ marginTop: "1rem" }}>
                {/* Combo products */}

                {category.map((e) => (
                  <div className="col-6 col-md-4 col-xl-3 " key={e.id}>
                    <div className="combo-card">
                      <div className="combo-image">
                        <Link to={`/combo/${e.id}`}>
                          <img src={e.meta_img?.original_url} alt={e.name} />
                        </Link>
                      </div>
                      <div className="cart-sec text-center py-2">
                        <i
                          onClick={() => {
                            addToCart(e);
                          }}
                          className="bi bi-plus-lg"
                          style={{ cursor: "pointer" }}
                        ></i>

                        <span>Add To Cart</span>
                      </div>
                      <div className="combo-body text-center">
                        <span className="packof">(Pack of 3)</span>
                        <h4>{e.name.substring(0, 30)}</h4>
                        <div>
                          <span className="discount">({e.discount}%)</span>
                        </div>

                        {/* <ul className="stars">
                          <li>
                            <i className="bi bi-star-fill"></i>
                          </li>
                          <li>
                            <i className="bi bi-star-fill"></i>
                          </li>
                          <li>
                            <i className="bi bi-star-fill"></i>
                          </li>
                          <li>
                            <i className="bi bi-star-fill"></i>
                          </li>
                          <li>
                            <i className="bi bi-star"></i>
                          </li>
                        </ul> */}
                        <br />
                        {/* <div className="flash-deal">
                          <Link to={`/combo/${category.id}`}>
                            <i className="bi bi-lightning-fill"></i>
                            <p>Flash Deal</p>
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Single Products */}

                {product.map((p) => (
                  <div className="col-6 col-md-4 col-xl-3 " key={p.id}>
                    <div className="combo-card">
                      <div className="combo-image">
                        <Link to={`/product/${p.id}`}>
                          <img
                            src={p.thumbnail_img?.original_url}
                            alt={p.name}
                          />
                        </Link>
                      </div>
                      <div className="cart-sec text-center py-2">
                        <i
                          className="bi bi-plus-lg"
                          style={{ cursor: "pointer" }}
                        ></i>

                        <span>Add To Cart</span>
                      </div>
                      <div className="combo-body text-center">
                        <span className="packof">(Pack of 3)</span>
                        <h4>{p.name.substring(0, 20)}...</h4>

                        {/* <ul className="stars">
                          <li>
                            <i className="bi bi-star-fill"></i>
                          </li>
                          <li>
                            <i className="bi bi-star-fill"></i>
                          </li>
                          <li>
                            <i className="bi bi-star-fill"></i>
                          </li>
                          <li>
                            <i className="bi bi-star-fill"></i>
                          </li>
                          <li>
                            <i className="bi bi-star"></i>
                          </li>
                        </ul>
                        <br />
                        <div className="flash-deal">
                          <Link to={`/product/${p.id}`}>
                            <i className="bi bi-lightning-fill"></i>
                            <p>Flash Deal</p>
                          </Link>
                        </div> */}
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

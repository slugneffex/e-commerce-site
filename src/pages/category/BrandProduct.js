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

import { Collapse } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";

const BrandProduct = () => {
  // Brand products api
  const { brand_id } = useParams();
  const [error, setError] = useState(null);
  const [brandProduct, setBrandProduct] = useState([]);
  const [brandName, setBrandName] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setError(null);
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/brand/${brand_id}`,
          options
        );
        setBrandProduct(response.data.products.data);
        setBrandName(response.data.brand);
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
  }, [brand_id]);

  // total brands
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setError(null);
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
          `${process.env.REACT_APP_BASE_URL}/brands`,
          options
        );
        setBrand(response.data);
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

  const filterbrandsApi = brand.filter((e) => e.focused === "on");

  // Categories
  const [categoris, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setError(null);
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/categories`,
          options
        );
        setCategories(response.data);
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

  if (error) {
    console.log(error);
  }

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const handleToggle1 = () => {
    setIsOpen1(!isOpen1);
  };

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  const handleToggle3 = () => {
    setIsOpen3(!isOpen3);
  };

  function handleClick(categoryId) {
    window.location.href = `/category/${categoryId}`;
  }

  function handleClickbrand(brandId) {
    window.location.href = `/brand/${brandId}`;
  }

  return (
    <div>
      <HomeLayout>
        <div className="container">
          <div className="row">
            <div className="col-md-3 desktop">
              {/* <div className="card">
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
              </div> */}

              {/* Filter  */}
              <div className="card">
                <div className="card-header">Filter By</div>
                <div className="card-body">
                  <div id="accordionExample">
                    <div className="accordion-item mb-2">
                      <div
                        className="row align-items-center"
                        variant="primary"
                        onClick={handleToggle1}
                        aria-controls="collapseExample"
                        aria-expanded={isOpen1}
                      >
                        <h4
                          className="col-9 mb-0 px-0"
                          style={{ backgroundColor: "#FFF", textAlign: "left" }}
                        >
                          Categories
                        </h4>

                        <RiArrowDropDownLine
                          className="col-3 "
                          style={{
                            fontSize: "50px",
                            backgroundColor: "#FFF",
                            color: "#464646",
                          }}
                        />
                      </div>

                      <Collapse in={isOpen1}>
                        <div id="collapseExample">
                          <input
                            type="hidden"
                            name="_token"
                            defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                          />{" "}
                          {categoris.map((e) => (
                            <div className="form-check" key={e.id}>
                              <input
                                type="radio"
                                name="category_id"
                                id="category_id103"
                                defaultValue={103}
                                onchange="event.preventDefault(document.getElementById('filterForm103').submit());"
                                className="form-check-input"
                                onClick={() => handleClick(e.id)}
                              />

                              <label className="form-check-label" htmlFor={103}>
                                {e.name} (106)
                              </label>
                            </div>
                          ))}
                        </div>
                      </Collapse>
                    </div>

                    <div className="accordion-item mb-2">
                      <div
                        className="row align-items-center"
                        variant="primary"
                        onClick={handleToggle2}
                        aria-controls="collapseExample"
                        aria-expanded={isOpen2}
                      >
                        <h4
                          className="col-9 mb-0 px-0"
                          style={{ backgroundColor: "#FFF", textAlign: "left" }}
                        >
                          Brand
                        </h4>

                        <RiArrowDropDownLine
                          className="col-3 text-end"
                          style={{
                            fontSize: "50px",
                            backgroundColor: "#FFF",
                            color: "#464646",
                          }}
                        />
                      </div>

                      <Collapse in={isOpen2}>
                        <div id="collapseExample">
                          {filterbrandsApi.map((e) => (
                            <div className="form-check">
                              <input
                                type="radio"
                                name="category_id"
                                id="category_id103"
                                defaultValue={103}
                                onchange="event.preventDefault(document.getElementById('filterForm103').submit());"
                                className="form-check-input"
                                onClick={() => handleClickbrand(e.id)}
                              />
                              <label className="form-check-label" htmlFor={103}>
                                {e.name} (51)
                              </label>
                            </div>
                          ))}
                        </div>
                      </Collapse>
                    </div>

                    <div className="accordion-item mb-2">
                      <div
                        className="row align-items-center"
                        variant="primary"
                        onClick={handleToggle3}
                        aria-controls="collapseExample"
                        aria-expanded={isOpen3}
                      >
                        <h4
                          className="col-9 mb-0 px-0"
                          style={{ backgroundColor: "#FFF", textAlign: "left" }}
                        >
                          Price
                        </h4>

                        <RiArrowDropDownLine
                          className="col-3"
                          style={{
                            fontSize: "50px",
                            backgroundColor: "#FFF",
                            color: "#464646",
                          }}
                        />
                      </div>

                      <Collapse in={isOpen3}>
                        <div id="collapseExample">
                          <form
                            action="https://www.combonation.in/getFilterProduct"
                            method="GET"
                            id="filterForm103"
                          >
                            <input
                              type="hidden"
                              name="_token"
                              defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                            />{" "}
                            <div className="form-check">
                              <input
                                type="radio"
                                name="category_id"
                                id="category_id103"
                                defaultValue={103}
                                onchange="event.preventDefault(document.getElementById('filterForm103').submit());"
                                className="form-check-input"
                              />
                              <label className="form-check-label" htmlFor={103}>
                                From ₹ 50 To ₹ 499
                              </label>
                            </div>
                          </form>

                          <form
                            action="https://www.combonation.in/getFilterProduct"
                            method="GET"
                            id="filterForm103"
                          >
                            <input
                              type="hidden"
                              name="_token"
                              defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                            />{" "}
                            <div className="form-check">
                              <input
                                type="radio"
                                name="category_id"
                                id="category_id103"
                                defaultValue={103}
                                onchange="event.preventDefault(document.getElementById('filterForm103').submit());"
                                className="form-check-input"
                              />
                              <label className="form-check-label" htmlFor={103}>
                                From ₹ 500 To ₹ 999
                              </label>
                            </div>
                          </form>

                          <form
                            action="https://www.combonation.in/getFilterProduct"
                            method="GET"
                            id="filterForm103"
                          >
                            <input
                              type="hidden"
                              name="_token"
                              defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                            />{" "}
                            <div className="form-check">
                              <input
                                type="radio"
                                name="category_id"
                                id="category_id103"
                                defaultValue={103}
                                onchange="event.preventDefault(document.getElementById('filterForm103').submit());"
                                className="form-check-input"
                              />
                              <label className="form-check-label" htmlFor={103}>
                                From ₹ 1000 To ₹ 1999
                              </label>
                            </div>
                          </form>

                          <form
                            action="https://www.combonation.in/getFilterProduct"
                            method="GET"
                            id="filterForm103"
                          >
                            <input
                              type="hidden"
                              name="_token"
                              defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                            />{" "}
                            <div className="form-check">
                              <input
                                type="radio"
                                name="category_id"
                                id="category_id103"
                                defaultValue={103}
                                onchange="event.preventDefault(document.getElementById('filterForm103').submit());"
                                className="form-check-input"
                              />
                              <label className="form-check-label" htmlFor={103}>
                                From ₹ 2000 To ₹ 4999
                              </label>
                            </div>
                          </form>

                          <form
                            action="https://www.combonation.in/getFilterProduct"
                            method="GET"
                            id="filterForm103"
                          >
                            <input
                              type="hidden"
                              name="_token"
                              defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                            />{" "}
                            <div className="form-check">
                              <input
                                type="radio"
                                name="category_id"
                                id="category_id103"
                                defaultValue={103}
                                onchange="event.preventDefault(document.getElementById('filterForm103').submit());"
                                className="form-check-input"
                              />
                              <label className="form-check-label" htmlFor={103}>
                                From ₹ 5000 And Above
                              </label>
                            </div>
                          </form>
                        </div>
                      </Collapse>
                    </div>
                  </div>
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
                          <i
                            className="bi bi-heart"
                            style={{
                              position: "absolute",
                              right: "0.8rem",
                              top: "0.5rem",
                            }}
                          ></i>
                        </Link>
                        <Link to={`/product/${p.id}`}>
                          <img
                            src={p.thumbnail_img?.original_url}
                            alt="img"
                            width="100%"
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
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            <i
                              className="bi bi-cart"
                              id={p.id}
                              style={{ color: "#fe9e2d" }}
                            >
                              Add to Cart
                            </i>
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

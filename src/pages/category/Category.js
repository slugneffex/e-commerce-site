import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./category.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

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
import { Collapse } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";

const Category = () => {
  // Categories products combo & single Products
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [banner, setBanner] = useState([]);
  // filteration state
  const [originalCategory, setOriginalCategory] = useState([]);
  const [originalProduct, setOriginalProduct] = useState([]);

  // filteration state end
  const [error, setError] = useState(null);

  const sortData = () => {
    const sortedData = [...category].sort(
      (a, b) => b.selling_price - a.selling_price
    );
    const sortedDataProduct = [...product].sort(
      (a, b) => b.selling_price - a.selling_price
    );
    setCategory(sortedData);
    setProduct(sortedDataProduct);
  };

  const lowtoHigh = () => {
    const sortedData = [...category].sort(
      (a, b) => a.selling_price - b.selling_price
    );
    const sortedDataProducts = [...product].sort(
      (a, b) => a.selling_price - b.selling_price
    );
    setCategory(sortedData);
    setProduct(sortedDataProducts);
  };

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
          `${process.env.REACT_APP_BASE_URL}/category/${id}`,
          options
        );
        setBanner(response.data.category);
        setCategory(response.data.data.combos.data);
        setProduct(response.data.data.products.data);
        setOriginalCategory(response.data.data.combos.data);
        setOriginalProduct(response.data.data.products.data);
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
  }, [id]);

  // filteration

  const filterProducts = (minPrice, maxPrice) => {
    const filteredProducts = originalProduct.filter((product) => {
      return (
        product.selling_price >= minPrice && product.selling_price <= maxPrice
      );
    });
    const filteredSingleProducts = originalCategory.filter((product) => {
      return (
        product.selling_price >= minPrice && product.selling_price <= maxPrice
      );
    });
    setProduct(filteredProducts);
    setCategory(filteredSingleProducts);
  };


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
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert(res.data.message);
      });
  }

  // Add to wishlist For product
  const [heartFilled, setHeartFilled] = useState(null);

  function wishlistProductData(id) {
    const data = {
      user_id: user_id,
      product_id: id,
    };

    axios
      .post("/addWishlist", data, {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === true) {
          setHeartFilled(id);
          // setTimeout(() => setHeartFilled(null), 4000);
        } else {
          alert(res.data.message);
        }
      });
  }

  if (error) {
    console.log(error);
  }

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
    navigate(`/category/${categoryId}`);
  }

  function handleClickbrand(brandId) {
    navigate(`/brand/${brandId}`);
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
                <div
                  onClick={() => wishlistData(e.id)}
                  className="addtofavCategory"
                >
                  <i
                    className="bi bi-heart"
                    style={{
                      position: "absolute",
                      right: "1rem",
                      top: ".8rem",
                    }}
                  ></i>
                </div>
                <Link to={`/combo/${e.id}`}>
                  <img src={e.meta_img?.url} alt="img" width="100%"></img>
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
                  <div
                    className="btn_atc"
                    onClick={() => {
                      addToCart(e);
                      alert("product added to cart successfully");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-cart" id={e.id}>
                      Add to Cart
                    </i>
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
                                // id={`category_id${category.id}`}
                                // defaultValue={category.id}
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
                          <input
                            type="hidden"
                            name="_token"
                            defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                          />{" "}
                          <div className="form-check">
                            <input
                              type="radio"
                              name="priceFilter"
                              value="0-499"
                              className="form-check-input"
                              onClick={() => filterProducts(50, 499)}
                            />
                            <label className="form-check-label">
                              From ₹ 50 To ₹ 499
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              name="priceFilter"
                              value="500-999"
                              className="form-check-input"
                              onClick={() => filterProducts(500, 999)}
                            />
                            <label className="form-check-label">
                              From ₹ 500 To ₹ 999
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              name="priceFilter"
                              value="1000-1999"
                              className="form-check-input"
                              onClick={() => filterProducts(1000, 1999)}
                            />
                            <label className="form-check-label">
                              From ₹ 1000 To ₹ 1999
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              name="priceFilter"
                              value="2000-4999"
                              className="form-check-input"
                              onClick={() => filterProducts(2000, 4999)}
                            />
                            <label className="form-check-label">
                              From ₹ 2000 To ₹ 4999
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              name="priceFilter"
                              className="form-check-input"
                              onClick={() => filterProducts(5000, 50000)}
                            />
                            <label className="form-check-label">
                              From ₹ 5000 & Above
                            </label>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-9 mt-2">
              <div className="banner" key={banner.id}>
                <img src={banner.banner?.url} width="100%" alt="baner" />
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
                        <Dropdown.Item onClick={lowtoHigh}>
                          low to High
                        </Dropdown.Item>
                        <Dropdown.Item onClick={sortData}>
                          High to low
                        </Dropdown.Item>
                        {/* <Dropdown.Item onClick={() => filterProducts(50, 499)}>
                          50 to 490
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => filterProducts(500, 999)}>
                          500 to 999
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => filterProducts(1000, 1999)}
                        >
                          1000 to 1999
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => filterProducts(2000, 4999)}
                        >
                          2000 to 4999
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => filterProducts(5000, 50000)}
                        >
                          5000 and above
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
                          <ul>
                            <li className="youMayLikeHeart">
                              {heartFilled === p.id ? (
                                <i
                                  style={{ color: "#fe9e2d" }}
                                  className="bi bi-heart-fill"
                                ></i>
                              ) : (
                                <i className="bi bi-heart"></i>
                              )}
                            </li>
                          </ul>
                        </Link>
                        <Link to={`/product/${p.id}`}>
                          <img
                            src={p.thumbnail_img?.original_url}
                            alt={p.name}
                            width="100%"
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
                          <div
                            className="btn_atc"
                            onClick={() => {
                              addToSingleCart(p);
                              alert("product added to cart successfully");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="bi bi-cart" id={p.id}>
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
    </>
  );
};

export default Category;

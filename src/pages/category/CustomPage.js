import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Collapse } from "react-bootstrap";
import HomeLayout from "../../layouts/HomeLayout";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useParams, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./category.css";
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

const CustomPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [banner, setBanner] = useState([]);
  const [combo, setCombo] = useState([]);
  const [product, setProduct] = useState([]);
  const [filterCombo, setFilterCombo] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [checkedFilters, setCheckedFilters] = useState({});
  const [error, setError] = useState(null);
  const [brandId, setBrandId] = useState([]);
  const [categoriesId, setCategoriesId] = useState([]);

  // sort by low to high and high to low

  const sortData = () => {
    const sortedData = [...combo].sort(
      (a, b) => b.selling_price - a.selling_price
    );
    const sortedDataProduct = [...product].sort(
      (a, b) => b.selling_price - a.selling_price
    );
    setCombo(sortedData);
    setBrandProduct(sortedDataProduct);
  };

  const lowtoHigh = () => {
    const sortedData = [...combo].sort(
      (a, b) => a.selling_price - b.selling_price
    );
    const sortedDataProducts = [...brandProduct].sort(
      (a, b) => a.selling_price - b.selling_price
    );
    setCombo(sortedData);
    setBrandProduct(sortedDataProducts);
  };

  // API of custom page

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
          `${process.env.REACT_APP_BASE_URL}/page/${id}`,
          options
        );
        setBanner(response.data);
        setCombo(response.data.combos);
        setProduct(response.data.product);
        setBrandId(response.data.brands);
        setCategoriesId(response.data.categories);
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

  // Filteration

  const handleFilter = (minPrice, maxPrice) => {
    const key = `${minPrice}-${maxPrice}`;

    if (checkedFilters[key]) {
      // If the filter is already checked, remove it
      const newFilters = { ...checkedFilters };
      delete newFilters[key];
      setCheckedFilters(newFilters);

      // Update the filtered products lists
      const newFilteredProducts1 = filterCombo.filter((product) => {
        const price = product.selling_price;
        return !(price >= minPrice && price <= maxPrice);
      });
      setFilterCombo(newFilteredProducts1);

      const newFilteredProducts2 = filteredProducts.filter((product) => {
        const price = product.selling_price;
        return !(price >= minPrice && price <= maxPrice);
      });
      setFilteredProducts(newFilteredProducts2);
    } else {
      // If the filter is not checked, add it
      setCheckedFilters({ ...checkedFilters, [key]: true });

      // Update the filtered products lists
      const filtered1 = combo.filter((product) => {
        const price = product.selling_price;
        return price >= minPrice && price <= maxPrice;
      });
      setFilterCombo((prevFilteredProducts) => [
        ...prevFilteredProducts,
        ...filtered1,
      ]);

      const filtered2 = brandProduct.filter((product) => {
        const price = product.selling_price;
        return price >= minPrice && price <= maxPrice;
      });
      setFilteredProducts((prevFilteredProducts) => [
        ...prevFilteredProducts,
        ...filtered2,
      ]);
    }
  };

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

  // ADd To wishlist combo
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  function wishlistData(id) {
    const data = {
      user_id: user_id,
      combo_id: id,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/addWishlist`, data, {
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
      .post(`${process.env.REACT_APP_BASE_URL}/addWishlist`, data, {
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

  //  Brand by id

  const [brandProduct, setBrandProduct] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      try {
        const promises = brandId.map((e) =>
          axios.get(`${process.env.REACT_APP_BASE_URL}/brand/${e.id}`, options)
        );
        const responses = await Promise.all(promises);
        const data = responses.map((response) => response.data.products.data);

        setBrandProduct(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, [brandId]);

  // Categories id

  const [categoriesCombo, setCategoriesCombo] = useState([]);
  const [categoriesProduct, setCategoriesProduct] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      try {
        const promises = categoriesId.map((e) =>
          axios.get(
            `${process.env.REACT_APP_BASE_URL}/category/${e.id}`,
            options
          )
        );
        const responses = await Promise.all(promises);
        const data = responses.map(
          (response) => response.data.data.combos.data
        );
        const productData = responses.map(
          (response) => response.data.data.products.data
        );
        console.log(productData);
        setCategoriesProduct(productData);

        setCategoriesCombo(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, [categoriesId]);

  // Collapse for filters ui
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
    setFilteredProducts([]);
    setFilterCombo([]);
    setCheckedFilters(false);
    navigate(`/category/${categoryId}`);
  }

  function handleClickbrand(brandId) {
    setFilteredProducts([]);
    setFilterCombo([]);
    setCheckedFilters(false);
    navigate(`/brand/${brandId}`);
  }

  if (error) {
    console.log(error);
  }

  let section = null;
  if (combo.length >= 1) {
    section = (
      <>
        {/* section content */}
        <hr />
        <div className="pre">
          <h3>Precurated Combo</h3>
        </div>
        <hr />
        {filterCombo.length > 0
          ? filterCombo.map((e) => (
              <div className="col-md-4 " key={e.id}>
                <div className="newComboCart">
                  <div
                    className="cart-img-sec"
                    style={{ position: "relative" }}
                  >
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
            ))
          : combo.map((e) => (
              <div className="col-md-4 " key={e.id}>
                <div className="newComboCart">
                  <div
                    className="cart-img-sec"
                    style={{ position: "relative" }}
                  >
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
                      <span className="packof">(Pack of){e.packqty}</span>
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

  let categoriesComboSection = null;
  if (categoriesCombo.length >= 1) {
    categoriesComboSection = (
      <>
        {/* section content */}
        <hr />
        <div className="pre">
          <h3>Precurated Combo</h3>
        </div>
        <hr />
        {categoriesCombo.map((subArray) => {
          if (subArray.length > 0) {
            return (
              <>
                {subArray.map((p) => (
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
                            src={p.meta_img?.url}
                            alt={p.name}
                            width="100%"
                          ></img>
                        </Link>
                      </div>

                      <div className="card-det-sec">
                        <div className="headingCard pt-3 ">
                          {/* <span>{p.name.substring(0, 40)}</span> */}
                          {p.name && <span>{p.name.substring(0, 40)}</span>}
                        </div>
                        <div>
                          <span className="packof">(Pack of 2)</span>
                        </div>
                        <div className="price-sec">
                          <span className="spSingleProduct">
                            ₹{p.selling_price}
                          </span>
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
              </>
            );
          } else {
            return null;
          }
        })}
      </>
    );
  }

  let categoriesProductSection = null;
  if (categoriesProduct.length >= 1) {
    categoriesProductSection = (
      <>
        {/* section content */}
        <hr />
        <div className="pre">
          <h3>Precurated Combo</h3>
        </div>
        <hr />
        {categoriesProduct.map((subArray) => {
          if (subArray.length > 0) {
            return (
              <>
                {subArray.map((p) => (
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
                          {/* <span>{p.name.substring(0, 40)}</span> */}
                          {p.name && <span>{p.name.substring(0, 40)}</span>}
                        </div>
                        <div>
                          <span className="packof">(Pack of 2)</span>
                        </div>
                        <div className="price-sec">
                          <span className="spSingleProduct">
                            ₹{p.selling_price}
                          </span>
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
              </>
            );
          } else {
            return null;
          }
        })}
      </>
    );
  }

  return (
    <>
      <HomeLayout>
        <div className="container">
          <div className="row">
            <div className="col-md-3 desktop">
              <div style={{ marginTop: "2rem" }}>
                <div class="card" style={{ padding: "0" }}>
                  <div class="card-body">
                    Sort By:{" "}
                    <span style={{ color: "#FE9E2D" }}>Popularity</span>
                  </div>
                </div>
                <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                  <div className="sortBy">
                    <label class="form-check-label" for="flexCheckDefault">
                      Popularity
                    </label>
                    <input
                      style={{ marginLeft: "11.95rem" }}
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>

                  <div>
                    <label class="form-check-label" for="flexCheckDefault">
                      Discount
                    </label>
                    <input
                      style={{ marginLeft: "12.6rem" }}
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>

                  <div>
                    <label class="form-check-label" for="flexCheckDefault">
                      Name
                    </label>
                    <input
                      style={{ marginLeft: "13.9rem" }}
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>

                  <div>
                    <label class="form-check-label" for="flexCheckDefault">
                      Customer Top Rated
                    </label>
                    <input
                      style={{ marginLeft: "6.6rem" }}
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>

                  <div>
                    <label class="form-check-label" for="flexCheckDefault">
                      New Arrivals
                    </label>
                    <input
                      style={{ marginLeft: "10.8rem" }}
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>

                  <div>
                    <label class="form-check-label" for="flexCheckDefault">
                      Price: High to Low
                    </label>
                    <input
                      style={{ marginLeft: "8.3rem" }}
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>

                  <div>
                    <label class="form-check-label" for="flexCheckDefault">
                      Price: Low to High
                    </label>
                    <input
                      style={{ marginLeft: "8.3rem" }}
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>
                </div>
              </div>

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
                          <div className="sortBy">
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              50-499
                            </label>
                            <input
                              style={{ marginLeft: "7rem" }}
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["50-499"]}
                              onChange={() => handleFilter(50, 499)}
                              id="flexCheckDefault"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              500-999
                            </label>
                            <input
                              style={{ marginLeft: "6.45rem" }}
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["500-999"]}
                              onChange={() => handleFilter(500, 999)}
                              id="flexCheckDefault"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              1000-1999
                            </label>
                            <input
                              style={{ marginLeft: "5.88rem" }}
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["1000-1999"]}
                              onChange={() => handleFilter(1000, 1999)}
                              id="flexCheckDefault"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              2000-4999
                            </label>
                            <input
                              style={{ marginLeft: "5.34rem" }}
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["2000-4999"]}
                              onChange={() => handleFilter(2000, 4999)}
                              id="flexCheckDefault"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              5000 & Above
                            </label>
                            <input
                              style={{ marginLeft: "3.963rem" }}
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["5000-500000"]}
                              onChange={() => handleFilter(5000, 500000)}
                              id="flexCheckDefault"
                            />
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
                <img src={banner.thumbnail?.url} width="100%" alt="baner" />
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
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>

              <div className="row" style={{ marginTop: "1rem" }}>
                {/* Combo products */}

                {section}

                {/* Categories combo secetion */}
                {categoriesComboSection}

                <hr />
                <div className="byocc">
                  <h3>Bulid Your Own Combo</h3>
                  <img src="/assets/img/byoc.png" alt="byoc-img" />
                </div>
                <hr />

                {/* Single Products */}
                {filteredProducts.length > 0
                  ? filteredProducts.map((p) => (
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
                                {/* key={subArray[0].id} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : brandProduct.map((subArray) => {
                      if (subArray.length > 0) {
                        return (
                          <>
                            {subArray.map((p) => (
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
                                      {/* <span>{p.name.substring(0, 40)}</span> */}
                                      {p.name && (
                                        <span>{p.name.substring(0, 40)}</span>
                                      )}
                                    </div>
                                    <div>
                                      <span className="packof">
                                        (Pack of 2)
                                      </span>
                                    </div>
                                    <div className="price-sec">
                                      <span className="spSingleProduct">
                                        ₹{p.selling_price}
                                      </span>
                                    </div>
                                    <div className="card-btn-sec ">
                                      <div
                                        className="btn_atc"
                                        onClick={() => {
                                          addToSingleCart(p);
                                          alert(
                                            "product added to cart successfully"
                                          );
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
                          </>
                        );
                      } else {
                        return null;
                      }
                    })}

                    {/* Categories single Product */}
                    {categoriesProductSection}
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default CustomPage;

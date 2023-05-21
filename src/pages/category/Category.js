import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./category.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Dropdown from "react-bootstrap/Dropdown";
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
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import { fetchCategory } from "../../components/features/actions/categoryActions";
import { fetchCategories } from "../../components/features/actions/categoriesActions";
import { fetchBrand } from "../../components/features/actions/brandActions";
import Loader from "../../components/home/Loader/Loader";

const Category = () => {
  const dispatch = useDispatch();
  // Categories products combo & single Products
  const navigate = useNavigate();
  const { id } = useParams();

  // filteration state
  // const [originalCategory, setOriginalCategory] = useState([]);
  // const [originalProduct, setOriginalProduct] = useState([]);
  const [filterCombo, setFilterCombo] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [checkedFilters, setCheckedFilters] = useState({});
  const [noProduct, setNoProduct] = useState(false);
  const { combo, product, banner, loading } = useSelector(
    (state) => state.data
  );

  console.log(combo);

  // filteration state end
  const [error, setError] = useState(null);

  // category api fetching
  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, id]);

  const sortData = () => {
    const sortedData = [...combo].sort(
      (a, b) => b.selling_price - a.selling_price
    );
    const sortedDataProduct = [...product].sort(
      (a, b) => b.selling_price - a.selling_price
    );
    // setCategory(sortedData);
    // category(sortedData)

    // setProduct(sortedDataProduct);
  };

  const lowtoHigh = () => {
    const sortedData = [...combo].sort(
      (a, b) => a.selling_price - b.selling_price
    );
    const sortedDataProducts = [...product].sort(
      (a, b) => a.selling_price - b.selling_price
    );

    // setCategory(sortedData);
    // category(sortedData)
    // setProduct(sortedDataProducts);
  };

  // filteration

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
      // if (filtered1.length > 0) {
      //   setNoProduct(false); // hide message
      // } else {
      //   setNoProduct(true); // show message
      //   alert("Item not found in this price range");
      
      //   setCheckedFilters({ ...checkedFilters, [key]: false });
      // }
      setFilterCombo((prevFilteredProducts) => [
        ...prevFilteredProducts,
        ...filtered1,
      ]);

      const filtered2 = product.filter((product) => {
        const price = product.selling_price;
        return price >= minPrice && price <= maxPrice;
      });
      // if (filtered2.length > 0) {
      //   setNoProduct(false); // hide message
      // } else {  
      //   setNoProduct(true); // show message
      //   alert("Item not found in this price range");
       
      //   setCheckedFilters({ ...checkedFilters, [key]: false });
      // }
      setFilteredProducts((prevFilteredProducts) => [
        ...prevFilteredProducts,
        ...filtered2,
      ]);
    }
  };

  // Categories api

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // add to cart for combo

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

  if (error) {
    console.log(error);
  }

  // total brands
  const { brand } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(fetchBrand());
  }, [dispatch]);

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

  // if there is no combo hide the section of combos

  let section = null;
  if (loading) {
    section = <div>Loading...</div>;
  } else if (combo.length >= 1) {
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
              <div style={{ marginTop: "2rem" }}>
                <div className="card" style={{ padding: "0" }}>
                  <div className="card-body">
                    Sort By:{" "}
                    <span style={{ color: "#FE9E2D" }}>Popularity</span>
                  </div>
                </div>
                <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                  <div className="sortBy">
                    <label className="form-check-label" htmlFor="Popularity">
                      Popularity
                    </label>
                    <input
                      style={{ marginLeft: "11.95rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="Popularity"
                    />
                  </div>

                  <div className="sortBy">
                    <label className="form-check-label" htmlFor="Discount">
                      Discount
                    </label>
                    <input
                      style={{ marginLeft: "12.6rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="Discount"
                    />
                  </div>

                  <div className="sortBy">
                    <label className="form-check-label" htmlFor="Name">
                      Name
                    </label>
                    <input
                      style={{ marginLeft: "13.9rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="Name"
                    />
                  </div>

                  <div className="sortBy">
                    <label
                      className="form-check-label"
                      htmlFor="CustomerTopRated"
                    >
                      Customer Top Rated
                    </label>
                    <input
                      style={{ marginLeft: "6.6rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="CustomerTopRated"
                    />
                  </div>

                  <div className="sortBy">
                    <label className="form-check-label" htmlFor="NewArrivals">
                      New Arrivals
                    </label>
                    <input
                      style={{ marginLeft: "10.8rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="NewArrivals"
                    />
                  </div>

                  <div className="sortBy">
                    <label
                      className="form-check-label"
                      htmlFor="PriceHighToLow"
                    >
                      Price: High to Low
                    </label>
                    <input
                      style={{ marginLeft: "8.3rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="PriceHighToLow"
                    />
                  </div>

                  <div className="sortBy">
                    <label
                      className="form-check-label"
                      htmlFor="PriceLowToHigh"
                    >
                      Price: Low to High
                    </label>
                    <input
                      style={{ marginLeft: "8.3rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="PriceLowToHigh"
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
                          {categories.map((e) => (
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
                            <div className="form-check" key={e.id}>
                              <input
                                type="radio"
                                name="category_id"
                                id="category_id103"
                                defaultValue={103}
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
                              className="form-check-label"
                              htmlFor="50-499"
                            >
                              50-499
                            </label>
                            <input
                              style={{ marginLeft: "7rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["50-499"]}
                              onChange={() => handleFilter(50, 499)}
                              id="50-499"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              htmlFor="500-999"
                            >
                              500-999
                            </label>
                            <input
                              style={{ marginLeft: "6.45rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["500-999"]}
                              onChange={() => handleFilter(500, 999)}
                              id="500-999"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              htmlFor="1000-1999"
                            >
                              1000-1999
                            </label>
                            <input
                              style={{ marginLeft: "5.88rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["1000-1999"]}
                              onChange={() => handleFilter(1000, 1999)}
                              id="1000-1999"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              htmlFor="2000-4999"
                            >
                              2000-4999
                            </label>
                            <input
                              style={{ marginLeft: "5.34rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["2000-4999"]}
                              onChange={() => handleFilter(2000, 4999)}
                              id="2000-4999"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              htmlFor="5000&Above"
                            >
                              5000 & Above
                            </label>
                            <input
                              style={{ marginLeft: "3.963rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["5000-500000"]}
                              onChange={() => handleFilter(5000, 500000)}
                              id="5000&Above"
                            />
                          </div>
                        </div>
                        {/* <div id="collapseExample">
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
                        </div> */}
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="col-md-9" style={{margin: "auto"}}>
                <Loader />
              </div>
            ) : (
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
                  <div className="col-6">
                    <h4>
                      <strong>Top Trending</strong>
                    </h4>
                  </div>
                  {/* <div className="col-6" style={{ textAlign: "end" }}>
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
                </div> */}
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
                      ))
                    : product.map((p) => (
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
            )}
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default Category;

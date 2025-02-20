import React, { useState, useEffect, useCallback } from "react";

import HomeLayout from "../../layouts/HomeLayout";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./category.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { CgSortAz } from "react-icons/cg";
import { BiFilterAlt } from "react-icons/bi";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { fetchBrand } from "../../components/features/actions/brandActions";
import { Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  singleaddCartProduct,
  getsingleCartCount,
  getsingleSubTotal,
  getsingleTotalAmount,
  getsingleTotalDiscount,
} from "../../components/features/SingleCartSlice";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const SubCategory = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [subCat, setSubCat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [priceRanges, setPriceRanges] = useState([
    { minPrice: 50, maxPrice: 499, label: "50-499", isVisible: true },
    { minPrice: 500, maxPrice: 999, label: "500-999", isVisible: true },
    { minPrice: 1000, maxPrice: 1999, label: "1000-1999", isVisible: true },
    { minPrice: 2000, maxPrice: 4999, label: "2000-4999", isVisible: true },
    {
      minPrice: 5000,
      maxPrice: 500000,
      label: "5000 & above",
      isVisible: true,
    },
  ]);
  

  //   subCat product
  const [product, setProduct] = useState([]);
  const [name, setName] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/subcat/${slug}`,
          options
        );

        setProduct(response.data.data.products);
        setName(response.data.data.subcat);
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = parseInt(error.response.headers["retry-after"]);
          setTimeout(() => {
            fetchData();
          }, retryAfter * 1000);
        }
      }
    }
    fetchData();
  }, [slug]);

  // filteration
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [checkedFilters, setCheckedFilters] = useState({});

  const handleFilter = (minPrice, maxPrice) => {
    const key = `${minPrice}-${maxPrice}`;

    if (checkedFilters[key]) {
      // If the filter is already checked, remove it
      const newFilters = { ...checkedFilters };
      delete newFilters[key];
      setCheckedFilters(newFilters);

      // Update the filtered products list
      const newFilteredProducts = filteredProducts.filter((product) => {
        const price = product.selling_price;
        return !(price >= minPrice && price <= maxPrice);
      });
      setFilteredProducts(newFilteredProducts);
    } else {
      // If the filter is not checked, add it
      setCheckedFilters({ ...checkedFilters, [key]: true });

      // Update the filtered products list
      const filtered = product.filter((product) => {
        const price = product.selling_price;
        return price >= minPrice && price <= maxPrice;
      });

      setFilteredProducts((prevFilteredProducts) => [
        ...prevFilteredProducts,
        ...filtered,
      ]);
    }
  };

  useEffect(() => {
    const updatePriceRangeVisibility = () => {
      const updatedPriceRanges = priceRanges.map((range) => {
        const { minPrice, maxPrice } = range;
        const isVisible = product.some(
          (product) =>
            product.selling_price >= minPrice &&
            product.selling_price <= maxPrice
        );
        return { ...range, isVisible };
      });
      setPriceRanges(updatedPriceRanges);
    };

    updatePriceRangeVisibility();
  }, [product]);

  // brand api
  const { brand } = useSelector((state) => state.brand);

  const fetchBrandData = useCallback(() => {
    dispatch(fetchBrand());
  }, [dispatch]);

  useEffect(() => {
    fetchBrandData();
  }, [fetchBrandData]);

  const filterbrandsApi = brand.filter((e) => e.focused === "on");

  // add to cart single product

  let SingleproductObj = {
    id: "",
    title: "",
    price: "",
    image: "",
    mrp: "",
    discount: "",
    slug:"",
  };

  const addToSingleCart = (p) => {
    SingleproductObj = {
      id: p.id,
      slug: p.slug,
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

  function handleClick(categorySlug) {
    // setPageNumber(1);
    // setCheckedFilters(false);
    // setFilteredProducts([]);
    // setFilterCombo([]);
    // setCheckedFilters(false);
    navigate(`/subcat/${categorySlug}`);
  }

  function handleClickbrand(brandId) {
    // setPageNumber(1);
    // setFilteredProducts([]);
    // setFilterCombo([]);
    // setCheckedFilters(false);
    navigate(`/brand/${brandId}`);
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

  const [isOpen4, setIsOpen4] = useState(false);
  const handleToggle4 = () => {
    setIsOpen4(!isOpen4);
  };

  const [isOpen5, setIsOpen5] = useState(false);
  const handleToggle5 = () => {
    setIsOpen5(!isOpen5);
  };
  return (
    <>
      <HomeLayout>
        <div className="mobile">
          <div
            className="d-flex fixed-bottom bg-light"
            style={{
              textAlign: "center",
              fontSize: "16px",
              height: "40px",
              alignItems: "center",
            }}
          >
            <div className="col-6" style={{ borderRight: "1px solid #464646" }}>
              <div
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasLeft"
                aria-controls="offcanvasRight"
              >
                {" "}
                <CgSortAz /> Sort By
              </div>

              <div
                className="offcanvas offcanvas-bottom"
                tabIndex="-1"
                id="offcanvasLeft"
                aria-labelledby="offcanvasLeftLabel"
                style={{ height: "80%" }}
              >
                <div className="offcanvas-header">
                  <h1 id="offcanvasLeftLabel">Sort By</h1>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <hr />
                <div
                  className="offcanvas-body"
                  style={{
                    textAlign: "left",
                    lineHeight: "2",
                    marginTop: "20px",
                  }}
                >
                  <ul>
                    <li>Name</li>
                    <li>Category</li>
                    <li>MRP</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                {" "}
                <BiFilterAlt /> Filter
              </div>

              <div
                className="offcanvas offcanvas-bottom"
                tabIndex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
                style={{ height: "80%" }}
              >
                <div className="offcanvas-header">
                  <h1 id="offcanvasRightLabel">Filter</h1>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <hr />
                <div className="offcanvas-body" style={{ textAlign: "left" }}>
                  <div>
                    <h5
                      variant="primary"
                      onClick={handleToggle4}
                      aria-controls="collapseExample"
                      // aria-expanded={isOpen4}
                    >
                      Category
                      {isOpen4 ? (
                        <TfiAngleUp
                          style={{ position: "absolute", right: "1rem" }}
                        />
                      ) : (
                        <TfiAngleDown
                          style={{ position: "absolute", right: "1rem" }}
                        />
                      )}
                    </h5>

                    <Collapse in={isOpen4}>
                      <div id="collapseExample">
                        <div style={{ margin: "10px 5px 5px 5px" }}>
                          {subCat.map((e) => (
                            <div className="form-check" key={e.id}>
                              <input
                                type="radio"
                                name="category_id"
                                id={e.name}
                                className="form-check-input"
                                onClick={() => handleClick(e.slug)}
                              />

                              <label
                                className="form-check-label"
                                htmlFor={e.name}
                              >
                                {e.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Collapse>
                  </div>

                  <div>
                    <h5
                      variant="primary"
                      onClick={handleToggle5}
                      aria-controls="collapseExample"
                      // aria-expanded={isOpen5}
                    >
                      Price
                      {isOpen5 ? (
                        <TfiAngleUp
                          style={{ position: "absolute", right: "1rem" }}
                        />
                      ) : (
                        <TfiAngleDown
                          style={{ position: "absolute", right: "1rem" }}
                        />
                      )}
                    </h5>

                    <Collapse in={isOpen5}>
                      <div id="collapseExample">
                        <div style={{ margin: "10px 5px 5px 5px" }}>
                          <input
                            type="hidden"
                            name="_token"
                            defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                          />{" "}
                          {priceRanges.map((range) => {
                            const { minPrice, maxPrice, label, isVisible } =
                              range;
                            const key = `${minPrice}-${maxPrice}`;

                            return isVisible ? (
                              <div key={key} className="sortBy">
                                <label
                                  className="form-check-label"
                                  htmlFor={key}
                                >
                                  {label}
                                </label>
                                <input
                                  style={{ marginLeft: "7rem" }}
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  checked={!!checkedFilters[key]}
                                  onChange={() =>
                                    handleFilter(minPrice, maxPrice)
                                  }
                                  id={key}
                                />
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                      type="radio"
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
                      type="radio"
                      name="category_id"
                      className="form-check-input"
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
                        <h6
                          className="col-9 mb-0 px-0"
                          style={{ backgroundColor: "#FFF", textAlign: "left" }}
                        >
                          Subcategory
                        </h6>

                        {isOpen1 ? (
                          <RiArrowDropUpLine
                            className="col-3 "
                            style={{
                              fontSize: "30px",
                              backgroundColor: "#FFF",
                              color: "#464646",
                            }}
                          />
                        ) : (
                          <RiArrowDropDownLine
                            className="col-3 "
                            style={{
                              fontSize: "30px",
                              backgroundColor: "#FFF",
                              color: "#464646",
                            }}
                          />
                        )}
                      </div>

                      <Collapse in={isOpen1}>
                        <div id="collapseExample">
                          <input
                            type="hidden"
                            name="_token"
                            defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                          />{" "}
                          {subCat.map((e) => (
                            <div className="form-check" key={e.id}>
                              <input
                                type="radio"
                                name="category_id"
                                // id={`category_id${category.id}`}
                                // defaultValue={category.id}
                                className="form-check-input"
                                onClick={() => handleClick(e.slug)}
                              />

                              <label className="form-check-label">
                                {e.name}
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
                        <h6
                          className="col-9 mb-0 px-0"
                          style={{ backgroundColor: "#FFF", textAlign: "left" }}
                        >
                          Brand
                        </h6>

                        {isOpen2 ? (
                          <RiArrowDropUpLine
                            className="col-3 "
                            style={{
                              fontSize: "30px",
                              backgroundColor: "#FFF",
                              color: "#464646",
                            }}
                          />
                        ) : (
                          <RiArrowDropDownLine
                            className="col-3 "
                            style={{
                              fontSize: "30px",
                              backgroundColor: "#FFF",
                              color: "#464646",
                            }}
                          />
                        )}
                      </div>

                      <Collapse in={isOpen2}>
                        <div
                          id="collapseExample"
                          style={{ margin: "10px 5px 5px 5px" }}
                        >
                          {filterbrandsApi.map((e) => (
                            <div className="form-check" key={e.id}>
                              <input
                                type="radio"
                                name="category_id"
                                id={e.name}
                                className="form-check-input"
                                onClick={() => handleClickbrand(e.slug)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={e.name}
                              >
                                {e.name}
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
                        <h6
                          className="col-9 mb-0 px-0"
                          style={{ backgroundColor: "#FFF", textAlign: "left" }}
                        >
                          Price
                        </h6>

                        {isOpen3 ? (
                          <RiArrowDropUpLine
                            className="col-3 "
                            style={{
                              fontSize: "30px",
                              backgroundColor: "#FFF",
                              color: "#464646",
                            }}
                          />
                        ) : (
                          <RiArrowDropDownLine
                            className="col-3 "
                            style={{
                              fontSize: "30px",
                              backgroundColor: "#FFF",
                              color: "#464646",
                            }}
                          />
                        )}
                      </div>

                      <Collapse in={isOpen3}>
                        <div
                          id="collapseExample"
                          style={{ margin: "10px 5px 5x 5px" }}
                        >
                          <input
                            type="hidden"
                            name="_token"
                            defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                          />{" "}
                          {priceRanges.map((range) => {
                            const { minPrice, maxPrice, label, isVisible } =
                              range;
                            const key = `${minPrice}-${maxPrice}`;

                            return isVisible ? (
                              <div key={key} className="sortBy">
                                <label
                                  className="form-check-label"
                                  htmlFor={key}
                                >
                                  {label}
                                </label>
                                <input
                                  style={{ marginLeft: "7rem" }}
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  checked={!!checkedFilters[key]}
                                  onChange={() =>
                                    handleFilter(minPrice, maxPrice)
                                  }
                                  id={key}
                                />
                              </div>
                            ) : null;
                          })}
                          {/* <div className="sortBy">
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
                          </div> */}
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-9 mt-2">
              {isLoading && <div id="cover-spin"></div>}
              {/* {loading ? (
                <div id="cover-spin"></div>
              ) : (
                <div style={{ display: "none" }}></div>
              )} */}
              {/* <div className="banner" key={banner.id}>
                <img src={banner.banner?.url} width="100%" alt="baner" />
              </div> */}

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
                      <Link className="categoriesName">{name.name}</Link>
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

                        {/* <Dropdown.Menu>
                        
                          <Dropdown.Item
                            onClick={() => handleSort("lowToHigh")}
                          >
                            LOW TO HIGH
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleSort("highToLow")}
                          >
                            HIGH TO LOW
                          </Dropdown.Item>
                        </Dropdown.Menu> */}
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" style={{ marginTop: "1rem" }}>
                {/* Combo products */}

               

                {/* Single Products */}
                {filteredProducts.length > 0
                  ? filteredProducts.map((p) => (
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
                            <Link to={`/product/${p.slug}`}>
                              <img
                                src={p.thumbnail_img?.original_url}
                                alt="img"
                                width="100%"
                              ></img>
                            </Link>
                          </div>

                          <div className="card-det-sec">
                            <div className="headingCard pt-3">
                              <span>{p.name.substring(0, 25) + "..."}</span>
                            </div>

                            <div className="price-sec">
                              <div
                                className="col-4"
                                style={{ textAlign: "end" }}
                              >
                                <span className="sp">₹{p.selling_price}</span>
                              </div>
                              <div className="col-4">
                                <del className="mrp">₹{p.mrp}</del>
                              </div>
                              <div className="col-4">
                                <span className="discount">
                                  {p.discount}% OFF
                                </span>
                              </div>
                            </div>
                            <div className="card-btn-sec">
                              <div
                                className="btn_atc"
                                onClick={() => {
                                  addToSingleCart(p);
                                }}
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                <p className="cartTextMob" id={p.id}>
                                  Add to Cart
                                </p>
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
                              //   onClick={() => wishlistProductData(p.id)}
                              className="addtofavCategory"
                            >
                              <ul>
                                {/* <li className="youMayLikeHeart">
                              {heartFilled === p.id ? (
                                <i
                                  style={{ color: "#fe9e2d" }}
                                  className="bi bi-heart-fill"
                                ></i>
                              ) : (
                                <i className="bi bi-heart"></i>
                              )}
                            </li> */}
                              </ul>
                            </Link>
                            <Link to={`/product/${p.slug}`}>
                              <img
                                src={p.thumbnail_img?.original_url}
                                alt={p.name}
                                width="100%"
                              ></img>
                            </Link>
                          </div>

                          <div className="card-det-sec">
                            <div className="headingCard pt-3 ">
                              <span>{p.name.substring(0, 25) + "..."}</span>
                            </div>
                            {/* <div>
                              <span className="packof">(Pack of 2)</span>
                            </div> */}
                            <div className="price-sec">
                              <span className="spSingleProduct">
                                ₹{p.selling_price}
                              </span>

                              <div className="col-4">
                                <del className="mrp">₹{p.mrp}</del>
                              </div>
                              {/* <div className="col-4">
                                <span className="discount">
                                  {p.discount}% OFF
                                </span>
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
                                <p className="cartTextMob" id={p.id}>
                                  Add to Cart
                                </p>
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

export default SubCategory;

import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./category.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { CgSortAz } from "react-icons/cg";
import { BiFilterAlt } from "react-icons/bi";
import {
  singleaddCartProduct,
  getsingleCartCount,
  getsingleSubTotal,
  getsingleTotalAmount,
  getsingleTotalDiscount,
} from "../../components/features/SingleCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "react-bootstrap";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import {
  fetchBrandproduct,
  sortBrandproduct,
} from "../../components/features/actions/brandproductActions";
import { fetchBrand } from "../../components/features/actions/brandActions";
import { fetchCategories } from "../../components/features/actions/categoriesActions";
// import Loader from "../../components/home/Loader/Loader";

import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";

const BrandProduct = () => {
  // Brand products api
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  // filteration state
  // const [noProduct, setNoProduct] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [checkedFilters, setCheckedFilters] = useState({});

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

  // filteration state end
  const [pageNumber, setPageNumber] = useState(1);
  const { brandproduct, brandname, loading, totalPages } = useSelector(
    (state) => state.branddata
  );

  const handleSort = (sortOrder) => {
    dispatch(sortBrandproduct(sortOrder));
  };

  useEffect(() => {
    dispatch(fetchBrandproduct(slug, pageNumber));
    setFilteredProducts([]);
    setCheckedFilters(false);
  }, [dispatch, slug, pageNumber]);

  const handlePageClick = (page) => {
    setFilteredProducts([]);
    setCheckedFilters(false);
    setPageNumber(page);

    // dispatch(fetchBrandproduct(brand_id, page));
  };

  const handlePreviousClick = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPage) => prevPage - 1);
      // dispatch(fetchBrandproduct(brand_id, pageNumber - 1));
    }
  };

  const handleNextClick = () => {
    if (pageNumber < totalPages) {
      setPageNumber((prevPage) => prevPage + 1);
      // dispatch(fetchBrandproduct(brand_id, pageNumber + 1));
    }
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (page) => (
        <li className="page-item" key={page}>
          <Link
            className={`page-link page-number ${
              pageNumber === page ? "active" : ""
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </Link>
        </li>
      )
    );
  };

  // filteration

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
      const filtered = brandproduct.filter((product) => {
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
        const isVisible = brandproduct.some(
          (product) =>
            product.selling_price >= minPrice &&
            product.selling_price <= maxPrice
        );
        return { ...range, isVisible };
      });
      setPriceRanges(updatedPriceRanges);
    };

    updatePriceRangeVisibility();
  }, [brandproduct]);

  // Filterration end

  // total brands

  const { brand } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(fetchBrand());
  }, [dispatch]);

  const filterbrandsApi = brand.filter((e) => e.focused === "on");

  // Categories api fetching
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  //for scroll

  // Add to cart single brand products

  let SingleproductObj = {
    id: "",
    title: "",
    price: "",
    image: "",
    mrp: "",
    discount: "",
    slug: "",
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

  function handleClick(categoryId) {
    setFilteredProducts([]);
    setCheckedFilters(false);
    setPageNumber(1);
    navigate(`/category/${categoryId}`);
    // window.location.reload(`/category/${categoryId}`)
  }

  function handleClickbrand(brandId) {
    setFilteredProducts([]);
    setCheckedFilters(false);
    setPageNumber(1);
    navigate(`/brand/${brandId}`);
  }

  let singlebrandProduct = null;
  if (brandproduct.length >= 1) {
    singlebrandProduct = (
      <>
        {brandproduct.map((p) => (
          <div className="col-md-4 " key={p.id}>
            <div className="newComboCart">
              <div className="cart-img-sec" style={{ position: "relative" }}>
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

                <div className="price-sec" style={{ padding: "0 8px 0 20px" }}>
                  <div className="col-3">
                    <span className="sp">₹{Math.round(p.selling_price)}</span>
                  </div>
                  <div className="col-4">
                    <del className="mrp">₹{p.mrp}</del>
                  </div>
                  <div className="col-5">
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
                    <p className="cartTextMob" id={p.id}>
                      Add to Cart
                    </p>
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
    <div>
      <HomeLayout>
        <div className="mobile">
          <div
            className="d-flex fixed-bottom bg-light"
            style={{
              textAlign: "center",
              fontSize: "16px",
              height: "40px",
              alignItems: "center",
              width: "100vw",
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
                          {categories.map((e) => (
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

                  <div>
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

                  <div>
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

                  <div>
                    <label className="form-check-label" for="CustomerTopRated">
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

                  <div>
                    <label className="form-check-label" for="NewArrivals">
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

                  <div>
                    <label className="form-check-label" for="PriceHighToLow">
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

                  <div>
                    <label className="form-check-label" for="PriceLowToHigh">
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
                        <h6
                          className="col-9 mb-0 px-0"
                          style={{ backgroundColor: "#FFF", textAlign: "left" }}
                        >
                          Categories
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
                          {categories.map((e) => (
                            <div className="form-check" key={e.id}>
                              <input
                                type="radio"
                                name="category_id"
                                id="category_id103"
                                defaultValue={103}
                                className="form-check-input"
                                onClick={() => handleClick(e.slug)}
                              />

                              <label className="form-check-label" htmlFor={103}>
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
                        <div id="collapseExample">
                          {filterbrandsApi.map((e) => (
                            // <div className="sortBy" key={e.id}>
                            //   <label
                            //     className="form-check-label"

                            //     htmlFor={`brand_${brand.id}`}
                            //   >
                            //     {e.name}
                            //   </label>
                            //   <input
                            //     type="checkbox"
                            //     name="brand"
                            //     value={brand.slug}
                            //     onChange={handleCheckboxChange}

                            //     className="form-check-input"

                            //   />
                            // </div>
                            <div className="form-check" key={e.id}>
                              <input
                                type="radio"
                                name="category_id"
                                id="category_id103"
                                defaultValue={103}
                                className="form-check-input"
                                onClick={() => handleClickbrand(e.slug)}
                              />
                              <label className="form-check-label" htmlFor={103}>
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
                        <div id="collapseExample">
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
                              checked={!!checkedFilters["50-499"]}
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
                              checked={!!checkedFilters["500-999"]}
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
                              checked={!!checkedFilters["1000-1999"]}
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
                              checked={!!checkedFilters["2000-4999"]}
                              onChange={() => handleFilter(2000, 4999)}
                              id="2000-4999"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              htmlFor="5000 & Above"
                            >
                              5000 & Above
                            </label>
                            <input
                              style={{ marginLeft: "3.963rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={!!checkedFilters["5000-500000"]}
                              onChange={() => handleFilter(5000, 500000)}
                              id="5000 & Above"
                            />
                          </div> */}
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* mobile filter */}
            <div className="bottom-bar mobile">
              <ul className="nav justify-content-center bg-white">
                <li></li>
              </ul>
            </div>

            {/* end mobile filter */}

            <div className="col-md-9">
              {loading ? (
                <div id="cover-spin"></div>
              ) : (
                <div style={{ display: "none" }}></div>
              )}
              {/* <div id="cover-spin"></div> */}
              <div>
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
                        <Link className="categoriesName">{brandname.name}</Link>
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
                  <div className="col-md-6 desktop">
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
                            {/* <Dropdown.Item href="#/action-1">
                            Action
                          </Dropdown.Item> */}
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
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row" style={{ marginTop: "1rem" }}>
                  {/* {noProduct && <p>No product in this price range</p>} */}
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
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

                            <div
                              className="price-sec"
                              style={{ padding: "0 8px 0 20px" }}
                            >
                              <div className="col-3">
                                <span className="sp">₹{Math.round(p.selling_price)}</span>
                              </div>
                              <div className="col-4">
                                <del className="mrp">₹{p.mrp}</del>
                              </div>
                              <div className="col-5">
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
                  ) : (
                    <>{singlebrandProduct}</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-4">
          <nav
            aria-label="Page navigation example"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="desktop">
              page {pageNumber} of {totalPages}
            </div>

            <div>
              <ul
                className="pagination"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <li className="page-item">
                  <Link
                    className="page-link"
                    tabIndex="-1"
                    onClick={handlePreviousClick}
                    disabled={pageNumber === 1}
                  >
                    Previous
                  </Link>
                </li>
                <div className="numbers">
                  <li className="page-item">
                    <Link className="page-number">{renderPageNumbers()}</Link>
                  </li>
                </div>
                <li className="page-item">
                  <Link className="page-link" onClick={handleNextClick}>
                    Next
                  </Link>
                </li>
              </ul>
            </div>

            <div className="desktop"></div>
          </nav>
        </div>
      </HomeLayout>
    </div>
  );
};

export default BrandProduct;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./incAll.css";
import Cookies from "js-cookie";
import { fetchCategories } from "../features/actions/categoriesActions";
import { fetchBrand } from "../features/actions/brandActions";
import { fetchByoc } from "../features/actions/byocActions";
import { useSelector, useDispatch } from "react-redux";
import { fetchStore } from "../features/actions/storeAction";
import { fetchPage } from "../features/actions/pageActions";

const Header = () => {
  const dispatch = useDispatch();


  // set a cookie with SameSite=None and Secure attributes
  Cookies.set("myCookie", "cookieValue", { sameSite: "none", secure: true });

  // set a cookie with SameSite=Strict attribute
  Cookies.set("myCookie", "cookieValue", { sameSite: "strict" });

  // set a cookie with SameSite=Lax attribute
  Cookies.set("myCookie", "cookieValue", { sameSite: "lax" });

  const navigate = useNavigate();

  //for search

  const [data, setData] = useState({
    term: "",
  });

  const [searchResult, setSearchResult] = useState([]);

  function submit(e) {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/search`,
        {
          term: data.search,
        },
        {
          headers: {
            "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          },
        }
      )
      .then((res) => {
        setSearchResult(res.data);
        navigate("/search", { state: res.data });
        console.log(searchResult);
      });
  }
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  //for categories

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // scroll fixes

  useEffect(() => {
    document.body.classList.add("custom-scroll");
    return () => {
      document.body.classList.remove("custom-scroll");
    };
  }, []);

  // For logo

  const { byoc } = useSelector((state) => state.byoc);

  useEffect(() => {
    dispatch(fetchByoc());
  }, [dispatch]);

  const { totalCount } = useSelector((state) => state.cart);
  const { singletotalCount } = useSelector((statee) => statee.SingleCart);

  const totalCartCount = totalCount + singletotalCount;

  // For stores

  const { store } = useSelector((state) => state.store);
  useEffect(() => {
    dispatch(fetchStore());
  }, [dispatch]);

  // For brands

  const { brand } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(fetchBrand());
  }, [dispatch]);

  const filterbrandsApi = brand.filter((e) => e.focused === "on");
  const sliceFilterData = filterbrandsApi.slice(0, 11);

  const [navbarSticky, setNavbarSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionElement = document.getElementById("section");
      const sectionOffset = sectionElement.offsetTop;
      const sectionHeight = sectionElement.offsetHeight;

      if (scrollPosition > sectionOffset + sectionHeight) {
        setNavbarSticky(true);
      } else {
        setNavbarSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // page categories api
  const { page } = useSelector((state) => state.page);

  useEffect(() => {
    dispatch(fetchPage());
  }, [dispatch]);

  const filterCategories = page.filter((pageCategories) => {
    return pageCategories.show_with_category === "on";
  });



  return (
    <div>
      <header className="my-auto desktop">
        {/* wcc for desktop */}
        <section className="top-bar-blink top-banner wcc" id="section">
          <div className="container text-white">
            <div className="row py-1">
              <div className="col-md-6 py-2" id="mainTitle">
                <Link
                  // to="/why-choose-combonation"
                  className="whyChooseCombonation"
                >
                  <p className="my-auto text-white blink">
                    Get Extra 10% OFF on Your First Order
                  </p>
                </Link>
              </div>

              <div className="col-md-2 getAppSection pt-0" >
                <button style={{ backgroundColor: "#fff", border: "none", borderRadius: "4px" }}>
                  <Link style={{ color: "#464646" }} to="/why-choose-combonation">
                    Why COMBONATION?
                  </Link>
                </button>
              </div>
              <div className="col-md-2 saleSection" style={{ paddingTop: "5px",position: "relative" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="32" viewBox="0 0 23 32">
                  <path id="Path_1699" data-name="Path 1699" d="M10.5,3h15a3,3,0,0,1,3,3V30a3,3,0,0,1-3,3h-15a3,3,0,0,1-3-3V6a3,3,0,0,1,3-3Z" transform="translate(-6.5 -2)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />

                </svg>

                <svg style={{ position: "absolute",left: "68px", bottom: "10px" }} xmlns="http://www.w3.org/2000/svg" width="13" height="2" viewBox="0 0 13 2">
                  <line id="Line_116" data-name="Line 116" x2="11" transform="translate(1 1)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2" />
                </svg>


                <Link className="text-white text-align: left; getApp" to="/">
                  Get App
                </Link>
              </div>
              {/* <div className="col-md-2 saleSection">
                <Link className="text-white saleText" to="/">
                  SALE
                </Link>
              </div> */}
              <div className="col-md-2 helpSection">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30.31"
                  height="28.5"
                  viewBox="0 0 30.31 28.5"
                  className="helpSvg"
                >
                  <path
                    id="Path_759"
                    data-name="Path 759"
                    d="M821.409,1498.154v-1.3h11.535a1.007,1.007,0,0,0,1.01-1.01v-12.755a11.119,11.119,0,0,0-.989-4.631,12.922,12.922,0,0,0-2.652-3.852,12.535,12.535,0,0,0-3.873-2.631,11.661,11.661,0,0,0-9.3,0,12.537,12.537,0,0,0-3.873,2.631,12.923,12.923,0,0,0-2.652,3.852,11.12,11.12,0,0,0-.989,4.631v10.145h-.463a2.515,2.515,0,0,1-2.526-2.526v-3.368a2.147,2.147,0,0,1,.463-1.326,4.366,4.366,0,0,1,1.221-1.074l.042-2.231a13.072,13.072,0,0,1,1.179-5.115,13.584,13.584,0,0,1,7.157-6.925,12.994,12.994,0,0,1,5.094-1.01,13.391,13.391,0,0,1,5.115.989,13.061,13.061,0,0,1,4.231,2.757,13.8,13.8,0,0,1,2.9,4.147,13.155,13.155,0,0,1,1.179,5.157l.042,2.147a3.523,3.523,0,0,1,1.221.969,2,2,0,0,1,.463,1.262v3.873a2.007,2.007,0,0,1-.463,1.263,3.526,3.526,0,0,1-1.221.968v2.652a2.374,2.374,0,0,1-2.315,2.315Zm-4.041-11.7a1.047,1.047,0,0,1-.758-.337,1.092,1.092,0,0,1-.337-.8,1.045,1.045,0,0,1,.337-.757,1.093,1.093,0,0,1,.8-.337,1.156,1.156,0,0,1,1.094,1.095,1.151,1.151,0,0,1-1.136,1.137Zm8.84,0a1.151,1.151,0,0,1-1.137-1.137,1.046,1.046,0,0,1,.337-.757,1.093,1.093,0,0,1,.8-.337,1.157,1.157,0,0,1,1.095,1.095,1.092,1.092,0,0,1-.337.8A1.046,1.046,0,0,1,826.208,1486.451Zm-13.3-2.652a8.526,8.526,0,0,1,.589-4,9.161,9.161,0,0,1,8.377-5.641,8.274,8.274,0,0,1,5.746,2.147,9.058,9.058,0,0,1,2.926,5.346,11.1,11.1,0,0,1-6.231-1.894A12.484,12.484,0,0,1,820.1,1475a11.793,11.793,0,0,1-2.526,5.325A11.947,11.947,0,0,1,812.9,1483.8Z"
                    transform="translate(-806.632 -1469.654)"
                    fill="#fff"
                  />
                </svg>

                <a style={{ color: "#A2A2A2" }}
                  className="text-white helpText"
                  href="mailto:customercare@combonation.in"
                >
                  Help</a>

              </div>
            </div>
          </div>
        </section>
        {/*wcc end */}

        {/* navbar Start */}
        <div className="">
          <div id="navSec" className={navbarSticky ? "fixed-top " : ""}>
            <nav className="navbar navbar-expand-lg bg-light">
              <div className="container">
                {Array.isArray(byoc) &&
                  byoc.map((e) => (
                    <Link className="navbar-brand" to="/" key={e.id}>
                      <img
                        src={e.logo?.original_url}
                        alt="logo-combonation"
                        style={{ width: "130px", height: "60px" }}
                      ></img>
                    </Link>
                  ))}
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <form className="d-flex search" onSubmit={(e) => submit(e)}>
                  <input
                    id="search"
                    className="form-control me-2"
                    type="search"
                    name="search"
                    placeholder="Search over 4,000+ Products"
                    aria-label="Search"
                    value={data.search}
                    onChange={(e) => handle(e)}

                  ></input>
                </form>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        id="navbarDropdown"
                        role="button"
                        aria-expanded="false"

                      >
                        CATEGORIES
                      </Link>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                        style={{ marginLeft: "-277px" }}
                      >
                        <div className="menu-wrapper">
                          <div className="row small-gutters">
                            {categories.map((e) => (
                              <div
                                className="col-lg-3 col-50 text-center"
                                key={e.id}
                              >
                                <Link to={`/category/${e.slug}`}>
                                  <h6>{e.name}</h6>
                                  <img
                                    src={e.image?.url}
                                    alt={e.slug}
                                    style={{ width: "100px", height: "auto" }}
                                  />
                                </Link>
                              </div>
                            ))}
                            {filterCategories.map((e) => (
                              <div
                                className="col-lg-3 col-50 text-center"
                                key={e.id}
                              >
                                <Link to={`/page/${e.slug}`}>
                                  <h6>{e.name}</h6>
                                  <img
                                    src={e.icon?.original_url}
                                    alt={e.slug}
                                    style={{ width: "100px", height: "auto" }}
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </ul>
                    </li>

                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        // to="javascript:void(0)"
                        id="navbarDropdown"
                        role="button"
                        aria-expanded="false"

                      >
                        BRANDS
                      </Link>

                      {/* brand dropdown */}

                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                        style={{ marginLeft: "-377px" }}
                      >
                        <div className="menu-wrapper">
                          <div className="row small-gutters">
                            {sliceFilterData.map((e) => (
                              <div
                                className="col-lg-3 col-50 text-center"
                                key={e.id}
                              >
                                <Link to={`/brand/${e.slug}`}>
                                  <img
                                    src={e.image?.original_url}
                                    alt={e.name}
                                    style={{ width: "100px", height: "auto" }}
                                  />
                                </Link>
                              </div>
                            ))}
                            <div className="col-lg-3 col-50 text-center">
                              <Link to="/brandlogolist">
                                <img
                                  src="https://www.combonation.in/assets_new/img/viewall.png"
                                  alt="view-all"
                                  style={{ width: "100px", height: "auto" }}
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        id="navbarDropdown"
                        role="button"
                        // data-bs-toggle="dropdown"
                        aria-expanded="false"

                      >
                        <i className="bi bi-geo-alt"></i> LOCATE MY STORES
                      </Link>
                      <ul className="dropdown-menu" id="stores-menu">
                        {store.map((e) => (
                          <li style={{ marginTop: "0.5rem" }} key={e.id}>
                            <Link to={`/store/${e.slug}`}>{e.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  {/* { <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Brands
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">


                  </Link>
                 <ul className="dropdown-menu">
                    {filterbrandsApi.map((e) => (
                      <li key={e.id}>
                        <Link to={`/brand/${e.id}`} className="dropdown-item">
                          {e.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </Link>

                  <ul className="dropdown-menu">
                    {Array.isArray(categories) &&
                      categories.map((e) => (
                        <li key={e.id}>
                          <Link
                            className="dropdown-item"
                            to={`/category/${e.id}`}
                          >
                            {e.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-geo-alt"></i>Locate My Store
                  </Link>
                  <ul className="dropdown-menu">
                    {store.map((e) => (
                      <li key={e.id}>
                        <Link className="dropdown-item" to={`/store/${e.id}`}>
                          {e.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>}  */}
                  <ul
                    className="navbar-nav ml-auto"
                    id="navbar-right"
                    style={{ marginLeft: "auto" }}
                  >
                    <li className="nav-item">
                      <Link to="/signin" className="nav-link">
                        <i className="bi bi-person-circle"></i>
                        <span>Account</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Wishlist" className="nav-link">
                        <i className="bi bi-heart"></i>
                        <span>Wishlist</span>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link

                        to="/Cart"
                        className="nav-link"
                        style={{ position: "relative" }}
                      >
                        <i className="bi bi-cart-fill"></i>
                        <span>Cart</span>
                        <strong
                          className="desktop"
                          style={{
                            position: "absolute",
                            right: ".3rem",
                            bottom: "3rem",
                            zInd: "2",
                            fontSize: "10px",
                            color: "white",
                            backgroundColor: "#FE9E2D",
                            borderRadius: "50%",
                            width: "15px",
                            textAlign: "center",
                          }}
                        >
                          {totalCartCount}
                        </strong>
                      </Link>
                    </li>
                    <div className="mobile">
                      <li className="nav-item">
                        <Link to="/Acccount" className="nav-link">
                          My Profile
                        </Link>
                      </li>
                      <li className="nav-item">
                        {" "}
                        <Link to="/Place" className="nav-link">
                          My Address
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/Wishlist" className="nav-link">
                          My whishlist
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/Orders" className="nav-link">
                          My Orders
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/Wallet" className="nav-link">
                          My Wallet
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="" className="nav-link">
                          Logout
                        </Link>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* navbar ends */}
      </header>

      <header className="mobile">
        {/* wcc for mobile */}
        <section className="top-bar-blink top-banner wcc">
          <div className="container text-white">
            <div className="py-1 divWcc">
              <div className=" py-2" id="mainTitle">
                <Link
                  // to="/account"
                  className="whyChooseCombonation"
                >
                  <p className="my-auto blink">Get Extra 10% OFF on Your First Order</p>
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "2rem",
                  alignItems: "center",
                  position: "relative"
                }}
              >
                <div className="getAppSection" style={{ display: "flex" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="32" viewBox="0 0 23 32">
                    <path id="Path_1699" data-name="Path 1699" d="M10.5,3h15a3,3,0,0,1,3,3V30a3,3,0,0,1-3,3h-15a3,3,0,0,1-3-3V6a3,3,0,0,1,3-3Z" transform="translate(-6.5 -2)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />

                  </svg>

                  <svg style={{ position: "absolute", bottom: "2px", left: "2.5px", width: "5px" }} xmlns="http://www.w3.org/2000/svg" width="13" height="2" viewBox="0 0 13 2">
                    <line id="Line_116" data-name="Line 116" x2="11" transform="translate(1 1)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2" />
                  </svg>



                  <Link className="text-white text-align: left; getApp" to="/">
                    Get App
                  </Link>
                </div>

                {/* <div
                  className="saleSection"
                  style={{
                    paddingTop: "0",
                    marginLeft: "5px",
                    paddingLeft: "5px",
                  }}
                >
                  <Link className="text-white saleText" to="/">
                    SALE
                  </Link>
                </div> */}

                <div
                  className="helpSection"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.31"
                    height="28.5"
                    viewBox="0 0 30.31 28.5"
                    className="helpSvg"
                  >
                    <path
                      id="Path_759"
                      data-name="Path 759"
                      d="M821.409,1498.154v-1.3h11.535a1.007,1.007,0,0,0,1.01-1.01v-12.755a11.119,11.119,0,0,0-.989-4.631,12.922,12.922,0,0,0-2.652-3.852,12.535,12.535,0,0,0-3.873-2.631,11.661,11.661,0,0,0-9.3,0,12.537,12.537,0,0,0-3.873,2.631,12.923,12.923,0,0,0-2.652,3.852,11.12,11.12,0,0,0-.989,4.631v10.145h-.463a2.515,2.515,0,0,1-2.526-2.526v-3.368a2.147,2.147,0,0,1,.463-1.326,4.366,4.366,0,0,1,1.221-1.074l.042-2.231a13.072,13.072,0,0,1,1.179-5.115,13.584,13.584,0,0,1,7.157-6.925,12.994,12.994,0,0,1,5.094-1.01,13.391,13.391,0,0,1,5.115.989,13.061,13.061,0,0,1,4.231,2.757,13.8,13.8,0,0,1,2.9,4.147,13.155,13.155,0,0,1,1.179,5.157l.042,2.147a3.523,3.523,0,0,1,1.221.969,2,2,0,0,1,.463,1.262v3.873a2.007,2.007,0,0,1-.463,1.263,3.526,3.526,0,0,1-1.221.968v2.652a2.374,2.374,0,0,1-2.315,2.315Zm-4.041-11.7a1.047,1.047,0,0,1-.758-.337,1.092,1.092,0,0,1-.337-.8,1.045,1.045,0,0,1,.337-.757,1.093,1.093,0,0,1,.8-.337,1.156,1.156,0,0,1,1.094,1.095,1.151,1.151,0,0,1-1.136,1.137Zm8.84,0a1.151,1.151,0,0,1-1.137-1.137,1.046,1.046,0,0,1,.337-.757,1.093,1.093,0,0,1,.8-.337,1.157,1.157,0,0,1,1.095,1.095,1.092,1.092,0,0,1-.337.8A1.046,1.046,0,0,1,826.208,1486.451Zm-13.3-2.652a8.526,8.526,0,0,1,.589-4,9.161,9.161,0,0,1,8.377-5.641,8.274,8.274,0,0,1,5.746,2.147,9.058,9.058,0,0,1,2.926,5.346,11.1,11.1,0,0,1-6.231-1.894A12.484,12.484,0,0,1,820.1,1475a11.793,11.793,0,0,1-2.526,5.325A11.947,11.947,0,0,1,812.9,1483.8Z"
                      transform="translate(-806.632 -1469.654)"
                      fill="#fff"
                    />
                  </svg>

                  <a style={{ color: "#A2A2A2" }}
                    className="text-white helpText"
                    href="mailto:customercare@combonation.in"
                  >
                    Help</a>

                  {/* <Link to="/help" className="text-white helpText">
                    Help
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*wcc end */}

        {/* Mobile Navbar */}
        <div className="bg-light">
          <div className={navbarSticky ? "fixed-top" : ""}>
            <div
              className="row mx-0 py-2 bg-light"
              style={{
                alignItems: "center",
                width: "100vw",
                overflow: "hidden",
              }}
            >
              {/* button */}
              <div
                className="col"
                style={{ paddingRight: "0", paddingLeft: "0" }}
              >
                <nav
                  className="navbar navbar-light"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  role="button"
                  aria-controls="offcanvasExample"
                >
                  <button
                    style={{ fontSize: "15px" }}
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarToggleExternalContent"
                    aria-controls="navbarToggleExternalContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                </nav>
                <div
                  className="offcanvas offcanvas-bottom"
                  tabIndex={-1}
                  id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel"
                  style={{ height: "90vh" }}
                >
                  <div className="relative">
                    <div className="offcanvas-header pt-6 px-auto">
                      {Array.isArray(byoc) &&
                        byoc.map((e) => (
                          <Link
                            className="navbar-brand mx-auto"
                            to="/"
                            key={e.id}
                            style={{ marginTop: "20px" }}
                          >
                            <img
                              className="mt-3"
                              src={e.logo?.original_url}
                              alt="logo-combonation"
                              style={{ width: "100%", height: "50px" }}
                            ></img>
                          </Link>
                        ))}

                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        style={{
                          position: "absolute",
                          right: "2rem",
                          top: "2rem",
                        }}
                      />
                    </div>
                  </div>

                  <div className="offcanvas-body">
                    <ul style={{ paddingLeft: "0" }}>
                      {/* Home Link */}
                      <li>
                        <Link to="/">Home</Link>
                        <hr />
                      </li>

                      {/* Category Part */}

                      <li
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        <Link>CATEGORIES</Link>
                        <hr />
                      </li>

                      <div className="collapse" id="collapseExample">
                        <div className="row">
                          {categories.map((e) => (
                            <div
                              className="col-lg-3 col-50 text-center"
                              key={e.id}
                            >
                              <Link to={`/category/${e.slug}`}>
                                <h6>{e.name}</h6>
                                <img
                                  src={e.image?.url}
                                  alt={e.slug}
                                  style={{
                                    width: "100px",
                                    height: "auto",
                                    marginTop: "0",
                                  }}
                                />
                              </Link>
                            </div>
                          ))}
                          {filterCategories.map((e) => (
                            <div
                              className="col-lg-3 col-50 text-center"
                              key={e.id}
                            >
                              <Link to={`/page/${e.slug}`}>
                                <h6>{e.name}</h6>
                                <img
                                  src={e.icon?.original_url}
                                  alt={e.slug}
                                  style={{
                                    width: "100px",
                                    height: "auto",
                                    marginTop: "0",
                                  }}
                                />
                              </Link>
                            </div>

                          ))}
                        </div>
                      </div>

                      {/* Brand Part */}

                      <li
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample2"
                        role="button"
                        // aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        <Link>BRANDS</Link>

                        <hr />
                      </li>

                      <div className="collapse" id="collapseExample2">
                        <div className="row">
                          {sliceFilterData.map((e) => (
                            <div
                              className="col-lg-3 col-50 text-center"
                              key={e.id}
                            >
                              <Link to={`/brand/${e.slug}`}>
                                <img
                                  src={e.image?.original_url}
                                  alt={e.name}
                                  style={{ width: "100px", height: "auto" }}
                                />
                              </Link>
                            </div>
                          ))}
                          <div className="col-lg-3 col-50 text-center">
                            <Link to="/brandlogolist">
                              <img
                                src="https://www.combonation.in/assets_new/img/viewall.png"
                                alt="view-all"
                                style={{ width: "100px", height: "auto" }}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Store Location */}

                      <li
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample3"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        <Link>STORES</Link>
                        <hr />
                      </li>

                      <div className="collapse" id="collapseExample3">
                        <div className="card card-body">
                          {store.map((e) => (
                            <li style={{ marginTop: "0.5rem" }} key={e.id}>
                              <Link to={`/store/${e.slug}`}>{e.name}</Link>
                            </li>
                          ))}
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Offcanvas for navbar */}
              {/* logo */}
              <div
                className="col"
                style={{ paddingLeft: "0", marginLeft: "-20px" }}
              >
                {Array.isArray(byoc) &&
                  byoc.map((e) => (
                    <Link className="navbar-brand" to="/" key={e.id}>
                      <img
                        src={e.logo?.original_url}
                        alt="logo-combonation"
                        style={{ width: "100%", height: "50px" }}
                      ></img>
                    </Link>
                  ))}
              </div>

              {/* icons */}
              <div className="col">
                <div
                  className="row"
                  style={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    className="col"
                    style={{ textAlign: "start" }}
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample4"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <i
                      className="bi bi-search pt-0"
                      style={{ fontSize: "15px" }}
                    />

                    {/* <form className="d-flex search" onSubmit={(e) => submit(e)}>
                    <input
                      id="search"
                      className="form-control me-2"
                      type="search"
                      name="search"
                      placeholder="Search over 4,000+ Products"
                      aria-label="Search"
                      value={data.search}
                      onChange={(e) => handle(e)}
                    ></input>
                  </form> */}
                  </div>
                  <div
                    className="col"
                    style={{ paddingRight: "0", textAlign: "start" }}
                  >
                    <Link to="/Wishlist">
                      <i className="bi bi-heart" style={{ fontSize: "15px" }} />
                    </Link>
                  </div>
                  <div
                    className="col"
                    style={{
                      textAlign: "start",
                      // overflow: "hidden",
                      paddingRight: "0",
                      paddingLeft: "0",
                      position: "relative",
                    }}
                  >
                    <Link to="/Cart">
                      <i className="bi bi-cart" style={{ fontSize: "15px" }} />
                    </Link>
                    <strong
                      style={{
                        position: "absolute",
                        right: ".8rem",
                        bottom: "1.2rem",
                        zInd: "2",
                        fontSize: "10px",
                        color: "white",
                        backgroundColor: "#FE9E2D",
                        borderRadius: "50%",
                        width: "15px",
                        textAlign: "center",
                      }}
                    >
                      {totalCartCount}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Mobile Search */}

              <div className="collapse mt-3" id="collapseExample4">
                <form
                  className="d-flex search mx-auto"
                  style={{ width: "95vw" }}
                  onSubmit={(e) => submit(e)}
                >
                  <input
                    id="search"
                    className="form-control"
                    type="search"
                    name="search"
                    placeholder="Search over 4,000+ Products"
                    aria-label="Search"
                    value={data.search}
                    onChange={(e) => handle(e)}
                  ></input>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* navbar ends */}
      </header>
    </div>
  );
};

export default Header;

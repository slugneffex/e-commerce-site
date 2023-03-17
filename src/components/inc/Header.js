import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      };
      const response = await axios.get(`/categories`, options);
      setCategories(response.data);
    }
    fetchData();
  }, []);

  // For logo

  const [logo, setLogo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      const response = await axios.get(`/settings`, options);
      setLogo(response.data);
    }
    fetchData();
  }, []);

  const { totalCount } = useSelector((state) => state.cart);

  return (
    <div>
      <header className="mb-5">
        <nav className="navbar navbar-expand-lg fixed-top bg-light">
          <div className="container">
            {Array.isArray(logo) &&
              logo.map((e) => (
                <Link className="navbar-brand" to="/" key={e.id}>
                  <img src={e.logo?.original_url} alt="logo-combonation"></img>
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
            <form className="d-flex search" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
            </form>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Brands
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/about">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        Another action
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        Something else here
                      </Link>
                    </li>
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
                    <li>
                      <Link className="dropdown-item" to="/">
                        Action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        Another action
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
                        Something else here
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto" id="navbar-right">
                <li className="nav-item">
                  <Link to="/SignIn" className="nav-link">
                    <i className="bi bi-person-circle"></i>
                    <span>Account</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <i className="bi bi-heart"></i>
                    <span>Wishlist</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Cart" className="nav-link">
                    <i className="bi bi-cart-fill"></i>
                    <span>Cart</span>
                    <strong>{totalCount}</strong>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;

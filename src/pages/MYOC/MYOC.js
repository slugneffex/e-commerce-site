import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import "./myoc.css";

const MYOC = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
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
          `${process.env.REACT_APP_BASE_URL}/view-all-products?page=${currentPage}`,
          options
        );
        setProducts(response.data.data);
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
  }, [currentPage]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (error) {
    console.log(error)
  }

  return (
    <>
      <HomeLayout>
        <div className="container my-5">
          <div className="row">
            <div className=" col-md-6" style={{ marginTop: "4rem" }}>
              <h1>Build Your Combo From Products Below</h1>
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="row">
            {products.map((e) => (
              <div className="col-lg-3 col-md-3" key={e.id}>
                <div className="newComboCart">
                  <div className="cart-img-sec">
                    <Link className="addtofavCategory">
                      <i className="bi bi-heart"></i>
                    </Link>
                    <Link to={`/product/${e.id}`}>
                      <img src={e.thumbnail_img?.original_url} alt="img"></img>
                    </Link>
                  </div>

                  <div className="card-det-sec">
                    <div className="headingCard pt-3">
                      <span>{e.name.substring(0, 40)}</span>
                    </div>
                    <div>
                      <span className="packof">(Pack of 2)</span>
                    </div>
                    <div className="price-sec">
                      <div className="col-4" style={{ textAlign: "end" }}>
                        <span className="spSingleProduct">
                          ₹{e.selling_price}
                        </span>
                      </div>
                    </div>
                    <div className="card-btn-sec ">
                      <div className="btn_atc">
                        <i
                          className="bi bi-cart"
                          id={e.id}
                          style={{ cursor: "pointer" }}
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
          {/* number button */}
          <nav>
            <ul className="pagination">
              <li className="page-item disabled" onClick={prevPage}>
                <span
                  className="page-link"
                  aria-hidden="true"
                  style={{ color: "#fe9e2d" }}
                >
                  ‹
                </span>
              </li>
              {/* <li className="page-item active" aria-current="page">
                <span className="page-link">1</span>
              </li> */}
              {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                <li
                  className="page-item "
                  key={page}
                  onClick={() => goToPage(page)}
                >
                  <span className="page-link" style={{ color: "#fe9e2d" }}>
                    {page}
                  </span>
                </li>
              ))}

              <li className="page-item" onClick={nextPage}>
                <span
                  className="page-link"
                  rel="next"
                  aria-label="Next »"
                  style={{ color: "#fe9e2d" }}
                >
                  ›
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </HomeLayout>
    </>
  );
};

export default MYOC;

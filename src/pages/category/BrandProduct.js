import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Link, useParams } from "react-router-dom";
import "./category.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

const BrandProduct = () => {
  const { brand_id } = useParams();

  const [brandProduct, setBrandProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
        },
      };
      const response = await axios.get(`/brand/${brand_id}`, options);
      setBrandProduct(response.data.products.data);
    }
    fetchData();
  }, [brand_id]);

  return (
    <div>
      <HomeLayout>
        <div className="container">
          <div className="row" style={{ marginTop: "6rem" }}>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
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
                    </div>

                    <Link to="/">
                      <div className="accordion-item">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseThree"
                          aria-expanded="false"
                          aria-controls="flush-collapseThree"
                        ></button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-9">
            <div className="row">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to='/'>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link>Brand</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link>Brand</Link>
                  </li>
                </ol>
              </nav>
            </div>
              <div className="byoccBrand">
                <img src="/assets/img/byoc.png"  alt="byoc-img" />
              </div>
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
                {brandProduct.map((e) => (
                  <div className="col-md-4 " key={e.id}>
                    <div className="newComboCart">
                      <div className="cart-img-sec">
                        <Link className="addtofavCategory">
                          <li className="bi bi-heart"></li>
                        </Link>
                        <Link to={`/product/${e.id}`}>
                          <img src={e.thumbnail_img?.original_url} alt="img"></img>
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
                          <Link className="btnC">
                            <li
                              className="bi bi-cart"
                              id={e.id}
                              style={{ cursor: "pointer" }}
                            >
                              Add to Cart
                            </li>
                          </Link>
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

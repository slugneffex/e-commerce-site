import React from "react";
import "./SearchedPage.css";
import { useLocation } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { Link } from "react-router-dom";

const Searchedpage = () => {
  const location = useLocation();
  const data = location.state;

  console.log(data);
  return (
    <>
      <HomeLayout>
        <div className="container">

          {/* <div>
            <h3>Search Result For: </h3>
            <span></span>
          </div> */}
          <div className="row">
            {data.combos.map((e) => (
              <div className="col-lg-3 col-md-3" key={e.id}>
                <div className="newComboCart">
                  <div className="cart-img-sec" style={{position: "relative" }}>
                    <Link className="addtofavCategory">
                      <i className="bi bi-heart" style={{ position: "absolute" , right: ".8rem", top: ".5rem" }}></i>
                    </Link>
                    <Link to={`/combo/${e.id}`}>
                      <img src={e.meta_img?.original_url} alt="img"></img>
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
                        {/* <Link> */}
                        <div
                            // onClick={() => {
                            //   addToCart(e);
                            //   alert("product added to cart successfully")
                            // }}
                            style={{ cursor: "pointer" }}
                          >
                          <i
                            className="bi bi-cart"
                            id={e.id}
                            style={{ cursor: "pointer" }}
                          >
                            Add to Cart
                          </i>
                          </div>

                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="row">
            {data.products.data.map((e) => (
              <div className="col-lg-3 col-md-3" key={e.id}>
                <div className="newComboCart">
                  <div className="cart-img-sec" style={{position: "relative" }}>
                    <Link className="addtofavCategory">
                      <i className="bi bi-heart" style={{ position: "absolute" , right: ".8rem", top: ".5rem" }}></i>
                    </Link>
                    <Link to={`/products/${e.id}`}>
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
                        {/* <Link> */}
                          <i
                            className="bi bi-cart"
                            id={e.id}
                            style={{ cursor: "pointer" }}
                          >
                            Add to Cart
                          </i>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default Searchedpage;

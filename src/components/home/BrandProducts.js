import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import {
  singleaddCartProduct,
  getsingleCartCount,
  getsingleSubTotal,
  getsingleTotalAmount,
  getsingleTotalDiscount,
} from "../../components/features/SingleCartSlice";
import { useDispatch } from "react-redux";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const BrandProducts = () => {
  // brands Product Get API
  const [brandProduct, setBrandProduct] = useState([]);
  const [error, setError] = useState(null);

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
          `${process.env.REACT_APP_BASE_URL}/latestPros`,
          options
        );
        setBrandProduct(response.data);
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

  // add to cart single product
  const dispatch = useDispatch();

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

  // Add to wishlist For product
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

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
        alert(res.data.message);
      });
  }
  if (error) {
    return console.log(error);
  }

 

  return (
    <>
      <section>
        <div className="top-trending container">
          <div className="top-trending-head">
            <h3>Products From Latest Brands</h3>
          </div>
        </div>

        <div className="container ">
          <div className="row">
            <Carousel
              responsive={responsive}
              showDots={false}
              infinite={true}
              arrows={false}
            >
              {brandProduct.map((e) => (
                <div
                  className="item"
                  key={e.id}
                  style={{ marginRight: ".8rem" }}
                >
                  <div className="newComboCart">
                    <ul>
                      <li className="youMayLikeHeart">
                        <i className="bi bi-heart"></i>
                      </li>
                    </ul>
                    <div className="cart-img-sec">
                      <Link
                        onClick={() => wishlistProductData(e.id)}
                        className="addtofav"
                      ></Link>
                      <Link  to={`/product/${e.id}`}>
                        <img
                          src={e.thumbnail_img?.original_url}
                          alt="img"
                        ></img>
                      </Link>
                    </div>

                    <div className="card-det-sec">
                      <div className="headingCard pt-3">
                        <span>{e.name.substring(0, 40)}</span>
                      </div>
                      {/* <div>
                        <span className="packof">(Pack of 2)</span>
                      </div> */}
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
                        <div className="btn_atc">
                          <i
                            className="bi bi-cart"
                            onClick={() => {
                              addToSingleCart(e);
                              alert("product added to cart successfully");
                            }}
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
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandProducts;

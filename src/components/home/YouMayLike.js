import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  addCartProduct,
  getCartCount,
  getSubTotal,
  calculateTax,
  getTotalAmount,
  getTotalDiscount,
} from "../features/useCartSlice";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchYoumaylike } from "../features/actions/youmaylikeActions";

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

const YouMayLike = () => {
  const dispatch = useDispatch();
  const { youmaylike } = useSelector((state) => state.youmaylike);


  useEffect(() => {
    dispatch(fetchYoumaylike());
  }, [dispatch]);

  // changing wl btn

  // Featured combos
  // const [feature, setFeature] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     async function fetchData() {
  //       setError(null);
  //       setLoading(true);
  //       const options = {
  //         headers: {
  //           "X-Authorization":
  //             "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
  //           "Cache-Control": "no-cache, no-store, must-revalidate",
  //           mode: "cors",
  //           credentials: "include",
  //         },
  //       };

  //       try {
  //         const response = await axios.get(
  //           `${process.env.REACT_APP_BASE_URL}/combos`,
  //           options
  //         );
  //         setFeature(response.data.data);
  //         setLoading(false);
  //       } catch (error) {
  //         if (error.response && error.response.status === 429) {
  //           const retryAfter = parseInt(error.response.headers["retry-after"]);
  //           setTimeout(() => {
  //             fetchData();
  //           }, retryAfter * 1000);
  //         } else {
  //           setError(error.message);
  //         }
  //       }
  //     }
  //     fetchData();
  //   }, 2000);
  // }, []);
  // if (error) {
  //   console.log(error);
  // }

  // add to cart


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
    dispatch(calculateTax());
    dispatch(getTotalAmount());
    dispatch(getTotalDiscount());
  };

  // add to wishlist
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [heartFilled, setHeartFilled] = useState(null);

  // const [loading, setLoading] = useState(true);

  function wishlistData(id) {
    const data = {
      combo_id: id,
      user_id: user_id,
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
          setTimeout(() => setHeartFilled(null), 3000);
        } else {
          alert(res.data.message);
        }
      });
  }

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <section>
        <div className="top-trending container">
          <div className="top-trending-head">
            <h3>You May Like...</h3>
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
              {Array.isArray(youmaylike) &&
                youmaylike.map((e) => (
                  <div
                    className="item carouselItemCard"
                    key={e.id}
                    style={{ marginRight: ".8rem" }}
                  >
                    <div className="newComboCart">
                      <div className="cart-img-sec">
                        <Link
                          onClick={() => wishlistData(e.id)}
                          className="addtofav"
                        >
                          <ul>
                            <li className="youMayLikeHeart">
                              {heartFilled === e.id ? (
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
                        <Link onClick={handleClick} to={`/combo/${e.id}`}>
                          <img
                            src={e.meta_img?.url}
                            alt="img"
                            width="100%"
                          ></img>
                        </Link>
                      </div>

                      <div className="card-det-sec">
                        <div className="headingCard pt-3">
                          <span>{e.name}</span>
                        </div>
                        {/* <div>
                          <span className="packof">(Pack of 2)</span>
                        </div> */}
                        <div className="price-sec">
                          <div className="col-4">
                            <span className="sp">₹{e.selling_price}</span>
                          </div>
                          <div className="col-4">
                            <del className="mrp">₹{e.mrp}</del>
                          </div>
                          <div className="col-4">
                            <span className="discount">
                              {e.discount}% OFF
                            </span>
                          </div>
                        </div>
                        <div className="card-btn-sec ">
                          {/* <div
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
                            </div> */}

                          <div
                            className="btn_gtc"
                            style={{ cursor: "pointer" }}
                          > 
                          
                            <Link to="/cart" style={{color: "#05A856" }}>Go to Cart</Link>
                            <i className="bi bi-arrow-right" id={e.id}>
                              
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
    </div>
  );
};

export default YouMayLike;

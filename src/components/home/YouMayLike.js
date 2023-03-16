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
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const YouMayLike = () => {
  // Featured combos
  const [feature, setFeature] = useState([]);

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
      const response = await axios.get(`/combos`, options);
      setFeature(response.data.data);
    }
    fetchData();
  }, []);

  // add to cart

  const dispatch = useDispatch();
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

  return (
    <div>
      <section>
        <div className="top-trending">
          <div
            className="top-trending-head text-center"
            style={{ marginTop: "2rem" }}
          >
            <h3>Best Selling Combos</h3>
          </div>
        </div>

        <div className="container ">
          <div className="row">
            <Carousel
              responsive={responsive}
              showDots={false}
              infinite={true}
              draggable={true}
              swipeable={true}
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
              {Array.isArray(feature) &&
                feature.map((e) => (
                  <div className="item" key={e.id} style={{ margin: ".4rem" }}>
                    <div className="combo-card">
                      <div className="combo-image">
                        <Link to={`/combo/${e.id}`}>
                          <img src={e.meta_img?.url} alt={e.name} />
                        </Link>
                      </div>
                      <div className="cart-sec text-center py-2">
                        <i
                          onClick={() => {
                            addToCart(e);
                          }}
                          id={e.id}
                          className="bi bi-plus-lg"
                          style={{ cursor: "pointer" }}
                        ></i>
                        <span>Add To Cart</span>
                      </div>
                      <div className="combo-body text-center">
                        <h4>{e.name}</h4>
                        <span className="packof">(Pack of 3)</span>
                        <span className="sp">₹{e.selling_price}</span>
                        <del>₹{e.mrp}</del>
                        <div>
                          <span className="discount">({e.discount}%)</span>
                        </div>

                        <br />
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

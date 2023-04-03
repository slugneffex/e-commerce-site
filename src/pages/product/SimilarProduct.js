import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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

const SimilarProduct = (props) => {
  // Related Product
  const id = props.id;
  const [related, setRelated] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
        },
      };
      const response = await axios.get(`/combo/${id}`, options);
      setRelated(response.data.related);
    }
    fetchData();
  }, [id]);

  return (
    <>
      
        <div className="container mt-2 mb-5">
          <div className="row">
            <Carousel
              responsive={responsive}
              showDots={false}
              infinite={true}
              draggable={true}
              swipeable={true}
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              className=""
            >
              {related.map((e) => (
                <div className="item" key={e.id}>
                  <div className="newComboCart">
                    <div className="cart-img-sec" style={{ position: "relative" }}>
                      <Link className="addtofav">
                        <li className="bi bi-heart" style={{ position: "absolute", top:".3rem", right: ".8rem" }}></li>
                      </Link>
                      <Link to={`/combo/${e.id}`}>
                        <img src={e.meta_img?.url} alt="img"></img>
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
            </Carousel>
          </div>
        </div>
      
    </>
  );
};

export default SimilarProduct;

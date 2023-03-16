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
      const response = await axios.get(`/mobile/api/combo/${id}`, options);
      setRelated(response.data.related);
      
    }
    fetchData();
  }, [id]);

  

  return (
    <div>
      <section>
        <div className="container my-5">
          <div className="row">
            <Carousel
              responsive={responsive}
              showDots={true}
              infinite={true}
              draggable={true}
              swipeable={true}
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              className=""
            >
              {related.map((e) => (
                <div className="item" key={e.id}>
                  <div className="combo-card">
                    <div className="combo-image">
                      <Link to={`/combo/${e.id}`}>
                        <img src={e.meta_img?.url} alt={e.slug} />
                      </Link>
                    </div>
                    <div className="cart-sec text-center py-2">
                      <i
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
                      <span className="discount">({e.discount}% OFF)</span>
                      <ul className="stars">
                        <li>
                          <i className="bi bi-star-fill"></i>
                        </li>
                        <li>
                          <i className="bi bi-star-fill"></i>
                        </li>
                        <li>
                          <i className="bi bi-star-fill"></i>
                        </li>
                        <li>
                          <i className="bi bi-star-fill"></i>
                        </li>
                        <li>
                          <i className="bi bi-star"></i>
                        </li>
                      </ul>
                      <br />
                      <div className="flash-deal">
                        <i className="bi bi-lightning-fill"></i>
                        <p>Flash Deal</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="item">
                <div className="combo-card">
                  <div className="combo-image">
                    <img src="assets/img/you-may-like/bright-tone.png" alt="" />
                  </div>
                  <div className="cart-sec text-center py-2">
                    <i className="bi bi-plus-lg"></i>
                    <span>Add To Cart</span>
                  </div>
                  <div className="combo-body text-center">
                    <h4>Baby's Day Out Combo</h4>
                    <span className="packof">(Pack of 3)</span>
                    <span className="sp">₹ 192</span>
                    <del>₹ 530</del>
                    <span className="discount">(40% OFF)</span>
                    <ul className="stars">
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star"></i>
                      </li>
                    </ul>
                    <br />
                    <div className="flash-deal">
                      <i className="bi bi-lightning-fill"></i>
                      <p>Flash Deal</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="combo-card">
                  <div className="combo-image">
                    <img
                      src="assets/img/you-may-like/organic-harvest.png"
                      alt=""
                    />
                  </div>
                  <div className="cart-sec text-center py-2">
                    <i className="bi bi-plus-lg"></i>
                    <span>Add To Cart</span>
                  </div>
                  <div className="combo-body text-center">
                    <h4>Baby's Day Out Combo</h4>
                    <span className="packof">(Pack of 3)</span>
                    <span className="sp">₹ 192</span>
                    <del>₹ 530</del>
                    <span className="discount">(40% OFF)</span>
                    <ul className="stars">
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star"></i>
                      </li>
                    </ul>
                    <br />
                    <div className="flash-deal">
                      <i className="bi bi-lightning-fill"></i>
                      <p>Flash Deal</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="combo-card">
                  <div className="combo-image">
                    <img src="assets/img/you-may-like/seba-med.png" alt="" />
                  </div>
                  <div className="cart-sec text-center py-2">
                    <button className="bi bi-trash"></button>
                    <input type="number" min="1" value="1" max="10" />
                    <button className="bi bi-plus-lg"></button>
                  </div>
                  <div className="combo-body text-center">
                    <h4>Baby's Day Out Combo</h4>
                    <span className="packof">(Pack of 3)</span>
                    <span className="sp">₹ 192</span>
                    <del>₹ 530</del>
                    <span className="discount">(40% OFF)</span>
                    <ul className="stars">
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star"></i>
                      </li>
                    </ul>
                    <br />
                    <div className="flash-deal">
                      <i className="bi bi-lightning-fill"></i>
                      <p>Flash Deal</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="combo-card">
                  <div className="combo-image">
                    <img
                      src="assets/img/you-may-like/the-man-company.png"
                      alt=""
                    />
                  </div>
                  <div className="cart-sec text-center py-2">
                    <i className="bi bi-plus-lg"></i>
                    <span>Add To Cart</span>
                  </div>
                  <div className="combo-body text-center">
                    <h4>Baby's Day Out Combo</h4>
                    <span className="packof">(Pack of 3)</span>
                    <span className="sp">₹ 192</span>
                    <del>₹ 530</del>
                    <span className="discount">(40% OFF)</span>
                    <ul className="stars">
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star-fill"></i>
                      </li>
                      <li>
                        <i className="bi bi-star"></i>
                      </li>
                    </ul>
                    <br />
                    <div className="flash-deal">
                      <i className="bi bi-lightning-fill"></i>
                      <p>Flash Deal</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimilarProduct;

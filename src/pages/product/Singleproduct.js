import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./product.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import HomeLayout from "../../layouts/HomeLayout";
import SimilarProduct from "./SimilarProduct";
import axios from "axios";

const Singleproduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [productimg, setProductimg] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
        },
      };
      const response = await axios.get(`/product/${id}`, options);
      setProduct(response.data.products);
      setProductimg(response.data.products.photos);
    }
    fetchData();
  }, [id]);

  return (
    <div>
      <HomeLayout>
        <div className="container" style={{ marginTop: "8rem" }}>
          <div className="row my-5">
            <div className="col-md-6">
              <div className="product-car">
                <Carousel
                  className="big-img-carousel "
                  centerMode={false}
                  infiniteLoop={true}
                  showArrows={false}
                  width={460}
                >
                  <div
                    className="item big-img"
                    data-hash="one"
                    key={product.id}
                  >
                    <img
                      src={product.thumbnail_img?.original_url}
                      alt="name"
                      className=""
                    />
                  </div>

                  {productimg.map((e) => (
                    <div className="item big-img" data-hash="two">
                      <img src={e.original_url} alt="name" className="" />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>

            <div className="col-md-6" key={product.id}>
              <div className="breadcrumb">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link to="#">Combo</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Link to="#">{product.name}</Link>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="heading">
                <h1>{product.name}</h1>
              </div>
              {/* <div className="quantity">
                <span>()</span>
              </div> */}
              <div className="ratings">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <span>8 Reviews</span>
              </div>
              <div className="location">
                <span>
                  <Link to="">
                    <i className="bi bi-geo-alt-fill"></i>
                    Select delivery location
                  </Link>
                </span>
              </div>
              <div className="basic-details">
                <span>Sold By:</span>
                <span className="sold-by">XYZ Pvt. Ltd.</span>
                <br />
                <span>MRP:</span>
                <del className="mrp">₹{product.mrp}</del>
                <br />
                <span>Deal Price:</span>
                <span className="sp">₹{product.selling_price}</span>
                <br />
                <span>You Save:</span>
                <span className="youSave">
                  ₹150 <strong>({product.discount}%)</strong>
                </span>
                <br />
                <span className="priceinc">Price inclusive of all taxes</span>
              </div>
              <div className="cart">
                <div className="d-flex">
                  <div className="" style={{ marginRight: "2rem" }}>
                    <span className="quant">Quantity:</span>
                  </div>
                  <div className="mod-cart d-flex">
                    <form action="" method="POST">
                      <button className="bi bi-trash-fill"></button>
                    </form>
                    <input
                      type="number"
                      value="1"
                      min="1"
                      max="10"
                      name="quantity"
                      className="cart-quant"
                    />
                    <form action="" method="POST">
                      <button className="bi bi-plus-lg"></button>
                    </form>
                  </div>
                </div>
                <br />
                <div className="addCart" id={product.id}>
                  <Link to="" className="btn_1">
                    <i className="bi bi-cart"></i>Add To Cart
                  </Link>
                </div>
                <br />
                <div className="wishlist-sec">
                  <i className="bi bi-heart"></i>
                  <Link to="#" className="wishlist">
                    Add To Wishlist
                  </Link>
                </div>
              </div>
              <div className="coupon-sec text-center">
                <div className="coupon-card">
                  <div className="card-head">
                    <div className="tag">
                      <i className="bi bi-tag-fill"></i>
                    </div>
                    <div className="det">
                      <span className="use">Use Code</span>
                      <br />
                      <span className="code">COMBO50</span>
                    </div>
                  </div>
                  <div className="vl"></div>
                  <div className="card-body">
                    <div className="offer">
                      <span>Get it for</span>{" "}
                      <span className="price">₹ 299</span>
                    </div>
                    <div className="terms">
                      <p>Get Upto ₹50 Off on XXX and above Max Discount ₹XX</p>
                    </div>
                  </div>
                </div>
                <div className="more-card my-5">
                  <Link to="">+ 10 More</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="desc-sec my-5">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="home-tab-pane"
                    aria-selected="true"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected="false"
                  >
                    Manufacturer Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#contact-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="contact-tab-pane"
                    aria-selected="false"
                  >
                    Reviews
                  </button>
                </li>
              </ul>
              <div className="tab-content my-5" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home-tab-pane"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  tabindex="0"
                >
                  <ul className="combo-product">
                    <li>Organic Harvest Strwberry Lip Balm - Velvet Red 3 g</li>
                    <li>Coloressence Britone Cleanse Moisture</li>
                    <li>Organic Harvest Diamond Shine</li>
                  </ul>
                  <div>
                    <p>{product.desc}</p>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile-tab-pane"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  tabindex="0"
                >
                  <div className="row">
                    <div className="col-6">
                      <ul className="det-list">
                        <li>
                          <span className="title">Brand :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">Falvour :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">Weight :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">Country of Origin :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">FSSAI :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <ul className="det-list">
                        <li>
                          <span className="title">Package Weight :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">Package Type :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">Region :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">expriy Date :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">Brand :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 d-flex">
                      <strong>Note : </strong>{" "}
                      <p>
                        Product Images May Vary And Are Subject To Change From
                        Time To Time
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="contact-tab-pane"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                  tabindex="0"
                >
                  <h2>
                    Reviews <i className="bi bi-chevron-down"></i>
                  </h2>
                  <div className="review-card d-flex">
                    <div className="img-sec text-center d-grid">
                      <img src="assets/img/product/small.png" alt="" />
                      <span>Gwalesh Singh</span>
                    </div>
                    <div className="card-body text-left">
                      <h3>Worth Buying this Combo</h3>
                      <div className="ratings">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <span className="rat"> 5</span> /{" "}
                        <span>5 | 27th April 2022</span>
                      </div>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Incidunt vitae, odit praesentium, suscipit
                        molestias aperiam maiores facere quasi consectetur
                        dolorum eveniet? Laudantium est quaerat numquam natus,
                        explicabo neque eos voluptates voluptatibus molestiae
                        aperiam esse culpa eius earum id repudiandae facere
                        dolore cupiditate ex totam aliquam aut fuga fugiat
                        libero assumenda. Quod blanditiis maiores, nisi fugiat a
                        perferendis est molestias sint voluptate officiis
                        repellendus autem dolore numquam molestiae earum
                        temporibus ducimus.
                      </p>
                      <div className="rev-img-sec">
                        <img src="assets/img/review-img.png" alt="" />
                        <img src="assets/img/review-img.png" alt="" />
                        <img src="assets/img/review-img.png" alt="" />
                        <img src="assets/img/review-img.png" alt="" />
                      </div>
                      <div className="likes my-3">
                        <i className="bi bi-hand-thumbs-up"></i> 5
                        <i className="bi bi-hand-thumbs-down"></i> 4
                      </div>
                    </div>
                  </div>

                  <div className="row text-center">
                    <div className="col">
                      <Link to="" className="add-review-button">
                        <i className="bi bi-plus"></i> Add Reviews
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-5">
            <div className="top-trending">
              <div className="top-trending-head text-center">
                <h3 className="hr-line-head">
                  Explore more from Across the Store
                </h3>
                <Link to="#" className="btn_view_all">
                  View All <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>

            <SimilarProduct id={product.id} />
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default Singleproduct;

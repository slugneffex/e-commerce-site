import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./product.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import HomeLayout from "../../layouts/HomeLayout";
import SimilarProduct from "./SimilarProduct";
import "./product.css";
import axios from "axios";
import {
  addCartProduct,
  getCartCount,
  getSubTotal,
  getTotalAmount,
  getTotalDiscount,
} from "../../components/features/useCartSlice";
import { useDispatch } from "react-redux";
// import { fetchCombodetails } from "../../components/features/actions/combodetailsActions";

const Product = () => {
  // Combos Product
  const { id } = useParams();
  const dispatch = useDispatch();
  const [combos, setCombos] = useState([]);
  const [comboproduct, setComboproduct] = useState([]);
  const [error, setError] = useState(null);

  // const {combos, comboproduct,  loading } = useSelector(
  //   (state) => state.combodetails
  // );
  // console.log(combos)
  // useEffect(() => {
  //   dispatch(fetchCombodetails(id));
  // }, [dispatch, id]);

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
          `${process.env.REACT_APP_BASE_URL}/combo/${id}`,
          options 
        );
        setCombos(response.data.combo);
        setComboproduct(response.data.combo.gallery);
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
  }, [id]);

  // add to cart for combo


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
    dispatch(getTotalAmount());
    dispatch(getTotalDiscount());
  };

 

  return (
    <div className="product_div">
      <HomeLayout>
        <div className="container">
          <div className="row mt-3 ">
            <div className="col-md-6">
              <div className="product-car">
                <Carousel
                  className="big-img-carousel "
                  swipeable={true}
                  centerMode={false}
                  infiniteLoop={true}
                  showArrows={false}
                >
                  <div
                    className="item big-img"
                    data-hash="one"
                    key={combos.id}
                    style={{ border: "1px solid #464646" }}
                  >
                    <img src={combos.meta_img?.url} alt={combos.name} width='100%' />
                  

                  </div>

                  {comboproduct.map((e) => (
                    <div className="item big-img" data-hash="two" key={e.id}>
                      <img src={e.original_url} alt="name"  width='100%'/>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>

            <div className="col-md-6" key={combos.id}>
              <div className="breadcrumb" style={{ marginTop: "0" }}>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb" style={{ margin: "0" }}>
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link to="#">Combo</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Link to="#">{combos.name}</Link>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="heading" style={{ padding: "0" }}>
                <h1>{combos.name}</h1>
              </div>
              <div className="quantity">
                <span>(Pack of {combos.packqty})</span>
              </div>
              <div className="ratings">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <span style={{ fontSize: "15px", marginLeft: "1rem" }}>
                  8 Reviews
                </span>
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
                <span className="sold-by" style={{ marginLeft: ".5rem" }}>
                  XYZ Pvt. Ltd.
                </span>
                <br />
                <div style={{ marginTop: ".3rem" }}>
                  <span>MRP:</span>
                  <del className="mrp">₹{combos.mrp}</del>
                </div>

                <div style={{ marginTop: ".5rem" }}>
                  <span>Deal Price:</span>
                  <span className="sp">₹{combos.selling_price}</span>
                </div>
                <div style={{ marginTop: ".5rem" }}>
                  <span>You Save:</span>
                  <span className="youSave">
                    ₹150 <strong>({combos.discount}%)</strong>
                  </span>
                </div>

                <span className="priceinc">Price inclusive of all taxes</span>
              </div>
              <div className="cart">
                {/* <div className="d-flex" style={{ alignItems: "center" }}>
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
                      <form>
                      <button className="bi bi-plus-lg"></button>
                      </form>
                      </div>
                    </div> */}

                <div className="addCart" id={combos.id}>
                  <Link
                    to=""
                    onClick={() => {
                      addToCart(combos);
                    }}
                  >
                    <div className="btn_atc">
                      <i
                        className="bi bi-cart"
                        style={{ marginRight: ".5rem" }}
                      ></i>
                      Add To Cart
                    </div>
                  </Link>
                </div>

                <div className="wishlist-sec">
                  <i
                    className="bi bi-heart"
                    style={{ marginRight: ".5rem" }}
                  ></i>
                  <Link to="#" className="wishlist">
                    Add To Wishlist
                  </Link>
                </div>
              </div>

              <div className="coupon-sec text-center mb-3">
                <img
                  src="../assets/img/usps.svg"
                  alt="img-fluid"
                  className="img-fluid"
                  width='100%'
                />
              </div>
            </div>
          </div>

          <div className="row pb-3">
            <div className="col-md-6">
              <img
                src="../assets/img/slabs-freebies.png"
                alt="img-fluid"
                className="img-fluid"
                width='100%'
              />
            </div>
            <div className="col-md-6">
              <img
                src="../assets/img/slabs-tnc.png"
                alt="img-fluid"
                className="img-fluid"
                width='100%'
              />
            </div>
          </div>

          <div className="row">
            <div className="desc-sec mt-3 mb-2 ">
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
                  tabIndex="0"
                >
                  <ul className="combo-product">
                  <div dangerouslySetInnerHTML={{ __html:combos.desc }} />
                    {/* <li>Organic Harvest Strwberry Lip Balm - Velvet Red 3g</li>
                    <li>Coloressence Britone Cleanse Moisture</li>
                    <li>Organic Harvest Diamond Shine</li> */}
                  </ul>
                  <div>{/* <p id="product_desc">{desc_product}</p> */}</div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile-tab-pane"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  tabIndex="0"
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
                  tabIndex="0"
                >
                  <h2>
                    Reviews <i className="bi bi-chevron-down"></i>
                  </h2>
                  <div className="review-card d-flex">
                    <div className="img-sec text-center d-grid">
                      <img src="assets/img/product/small.png" alt=""width='100%' />
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
                        <img src="./assets/img/review-img.png" alt="" width='100%' />
                        <img src="./assets/img/review-img.png" alt="" width='100%' />
                        <img src="./assets/img/review-img.png" alt="" width='100%' />
                        <img src="./assets/img/review-img.png" alt="" width='100%' />
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
          <div className="row">
            <div className="top-trending">
              <div className="top-trending-head text-center">
                <h3 className="hr-line-head">
                  Explore more from Across the Store
                </h3>
                {/* <Link to="#" className="btn_view_all">
                  View All <i className="bi bi-arrow-right"></i>
                </Link> */}
              </div>
            </div>

            <SimilarProduct id={combos.id} />
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default Product;

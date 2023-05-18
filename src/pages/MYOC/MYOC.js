import React, { useState, useEffect, useCallback } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import "./myoc.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchhotdeal } from "../../components/features/actions/hotdealActions";

const MYOC = () => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Myoc banner
  const dispatch = useDispatch();
  const {  hotdeal } = useSelector((state) => state.hotdeal);
  useEffect(() => {
    dispatch(fetchhotdeal());
  }, [dispatch]);


  // const [myocBanner, setMyocBanner] = useState([]);
  // const [myocError, setMyocError] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const options = {
  //       headers: {
  //         "X-Authorization": `${process.env.REACT_APP_HEADER}`,
  //         "Cache-Control": "no-cache, no-store, must-revalidate",
  //       },
  //     };
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BASE_URL}/superFlashDeals`,
  //         options
  //       );
  //       setMyocBanner(response.data);
  //     } catch (error) {
  //       if (error.response && error.response.status === 429) {
  //         const retryAfter = parseInt(error.response.headers["retry-after"]);
  //         setTimeout(() => {
  //           fetchData();
  //         }, retryAfter * 1000);
  //       } else {
  //         setMyocError(error.message);
  //       }
  //     }
  //   }
  //   fetchData();
  // }, []);

  const fetchData = useCallback(async (pageNumber) => {
    const options = {
      headers: {
        "X-Authorization": `${process.env.REACT_APP_HEADER}`,
      },
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/view-all-products?page=${pageNumber}`,
        options
      );
      const newData = response.data.data;
      setProducts((prevData) => [...prevData, ...newData]);
      setLoading(false);
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
  }, []);

  useEffect(() => {
    fetchData(pageNumber);
  }, [fetchData, pageNumber]);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      products.length &&
      !loading
    ) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  }, [products.length, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (error) {
    console.log(error);
  }

  return (
    <>
      <HomeLayout>
        {/* Myoc Banner */}

        <div className="container mt-2">
          {/* desktop  */}
          <div className="desktop">
            {Array.isArray(hotdeal) &&
              hotdeal.map((e) => (
                <div key={e.banner?.id}>
                  <Link to={`/view-all-products`}>
                    <img
                      src={e.banner?.original_url}
                      className="img-fluid mx-auto"
                      alt="super-deal"
                      width="100%"
                    />
                  </Link>
                </div>
              ))}
          </div>

          {/* mobile */}
          <div className="mobile">
            {Array.isArray(hotdeal) &&
              hotdeal.map((e) => (
                <div className="byoc" key={e.mobile_banner?.id}>
                  <Link to={`/view-all-products`}>
                    <img
                      src={e.mobile_banner?.original_url}
                      className="img-fluid"
                      width="100%"
                      alt="super-deal"
                    />
                  </Link>
                </div>
              ))}
          </div>
          <div className="mb-1 mt-3 text-center">
            <img
              src="assets/img/mobikwik.png"
              alt="mobikwik-Logo"
              width="80%"
              height="auto"
            />
          </div>
          <div className="byocc mt-4 text-center">
            <img src="/assets/img/byoc.png" alt="byoc-img" />
          </div>
          <hr />
        </div>
        <div className="container mt-0 mb-5">
          <div className="row">
            <div className=" col-md-6" style={{ marginTop: "1rem" }}>
              <h1>Build Your Combo From Products Below</h1>
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="row">
            {products.map((e) => (
              <div className="col-lg-3 col-md-3" key={e.id}>
                <div className="newComboCart">
                  <div
                    className="cart-img-sec"
                    style={{ position: "relative" }}
                  >
                    <Link className="addtofavCategory">
                      <i
                        className="bi bi-heart"
                        style={{
                          position: "absolute",
                          right: ".8rem",
                          top: ".5rem",
                        }}
                      ></i>
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
            {loading && <div>Loading...</div>}
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default MYOC;

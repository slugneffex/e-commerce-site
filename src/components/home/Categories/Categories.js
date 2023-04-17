import React, { useState, useEffect } from "react";
import "./categories.css";
import axios from "axios";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";

const Categories = () => {
  const [category, setCategory] = useState([]);

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
          `${process.env.REACT_APP_BASE_URL}/categories`,
          options
        );
        setCategory(response.data);
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

  if (error) {
    console.log(error);
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 6,
    },
  };

  return (
    <>
      <div className="categoriesMainDiv">
        <div className="container">
          <div className="my-auto categoriesDiv">
            {category.map((e) => (
              <Link to={`/category/${e.id}`} key={e.id}>
                {e.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> */}

      {/* for mobile */}
      <div className="categoriesMobileDiv" style={{ marginTop: "1rem" }}>
        <div className="container">
          <Carousel
            responsive={responsive}
            arrows={false}
            swipeable={true}
            // autoPlay
            infinite
            className="carouselResponsive"
          >
            {category.map((e) => (
              <div className="my-auto" key={e.id}>
                <img src={e.image?.original_url} alt="" width="70%"/>
                <br />
                <Link style={{ fontSize: '12px' }} to={`/category/${e.id}`}>{e.name.slice(0,9)}</Link>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Categories;

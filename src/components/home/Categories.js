import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosRetry from "axios-retry";

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
    items: 5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 5,
  },
};

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [myoc, setMyoc] = useState([]);
  

  axiosRetry(axios, { retries: 3 });
  

  useEffect(() => {
    setTimeout(() => {
      async function fetchData() {
        const options = {
          headers: {
            "X-Authorization": 'CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs',
            "Cache-Control": "no-cache, no-store, must-revalidate",
            mode: "cors",
            credentials: "include",
          },
        };
        const response = await axios.get('/categories', options);
        setCategory(response.data);
    
      }
      fetchData();
    }, 1000);
  }, []);

  // myoc Poster
  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      };
      const response = await axios.get('/settings', options);
      setMyoc(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="category-sec" style={{ marginTop: "6rem" }}>
        <div className="">
          <div className="row" id="d-flex">
            <Carousel
              responsive={responsive}
              removeArrowOnDeviceType={["mobile", "tablet", "desktop"]}
              infinite={true}
            >
              {Array.isArray(category) &&
                category.map((e) => (
                  <div className="item" key={e.id}>
                    <Link to={`/category/${e.id}`} className="cat-link">
                      <img
                        src={e.image?.banner}
                        className="category-image"
                        alt={e.slug}
                      />
                      <br></br>
                      <span className="cat-title">{e.name}</span>
                    </Link>
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
      </div>
      {Array.isArray(myoc) &&
        myoc.map((e) => (
          <div className="byoc" key={e.myoc_banner?.id}>
            <Link to={`/view-all-products`}>
              <img
                src={e.myoc_banner?.original_url}
                className="img-fluid"
                alt="super-deal"
              />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Categories;

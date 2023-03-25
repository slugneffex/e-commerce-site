import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axiosRetry from "axios-retry";
import "./Brand.css"

const responsive = {
  superLargeDesktop: {
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

const Brands = () => {
  const [brand, setBrand] = useState([]);
  axiosRetry(axios, { retries: 3 });


  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      const response = await axios.get('/brands', options);
      setBrand(response.data);
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="top-brand-deals container">
        <h3 style={{ marginTop: "67px", marginBottom: "47px"}}>Build Your Combo From Top Brands</h3>
        <div className="container py-12">
          
          <Carousel responsive={responsive} className="py-14"
          swipeable={false}
          autoPlay
          customTransition="all .1"
          transitionDuration={500}
          arrows={false}
          
          >
          
            {Array.isArray(brand) &&
              brand.map((e) => (
                <div key={e.id} className="logoBox">
                  <div className="logoImgDiv">
                    <a href="#">
                    <img
                      src={e.image?.original_url}
                      width="80%"
                      alt={e.name}
                    ></img>
                    </a>
                  </div>
                </div>
              ))}
              
          </Carousel>
          
        </div>
      </div>
    </>
  );
};

export default Brands;

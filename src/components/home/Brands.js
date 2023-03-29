import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axiosRetry from "axios-retry";

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
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
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

  const filterApi = brand.filter((e) => e.focused==="on")
  console.log(filterApi)

  return (
    <>
      <div className="top-brand-deals">
        <h3 className="text-center">Build Your Combo From Top Brands ss</h3>
        <div className="container">
          <Carousel responsive={responsive} arrows={false}>
            {filterApi.map((e) => (
              <div key={e.id}>
                <img src={e.image?.original_url} width="80%" alt={e.name}></img>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Brands;

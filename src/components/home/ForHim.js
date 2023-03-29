import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const ForHim = () => {
  const [forhim, setForhim] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": 'CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs',
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      const response = await axios.get('/for-him', options);
      setForhim(response.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="top-brand-deals container">
        <h3 style={{ marginTop: "67px", marginBottom: "47px"}}>Top Picks For Him</h3>
        <div className="container">
          <Carousel responsive={responsive}
          arrows={false}
          infinite
          centerMode
          dotListClass="custom-dot-list-style"
          >
            {Array.isArray(forhim) &&
              forhim.map((e) => (
                <div key={e.banner?.id}>
                  <img
                    src={e.banner?.original_url}
                    width="80%"
                    alt={e.name}
                  ></img>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ForHim;

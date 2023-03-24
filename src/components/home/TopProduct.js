import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

const TopProduct = () => {
  const [pdeal, setPdeal] = useState([]);

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
      const response = await axios.get(`/productDeals`, options);
      setPdeal(response.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="top-brand-deals">
          <h3 className="text-center">Just Launched Brands</h3>
          <div className="container">
            <Carousel
              responsive={responsive}
              showDots={false}
              infinite={true}
              draggable={true}
              swipeable={true}
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            >
              {Array.isArray(pdeal) &&
                pdeal.map((e) => (
                  <div key={e.thumbnail?.id} className="text-center">
                    <Link to={`/brand/${e.brand_id}`}>
                      <img
                        src={e.thumbnail?.original_url}
                        width="190px"
                        height="220px"
                        alt={e.name}
                      ></img>
                    </Link>
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopProduct;

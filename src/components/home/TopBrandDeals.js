import axios from "axios";
import React, { useEffect, useState } from "react";
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

const TopBrandDeals = () => {
  const [cdeal, setCdeal] = useState([]);

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
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/comboDeals`, options);
      setCdeal(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="top-brand-deals">
        <h3 className="text-center">Top Combo Deals For You</h3>
        <div className="container">
          <Carousel responsive={responsive}>
            {Array.isArray(cdeal) &&
              cdeal.map((e) => (
                <div key={e.id}>
                  <Link>
                    <img
                      src={e.thumbnail?.original_url}
                      width="80%"
                      alt={e.name}
                    />
                  </Link>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TopBrandDeals;

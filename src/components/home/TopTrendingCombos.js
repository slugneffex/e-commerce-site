import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TopTrendingCombos = () => {
  const [picks, setPicks] = useState([]);

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
      const response = await axios.get(`/topPicks`, options);
      setPicks(response.data);
    }
    fetchData();
  }, []);


  // Carousel Responsive

  const responsive = {
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
      items: 1,
    }
  };

  return (
    <>
      <section className="desktop">
        <div className="top-trending container">
          <div className="top-trending-head" style={{ marginTop: "67px" }}>
            <h3>Top Picks For You...</h3>
          </div>
        </div>
        <div className="container" style={{ marginTop: "48px" }}>
          <div className="row">
            {Array.isArray(picks) &&
              picks.map((e) => (
                <div className="col-md-6" key={e.id}>
                  <div className="top-picks-img">
                    <Link to={`/brand/${e.id}`}>
                      <img
                        src={e.thumbnail?.original_url}
                        width="100%"
                        alt="manish"
                      ></img>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* mobile */}
      <div className="mobile">
        <div className="top-trending container">
          <div className="top-trending-head" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <h3>Top Picks For You...</h3>
          </div>
        </div>
        <Carousel
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay
          arrows={false}
          centerMode
        >


          {Array.isArray(picks) &&
            picks.map((e) => (
              <div key={e.id} style={{ width: "100%", }}>
                <div >
                  <Link to={`/brand/${e.id}`}>
                    <img
                      src={e.thumbnail?.original_url}
                      width="95%"
                      alt="manish"
                    ></img>
                  </Link>
                </div>
              </div>
            ))}

        </Carousel>
      </div>
    </>
  );
};

export default TopTrendingCombos;

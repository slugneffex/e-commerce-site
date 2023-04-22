import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Hero = () => {
  const [banner, setBanner] = useState([]);
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
          `${process.env.REACT_APP_BASE_URL}/mobile-banners`,
          options
        );
        setBanner(response.data);
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

  // Responsive

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="desktop">
        <Carousel
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay
        >
          {Array.isArray(banner) &&
            banner.map((e) => (
              <div key={e.banner?.id} style={{ width: "100%" }}>
                <div>
                  {e.brand_id && (
                    <Link to={`/brand/${e.brand_id}`}>
                      <img
                        src={e.banner?.original_url}
                        width="100%"
                        alt={e.name}
                      />
                    </Link>
                  )}
                  {e.page_id && (
                    <Link to={`/page/${e.page_id}`}>
                      <img
                        src={e.banner?.original_url}
                        width="100%"
                        alt={e.name}
                      />
                    </Link>
                  )}
                  {e.category_id && (
                    <Link to={`/category/${e.category_id}`}>
                      <img
                        src={e.banner?.original_url}
                        width="100%"
                        alt={e.name}
                      />
                    </Link>
                  )}
                  {e.product_id && (
                    <Link to={`/product/${e.product_id}`}>
                      <img
                        src={e.banner?.original_url}
                        width="100%"
                        alt={e.name}
                      />
                    </Link>
                  )}
                  {e.combo_id && (
                    <Link to={`/combo/${e.combo_id}`}>
                      <img
                        src={e.banner?.original_url}
                        width="100%"
                        alt={e.name}
                      />
                    </Link>
                  )}
                  {/* <Link to="/">
                    <img src={e.banner?.original_url} alt="name" width="100%" />
                  </Link> */}
                </div>
              </div>
            ))}
        </Carousel>
      </div>

      {/* mobile */}
      <div className="mobile">
        <Carousel
          showDots={false}
          responsive={responsive}
          infinite={true}
          // autoPlay
          arrows={false}
        >
          {Array.isArray(banner) &&
            banner.map((e) => (
              <div key={e.mobile_banner?.id} style={{ width: "100vw" }}>
                <Link to="/">
                  <img
                    src={e.mobile_banner?.original_url}
                    alt="name"
                    width="100%"
                  />
                </Link>
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default Hero;

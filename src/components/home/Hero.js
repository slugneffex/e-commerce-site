import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link } from "react-router-dom"

const Hero = () => {
  const [banner, setBanner] = useState([]);

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
      const response = await axios.get('/mobile-banners', options);
      setBanner(response.data);
    }
    fetchData();
  }, []);

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
    }
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
                <Link to='/'>
                  <img src={e.banner?.original_url} alt="name" width="100%" />
                </Link>
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
        autoPlay
        arrows={false}
      >

        {Array.isArray(banner) &&
          banner.map((e) => (
            <div key={e.banner?.id} style={{ width: "100%" }}>
              <div>
                <Link to='/'>
                  <img src={e.banner?.original_url} alt="name" width="100%" />
                </Link>
              </div>
            </div>
          ))}

      </Carousel>
      </div>
    </>
  );
};

export default Hero;

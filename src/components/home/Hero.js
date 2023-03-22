import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import {Link} from "react-router-dom"

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

  return (
    <>
      <Carousel>
        {Array.isArray(banner) &&
          banner.map((e) => (
            <Carousel.Item key={e.banner?.id}>
              <div>
                <Link to='/'>
                <img src={e.banner?.original_url} alt="name" />
                </Link>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};

export default Hero;

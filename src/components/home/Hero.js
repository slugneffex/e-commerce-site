import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

const Hero = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      const response = await axios.get(`/mobile-banners`, options);
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
                <img src={e.banner?.original_url} alt="name" />
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};

export default Hero;

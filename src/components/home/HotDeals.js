import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

const HotDeals = () => {
  const [flash, setFlash] = useState([]);

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
      const response = await axios.get(`/superFlashDeals`, options);
      setFlash(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="container my-5">
        <div className="hot-deals text-center">
          <h3>Super Flash Deals For You</h3>
        </div>
        <Carousel touch={true} interval="2000">
          {Array.isArray(flash) &&
            flash.map((e) => (
              <Carousel.Item key={e.banner?.id}>
                <img
                  src={e.banner?.original_url}
                  width="100%"
                  alt="super-flash-Deal"
                ></img>
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HotDeals;

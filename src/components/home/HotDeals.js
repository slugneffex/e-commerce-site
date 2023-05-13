import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/superFlashDeals`,
        options
      );
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

        {Array.isArray(flash) &&
          flash.map((e) => (
            <div key={e.banner?.id}>
              <Link to="/view-all-products">
                <img
                  src={e.banner?.original_url}
                  width="100%"
                  alt="super-flash-Deal"
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HotDeals;

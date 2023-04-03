import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Categories = () => {
  const [myoc, setMyoc] = useState([]);
  // myoc Poster
  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      };
      const response = await axios.get("/settings", options);
      setMyoc(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>

      {/* desktop  */}
      <div className="desktop">
        {Array.isArray(myoc) &&
          myoc.map((e) => (
            <div className="byoc" key={e.myoc_banner?.id}>
              <Link to={`/view-all-products`}>
                <img
                  src={e.myoc_banner?.original_url}
                  className="img-fluid"
                  alt="super-deal"
                />
              </Link>
            </div>
          ))}
      </div>

      {/* mobile */}
      <div className="mobile">
        {Array.isArray(myoc) &&
          myoc.map((e) => (
            <div className="byoc" key={e.myoc_mobile?.id}>
              <Link to={`/view-all-products`}>
                <img
                  src={e.myoc_mobile?.original_url}
                  className="img-fluid"
                  width="100%"
                  alt="super-deal"
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;

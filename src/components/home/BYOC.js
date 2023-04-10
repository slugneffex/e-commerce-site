import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const [myoc, setMyoc] = useState([]);
  const [error, setError] = useState(null);
  // myoc Poster
  useEffect(() => {
    async function fetchData() {
      setError(null);
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/settings`,
          options
        );
        setMyoc(response.data);
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
    console.log(error)
  }

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

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
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
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
  );
};

export default Categories;

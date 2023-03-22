import React, { useState, useEffect } from "react";
import "./categories.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
  const [category, setCategory] = useState([]);
  

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
      const response = await axios.get("/categories", options);
      setCategory(response.data);
    }
    fetchData();
  }, []);

 
  return (
    <>
      <div className="categoriesMainDiv">
        <div className="container" >
          <div className="my-auto categoriesDiv">
            {category.map((e) => (
              <Link to={`/category/${e.id}`} key={e.id}>
                {e.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;

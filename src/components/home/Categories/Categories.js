import React, { useState, useEffect } from "react";
import "./categories.css";
import axios from "axios";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";



const Categories = () => {



  const [category, setCategory] = useState([]);
  const[loading,setLoading]=useState(false)


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
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/categories`,
        options
      );
      setCategory(response.data);
    }
    setLoading(true)
    fetchData();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <>

      <div className="categoriesMainDiv">
        <div className="container">

    {loading?(<div className="categoriesMainDiv">
        <div className="container" >

          <div className="my-auto categoriesDiv">
            {category.map((e) => (
              <Link to={`/category/${e.id}`} key={e.id}>
                {e.name}
              </Link>
            ))}
          </div>
        </div>
      </div>):(<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>)}
      
      

      {/* for mobile */}
      <div className="categoriesMobileDiv">
        <div className="container">
          <Carousel
            responsive={responsive}
            arrows={false}
            swipeable={true}
            autoPlay
            centerMode
            infinite
            className="carouselResponsive"
          >
            {category.map((e) => (
              <div className="my-auto">
                <Link to={`/category/${e.id}`} key={e.id}>
                  {e.name}
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Categories;

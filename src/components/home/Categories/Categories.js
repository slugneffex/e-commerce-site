import React, { useState, useEffect } from "react";
import "./categories.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/actions/categoriesActions";

const Categories = () => {
  // const [category, setCategory] = useState([]);
  const [pageCategories, setPageCategories] = useState([]);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const {  categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // useEffect(() => {
  //   let isMounted = true;
  //   let timer;

  //   async function fetchData() {
  //     setError(null);

  //     const options = {
  //       headers: {
  //         "X-Authorization": `${process.env.REACT_APP_HEADER}`,
  //         "Cache-Control": "no-cache, no-store, must-revalidate",
  //         mode: "cors",
  //         credentials: "include",
  //       },
  //     };
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BASE_URL}/categories`,
  //         options
  //       );
  //       if (isMounted) {
  //         setCategory(response.data);
  //       }
  //       timer = setTimeout(fetchData, 500);
  //     } catch (error) {
  //       if (error.response && error.response.status === 429) {
  //         const retryAfter = parseInt(error.response.headers["retry-after"]);
  //         setTimeout(() => {
  //           fetchData();
  //         }, retryAfter * 500);
  //       } else {
  //         setError(error.message);
  //       }
  //     }
  //   }

  //   fetchData();
  //   return () => {
  //     isMounted = false;
  //     clearTimeout(timer);
  //   };
  // }, []);

  useEffect(() => {
    async function fetchData() {
      setError(null);

      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/pages`,
          options
        );
        setPageCategories(response.data);
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

  const filterCategories = pageCategories.filter((pageCategories) => {
    return pageCategories.show_with_category === "on";
  });

  if (error) {
    console.log(error);
  }

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
      items: 6,
    },
  };

  return (
    <>
      <div className="categoriesMainDiv">
        <div className="container">
          <div className="my-auto categoriesDiv">
            {categories.map((e) => (
              <Link to={`/category/${e.id}`} key={e.id}>
                {e.name}
              </Link>
            ))}
            {filterCategories.map((e) => (
              <Link to={`/page/${e.id}`} key={e.id}>
                {e.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> */}

      {/* for mobile */}
      <div className="categoriesMobileDiv" style={{ marginTop: "1rem" }}>
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
            {categories.map((e) => (
              <div className="my-auto" key={e.id}>
                <Link to={`/category/${e.id}`} style={{ color: "#464646" }}>
                  <img src={e.image?.original_url} alt="" width="70%" />
                  <br />
                  <span style={{ fontSize: "12px" }}>{e.name.slice(0, 9)}</span>
                </Link>
              </div>
            ))}
            {filterCategories.map((e) => (
              <div className="my-auto" key={e.id}>
                <Link to={`/category/${e.id}`} style={{ color: "#464646" }}>
                  <img src={e.icon?.original_url} alt="" width="70%" />
                  <br />
                  <span style={{ fontSize: "12px" }}>{e.name.slice(0, 9)}</span>
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

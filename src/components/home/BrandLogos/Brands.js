import React, {  useEffect } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Brand.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrand } from "../../features/actions/brandActions";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const Brands = () => {
  const dispatch = useDispatch();

  const { brand } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(fetchBrand());
  }, [dispatch]);
  // const [brand, setBrand] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
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
  //         `${process.env.REACT_APP_BASE_URL}/brands`,
  //         options
  //       );
  //       setBrand(response.data);
  //     } catch (error) {
  //       if (error.response && error.response.status === 429) {
  //         const retryAfter = parseInt(error.response.headers["retry-after"]);
  //         setTimeout(() => {
  //           fetchData();
  //         }, retryAfter * 1000);
  //       } else {
  //         setError(error.message);
  //       }
  //     }
  //   }
  //   fetchData();
  // }, []);
  // if (error) {
  //   console.log(error)
  // }

  const fliterData = brand.filter((brand) => {
    return brand.focused === "on";
  });

  return (
    <>
      <div className="top-brand-deals container">
        <h3 style={{ marginTop: "67px", marginBottom: "47px" }}>
          Build Your Combo From Top Brands
        </h3>
        <div className="container py-12">
          <Carousel
            responsive={responsive}
            className="py-14"
            swipeable={true}
            autoPlay
            arrows={false}
            centerMode
            infinite
          >
            {Array.isArray(fliterData) &&
              fliterData.map((e) => (
                <div key={e.id} className="logoBox">
                  <div className="logoImgDiv">
                    <Link to={`/brand/${e.id}`}>
                      <img
                        src={e.image?.original_url}
                        width="80%"
                        alt={e.name}
                      ></img>
                    </Link>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Brands;

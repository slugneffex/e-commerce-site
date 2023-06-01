import React, {useState,  useEffect } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchJbrands } from "../features/actions/jbrandsActions";

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
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const JustLaunchedBrands = () => {
  const dispatch = useDispatch();

  const {jbrands} = useSelector((state) =>state.jbrands )

  useEffect(() => {
    dispatch(fetchJbrands());
  }, [dispatch]);

  
  // const [brand, setBrand] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     async function fetchData() {
  //       setError(null);
  //       setLoading(true);
  //       const options = {
  //         headers: {
  //           "X-Authorization": `${process.env.REACT_APP_HEADER}`,
  //           "Cache-Control": "no-cache, no-store, must-revalidate",
  //           mode: "cors",
  //           credentials: "include",
  //         },
  //       };

  //       try {
  //         const response = await axios.get(
  //           `${process.env.REACT_APP_BASE_URL}/productDeals`,
  //           options
  //         );
  //         setBrand(response.data);
  //         setLoading(true);
  //       } catch (error) {
  //         if (error.response && error.response.status === 429) {
  //           const retryAfter = parseInt(error.response.headers["retry-after"]);
  //           setTimeout(() => {
  //             fetchData();
  //           }, retryAfter * 1000);
  //         } else {
  //           setError(error.message);
  //         }
  //       }
  //     }
  //     fetchData();
  //   }, 2000);
  // }, []);


  // if (error) {
  //   console.log(error);
  // }


  const [isCenterMode, setIsCenterMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCenterMode(window.innerWidth > 768); // Set breakpoint according to your needs
    };

    handleResize(); // Initial check on component mount

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  // if (error) {
  //   console.log(error);
  // }

  

  return (
    <>
      <div className="top-brand-deals container">
        <h3 style={{ marginTop: "67px", marginBottom: "47px" }}>
          Just Launched Brands
        </h3>
      
          <div className="container needToBeSetMobile youmaylikeboxshadow">
            <Carousel
              responsive={responsive}
              arrows={isCenterMode}
              centerMode={isCenterMode}
              infinite
              dotListClass="custom-dot-list-style"
            >
              {jbrands.map((e) => ( 
                  <div key={e.id}>
                
                      <Link  to={`${e.link}`}>
                        <img
                          src={e.thumbnail?.original_url}
                          width="80%"
                          alt={e.name}
                        />
                      </Link>
             
                    {/* {e.product_id && (
                      <Link  to={`/product/${e.product_id}`}>
                        <img
                          src={e.thumbnail?.original_url}
                          width="80%"
                          alt={e.name}
                        />
                      </Link>
                    )}
                    {e.combo_id && (
                      <Link  to={`/combo/${e.combo_id}`}>
                        <img
                          src={e.thumbnail?.original_url}
                          width="80%"
                          alt={e.name}
                        />
                      </Link>
                    )}
                    {e.page_id && (
                      <Link  to={`/page/${e.page_id}`}>
                        <img
                          src={e.thumbnail?.original_url}
                          width="80%"
                          alt={e.name}
                        />
                      </Link>
                    )}
                    {e.category_id && (
                      <Link  to={`/category/${e.category_id}`}>
                        <img
                          src={e.thumbnail?.original_url}
                          width="80%"
                          alt={e.name}
                        />
                      </Link>
                    )} */}
                  </div>
                ))}
            </Carousel>
          </div>
        
      </div>
    </>
  );
};

export default JustLaunchedBrands;

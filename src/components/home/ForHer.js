import React, { useState, useEffect } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchForher } from "../features/actions/forherActions";
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
    items: 1.5,
    centerMode: false,
  },
};

const ForHer = () => {
  const dispatch = useDispatch();
  const { forher } = useSelector((state) => state.forher);

  useEffect(() => {
    dispatch(fetchForher());
  }, [dispatch]);
 

  const [isCenterMode, setIsCenterMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCenterMode(window.innerWidth > 768); // Set breakpoint according to your needs
    };

    handleResize(); // Initial check on component mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="top-brand-deals container">
        <h3 style={{ marginTop: "67px", marginBottom: "47px" }}>
          Top Picks For Her
        </h3>
        <div className="container youmaylikeboxshadow">
          <Carousel
            responsive={responsive}
            arrows={isCenterMode}
            infinite
            centerMode={isCenterMode}
          >
            {Array.isArray(forher) &&
              forher.map((e) => (
                <div key={e.banner?.id}>
                 
                    <Link to={`${e.link}`}>
                      <img
                        src={e.banner?.original_url}
                        width="95%"
                        alt={e.name}
                      />
                    </Link>
            
                  {/* {e.product_id && (
                    <Link to={`/product/${e.product_id}`}>
                      <img
                        src={e.banner?.original_url}
                        width="80%"
                        alt={e.name}
                      />
                    </Link>
                  )}
                  {e.combo_id && (
                    <Link to={`/combo/${e.combo_id}`}>
                      <img
                        src={e.banner?.original_url}
                        width="80%"
                        alt={e.name}
                      />
                    </Link>
                  )}
                  {e.page_id && (
                    <Link to={`/page/${e.page_id}`}>
                      <img
                        src={e.banner?.original_url}
                        width="80%"
                        alt={e.name}
                      />
                    </Link>
                  )}
                  {e.category_id && (
                    <Link to={`/category/${e.category_id}`}>
                      <img
                        src={e.banner?.original_url}
                        width="80%"
                        alt={e.name}
                      />
                    </Link>
                  )} */}
                  {/* <Link to={`/brand/${e.brand_id}`}>
                    <img
                      src={e.banner?.original_url}
                      width="80%"
                      alt={e.name}
                    ></img>
                  </Link> */}
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ForHer;

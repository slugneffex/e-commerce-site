import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCombodeal } from "../features/actions/combodealActions";

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

const ComboDeals = () => {
  const dispatch = useDispatch();


  const {  combodeal } = useSelector((state) => state.combodeal);

  useEffect(() => {
    dispatch(fetchCombodeal());
  }, [dispatch]);
 

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
 

  return (
    <>
      <div className="top-brand-deals container">
        <h3 style={{ marginTop: "67px", marginBottom: "47px" }}>
          Top Combo Deals For You
        </h3>
        <div className="container needToBeSetMobile">
          <Carousel
            responsive={responsive}
            arrows={false}
            infinite
            centerMode={isCenterMode}
            dotListClass="custom-dot-list-style"
          >
            {combodeal.map((e) => (
              <div key={e.id}>
                {e.brand_id && (
                  <Link  to={`/brand/${e.brand_id}`}>
                    <img src={e.thumbnail?.url} width="80%" alt={e.name} />
                  </Link>
                )}
                {e.product_id && (
                  <Link to={`/product/${e.product_id}`}>
                    <img
                      src={e.thumbnail?.original_url}
                      width="80%"
                      alt={e.name}
                    />
                  </Link>
                )}
                {e.com_id && (
                  <Link  to={`/combo/${e.com_id}`}>
                    <img
                      src={e.thumbnail?.original_url}
                      width="80%"
                      alt={e.name}
                    />
                  </Link>
                )}

                {e.page_id && (
                  <Link to={`/page/${e.page_id}`}>
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
                )}
                {/* <div>{e.name}</div>
                <div> <img
                      src={e.thumbnail?.original_url}
                      width="80%"
                      alt={e.name}
                    /></div> */}

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

export default ComboDeals;

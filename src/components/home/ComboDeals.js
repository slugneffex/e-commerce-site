import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

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
  const [combo, setCombo] = useState([]);
  const [error, setError] = useState(null);

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
          `${process.env.REACT_APP_BASE_URL}/comboDeals`,
          options
        );
        setCombo(response.data);
        console.log(response.data.name);
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
    console.log(error);
  }
  return (
    <>
      <div className="top-brand-deals container">
        <h3 style={{ marginTop: "67px", marginBottom: "47px" }}>
          Top Combo Deals For You
        </h3>
        <div className="container">
          <Carousel
            responsive={responsive}
            arrows={false}
            infinite
            centerMode
            dotListClass="custom-dot-list-style"
          >
            {combo.map((e) => (
              <div key={e.thumbnail?.id}>
                {e.brand_id && (
                  <Link to={`/brand/${e.brand_id}`}>
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
                {e.combo_id && (
                  <Link to={`/combo/${e.combo_id}`}>
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
                  <Link to={`/category/${e.category_id}`}>
                    <img
                      src={e.thumbnail?.original_url}
                      width="80%"
                      alt={e.name}
                    />
                  </Link>
                )}

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

import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeLayout from "../../layouts/HomeLayout";
import "./BrandLogoList.css";
import { Link } from "react-router-dom";

const BrandLogosList = () => {
  const [brand, setBrand] = useState([]);
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
          `${process.env.REACT_APP_BASE_URL}/brands`,
          options
        );
        setBrand(response.data);
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

  const fliterData = brand.filter((brand) => {
    return brand.focused === "on";
  });

  if (error) {
    console.log(error)
  }

  return (
    <>
      <HomeLayout>
        <div
          className="container"
          style={{
            maxWidth: "1320px",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div className="main_title">
            <h2>Brands</h2>
            <p>Choose your Favourite Brands !!</p>
          </div>
          <div className="row">
            {fliterData.map((e) => (
              <div className="col-lg-3 col-md-6" key={e.id}>
                <Link to={`/brand/${e.id}`}>
                  <a
                    className="box_topic"
                    style={{ transition: "all 0.3s ease-in-out" }}
                    href="https://www.combonation.in/brand/armaf"
                  >
                    <div className="img-sec">
                      <img
                        src={e.image?.original_url}
                        alt={e.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                    <div className="title text-center my-3">
                      <h3 style={{ fontSize: "1.125rem" }}>{e.name}</h3>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default BrandLogosList;

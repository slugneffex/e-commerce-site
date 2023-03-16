import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopTrendingCombos = () => {
  const [picks, setPicks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      const response = await axios.get(`/topPicks`, options);
      setPicks(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <section>
        <div className="top-trending">
          <div className="top-trending-head text-center">
            <h3>Top Picks For You</h3>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {Array.isArray(picks) &&
              picks.map((e) => (
                <div className="col-md-6" key={e.id}>
                  <div className="top-picks-img">
                    <Link to="/">
                      <img
                        src={e.thumbnail?.original_url}
                        width="100%"
                        alt="manish"
                      ></img>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopTrendingCombos;

import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import { Link } from "react-router-dom";

const MYOC = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
        },
      };
      const response = await axios.get(
        `/view-all-products`,
        options
      );
      setProducts(response.data.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <HomeLayout>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6" style={{ marginTop: "4rem" }}>
              <h1>Build Your Combo From Products Below</h1>
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="row">
            {products.map((e) => (
              <div className="col-lg-2 col-md-3" key={e.id}>
                <div className="combo-card">
                  <div className="combo-image">
                    <Link to={`/product/${e.id}`}>
                      <img src={e.thumbnail_img?.original_url} alt={e.name} />
                    </Link>
                  </div>
                  <div className="cart-sec text-center py-2">
                    <i
                      className="bi bi-plus-lg"
                      style={{ cursor: "pointer" }}
                    ></i>

                    <span>Add To Cart</span>
                  </div>
                  <div className="combo-body text-center">
                    <span className="packof">(Pack of 3)</span>
                    <h4>{e.name.substring(0, 30)}</h4>
                    {/* <div>
                      <span className="discount">({e.discount}%)</span>
                    </div> */}

                    <br />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default MYOC;

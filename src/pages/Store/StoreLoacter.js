import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StoreLoacter = () => {
  const { id } = useParams();
  const [storeDetail, setStoreDetail] = useState([]);
  const [store, setStore] = useState([])

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
        },
      };
      const response = await axios.get(`/store/${id}`, options);
      setStoreDetail(response.data.gallery);
      setStore(response.data)
    }
    fetchData();
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="row " style={{ marginBottom: "2rem", position: "relative" }}>
          <div className="col-md-6" key={storeDetail.id}>
            <div style={{ marginLeft: "2rem" }}>
              <h2 className="combonationStoreText">Combonation Store:</h2>
              <h2>{store.name}</h2>
              <h2>Store Address</h2>
              <p>{store.full_address}</p>
            </div>
            {/* <div>
            
          </div> */}

            <div class="row" style={{ marginRight: "1rem", marginLeft: ".3rem" }}>
              {(storeDetail.slice(0, 6)).map((e) => (
                <div class="col-md-4" key={e.id} style={{ margin: "16px", padding: " 0 12px", width: "150px" }}>
                  <img src={e.url} alt="storeImg" width='141px' height='150px' style={{ borderRadius: "1rem" }} />
                </div>

              ))}
            </div>
          </div>

          <div className="col-md-6 mapSection">
            <div dangerouslySetInnerHTML={{ __html: store.location }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreLoacter;

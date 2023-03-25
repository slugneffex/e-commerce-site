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
      <div className="row container">
        <div className="col-md-6" key={storeDetail.id}>
          <div>
            <h2 className="combonationStoreText">Combonation Store:</h2>
            <h2>{store.name}</h2>
          </div>
          <div>
            <h2>Store Address</h2>
            <p>{store.full_address}</p>
          </div>

          <div class="row">
            {storeDetail.map((e) => (
              <div class="col-md-4" key={e.id}>
                <img src={e.url} alt="storeImg" width='100%' height='220px' />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <div dangerouslySetInnerHTML={{__html:store.location}} />
        </div>
      </div>
    </>
  );
};

export default StoreLoacter;

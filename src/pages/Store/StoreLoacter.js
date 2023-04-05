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
      <div className="container desktop">
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

            <div className="row" style={{ marginRight: "1rem", marginLeft: ".3rem" }}>
              {(storeDetail.slice(0, 6)).map((e) => (
                <div className="col-md-4" key={e.id} style={{ margin: "16px", padding: " 0 12px", width: "150px" }}>
                  <img src={e.url} alt="storeImg" width='141px' height='150px' style={{ borderRadius: "1rem" }} />
                </div>

              ))}
            </div>
          </div>

          <div className="col-md-6 desktop mapSection">
            <div dangerouslySetInnerHTML={{ __html: store.location }} />
          </div>
        </div>
      </div>
      
      
      {/* mobile */}
      <div className="container mobile">
        <div style={{ marginBottom: "2rem", position: "relative" }}>
          
          {/* <div style={{ overflow: "hidden" }}> */}
          <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.210098496986!2d77.0503076150507!3d28.382721582517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23f5d95a2d4f%3A0x2360226e87e67312!2sCombonation%20Store%20Airia%20Mall%20Gurgaon!5e0!3m2!1sen!2sin!4v1680692419610!5m2!1sen!2sin" width="350" height="300" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </>
  );
};

export default StoreLoacter;

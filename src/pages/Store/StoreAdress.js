import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StoreAdress = () => {
  const { id } = useParams();

  const [storeAddress,setStoreAddress] = useState([])
  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
        },
      };
      const response = await axios.get(`/store/${id}`, options);
      
      setStoreAddress(response.data)
    }
    fetchData();
  }, [id]);

  return (
    <>
      <div className="col">
        <div className="storeAddressSection" >
          <h2 className="text-center">Store Address :</h2>
          <p className="text-center">
            {storeAddress.full_address}
          </p>
          <p className="text-center">Mobile : {storeAddress.phone}</p>
        </div>
      </div>
    </>
  );
};

export default StoreAdress;

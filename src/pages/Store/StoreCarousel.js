import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useParams } from "react-router-dom";
import axios from "axios";
// import img1 from "./Mask_Group _79.png";

const StoreCarousel = () => {
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
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/store/${id}`, options);
      setStoreDetail(response.data.gallery);
      setStore(response.data)
    }
    fetchData();
  }, [id]);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

  // const item = {
  //   items: [
  //     <img src={""} style={{ height: "100vh", width: "98vh" }} />,
  //     <img src={""} style={{ height: "100vh", width: "98vh" }} />,
  //     <img src={""} style={{ height: "100vh", width: "98vh" }} />,
  //   ],
  // };

  // const option = {
  //   items: 1,
  //   nav: true,
  //   rewind: true,
  //   autoplay: true,
  //   loop: true,
  // };

  return (
    <>

    {/* desktop */}
      <div className="desktop" style={{ marginBottom: "2rem"}}>
      <Carousel
        showDots={false}
        responsive={responsive}
        arrows={false}
        infinite={true}
        autoPlay
        removeArrowOnDeviceType={["tablet", "mobile"]}

      >
        <div>
          <img src={store.thumbnail?.url} alt="" width= "100%" height="500px" />
        </div>

        
        {/* <div>
          <img src='./assets/img/hero/4286868.png' alt="" />
        </div>
        <div>
          <img src='./assets/img/hero/4286868.png' alt="" />
        </div> */}
      </Carousel>
      </div>
      
      {/* mobile */}
      <div className="mobile" style={{ marginBottom: "4rem", marginTop: "2rem"}}>
      <div key={storeDetail.id}>
            <div style={{ marginLeft: "2rem" }}>
              <h2 className="combonationStoreText">Combonation Store:</h2>
              <h2>{store.name}</h2>
              <h2>Store Address</h2>
              <p>{store.full_address}</p>
            </div>
          </div>
          <div style={{ marginTop: "2rem" }}>
      <Carousel
        showDots={false}
        responsive={responsive}
        arrows={false}
        infinite={true}
        autoPlay

      >
        {(storeDetail.slice(0, 6)).map((e) => (
                <div key={e.id} style={{ height: "350px"}}>
                  <img src={e.url} alt="storeImg" style={{height: "100vh", width: "100vw" }} />
                </div>

              ))}

        
        {/* <div>
          <img src='./assets/img/hero/4286868.png' alt="" />
        </div>
        <div>
          <img src='./assets/img/hero/4286868.png' alt="" />
        </div> */}
      </Carousel>
      </div>
      </div>


    </>
  );
};

export default StoreCarousel;

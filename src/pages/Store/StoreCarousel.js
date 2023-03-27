import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useParams } from "react-router-dom";
import axios from "axios";
// import img1 from "./Mask_Group _79.png";

const StoreCarousel = () => {
  const { id } = useParams();

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
      <div style={{ marginBottom: "2rem"}}>
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


    </>
  );
};

export default StoreCarousel;

import React,{useState,useEffect} from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
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
      <OwlCarousel className="owl-theme" items="1" autoplay nav loop>
        <div className="item " key={store.id}>
          <img src={store.thumbnail?.url} alt="img" width='100%' height="400px" />
        </div>
        {/* <div className="item">
          <img src='./assets/img/hero/4286868.png' alt="" />
        </div>
        <div className="item">
          <img src='./assets/img/hero/4286868.png'alt="" />
        </div> */}
      </OwlCarousel>
    </>
  );
};

export default StoreCarousel;

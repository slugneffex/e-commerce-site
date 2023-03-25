import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const Testimonials = () => {

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <>
    <Carousel
        arrows={false}
        responsive={responsive}
        infinite={true}
        autoPlay
        centerMode
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
      >
        <div className="text-center" style={{ margin: "2rem 3rem", overflow: "hidden"}}>
        <div className="row">
        <i class="fa-solid fa-star"></i> 
        <i class="fa-regular fa-star"></i>
        <i class="fa-solid fa-star"></i>  
        </div>
          <p style={{ fontSize: "20px", fontWeight: "medium"}}>Site-seeing at Combonation</p>
          <p style={{width: "600px", height: "120px", fontWeight: "italic", overflowY: "hidden", margin: "auto"}}>To begin with, the fact that the site gives you the authority to create your combos is really helpful. Also, this is the perfect destination that saves you time instead of running errands every weekend and missing out on parties. Do visit this beautiful site every weekend.</p>
          <div>
            <p style={{ marginBottom: ".2rem"}}>Suhavi Sharma</p>
            <p>Jaipur</p>
          </div>
        </div>
        <div className="text-center" style={{ margin: "2rem 3rem"}}>
          <p style={{ fontSize: "20px", fontWeight: "medium"}}>Site-seeing at Combonation</p>
          <p style={{width: "600px", height: "120px", fontWeight: "italic", overflowY: "hidden", margin: "auto"}}>To begin with, the fact that the site gives you the authority to create your combos is really helpful. Also, this is the perfect destination that saves you time instead of running errands every weekend and missing out on parties. Do visit this beautiful site every weekend.</p>
          <div>
            <p style={{ marginBottom: ".2rem"}}>Suhavi Sharma</p>
            <p>Jaipur</p>
          </div>
        </div>
        <div className="text-center" style={{ margin: "2rem 3rem"}}>
          <p style={{ fontSize: "20px", fontWeight: "medium"}}>Site-seeing at Combonation</p>
          <p style={{width: "600px", height: "120px", fontWeight: "italic", overflowY: "hidden", margin: "auto"}}>To begin with, the fact that the site gives you the authority to create your combos is really helpful. Also, this is the perfect destination that saves you time instead of running errands every weekend and missing out on parties. Do visit this beautiful site every weekend.</p>
          <div>
            <p style={{ marginBottom: ".2rem"}}>Suhavi Sharma</p>
            <p>Jaipur</p>
          </div>
        </div>
      </Carousel>;
      
       
      
    </>
  );
};

export default Testimonials;

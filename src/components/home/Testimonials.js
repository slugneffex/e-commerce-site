import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'



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
      <div className="desktop">
      <Carousel
        arrows={false}
        responsive={responsive}
        infinite={true}
        autoPlay
        centerMode
        
      >
        <div className="text-center textCard" style={{ margin: "2rem 3rem", overflow: "hidden" }}>
          <div className="col">
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
          </div>
          <p style={{ fontSize: "20px", fontWeight: "medium" }}>Site-seeing at Combonation</p>
          <p style={{ width: "600px", height: "120px", fontWeight: "italic", overflowY: "hidden", margin: "auto" }}>To begin with, the fact that the site gives you the authority to create your combos is really helpful. Also, this is the perfect destination that saves you time instead of running errands every weekend and missing out on parties. Do visit this beautiful site every weekend.</p>
          <div>
            <p style={{ marginBottom: ".2rem" }}>Suhavi Sharma</p>
            <p>Jaipur</p>
          </div>
        </div>
        <div className="text-center textCard" style={{ margin: "2rem 3rem", overflow: "hidden" }}>
        <div className="col">
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
          </div>
          <p style={{ fontSize: "20px", fontWeight: "medium" }}>Site-seeing at Combonation</p>
          <p style={{ width: "600px", height: "120px", fontWeight: "italic", overflowY: "hidden", margin: "auto" }}>To begin with, the fact that the site gives you the authority to create your combos is really helpful. Also, this is the perfect destination that saves you time instead of running errands every weekend and missing out on parties. Do visit this beautiful site every weekend.</p>
          <div>
            <p style={{ marginBottom: ".2rem" }}>Suhavi Sharma</p>
            <p>Jaipur</p>
          </div>
        </div>
        <div className="text-center textCard" style={{ margin: "2rem 3rem", overflow: "hidden" }}>
        <div className="col">
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
          </div>
          <p style={{ fontSize: "20px", fontWeight: "medium" }}>Site-seeing at Combonation</p>
          <p style={{ width: "600px", height: "120px", fontWeight: "italic", overflowY: "hidden", margin: "auto" }}>To begin with, the fact that the site gives you the authority to create your combos is really helpful. Also, this is the perfect destination that saves you time instead of running errands every weekend and missing out on parties. Do visit this beautiful site every weekend.</p>
          <div>
            <p style={{ marginBottom: ".2rem" }}>Suhavi Sharma</p>
            <p>Jaipur</p>
          </div>
        </div>
      </Carousel>
      </div>
      
      {/* Mobile */}


      <div className="mobile">
      <Carousel
        arrows={false}
        responsive={responsive}
        infinite={true}
        // autoPlay
      >
        <div className="text-center textCard" style={{ margin: "2rem 3rem", overflow: "hidden", width: "100%" }}>
          <div className="col">
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
          </div>
          <p style={{ fontSize: "20px", fontWeight: "medium" }}>Site-seeing at Combonation</p>
          <p style={{ width: "600px", height: "120px", fontWeight: "italic", overflowY: "hidden", margin: "auto" }}>To begin with, the fact that the site gives you the authority to create your combos is really helpful. Also, this is the perfect destination that saves you time instead of running errands every weekend and missing out on parties. Do visit this beautiful site every weekend.</p>
          <div>
            <p style={{ marginBottom: ".2rem" }}>Suhavi Sharma</p>
            <p>Jaipur</p>
          </div>
        </div>
        <div className="text-center textCard" style={{ margin: "2rem 3rem", overflow: "hidden" }}>
        <div className="col">
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
          </div>
          <p style={{ fontSize: "20px", fontWeight: "medium" }}>Site-seeing at Combonation</p>
          <p style={{ width: "600px", height: "120px", fontWeight: "italic", overflowY: "hidden", margin: "auto" }}>To begin with, the fact that the site gives you the authority to create your combos is really helpful. Also, this is the perfect destination that saves you time instead of running errands every weekend and missing out on parties. Do visit this beautiful site every weekend.</p>
          <div>
            <p style={{ marginBottom: ".2rem" }}>Suhavi Sharma</p>
            <p>Jaipur</p>
          </div>
        </div>
        <div className="text-center textCard" style={{ margin: "2rem 3rem", overflow: "hidden" }}>
        <div className="col">
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
            <FontAwesomeIcon icon={faStar} color="gold" />
          </div>
          <p style={{ fontSize: "20px", fontWeight: "medium" }}>Site-seeing at Combonation</p>
          <p style={{ width: "600px", height: "120px", fontWeight: "italic", overflowY: "hidden", margin: "auto" }}>To begin with, the fact that the site gives you the authority to create your combos is really helpful. Also, this is the perfect destination that saves you time instead of running errands every weekend and missing out on parties. Do visit this beautiful site every weekend.</p>
          <div>
            <p style={{ marginBottom: ".2rem" }}>Suhavi Sharma</p>
            <p>Jaipur</p>
          </div>
        </div>
      </Carousel>
      </div>
      
      
      
      



    </>
  );
};

export default Testimonials;

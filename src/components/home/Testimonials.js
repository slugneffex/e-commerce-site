import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Testimonials = () => {
  return (
    <div>
      <section>
        <div className="container">
          <div className="row py-5">
            <OwlCarousel
              className="owl-theme"
              dots
              center
              margin={10}
              items={1.2}
              loop
            >
              <div className="item">
                <div className="testCard text-center">
                  <div className="card-head">
                    <div className="ml-auto mr-auto">
                      <img
                        src="assets/img/to-beauty-deals/charmis.png"
                        alt=""
                        className="textImg"
                      />
                      <br />
                      <span>Some Customer</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h4 className="heading">
                      Good products at Effective Price
                    </h4>
                    <p>
                      I Bought many products from Combonation but they were not
                      good instead they were best of all.
                    </p>
                    <div className="rating"></div>
                    <i className="icon-star voted"></i>
                    <i className="icon-star voted"></i>
                    <i className="icon-star voted"></i>
                    <i className="icon-star voted"></i>
                    <i className="icon-star voted"></i>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="testCard text-center">
                  <div className="card-head">
                    <div className="ml-auto mr-auto">
                      <img
                        src="assets/img/to-beauty-deals/charmis.png"
                        alt=""
                        className="textImg"
                      />
                      <br />
                      <span>Some Customer</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h4 className="heading">
                      Good products at Effective Price
                    </h4>
                    <p>
                      I Bought many products from Combonation but they were not
                      good instead they were best of all.
                    </p>
                    <div className="rating"></div>
                    <i className="icon-star voted"></i>
                    <i className="icon-star voted"></i>
                    <i className="icon-star voted"></i>
                    <i className="icon-star voted"></i>
                    <i className="icon-star voted"></i>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="testCard text-center">
                  <div className="card-head">
                    <div className="ml-auto mr-auto">
                      <img
                        src="assets/img/to-beauty-deals/charmis.png"
                        alt=""
                        className="textImg"
                      />
                      <br />
                      <span>Some Customer</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h4 className="heading">
                      Good products at Effective Price
                    </h4>
                    <p>
                      I Bought many products from Combonation but they were not
                      good instead they were best of all.
                    </p>
                    <div className="rating"></div>
                    <i className="icon-star voted"></i>
                    <i className="icon-star voted"></i>
                    <i className="icon-star voted"></i>
                    <i className="icon-star voted"></i>
                    <i className="icon-star voted"></i>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;

import React from "react";

const Fetures = () => {
  return (
    <div>
      <section className="features">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="feat-item">
                <i className="bi bi-truck"></i>
                <span>Free Shipping</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feat-item">
                <i className="bi bi-lock"></i>
                <span>100% Secure Payment</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feat-item">
                <i className="bi bi-patch-check"></i>
                <span>Assured Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fetures;

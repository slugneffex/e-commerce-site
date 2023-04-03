import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./incAll.css"

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
            "CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      const response = await axios.get(`/categories`, options);
      setCategories(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <footer className="">
        <div className="container">
          <div className="row" id="collapseFooter">
            <div className="col-lg-3 col-md-6">
              <h3 data-target="#collapse_1">Quick Links</h3>
              <div className="collapse dont-collapse-sm links" id="collapse_1">
                <ul>
                  <li>
                    <Link to="/">About us</Link>
                  </li>
                  <li>
                    <Link to="/">Help</Link>
                  </li>
                  <li>
                    <Link to="/">My account</Link>
                  </li>
                  <li>
                    <Link to="/">Contacts</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3 data-target="#collapse_2">Categories</h3>
              <div className="collapse dont-collapse-sm links" id="collapse_2">
                <ul>
                  {Array.isArray(categories) &&
                    categories.map((e) => (
                      <li key={e.id}>
                        <Link
                          className="dropdown-item"
                          to={`/category/${e.id}`}
                        >
                          {e.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3 data-target="#collapse_3">Contacts</h3>
              <div
                className="collapse dont-collapse-sm contacts"
                id="collapse_3"
              >
                <ul>
                  <li className="row">
                    <i className="bi bi-phone-fill" style={{marginTop: ".5rem"}}></i>
                    <p>Mobile: 9910722205 <br></br>
                      Whatsapp: 9910722205
                    </p>
                  </li>
                  <li>
                    <i class="bi bi-envelope-fill"></i>
                    <Link to="#0">customercare@combonation.in</Link>
                  </li>
                  <li>
                    <i class="bi bi-geo-alt"></i>301-303, 3rd Floor,<br />
                    Good Earth Business Bay,<br />
                    Sector - 58,<br />
                    Gurugram, Haryana - 122098 <br />

                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3 data-target="#collapse_4">Keep in touch</h3>
              <div className="collapse dont-collapse-sm" id="collapse_4">
                <div id="newsletter">
                  <form action="" method="POST">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        id="email_newsletter"
                        className="form-control"
                        placeholder="Your email"
                      />
                    </div>
                  </form>
                </div>
                <div className="follow_us">
                  <h5>Follow Us</h5>
                  <ul>
                    <li>
                      <Link to="/">
                        <img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="assets/img/twitter_icon.svg"
                          alt="combonation-twitter"
                          className="lazy"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="assets/img/facebook_icon.svg"
                          alt="combonation-facebook"
                          className="lazy"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="assets/img/instagram_icon.svg"
                          alt="combonation-instagram"
                          className="lazy"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <img
                          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                          data-src="assets/img/youtube_icon.svg"
                          alt="combonation-youtube"
                          className="lazy"
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <section id="footer-secondary" >
          <div className="container" >
            <div className="row add_bottom_25 p-5" style={{ alignItems: "end", position: "relative" }}>
              <div className="col-lg-6 col-md-12">
                <h3>Working Hours:</h3>
                <span>Mon-Fri: 10:00AM - 06:30PM | Sat-Sun Closed</span>
              </div>
              <div className="col-lg-6" style={{ textAlign: "end" }}>
                <ul className="additional_links">
                  <li>
                    <Link to="/page/terms-of-service">
                      Terms and conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/page/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/page/returns-and-refunds">
                      Returns And Refunds
                    </Link>
                  </li>
                  <li>
                    <span>
                      © 2020-22 Combonation.in. <br /> Powered By Born Unicorn Tech
                      Prise Pvt. Ltd.
                    </span>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="col-md-6 ">
                <ul className="footer-selector clearfix mt-4">
                  <li>
                    <img
                      src="assets/img/cards_all.svg"
                      alt=""
                      width="198"
                      height="30"
                    />
                  </li>
                </ul>
              </div>
              <div className="col-md-6 desktop" style={{ width: "450px", position: "absolute", right: "2.2rem"}}>
                <div className="how-we-help">
                  <i className="bi bi-headset"></i>
                  <h2>How may we help you</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default Footer;

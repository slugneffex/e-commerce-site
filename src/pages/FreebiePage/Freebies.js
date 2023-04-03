import React from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import "./Freebies.css"

const Freebies = () => {
    return (
        <>
            <HomeLayout>
                <section className="cart">
                    <div className="container" id="freebie">
                        <div className="row">
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item"><a href="#"> Cart</a></li>
                                    <li className="breadcrumb-item active" ><a href="#" className="active">Freebies</a></li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <h1 className="heading">Selected Freebies In Your Cart</h1>
                            <div className="col-md-8">
                                <div className="row">
                                </div>
                            </div>
                            <div className="col-md-4 checkout-sec">
                                <h3>Allowed Freebie Value = <span>912.3</span></h3>
                                <h3>Availed Freebie Amount = <span>₹ 0</span></h3>
                                <a href="https://www.combonation.in/cart" className="btn_1"><i className="bi bi-arrow-left" />Back To Cart</a>
                                <a href="https://www.combonation.in/payment" className="btn_1">Proceed To Checkout <i className="bi bi-arrow-right" /></a>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-9 availableFreebie">
                                        <h3><i className="bi bi-gift-fill" /> Available <span>Freebies</span></h3>
                                    </div>
                                    <div className="col-3">
                                        <select name="sort_by" id="sort_by" className="form-control">
                                            <option value>Sort By</option>
                                            <option value>Name</option>
                                            <option value>Date Created</option>
                                            <option value>Date Updated</option>
                                            <option value>Category</option>
                                            <option value>Subcategory</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row" id="freebieRow">
                                    <div className="col-md-4">
                                        <div>
                                            <div className="card freebie-card" style={{ padding: "0rem" }}>
                                                <div className="card-body" style={{ padding: "0rem" }}>
                                                    <div className="img-sec">
                                                        <img src="https://www.combonation.in/storage/10822/63e0cf59a5afc_8906150950351-(1).jpg" alt="manestream-fenusmooth-frizzy-hair-treatment-&-hair-shine-kit-300-ml" />
                                                    </div>
                                                    <div className="info-sec text-center">
                                                        <h6>Manestream Fenusmooth Fri...</h6>
                                                        <span>Worth <strong>₹ 1045</strong></span>
                                                        <br />
                                                        <span>Expiry Date : <strong>01-02-2025</strong></span>
                                                        <div className="btn-sec">
                                                            <form action="https://www.combonation.in/addFreebie/3684" method="POST" id="freebieForm3684">
                                                                <input type="hidden" name="_token" defaultValue="IsI8dgOOWUYzVmLw00Mh588aW7q174DS96a5jySl" />
                                                                <input type="text" name="product_id" id="product_id3684" required hidden defaultValue={3684} className="form-control" />
                                                                <input type="text" name="cart_type" id="cart_type3684" required hidden defaultValue="freebie" className="form-control" />
                                                                <input type="text" name="quantity" id="quantity3684" required hidden defaultValue={1} className="form-control" />
                                                                <a href="#" onclick="event.preventDefault(document.getElementById('freebieForm3684').submit());" className="freebie_btn"><i className="bi bi-gift-fill" /> Add Freebie</a>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-4">
                                        <div>
                                            <div className="card freebie-card" style={{ padding: "0rem" }}>
                                                <div className="card-body" style={{ padding: "0rem" }}>
                                                    <div className="img-sec">
                                                        <img src="https://www.combonation.in/storage/10822/63e0cf59a5afc_8906150950351-(1).jpg" alt="manestream-fenusmooth-frizzy-hair-treatment-&-hair-shine-kit-300-ml" />
                                                    </div>
                                                    <div className="info-sec text-center">
                                                        <h6>Manestream Fenusmooth Fri...</h6>
                                                        <span>Worth <strong>₹ 1045</strong></span>
                                                        <br />
                                                        <span>Expiry Date : <strong>01-02-2025</strong></span>
                                                        <div className="btn-sec">
                                                            <form action="https://www.combonation.in/addFreebie/3684" method="POST" id="freebieForm3684">
                                                                <input type="hidden" name="_token" defaultValue="IsI8dgOOWUYzVmLw00Mh588aW7q174DS96a5jySl" />
                                                                <input type="text" name="product_id" id="product_id3684" required hidden defaultValue={3684} className="form-control" />
                                                                <input type="text" name="cart_type" id="cart_type3684" required hidden defaultValue="freebie" className="form-control" />
                                                                <input type="text" name="quantity" id="quantity3684" required hidden defaultValue={1} className="form-control" />
                                                                <a href="#" onclick="event.preventDefault(document.getElementById('freebieForm3684').submit());" className="freebie_btn"><i className="bi bi-gift-fill" /> Add Freebie</a>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-4">
                                        <div>
                                            <div className="card freebie-card" style={{ padding: "0rem" }}>
                                                <div className="card-body" style={{ padding: "0rem" }}>
                                                    <div className="img-sec">
                                                        <img src="https://www.combonation.in/storage/10822/63e0cf59a5afc_8906150950351-(1).jpg" alt="manestream-fenusmooth-frizzy-hair-treatment-&-hair-shine-kit-300-ml" />
                                                    </div>
                                                    <div className="info-sec text-center">
                                                        <h6>Manestream Fenusmooth Fri...</h6>
                                                        <span>Worth <strong>₹ 1045</strong></span>
                                                        <br />
                                                        <span>Expiry Date : <strong>01-02-2025</strong></span>
                                                        <div className="btn-sec">
                                                            <form action="https://www.combonation.in/addFreebie/3684" method="POST" id="freebieForm3684">
                                                                <input type="hidden" name="_token" defaultValue="IsI8dgOOWUYzVmLw00Mh588aW7q174DS96a5jySl" />
                                                                <input type="text" name="product_id" id="product_id3684" required hidden defaultValue={3684} className="form-control" />
                                                                <input type="text" name="cart_type" id="cart_type3684" required hidden defaultValue="freebie" className="form-control" />
                                                                <input type="text" name="quantity" id="quantity3684" required hidden defaultValue={1} className="form-control" />
                                                                <a href="#" onclick="event.preventDefault(document.getElementById('freebieForm3684').submit());" className="freebie_btn"><i className="bi bi-gift-fill" /> Add Freebie</a>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* back to home */}
                                    <div>
                                        <a href="/cart" className="btn_1"> <i className="bi bi-arrow-left"></i> Go Back To Cart</a>
                                    </div>

                                    {/* number button */}
                                    <nav>
                                        <ul className="pagination">
                                            <li
                                                className="page-item disabled"
                                                aria-disabled="true"
                                                aria-label="« Previous"
                                            >
                                                <span className="page-link" aria-hidden="true">
                                                    ‹
                                                </span>
                                            </li>
                                            <li className="page-item active" aria-current="page">
                                                <span className="page-link">1</span>
                                            </li>
                                            <li className="page-item ">
                                                <a
                                                    className="page-link"
                                                    href="#"
                                                >
                                                    2
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    className="page-link"
                                                    href="#"
                                                >
                                                    3
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    className="page-link"
                                                    href="#"
                                                >
                                                    9
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a
                                                    className="page-link"
                                                    href="#"
                                                    rel="next"
                                                    aria-label="Next »"
                                                >
                                                    ›
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </HomeLayout>
        </>
    )
}

export default Freebies
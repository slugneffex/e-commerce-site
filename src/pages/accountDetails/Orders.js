import React from 'react'
import HomeLayout from '../../layouts/HomeLayout';
import './accountDetails.css';
import Sidebar from "./Sidebar"


const Orders = () => {
    return (
        <>
            <HomeLayout>
                <section class="section pt-5 pb-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-3 first">
                                <Sidebar />
                            </div>

                            <div class="col-md-9">
                                <div class="row">
                                    <div class="col-md-12">
                                        <h4>MY ORDERS</h4>
                                    </div>
                                </div>

                                <div class="order-card ">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <img src='./assets/img/wishlist.png' class="order" width="100px" height="100px" />
                                        </div>
                                        <div class="col-md-6">
                                            <h6>ORDER NUMBER</h6>
                                            <p>CN-112229518-5498583<br />
                                                1 Item(s) Delivered</p>
                                        </div>
                                        <div class="col-md-4 order-button-div">
                                            <a href="#" class=" btn-sm order-button" type="button"> Order Details<i
                                                class="bi bi-chevron-compact-right "></i></a>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-2">
                                            <p style={{ FontSize: "14px" }}>Saffron-Scrub <br />
                                                Combo - QTY 1</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Package delivered On <br />
                                                <span style={{ color: "green", FontSize: " small" }}>
                                                    Sun, 3 Nov 2022</span>
                                            </p>
                                        </div>
                                        <div class="col-md-4">
                                            <a href="#" class="feedback"><span class="feedback">Share your experience <i
                                                class="bi bi-arrow-right"></i></span></a>
                                        </div>
                                    </div>

                                </div>


                                <div class="order-card ">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <img src='./assets/img/wishlist.png' class="order" width="100px" height="100px" />
                                        </div>
                                        <div class="col-md-6">
                                            <h6>ORDER NUMBER</h6>
                                            <p>CN-112229518-5498583<br />
                                                1 Item(s) Delivered</p>
                                        </div>
                                        <div class="col-md-4 order-button-div">
                                            <a href="#" class=" btn-sm order-button" type="button"> Order Details<i
                                                class="bi bi-chevron-compact-right "></i></a>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-2">
                                            <p style={{ FontSize: "14px" }}>Saffron-Scrub <br />
                                                Combo - QTY 1</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Package delivered On <br />
                                                <span style={{ color: "green", FontSize: " small" }}>
                                                    Sun, 3 Nov 2022</span>
                                            </p>
                                        </div>
                                        <div class="col-md-4">
                                            <a href="#" class="feedback"><span class="feedback">Share your experience <i
                                                class="bi bi-arrow-right"></i></span></a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </HomeLayout>
        </>
    )
}

export default Orders
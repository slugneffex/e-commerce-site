import React from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import './accountDetails.css'
import Sidebar from "./Sidebar"


const Wallet = () => {
    return (
        <><HomeLayout>
            <section class="section  pb-5 pt-5">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 first">
                            <Sidebar />
                        </div>

                        <div class="col-md-9">


                            <div class="card">
                                <div class="seccard">
                                    <div class="row">
                                        <div class="col-md-8 d-flex wallet">
                                            <img src='./assets/img/wallet.png' width="57.74px" height="50.53px" />
                                            <h5> Your Wallet Balance</h5>
                                        </div>
                                        <div class="col-md-4">
                                            <h4 class="reds p-2"><span class="red">₹230</span></h4>
                                        </div>

                                    </div>
                                    <div class="row p-2 button">
                                        <div class="col-md-8 box">
                                            <div class="cardbox d-flex">
                                                <div class="divs">
                                                    <h6 class="check-point"><i class="bi bi-check-lg check"></i> Exciting Offers
                                                    </h6><br />
                                                    <h6 class="check-point"><i class="bi bi-check-lg check"></i> Quick Checkouts
                                                    </h6>
                                                </div>
                                                <div class="divs">
                                                    <h6 class="check-point"><i class="bi bi-check-lg check"></i> Instant Refunds
                                                    </h6><br />
                                                    <h6 class="check-point"><i class="bi bi-check-lg check"></i> Secure Transactions
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">

                                        </div>

                                    </div>
                                    <div class="row d-flex">
                                        <div class="col-md-8">
                                            <h6 class="note">Kindly Note</h6>
                                            <ul class="notes">
                                                <li>Combonation Wallet can not be used to purchase Gift Cards </li>
                                                <li>Combonation Wallet credits have an expiry date, 1 year from date of credit</li>
                                                <li>Combonation Wallet can not be loaded with International Cards</li>
                                                <li>Credit in wallet can not be transferred to a bank account</li>
                                                <li>To know more <a href="#">read our T&Cs.</a> </li>
                                            </ul>
                                        </div>
                                        <div class="col-md-4">
                                            <img src='./assets/img/piggy.png' alt="piggy" width="150px" />
                                        </div>
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

export default Wallet
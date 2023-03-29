import React from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import './accountDetails.css'
import Sidebar from "./Sidebar"

const Address = () => {
    return (
        <><HomeLayout>
            <section class="section pt-5 pb-5">
                <div class="container">
                <div class="row">
                    <div class="col-md-3 first">
                        <Sidebar />
                    </div>
                    <div class="col-md-9 ">
                        <div class="row">
                            <div class="col-md-7">
                                <h4>MY ADDRESSES</h4>
                            </div>
                            <div class="col-md-5">
                                <a href="#" class="add-address"><h6>+ ADD A NEW ADDRESS</h6></a>
                            </div>
                        </div>
                        <div class="row pt-2">
                            <div class="col-md-5 accountAddress">
                                <div class="card-address accountAddress" >
                                    <div class="row ">
                                        <div class="col-md-10">
                                            <h6>Reema Gahtori</h6>
                                            <p>ABC Apartment, 1007,
                                                Flat No-5,<br /> Sector-21A
                                                Faridabad, Haryana, 212001 India
                                            </p>
                                            <p>Phone Number:000000000</p>
                                        </div>
                                        <div class="col-md-2 d-flex">
                                            <i class="bi bi-pencil-square pencils"></i><i class="bi bi-trash3-fill"></i>
                                        </div>

                                    </div>
                                </div>
                                <div class="card-address ">
                                    <div class="row">
                                        <div class="col-md-10">
                                            <h6>Mayank Rawat</h6>
                                            <p>ABC Apartment, 1007,
                                                Flat No-5,<br /> Sector-21A
                                                Faridabad, Haryana, 212001 India
                                            </p>
                                            <p>Phone Number:000000000</p>
                                        </div>
                                        <div class="col-md-2 d-flex">
                                            <i class="bi bi-pencil-square pencils"></i><i class="bi bi-trash3-fill"></i>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div class="col-md-5 accountAddress">
                                <div class="card-address accountAddress">
                                    <div class="row">
                                        <div class="col-md-10">
                                            <h6>Manish Tiwari</h6>
                                            <p>ABC Apartment, 1007,
                                                Flat No-5,<br /> Sector-21A
                                                Faridabad, Haryana, 212001 India
                                            </p>
                                            <p>Phone Number:000000000</p>
                                        </div>
                                        <div class="col-md-2 d-flex">
                                            <i class="bi bi-pencil-square pencils"></i><i class="bi bi-trash3-fill"></i>
                                        </div>

                                    </div>
                                </div>
                                <div class="card-address">
                                    <div class="row">
                                        <div class="col-md-10">
                                            <h6>Sourav Mishra</h6>
                                            <p>ABC Apartment, 1007,
                                                Flat No-5,<br /> Sector-21A
                                                Faridabad, Haryana, 212001 India
                                            </p>
                                            <p>Phone Number:000000000</p>
                                        </div>
                                        <div class="col-md-2 d-flex">
                                            <i class="bi bi-pencil-square pencils"></i><i class="bi bi-trash3-fill"></i>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                </div>
            </section>
            </HomeLayout></>
    )
}

export default Address;
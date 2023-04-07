import React, { useState, useEffect } from 'react'
import axios from "axios";
import axiosRetry from "axios-retry";
import HomeLayout from '../../layouts/HomeLayout'
import "./BrandLogoList.css"
import { Link } from "react-router-dom"

const BrandLogosList = () => {
    const [brand, setBrand] = useState([]);
    axiosRetry(axios, { retries: 3 });


    useEffect(() => {
        async function fetchData() {
            const options = {
                headers: {
                    "X-Authorization": `CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs`,
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    mode: "cors",
                    credentials: "include",
                },
            };
            const response = await axios.get('/brands', options);
            setBrand(response.data);
        }
        fetchData();
    }, []);

    const fliterData = brand.filter((brand) => {
        return (brand.focused === "on")
    })



    return (
        <>
            <HomeLayout>
                <div className='container' style={{ maxWidth: "1320px",marginTop: "2rem", marginBottom: "2rem" }}>
                    <div className="main_title">
                        <h2>Brands</h2>
                        <p>Choose your Favourite Brands !!</p>
                    </div>
                    <div className='row'>
                        {fliterData.map((e) => (
                            <div className="col-lg-3 col-md-6" key={e.id}>
                                <Link to={`/brand/${e.id}`}>
                                <a className="box_topic" style={{ transition: "all 0.3s ease-in-out" }} href="https://www.combonation.in/brand/armaf">
                                    <div className="img-sec">
                                        <img src={e.image?.original_url} alt={e.name} style={{ width: "100px", height: "100px" }} />
                                        
                                    </div>
                                    <div className="title text-center my-3">
                                        <h3 style={{ fontSize: "1.125rem" }}>{e.name}</h3>
                                    </div>
                                </a>
                                </Link>
                            </div>

                        ))}







                    </div>
                </div>
            </HomeLayout>
        </>
    )
}

export default BrandLogosList
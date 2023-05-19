import React from 'react'
import "./Loader.css"
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchByoc } from "../../features/actions/byocActions";




const Loader = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.classList.add("custom-scroll");
        return () => {
            document.body.classList.remove("custom-scroll");
        };
    }, []);

    // For logo

    const { byoc } = useSelector((state) => state.byoc);

    useEffect(() => {
        dispatch(fetchByoc());
    }, [dispatch]);


    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>


            {Array.isArray(byoc) &&
                byoc.map((e) => (
                    <div key={e.id}>
                        <img
                            src={e.logo?.original_url}
                            alt="logo-combonation"
                            className='loaderImg'
                        ></img>
                    </div>
                ))}



            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader
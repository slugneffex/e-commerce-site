import React from 'react'
import "./Loader.css"
import { useEffect } from 'react';




const Loader = () => {
    

    useEffect(() => {
        document.body.classList.add("custom-scroll");
        return () => {
            document.body.classList.remove("custom-scroll");
        };
    }, []);

  


    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>


           



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
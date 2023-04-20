import React from 'react'
import HomeLayout from "../../layouts/HomeLayout";
const Error = () => {
    return (
        <>
            <HomeLayout>
                <section>
                    <div className='container p-5' >

                        <div className='row' style={{
                            textAlign: "center", justifyContent: "center"
                        }}>
                            <div className="text-center" >

                                <img src='./assets/img/banners/error.png' style={{ width: "40%" }} alt='....' />

                                <p className='pt-3'>Oops! We can’t seem to find <br></br>
                                    the page you’re looking for.</p>


                            </div>
                        </div>
                    </div>

                </section>
            </HomeLayout>
        </>
    )
}

export default Error
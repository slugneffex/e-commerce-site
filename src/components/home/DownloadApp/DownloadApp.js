import React from 'react';
import "./DownloadApp.css"

const DownloadApp = () => {
    return (
        <div>
            <section className="coming-soon" style={{ marginTop: "1rem", backgroundColor: "#FFF4E3", }}>
                <div className="container">
                    <div className="row" style={{ paddingTop: "2rem" }}>
                        <div className="col-md-6 text-left" style={{ paddingTop: "4rem" }}>
                            <h2 className='downloadAppHeading'>Download The <span style={{ color: "#FE9E2D", }}>App</span> Now!</h2>
                            <h6 className='signUpText' style={{ marginTop: "1.5rem" }}>Use code <span className='codeText'>SIGNUP10</span> and get upto <strong>Extra 10% off</strong> on your first order</h6>
                            <div className="QR">
                                <img src="./assets/img/QR/onelinkto_add7up.png" alt="QR" width="150px" height="150px" />
                                <p style={{color: "#464646" }}>*On the min purchase of `999</p>
                            </div>
                        </div>
                        <div className="col-md-6 desktop">
                            <div className="mockup-img">
                                <img src="./assets/img/downloadAppImg/CN_Mock.png" alt="mobileAppImg" height="450px" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DownloadApp;
import React from 'react';
import {Link} from 'react-router-dom';
import "./DownloadApp.css"

const DownloadApp = () => {
  return (
    <div>
        <section className="coming-soon">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-left">
                        <h2>Download The <span>App</span> Now!</h2>
                        <h5>Use code <span className=''>SINGUP10</span> and get upto <strong>Extra 10% off</strong> on your first order</h5>
                        {/* QR */}
                    </div>
                    <div className="col-md-6">
                        <div className="mockup-img">
                            <img src="assets/img/mockup.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default DownloadApp;
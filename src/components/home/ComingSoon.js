import React from 'react';
import {Link} from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div>
        <section className="coming-soon">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-left">
                        <h1>Coming Soon</h1>
                        <h5>Join The Waitlist For Our App</h5>
                        <div className="comingsoon-img">
                            <span>On <Link to="/">Google Play</Link> And <Link to="/">Apple App</Link> Store</span>
                            <br/>
                            <img src="assets/img/play-app.png" alt=""/>
                        </div>
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

export default ComingSoon;
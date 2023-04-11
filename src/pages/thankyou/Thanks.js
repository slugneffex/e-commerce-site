
import React from 'react'
import HomeLayout from '../../layouts/HomeLayout'


const Thanks = () => {
  return (
    <>
      <HomeLayout>
        <section>
          <div className='container' >
          <div className="shadow p-3 mb-5 bg-body rounded" style={{margin:"80px"}}>
            <div className='row'style={{textAlign:"center",justifyContent:"center"
          }}>
          <div className="text-center" style={{width: "28rem", height:"18rem",}}>
            <div className="card-body">
            <img src='./assets/img/accountImg/THANKS.png' style={{ width: "25%" }} alt='....' />
                <h5 style={{ color: 'green' }}>THANK YOU</h5>
                <p>Your payment for this order has been done successfully!</p>
                <a href="/" className="btn btn-primary move-to-cart">
                          Continue Shopping
                        </a>
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

export default Thanks

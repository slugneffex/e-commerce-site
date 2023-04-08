import { faDisplay } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { Link } from 'react-router-dom'

const Thanks = () => {
  return (
    <>
      <HomeLayout>
        <section>
          <div className='container' >
          <div class="shadow p-3 mb-5 bg-body rounded" style={{margin:"80px"}}>
            <div className='row'style={{textAlign:"center",justifyContent:"center"
          }}>
          <div class="text-center" style={{width: "28rem", height:"18rem",}}>
            <div class="card-body">
            <img src='./assets/img/accountImg/THANKS.png' style={{ width: "25%" }} alt='....' />
                <h5 style={{ color: 'green' }}>THANK YOU</h5>
                <p>Your payment for this order has been done successfully!</p>
                <a href="/" class="btn btn-primary move-to-cart">
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

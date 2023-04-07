import { faDisplay } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import HomeLayout from '../../layouts/HomeLayout'

const Thanks = () => {
  return (
    <>
      <HomeLayout>
        <section>
          <div className='container' >
          <div class="shadow p-3 mb-5 bg-body rounded">
            <div className='row'style={{textAlign:"center",justifyContent:"center"
          }}>
          <div class="card text-center" style={{width: "28rem", height:"18rem",color:"#fe9e2d", margin:"2rem"}}>
            <div class="card-body">
            <img src='./assets/img/accountImg/THANKS.png' style={{ width: "50%" }} alt='....' />
                <h5 style={{ color: 'green' }}>THANK YOU</h5>
              
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

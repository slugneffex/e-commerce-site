import { faDisplay } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import HomeLayout from '../../layouts/HomeLayout'

const Thanks = () => {
  return (
    <>
    <HomeLayout>
        <section>
            <div className='container'style={{justifyContent:'center',display:'flex'}}>
               <div className='row pt-5 pb-5'>
                <img src='./assets/img/accountImg/THANKS.png' style={{width:"60%"}} alt='....'/>
                <h5 style={{color:'green'}}>THANK YOU</h5>


               </div>
            </div>
        </section>
    </HomeLayout>
    </>
  )
}

export default Thanks

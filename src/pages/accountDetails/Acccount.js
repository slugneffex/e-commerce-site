
import React from 'react';
import HomeLayout from '../../layouts/HomeLayout';
import './accountDetails.css';
import Sidebar from "./Sidebar"

const Account = () => {
    return (
        <>
      <HomeLayout >
            <section class="section pb-5 pt-5">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 first">
                            <Sidebar />
                        </div>

                        <div class="col-md-9">
                            <div class="card">
                                <div class="row">
                                    <div class="col-md-3">
                                        <img src='./assets/img/accountImg/Group_2388.png' style={{ width: "200px", height: "200px", } }/>
                                    </div>
                                    <div class="col-md-6 second">
                                        <h5 class="changePassword"  >Reema Gahtori</h5>
                                        <p>Email: dontcare@gmail.com</p>
                                        <p>Phone: 0000000000</p>
                                        <div class="changePassword" id="changePass" ><i className='bi bi-lock-fill'></i><h6>
                                         Change Password</h6></div>


                                    </div>
                                    <div class="col-md-3 ">
                                        <div class=" edits d-flex" ><h6 >Edit <i class="bi bi-pen"></i> </h6></div>
                                        <h6 class="edit d-flex"><span class="green">Verified</span><img
                                            src='./assets/img/verified.png' width="25px" height="25px" /></h6>

                                    </div>


                                </div>


                            </div>


                        </div>
                    </div>
                </div>





            </section>
            </HomeLayout></>
    )

}

export default Account;
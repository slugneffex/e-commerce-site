import React from 'react';
import Header from '../components/inc/Header';
import Footer from '../components/inc/Footer';
import BottomBar from '../components/inc/BottomBar';


const HomeLayout = ({children}) => {
  return (
    <div>
        <main>
            <Header></Header>
                {children}
            <Footer></Footer>
            <BottomBar></BottomBar>
        </main>
    </div>
  )
}

export default HomeLayout;
import React from "react";
import Categories from "../components/home/Categories/Categories";
import Hero from "../components/home/Hero";
import TopTrendingCombos from "../components/home/TopTrendingCombos";
// import HotDeals from "../components/home/HotDeals";
// import TopBrandDeals from "../components/home/TopBrandDeals";
import YouMayLike from "../components/home/YouMayLike";
import Testimonials from "../components/home/Testimonials";
import DownloadApp from "../components/home/DownloadApp/DownloadApp";
import Features from "../components/inc/Fetures";
import HomeLayout from "../layouts/HomeLayout";
import ForHer from "../components/home/ForHer";
import ForHim from "../components/home/ForHim";
import Brands from "../components/home/BrandLogos/Brands";
import BYOC from "../components/home/BYOC";
import BrandProducts from "../components/home/BrandProducts";

const Home = () => {
  return (
    <div>
      <main>
        <HomeLayout>
          <Categories></Categories>
          <BYOC></BYOC>
          <Hero></Hero>
          <YouMayLike></YouMayLike>
          <TopTrendingCombos></TopTrendingCombos>
          {/* <HotDeals></HotDeals> */}
          {/* <TopBrandDeals></TopBrandDeals> */}
          <ForHer />
          <BrandProducts />
          <ForHim />
          <Brands />
          <Testimonials></Testimonials>
          <DownloadApp></DownloadApp>
          <Features></Features>
        </HomeLayout>
      </main>
    </div>
  );
};

export default Home;

import React from "react";
import Categories from "../components/home/Categories";
import Hero from "../components/home/Hero";
import TopTrendingCombos from "../components/home/TopTrendingCombos";
import HotDeals from "../components/home/HotDeals";
import TopBrandDeals from "../components/home/TopBrandDeals";
import YouMayLike from "../components/home/YouMayLike";
import Testimonials from "../components/home/Testimonials";
import ComingSoon from "../components/home/ComingSoon";
import Features from "../components/Fetures";
import HomeLayout from "../layouts/HomeLayout";
import TopProduct from "../components/home/TopProduct";
import ForHer from "../components/home/ForHer";
import ForHim from "../components/home/ForHim";
import Brands from "../components/home/Brands";

const Home = () => {
  return (
    <div>
      <main>
        <HomeLayout>
          <Categories></Categories>
          <Hero></Hero>
          <TopTrendingCombos></TopTrendingCombos>
          <YouMayLike></YouMayLike>
          <TopProduct />
          <HotDeals></HotDeals>
          <TopBrandDeals></TopBrandDeals>
          <ForHer />
          <ForHim />
          <Brands />
          <Testimonials></Testimonials>
          <ComingSoon></ComingSoon>
          <Features></Features>
        </HomeLayout>
      </main>
    </div>
  );
};

export default Home;

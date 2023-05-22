import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchByoc } from "../features/actions/byocActions";

const Categories = () => {
  const dispatch = useDispatch();


  const {  byoc } = useSelector((state) => state.byoc);

  useEffect(() => {
    dispatch(fetchByoc());
  }, [dispatch]);
  
  const handleClick = () => {
    window.scrollTo(0,0);
  };

  return (
    <div>
      {/* desktop  */}
      <div className="desktop">
       
          {Array.isArray(byoc) &&
          byoc.map((e) => (
            <div className="byoc" key={e.myoc_banner?.id}>
              <Link onClick={handleClick} to={`/view-all-products`}>
                <img
                  src={e.myoc_banner?.original_url}
                  className="img-fluid"
                  alt="super-deal"
                />
              </Link>
            </div>
          ))}
     
      </div>

      {/* mobile */}
      <div className="mobile">
        {Array.isArray(byoc) &&
          byoc.map((e) => (
            <div className="byoc" key={e.myoc_mobile?.id}>
              <Link onClick={handleClick} to={`/view-all-products`}>
                <img
                  src={e.myoc_mobile?.original_url}
                  className="img-fluid"
                  width="100%"
                  alt="super-deal"
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;

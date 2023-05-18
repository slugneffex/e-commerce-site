import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchByoc } from "../features/actions/byocActions";

const Categories = () => {
  const dispatch = useDispatch();
  // const [myoc, setMyoc] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  const {  byoc } = useSelector((state) => state.byoc);

  useEffect(() => {
    dispatch(fetchByoc());
  }, [dispatch]);
  // myoc Poster
  // useEffect(() => {
  //   setTimeout(() => {
  //     async function fetchData() {
  //       setError(null);
  //       setLoading(true);
  //       const options = {
  //         headers: {
  //           "X-Authorization": `${process.env.REACT_APP_HEADER}`,
  //           "Cache-Control": "no-cache, no-store, must-revalidate",
  //         },
  //       };
  //       try {
  //         const response = await axios.get(
  //           `${process.env.REACT_APP_BASE_URL}/settings`,
  //           options
  //         );
  //         setMyoc(response.data);
  //         setLoading(false);
  //       } catch (error) {
  //         if (error.response && error.response.status === 429) {
  //           const retryAfter = parseInt(error.response.headers["retry-after"]);
  //           setTimeout(() => {
  //             fetchData();
  //           }, retryAfter * 1000);
  //         } else {
  //           setError(error.message);
  //         }
  //       }
  //     }
  //     fetchData();
  //   }, 2000);
  // }, []);

  // if (error) {
  //   console.log(error);
  // }

  return (
    <div>
      {/* desktop  */}
      <div className="desktop">
       
          {Array.isArray(byoc) &&
          byoc.map((e) => (
            <div className="byoc" key={e.myoc_banner?.id}>
              <Link to={`/view-all-products`}>
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
              <Link to={`/view-all-products`}>
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

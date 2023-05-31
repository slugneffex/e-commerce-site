// import React, { useState, useEffect, useCallback } from "react";

// import HomeLayout from "../../layouts/HomeLayout";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import "./category.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Dropdown from "react-bootstrap/Dropdown";
// import axios from "axios";
// import { CgSortAz } from "react-icons/cg";
// import { BiFilterAlt } from "react-icons/bi";
// import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";

// import { Collapse } from "react-bootstrap";

// import { fetchCategories } from "../../components/features/actions/categoriesActions";

// const SubCategory = () => {


//     // Categories api

//   const { categories } = useSelector((state) => state.categories);

//   const fetchCategoriesData = useCallback(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     fetchCategoriesData();
//   }, [fetchCategoriesData]);F


//     const [isOpen1, setIsOpen1] = useState(false);
//     const [isOpen2, setIsOpen2] = useState(false);
//     const [isOpen3, setIsOpen3] = useState(false);

//     const handleToggle1 = () => {
//         setIsOpen1(!isOpen1);
//     };

//     const handleToggle2 = () => {
//         setIsOpen2(!isOpen2);
//     };
//     const handleToggle3 = () => {
//         setIsOpen3(!isOpen3);
//     };

//     const [isOpen4, setIsOpen4] = useState(false);
//     const handleToggle4 = () => {
//         setIsOpen4(!isOpen4);
//     };

//     const [isOpen5, setIsOpen5] = useState(false);
//     const handleToggle5 = () => {
//         setIsOpen5(!isOpen5);
//     };
//     return (
//         <>
//             <HomeLayout>
//                 <div className="mobile">
//                     <div
//                         className="d-flex fixed-bottom bg-light"
//                         style={{
//                             textAlign: "center",
//                             fontSize: "16px",
//                             height: "40px",
//                             alignItems: "center",
//                         }}
//                     >
//                         <div className="col-6" style={{ borderRight: "1px solid #464646" }}>
//                             <div
//                                 type="button"
//                                 data-bs-toggle="offcanvas"
//                                 data-bs-target="#offcanvasLeft"
//                                 aria-controls="offcanvasRight"
//                             >
//                                 {" "}
//                                 <CgSortAz /> Sort By
//                             </div>

//                             <div
//                                 className="offcanvas offcanvas-bottom"
//                                 tabindex="-1"
//                                 id="offcanvasLeft"
//                                 aria-labelledby="offcanvasLeftLabel"
//                                 style={{ height: "80%" }}
//                             >
//                                 <div className="offcanvas-header">
//                                     <h1 id="offcanvasLeftLabel">Sort By</h1>
//                                     <button
//                                         type="button"
//                                         className="btn-close text-reset"
//                                         data-bs-dismiss="offcanvas"
//                                         aria-label="Close"
//                                     ></button>
//                                 </div>
//                                 <hr />
//                                 <div
//                                     className="offcanvas-body"
//                                     style={{
//                                         textAlign: "left",
//                                         lineHeight: "2",
//                                         marginTop: "20px",
//                                     }}
//                                 >
//                                     <ul>
//                                         <li>Name</li>
//                                         <li>Category</li>
//                                         <li>MRP</li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="col-6">
//                             <div
//                                 type="button"
//                                 data-bs-toggle="offcanvas"
//                                 data-bs-target="#offcanvasRight"
//                                 aria-controls="offcanvasRight"
//                             >
//                                 {" "}
//                                 <BiFilterAlt /> Filter
//                             </div>

//                             <div
//                                 className="offcanvas offcanvas-bottom"
//                                 tabindex="-1"
//                                 id="offcanvasRight"
//                                 aria-labelledby="offcanvasRightLabel"
//                                 style={{ height: "80%" }}
//                             >
//                                 <div className="offcanvas-header">
//                                     <h1 id="offcanvasRightLabel">Filter</h1>
//                                     <button
//                                         type="button"
//                                         className="btn-close text-reset"
//                                         data-bs-dismiss="offcanvas"
//                                         aria-label="Close"
//                                     ></button>
//                                 </div>
//                                 <hr />
//                                 <div className="offcanvas-body" style={{ textAlign: "left" }}>
//                                     <div>
//                                         <h5
//                                             variant="primary"
//                                             onClick={handleToggle4}
//                                             aria-controls="collapseExample"
//                                         // aria-expanded={isOpen4}
//                                         >
//                                             Category
//                                             {isOpen4 ? (
//                                                 <TfiAngleUp
//                                                     style={{ position: "absolute", right: "1rem" }}
//                                                 />
//                                             ) : (
//                                                 <TfiAngleDown
//                                                     style={{ position: "absolute", right: "1rem" }}
//                                                 />
//                                             )}
//                                         </h5>

//                                         <Collapse in={isOpen4}>
//                                             <div id="collapseExample">
//                                                 <div style={{ margin: "10px 5px 5px 5px" }}>
//                                                     {categories.map((e) => (
//                                                         <div className="form-check" key={e.id}>
//                                                             <input
//                                                                 type="radio"
//                                                                 name="category_id"
//                                                                 id={e.name}
//                                                                 className="form-check-input"
//                                                                 onClick={() => handleClick(e.slug)}
//                                                             />

//                                                             <label
//                                                                 className="form-check-label"
//                                                                 htmlFor={e.name}
//                                                             >
//                                                                 {e.name}
//                                                             </label>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         </Collapse>
//                                     </div>

//                                     <div>
//                                         <h5
//                                             variant="primary"
//                                             onClick={handleToggle5}
//                                             aria-controls="collapseExample"
//                                         // aria-expanded={isOpen5}
//                                         >
//                                             Price
//                                             {isOpen5 ? (
//                                                 <TfiAngleUp
//                                                     style={{ position: "absolute", right: "1rem" }}
//                                                 />
//                                             ) : (
//                                                 <TfiAngleDown
//                                                     style={{ position: "absolute", right: "1rem" }}
//                                                 />
//                                             )}
//                                         </h5>

//                                         <Collapse in={isOpen5}>
//                                             <div id="collapseExample">
//                                                 <div style={{ margin: "10px 5px 5px 5px" }}>
//                                                     <input
//                                                         type="hidden"
//                                                         name="_token"
//                                                         defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
//                                                     />{" "}
//                                                     {priceRanges.map((range) => {
//                                                         const { minPrice, maxPrice, label, isVisible } =
//                                                             range;
//                                                         const key = `${minPrice}-${maxPrice}`;

//                                                         return isVisible ? (
//                                                             <div key={key} className="sortBy">
//                                                                 <label
//                                                                     className="form-check-label"
//                                                                     htmlFor={key}
//                                                                 >
//                                                                     {label}
//                                                                 </label>
//                                                                 <input
//                                                                     style={{ marginLeft: "7rem" }}
//                                                                     className="form-check-input"
//                                                                     type="checkbox"
//                                                                     value=""
//                                                                     checked={!!checkedFilters[key]}
//                                                                     onChange={() =>
//                                                                         handleFilter(minPrice, maxPrice)
//                                                                     }
//                                                                     id={key}
//                                                                 />
//                                                             </div>
//                                                         ) : null;
//                                                     })}
//                                                 </div>
//                                             </div>
//                                         </Collapse>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </HomeLayout>
//         </>
//     )
// }

// export default SubCategory
